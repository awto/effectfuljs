import * as Kit from "./kit";
import { Tag } from "./kit";

/**
 * simply replaces all `const`/`let` with `var`
 * loops block scoping is handled by `Loop.blockScoping`
 * activated with `{loose:true, blockScoping: true}`
 */
export function blockScoping(si) {
  const s = Kit.auto(si);
  if (!s.opts.blockScoping) return s;
  return walk();
  function* walk() {
    for (const i of s) {
      if (i.enter && i.type === Tag.VariableDeclaration)
        i.value.node.kind = "var";
      yield i;
    }
  }
}

/** removes asserts */
export function asserts(si) {
  const s = Kit.auto(si);
  if (!s.opts.removeAsserts) return s;
  return Kit.cleanEmptyExprs(calls(mark()));
  function* mark() {
    for (const i of s) {
      if (i.enter) {
        if (i.type === Tag.MemberExpression) {
          const c = s.cur();
          if (c.type === Tag.Identifier && c.value.node.name === "assert") {
            yield s.tok(i.pos, Tag.Null);
            Kit.skip(s.copy(i));
            continue;
          }
        } else if (i.type === Tag.CallExpression) {
          const c = s.cur();
          if (c.type === Tag.Identifier && c.value.node.name === "invariant") {
            yield s.tok(i.pos, Tag.Null);
            Kit.skip(s.copy(i));
            continue;
          }
        }
      }
      yield i;
    }
  }
  function* calls(si) {
    const s = Kit.auto(si);
    for (const i of s) {
      if (
        i.enter &&
        i.type === Tag.CallExpression &&
        s.cur().type === Tag.Null
      ) {
        Kit.skip(s.copy(i));
        yield s.tok(i.pos, Tag.Null);
      } else yield i;
    }
  }
}

/** removing useless BlockStatements */
export function* emptyBlocs(si) {
  const s = Kit.auto(si);
  up: for (const i of s) {
    if (i.enter && i.type === Tag.BlockStatement && i.pos === Tag.push) {
      const buf = [i];
      for (const j of s.sub()) {
        buf.push(j);
        if (j.type === Tag.Array && j.pos === Tag.body) {
          if (j.leave || s.cur().value === j.value) {
            for (const j of s) if (j.value === i.value) continue up;
          }
          break;
        }
      }
      yield* buf;
    } else yield i;
  }
}

/** removes last `undefined` arguments from calls */
export function removeUndefinedArgs(si) {
  const s = Kit.auto(si);
  return walk();
  function* walk() {
    for (const i of s.sub()) {
      yield i;
      if (i.enter && i.pos === Tag.arguments) {
        const buf = [];
        for (const j of s.sub()) {
          if (
            j.type === Tag.Identifier &&
            j.value.sym === Kit.scope.undefinedSym &&
            (!j.value.node || !j.value.node.loc)
          ) {
            buf.push(...s.copy(j));
          } else {
            yield* buf;
            buf.length = 0;
            yield j;
            if (!j.leave) {
              yield* walk();
              yield s.close(j);
            }
          }
        }
      }
    }
  }
}

export const main = Kit.pipe(
  // iife,
  emptyBlocs,
  asserts,
  removeUndefinedArgs
);
