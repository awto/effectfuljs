import * as Kit from "./kit";
import { Tag, enter, leave, tok, symbol, invariant } from "./core";

export const Root = symbol("match.root", "ctrl");
export const Placeholder = symbol("match.placeholder", "ctrl");

export const commit = Kit.pipe(
  Array.from,
  function*(s) {
    for (let i of s) {
      switch (i.type) {
        case Root:
          if (!i.value.v.match) continue;
          i = i.value.s
            ? enter(i.pos, i.type, i.value.v)
            : leave(i.pos, i.type, i.value.v);
          break;
        case Placeholder:
          if (!i.value.v.match) continue;
      }
      yield i;
    }
  }
);

export const clean = function*(s) {
  for (const i of s) {
    switch (i.type) {
      case Root:
      case Placeholder:
        break;
      default:
        yield i;
    }
  }
};

export const inject = Kit.curry(function* matchInject(pattern, si) {
  const pats = (Array.isArray(pattern) ? pattern : [pattern]).map(i =>
    Kit.toArray(Kit.toks(Tag.top, i))
  );
  const starts = pats.map(i => i[0].type);
  const plen = pats.length;
  const plens = pats.map(i => i.length);
  invariant(plens.filter(v => v === 0).length === 0);
  const s = Kit.auto(si);
  const activePos = [];
  const activeTok = [];
  const activePh = [];
  const activePat = [];
  let level = 0;
  for (let i of s) {
    if (i.enter) {
      level++;
    }
    let aplen = activePos.length;
    for (let p = 0; p < aplen; ++p) {
      let x = activePos[p];
      const pat = activePat[p];
      const plen = pat.length;
      const v = activeTok[p];
      if (x !== plen && x !== -1 && activePh[p] == null) {
        let j = pat[x++];
        //during generation we may neglect emitting empty arrays
        if (
          j.pos !== i.pos &&
          j.type === Tag.Array &&
          j.enter &&
          !j.leave &&
          pat[x].value === j.value
        ) {
          x++;
          j = pat[x++];
        }
        if (x < plen && j.pos != i.pos && j.enter === i.enter) {
          activePos[p] = -1;
          v.match = false;
          continue;
        }
        if (j.enter) {
          switch (j.type) {
            case Tag.ExpressionStatement:
              const k = pat[x];
              if (k.type === Tag.Identifier) {
                if (k.value.node.name[0] === "$") {
                  const ph = (activePh[p] = {
                    v,
                    level,
                    name: k.value.node.name.substr(1)
                  });
                  yield enter(i.pos, Placeholder, ph);
                  x++;
                  invariant(pat[x].value === k.value);
                  x++;
                  invariant(pat[x].value === j.value);
                  x++;
                  activePos[p] = x;
                  continue;
                }
              }
              break;
            case Tag.Identifier:
            case Tag.StringLiteral:
              const name = j.value.node.name || j.value.node.value;
              if (name[0] === "$") {
                const ph = (activePh[p] = { v, level, name: name.substr(1) });
                yield enter(i.pos, Placeholder, ph);
                if (!j.leave) {
                  invariant(pat[x].value === j.value);
                  x++;
                }
                activePos[p] = x;
                continue;
              }
              break;
          }
        }
        if (
          j.type !== i.type ||
          j.value.node.name !== i.value.node.name ||
          j.value.node.value !== i.value.node.value
        ) {
          activePos[p] = -1;
          v.match = false;
          continue;
        }
        if (i.enter) {
          invariant(j.enter);
          if (i.leave && !j.leave) {
            if (pat[x++].value !== j.value) {
              activePos[p] = -1;
              v.match = false;
              continue;
            }
          } else if (j.leave) {
            if (s.cur().value === i.value) s.read();
          }
        }
        activePos[p] = x;
      }
    }
    if (i.enter) {
      for (let s = 0; s < plen; ++s) {
        if (starts[s] == i.type) {
          const v = { match: null, index: s };
          yield tok(i.pos, Root, { s: true, v });
          activePos.push(1);
          activeTok.push(v);
          activePat.push(pats[s]);
        }
      }
    }
    yield i;
    if (i.leave) {
      let aplen = activePos.length;
      for (let p = aplen - 1; p >= 0; --p) {
        let ph = activePh[p];
        if (ph != null) {
          if (ph.level === level) {
            yield leave(i.pos, Placeholder, ph);
            ph = activePh[p] = null;
          }
        }
        if (ph == null) {
          let x = activePos[p];
          if (x >= 0 && x === activePat[p].length) {
            activePos[p] = -1;
            const v = activeTok[p];
            v.match = true;
            while (activePos[0] === -1) {
              activePos.shift();
              activePh.shift();
              activeTok.shift();
              activePat.shift();
            }
            yield tok(i.pos, Root, { s: false, v });
          }
        }
      }
      level--;
    }
  }
});

export const run = Kit.curry(function(pat, si) {
  return commit(inject(pat, si));
}, true);
