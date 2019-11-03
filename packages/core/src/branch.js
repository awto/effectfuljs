import * as Kit from "./kit";
import { Tag, symbol, symInfo, invariant } from "./kit";
import * as Bind from "./bind";

export const fork = symbol("branch.fork");
export const thread = symbol("branch.thread");

/**
 * if switch statement contains effects in tests it will resort to
 * a chain of if-statements
 */
export function normalizeSwitch(si) {
  const sa = Kit.toArray(si);
  let any = false;
  mark();
  return any ? convert() : sa;
  function mark() {
    const s = Kit.auto(sa);
    return walk();
    function stmt(i) {
      i.value.useIfs = false;
      for (const j of s.sub()) {
        if (j.enter) {
          if (j.type === Tag.SwitchCase) {
            const k = s.curLev();
            if (k && k.pos === Tag.test && k.value.eff) {
              i.value.useIfs = true;
              any = true;
              break;
            }
          } else if (j.type === Tag.SwitchStatement && i.value.eff) {
            stmt(j);
          }
        }
      }
    }
    function walk() {
      for (const i of s.sub()) {
        if (i.enter && i.type === Tag.SwitchStatement && i.value.eff) {
          stmt(i);
        }
      }
    }
  }
  function convert() {
    const s = Kit.auto(sa);
    return walk();
    function* walk() {
      for (const i of s.sub()) {
        if (i.enter && i.type === Tag.SwitchStatement && i.value.useIfs) {
          const lab = s.label();
          if (i.pos !== Tag.push) {
            yield s.enter(i.pos, Tag.BlockStatement);
            yield s.enter(Tag.body, Tag.Array);
          }
          const ilab = s.label();
          const sym = Bind.tempVarSym(s.first.value, "pat");
          // sym.singleAssign = true;
          yield s.enter(Tag.push, Tag.ExpressionStatement);
          yield s.enter(Tag.expression, Tag.AssignmentExpression, {
            node: { operator: "=" }
          });
          yield s.tok(Tag.left, Tag.Identifier, {
            sym,
            lhs: true,
            rhs: false,
            decl: false
          });
          yield* Kit.reposOne(s.one(), Tag.right);
          yield* ilab();
          for (const j of s.sub()) {
            if (j.type === Tag.SwitchCase) {
              if (s.cur().pos === Tag.test) {
                yield s.enter(Tag.push, Tag.IfStatement);
                yield s.enter(Tag.test, Tag.BinaryExpression, {
                  node: { operator: "===" }
                });
                yield s.tok(Tag.left, Tag.Identifier, {
                  sym,
                  lhs: false,
                  rhs: true,
                  decl: false
                });
                yield* Kit.reposOne(s.one(), Tag.right);
                yield* s.leave();
                yield s.enter(Tag.consequent, Tag.BlockStatement);
                yield* Kit.repos(walk(), Tag.body);
              } else {
                const conseq = s.take();
                invariant(conseq.pos === Tag.consequent);
                yield* walk();
                s.close(conseq);
              }
              yield* ilab();
              s.close(j);
            }
          }
          yield* lab();
          s.close(i);
          continue;
        }
        yield i;
      }
    }
  }
}

/** adds block statement to block-less branches */
export function toBlocks(si) {
  const s = Kit.auto(si);
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.SwitchStatement:
            if (i.value.eff) {
              const lab = s.label();
              yield s.enter(i.pos, Tag.BlockStatement, i.value);
              yield s.enter(Tag.body, Tag.Array);
              yield s.enter(Tag.push, Tag.SwitchStatement, {
                origSwitch: i.value,
                node: { loc: i.value.node && i.value.node.loc }
              });
              yield* walk();
              yield* lab();
              s.close(i);
              continue;
            }
            break;
          case Tag.ConditionalExpression:
            yield i;
            yield* s.sub();
            continue;
        }
        switch (i.pos) {
          case Tag.consequent:
          case Tag.alternate:
            const lab = s.label();
            if (i.type === Tag.Array) {
              // switch/case
              yield i;
              yield s.enter(Tag.push, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
              yield* walk();
            } else if (symInfo(i.type).expr) {
              yield i;
              continue;
            } else {
              if (i.type !== Tag.BlockStatement || i.value.ctrl) {
                yield s.enter(i.pos, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                yield s.peel(Kit.setPos(i, Tag.push));
              } else yield i;
              yield* walk();
            }
            yield* lab();
            continue;
        }
      }
      yield i;
    }
  }
  return walk();
}

/** removes empty branches */
export function* clean(s) {
  s = Kit.auto(s);
  for (const i of s) {
    if (i.enter) {
      switch (i.pos) {
        case Tag.alternate:
          if (i.type === Tag.BlockStatement && i.value.node.loc == null) {
            const buf = [];
            const j = Kit.result(s.findPos(Tag.body), buf);
            if (j.value === s.cur().value) {
              i.value.empty = true;
              Kit.skip(s.till(v => v.leave && v.pos === Tag.alternate));
              continue;
            }
            yield i;
            yield* buf;
            yield j;
            continue;
          }
      }
    }
    yield i;
  }
}

/**
 * for each effectful branching statements adds alternate statement
 * if it doesn't exists
 */
export function addAlternate(si) {
  const s = Kit.auto(si);
  function* walk(sw) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.IfStatement:
            if (i.value.eff) {
              yield i;
              yield* walk(s.one());
              yield* walk(s.one());
              if (!s.curLev()) {
                yield s.enter(Tag.alternate, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                yield* s.leave();
                yield* s.leave();
              }
              continue;
            }
            break;
          case Tag.SwitchStatement:
            if (i.value.eff) {
              yield i;
              yield* s.one();
              yield s.peel();
              let found = false;
              for (const j of s.sub()) {
                yield j;
                if (s.cur().pos === Tag.consequent) found = true;
                yield* walk(s.sub());
                yield s.close(j);
              }
              if (!found) {
                yield s.enter(Tag.push, Tag.SwitchCase);
                yield s.enter(Tag.consequent, Tag.Array);
                yield* s.leave();
                yield* s.leave();
              }
              yield* s.leave();
              yield s.close(i);
              continue;
            }
            break;
        }
      }
      yield i;
    }
  }
  return walk(s);
}
