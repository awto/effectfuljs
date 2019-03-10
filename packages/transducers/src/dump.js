import * as Kit from "./kit";
import { tempNames } from "./scope";
import * as Trace from "./trace";
import {
  Tag,
  produce,
  symName,
  consume,
  symInfo,
  resetFieldInfo,
  typeInfo,
  removeNulls
} from "./core";
import generate from "@babel/generator";
import * as T from "@babel/types";

const BROWSER_DEBUG = Trace.BROWSER_DEBUG;

export const opts = {
  color: true
};

export function* markNodeType(s) {
  for (const i of s) {
    if (i.enter) {
      const ti = typeInfo(i);
      if (ti.kind === "ctrl")
        (i.value.comments || (i.value.comments = [])).unshift({
          txt: symName(i.type),
          style: styles.nodetype
        });
      else if (i.value.comments != null && i.value.comments.length) {
        (i.value.comments || (i.value.comments = [])).unshift({
          txt: symName(i.type)
            .match(/[A-Z]/g)
            .join(""),
          style: styles.nodetype
        });
      }
    }
    yield i;
  }
}

export const convertCtrl = Kit.pipe(
  resetFieldInfo,
  markNodeType,
  Array.from,
  function convertCtrl(s) {
    s = Kit.auto(s);
    function* walk(sw) {
      for (const i of sw) {
        if (i.enter) {
          const fld = i.value.fieldInfo || {},
            ti = typeInfo(i);
          if (ti.kind === "ctrl") {
            s.peel(i);
            const lab = s.label();
            const nm = ti.name;
            const stmt = !fld.expr;
            yield s.enter(
              i.pos,
              stmt ? Tag.BlockStatement : Tag.SequenceExpression,
              { comments: i.value.comments }
            );
            yield s.enter(stmt ? Tag.body : Tag.expressions, Tag.Array);
            if (!i.leave) {
              for (let j; (j = s.curLev()) != null; ) {
                yield s.enter(Tag.push, Kit.Subst);
                yield* walk(s.one());
                yield* s.leave();
              }
            }
            yield* lab();
            Kit.skip(s.leave());
            continue;
          }
        }
        yield i;
      }
    }
    return walk(s);
  },
  Kit.completeSubst,
  Array.from,
  Kit.adjustFieldType
);

export const color = BROWSER_DEBUG
  ? function* color(s) {
      if (!opts.color) {
        yield* s;
        return;
      }
      for (const i of s) {
        if (i.enter && i.value.comments) {
          for (const j of i.value.comments) {
            if (j.style != null && typeInfo(i).kind === "node") {
              j.txt = `%c${j.txt}%c`;
              j.args = [j.style, ""];
            }
          }
        }
        if (i.leave && i.value.tcomments) {
          for (const j of i.value.tcomments) {
            if (j.style != null && typeInfo(i).kind === "node") {
              j.txt = `%c${j.txt}%c`;
              j.args = [j.style, ""];
            }
          }
        }
        yield i;
      }
    }
  : s => s;

function* getArgs(s) {
  for (const i of s) {
    if (i.enter && i.value.comments) {
      for (const j of i.value.comments) {
        if (j.args) for (const k of j.args) yield k;
      }
    }
    if (i.leave && i.value.tcomments) {
      for (const j of i.value.tcomments) {
        if (j.args) for (const k of j.args) yield k;
      }
    }
  }
}

function* applyComments(s) {
  for (const i of s) {
    const node = i.value.node;
    if (i.enter && node != null) {
      if (i.value.comments != null && i.value.comments.length) {
        (node.leadingComments || (node.leadingComments = [])).push({
          type: "CommentBlock",
          value: i.value.comments.map(v => v.txt).join("|")
        });
      }
      if (i.value.tcomments != null && i.value.tcomments.length) {
        (node.trailingComments || (node.trailingComments = [])).push({
          type: "CommentBlock",
          value: i.value.tcomments.map(v => v.txt).join("|")
        });
      }
    }
    yield i;
  }
}

export const toConsole = Kit.curry(function toConsole(tag, s) {
  s = Kit.auto(s);
  const root = s.first.value;
  let name = symName(s.first.type)
    .match(/[A-Z]/g)
    .join("");
  if (root.funcId) name += ":" + root.funcId.id;
  if (BROWSER_DEBUG && opts.color)
    (tag[0] === "+" ? console.group : console.groupCollapsed)(
      `dump %c${tag} %c${name}`,
      "color:orange;font-size:large",
      "color:coral"
    );
  else console.log(`dump ${tag}`);
  const col = Kit.pipe(
    convertCtrl,
    color,
    tempNames,
    Array.from,
    applyComments,
    Array.from
  )(s);
  const args = Array.from(getArgs(col));
  consume(Trace.verify(col));
  console.log(generate(col[0].value.node).code, ...args);
  if (BROWSER_DEBUG) console.groupEnd();
});

export const fin = Kit.pipe(
  removeNulls,
  tempNames,
  convertCtrl,
  Array.from,
  applyComments,
  Array.from
);

export function toStr(s, opts = {}) {
  return generate(consume(Kit.repos(s, Tag.top)).top, opts).code;
}

export const output = Kit.curry(function dump(tag, s) {
  const sa = Kit.toArray(s);
  const sl = Kit.auto(Kit.clone(sa));
  const opts = sl.opts || {};
  let dest;
  if (BROWSER_DEBUG) {
    dest = "console";
  } else {
    dest = `dump-${tag}.js`;
    if (opts.dump) {
      if (opts.dump.substr) {
        if (opts.dump === "console") {
          dest = opts.dump;
        } else {
          dest = opts.dump + dest;
        }
      } else {
        const s = opts.dump[tag];
        if (s == null && s.substr) {
          dest = s;
        }
      }
    }
  }
  if (dest === "console") {
    toConsole(tag, sl);
  } else {
    require("fs").writeFileSync(dest, toStr(sl));
  }
  return sa;
});

export default output;

export function setComment(i, txt, style = "none") {
  style = (style.substr && styles[style]) || style;
  (i.value.comments || (i.value.comments = [])).push({ txt, style });
  return i;
}

export function setEndComment(i, txt, style = "none") {
  style = (style.substr && styles[style]) || style;
  (i.value.tcomments || (i.value.tcomments = [])).push({ txt, style });
  return i;
}

export function copyComment(f, t) {
  if (f.value.comments != null)
    (t.value.comments || (t.value.comments = [])).push(...f.value.comments);
  if (f.value.tcomments != null)
    (t.value.tcomments || (t.value.tcomments = [])).push(...f.value.tcomments);
  return t;
}

const styles = {
  large: "font-size:xx-large;color:orange",
  hl: "font-size:large;color:navy;",
  small: "font-size:large;color:navy;",
  smallH: "font-size:large;color:orange;font-weight:bolder",
  nodetype: "font-size:xx-small;color:green;font-weight:bolder",
  none: ""
};
