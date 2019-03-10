import * as fs from "fs";
import * as path from "path";
import * as Kit from "../../kit";
import { isQUnit, run, pretty, prettyBlock, blockEqual } from "./core";
import tags from "./tags";
import * as assert from "assert";
import libs from "../../config";
import configs from "./configs";
libs["./effectfuljscore"] = libs["@effectful/core"];

/** moves file layout representation into a stream of tests */
export function toStream(files) {
  function* walk(root, obj) {
    for (const i in obj) {
      const v = obj[i],
        path = [...root, i];
      if (v.substr != null) {
        yield { type: "file", path, value: v };
      } else {
        yield* walk(path, v);
      }
    }
  }
  return walk([], files);
}

const fpats = {
  inp: /^(.+)-in.js$/i,
  exp: /^(.+)-out-(.+).js$/i,
  info: /^info.txt$|^(.+)-info.txt$/i,
  opts: /^(.+)\.opts$/i,
  skip: /^skip$|^skip.tmp$|^(.+)-skip$|^(.+)-skip.tmp$/i,
  noskip: /^noskip$|^noskip.tmp$|^(.+)-noskip$|^(.+)-noskip.tmp$/i,
  qskip: /^qskip$|^qskip.tmp$|^(.+)-qskip$|^(.+)-qskip.tmp$/i
};

/** classify files by their pattern */
export function* fileNamePatterns(s) {
  for (const i of s) {
    const n = i.path[i.path.length - 1];
    for (const j in fpats) {
      const p = fpats[j];
      const m = p.exec(n);
      if (m == null) continue;
      let t = m.slice(1).filter(i => i != null);
      if (p.ignoreCase) t = t.map(i => i.toLowerCase());
      const res = { type: j, path: [...i.path.slice(0, -1)], value: i.value };
      if (t.length > 0) res.path.push(...t);
      yield res;
      break;
    }
  }
}

/** extracts output configuration into opts for output files */
export function* setOutpOpts(s) {
  for (const i of s) {
    const conf = configs[i.path[i.path.length - 1]];
    yield { path: i.path, value: Object.assign({}, conf, i.value) };
  }
}

/** converts skip/qskip/noskip into opts object */
export function* parseOptsAlieas(s) {
  for (const i of s) {
    switch (i.type) {
      case "opts":
        yield { type: "opts", path: i.path, value: JSON.parse(i.value) };
        break;
      case "qskip":
        if (!isQUnit) break;
      case "skip":
        yield { type: "opts", path: i.path, value: { skip: true } };
        break;
      case "noskip":
        yield { type: "opts", path: i.path, value: { skip: false } };
        break;
      default:
        yield i;
    }
  }
}

/** groups stream of tests back into a tree */
export function group(s) {
  const tree = { $: {} };
  for (const i of s) {
    if (!i.path.length) continue;
    let p = tree;
    for (const j of i.path.slice(0, -1)) {
      p = p[j] || (p[j] = {});
    }
    const j = i.path[i.path.length - 1];
    p = p[j] || (p[j] = {});
    if (Array.isArray(i.value)) {
      if (p.$ == null) p.$ = [];
      assert.ok(Array.isArray(p.$));
      p.$.push(...i.value);
    } else {
      if (p.$ == null) p.$ = {};
      assert.ok(!Array.isArray(p.$));
      Object.assign(p.$, i.value);
    }
  }
  return tree;
}

/** collects and propagates each opts object into each leaf */
export function propagateOpts(s) {
  const tree = group(s);
  function* walk(path, dir, value) {
    yield { path, value };
    for (const j in dir) {
      if (j[0] !== "$") {
        const jv = dir[j];
        yield* walk(
          path.concat([j]),
          jv,
          Object.assign({ profile: "full" }, value, jv.$)
        );
      }
    }
  }
  return walk([], tree, {});
}

/** moves type field in a stream into a field of value object */
export function* typeToField(s) {
  for (const i of s)
    yield i.type === "opts"
      ? i
      : { path: i.path, value: { [i.type]: i.value } };
}

/** collects options specified in files content */
export function* parseInlineComments(s) {
  for (const i of s) {
    const re = /\*-[ ]+(\w+)[ ]*(.*)$/gm;
    if (i.value.substr != null) {
      while (true) {
        const m = re.exec(i.value);
        if (m == null) break;
        const [type, value] = m.slice(1);
        yield { type: type.toLowerCase(), path: i.path.concat(), value };
      }
    }
    yield i;
  }
}

/** reorders path by moving its last element into a `pos` position */
export const moveConfigPath = Kit.curry(function* moveConfigPath(pos, s) {
  for (const i of s) {
    if (i.value.exp != null) {
      const path = [...i.path];
      path.splice(pos, 0, ...path.splice(-1, 1));
      yield { path, value: i.value };
    } else yield i;
  }
});

/** crops path into `len` length */
export const crop = Kit.curry(function* crop(len, s) {
  const memo = new Map();
  for (const i of s) {
    const path = [...i.path];
    const pn = path.join();
    let t = memo.get(pn);
    if (t == null) memo.set(pn, (t = { path, value: [] }));
    const rest = path.splice(len);
    for (const j of i.value) {
      if (j.exp != null) {
        const name = [...rest];
        if (j.name) name.push(...j.name);
        t.value.push(Object.assign({}, j, { name }));
      }
    }
  }
  for (const j of memo.values()) {
    if (j.value.length) yield j;
  }
});

/** each value is converted into a single element array */
export function* toArr(s) {
  for (const i of s) yield { path: i.path, value: [i.value] };
}

export const trace = Kit.curry(function trace(n, s) {
  const a = [...s];
  console.log(n, a);
  return a;
});

export const parse = Kit.pipe(
  toStream,
  fileNamePatterns,
  parseInlineComments,
  parseOptsAlieas
);

export const prepare = Kit.pipe(
  typeToField,
  propagateOpts,
  setOutpOpts
);

/** converts tests tree into a QUnit suite */
function qunitTests(m) {
  function check(a, i) {
    return function assertion(j) {
      const res = run(j, j.inp);
      a.equal(res, prettyBlock(j.exp), (j.name && j.name.join(" > ")) || i);
    };
  }
  function* walk(s) {
    for (const i in s) {
      if (i[0] === "$") continue;
      const sv = s[i];
      const tests = sv.$ == null ? [] : sv.$.filter(i => i.exp != null);
      if (!tests.length) {
        const nxt = [...walk(sv)];
        yield () =>
          nxt.length
            ? QUnit.module(i, () => nxt.forEach(i => i()))
            : QUnit.skip(i, () => {});
        continue;
      }
      const otests = tests.filter(i => i.only);
      if (otests.length) {
        yield () => QUnit.only(a => otests.forEach(check(a, i)));
        continue;
      }
      const atests = tests.filter(i => !i.skip);
      if (!atests.length) {
        yield () => QUnit.skip(i, () => {});
        continue;
      }
      yield () => QUnit.test(i, a => atests.forEach(check(a, i)));
    }
  }
  for (const i of walk(m)) i();
}

export const qunit = Kit.pipe(
  parse,
  prepare,
  toArr,
  group,
  qunitTests
);

export function mochaTests(m) {
  function check(i) {
    return function assertion(j) {
      blockEqual(j.inp, j.exp, j);
    };
  }
  function* walk(s) {
    for (const i in s) {
      if (i[0] === "$") continue;
      const sv = s[i];
      const tests = sv.$ == null ? [] : sv.$.filter(i => i.exp != null);
      if (!tests.length) {
        const nxt = [...walk(sv)];
        yield nxt.length
          ? () => describe(i, () => nxt.forEach(i => i()))
          : () => it.skip(i, () => {});
        continue;
      }
      const otests = tests.filter(i => i.only);
      if (otests.length) {
        yield () => it.only(() => otests.forEach(check(i)));
        continue;
      }
      const atests = tests.filter(i => !i.skip);
      if (!atests.length) {
        yield () => it.skip(i, () => {});
        continue;
      }
      yield () =>
        it(i, () => {
          atests.forEach(check(i));
        });
    }
  }
  for (const i of walk(m)) i();
}

export const mochaPrepare = Kit.pipe(
  prepare,
  // moveConfigPath(0),
  // moveConfigPath(-1),
  moveConfigPath(1),
  toArr,
  crop(5)
);

export const mochaBdd = Kit.pipe(
  parse,
  mochaPrepare,
  group,
  mochaTests
);
