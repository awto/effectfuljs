import * as Kit from "./kit";
import { Tag, symbol, invariant } from "./kit";
import { recalcEff } from "./propagate";
import * as Ctrl from "./control";
import * as Bind from "./bind";

export const repeatId = Kit.sysId("repeat");
export const forParId = Kit.sysId("forPar");
export const forInIteratorId = Kit.sysId("forInIterator");
export const iteratorId = Kit.sysId("iterator");
export const effIteratorId = Kit.sysId("iteratorM");

/**
 * convers all kind of loops into `for` loops
 */
export function* whileStmt(s) {
  for (const i of s) {
    yield i.type === Tag.WhileStatement &&
    (i.value.eff || i.value.opts.normPureWhile)
      ? Kit.setType(i, Tag.ForStatement)
      : i;
  }
}

export const toBlocks = Kit.pipe(
  function toBlocksOuter(s) {
    s = Kit.auto(s);
    const { normPureBlocks } = s.opts;
    function* walk() {
      for (const i of s.sub()) {
        if (i.enter) {
          switch (i.type) {
            case Tag.ForStatement:
            case Tag.ForInStatement:
            case Tag.ForOfStatement:
            case Tag.DoWhileStatement:
            case Tag.WhileStatement:
              const lab = s.label();
              if (i.pos !== Tag.push && (i.value.eff || normPureBlocks)) {
                yield s.enter(i.pos, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                yield s.peel(Kit.setPos(i, Tag.push));
              } else yield s.peel(i);
              yield* walk();
              yield* lab();
              continue;
          }
        }
        yield i;
      }
    }
    return walk();
  },
  function toBlocksInner(s) {
    s = Kit.auto(s);
    function* walk() {
      for (const i of s.sub()) {
        yield i;
        if (i.enter) {
          switch (i.type) {
            case Tag.ForStatement:
            case Tag.ForInStatement:
            case Tag.ForOfStatement:
            case Tag.DoWhileStatement:
            case Tag.WhileStatement:
              const p = yield* s.findPos(Tag.body);
              if (p == null) {
                const lab = s.label();
                yield s.enter(Tag.body, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                yield* lab();
              } else if (p.type !== Tag.BlockStatement) {
                const lab = s.label();
                yield s.enter(Tag.body, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                if (p.type === Tag.EmptyStatement) {
                  Kit.skip(s.copy(p));
                } else {
                  yield s.peel(Kit.setPos(p, Tag.push));
                  yield* walk();
                }
                yield* lab();
              } else yield p;
          }
        }
      }
    }
    return walk();
  }
);

export const doWhileStmt = Kit.pipe(
  function doWhileStmt(s) {
    s = Kit.auto(s);
    const { normPureDoWhile } = s.opts;
    function* walk() {
      for (const i of s.sub()) {
        if (
          (normPureDoWhile || i.value.eff) &&
          i.type === Tag.DoWhileStatement
        ) {
          const lab = s.label();
          yield s.peel(Kit.setType(i, Tag.ForStatement));
          i.value.node.test = null;
          const test = Array.from(s.one());
          yield s.peel();
          yield* s.peelTo(Tag.body);
          yield* walk();
          yield s.enter(Tag.push, Tag.IfStatement);
          yield s.enter(Tag.test, Tag.UnaryExpression, {
            node: { operator: "!" }
          });
          yield s.enter(Tag.argument, Kit.Subst);
          yield* test;
          yield* s.leave();
          yield* s.leave();
          yield s.enter(Tag.consequent, Tag.BlockStatement);
          yield s.enter(Tag.body, Tag.Array);
          yield s.tok(Tag.push, Tag.BreakStatement, {
            block: i.value,
            eff: true,
            bind: true
          });
          yield* lab();
        } else yield i;
      }
    }
    return walk();
  },
  Kit.completeSubst
);

function forOfStmtImpl(loose, s) {
  s = Kit.auto(s);
  const root = s.first.value;
  root.hasForOf = false;
  const all = (loose || s.opts.loose) && s.opts.leanForOf;
  const finalize = s.opts.finalizeForOf !== false;
  const esPureProtocol = s.opts.esForOf;
  const esEffProtocol = s.opts.esForAwaitOf;
  const noResult = s.opts.returnContext === false;
  const { normPureForIn } = s.opts;
  function* readLeft(sym, forOfInfo) {
    function* val(pos) {
      yield s.enter(pos, Tag.MemberExpression, { forOfInfo });
      yield s.tok(Tag.object, Tag.Identifier, { sym, lhs: false, rhs: true });
      yield s.tok(Tag.property, Tag.Identifier, { node: { name: "value" } });
      yield* s.leave();
    }
    const i = s.take();
    if (i.type === Tag.VariableDeclaration) {
      yield Kit.setPos(i, Tag.push);
      i.value.stmt = true;
      for (const j of s.sub()) {
        if (j.leave && j.type === Tag.VariableDeclarator) yield* val(Tag.init);
        yield j;
      }
      yield Kit.setPos(s.take(), Tag.push);
    } else {
      const lab = s.label();
      yield s.enter(Tag.push, Tag.ExpressionStatement);
      yield s.enter(Tag.expression, Tag.AssignmentExpression, {
        node: { operator: "=" }
      });
      yield* s.copy(i);
      yield* val(Tag.right);
      yield* lab();
    }
  }
  function* exit(loop, forOfExit) {
    const lab = s.label();
    const bind = loop.bindIter;
    const esProtocol = (bind && esEffProtocol) || (!bind && esPureProtocol);
    const exitName = esProtocol ? "return" : "exit";
    yield s.enter(Tag.push, Tag.IfStatement, { forOfExit });
    yield s.enter(Tag.test, Tag.MemberExpression);
    yield s.tok(Tag.object, Tag.Identifier, {
      sym: loop.iterVar,
      lhs: false,
      rhs: true,
      decl: false
    });
    yield s.tok(Tag.property, Tag.Identifier, { node: { name: exitName } });
    yield* s.leave();
    yield s.enter(Tag.consequent, Tag.BlockStatement);
    yield s.enter(Tag.body, Tag.Array);
    yield s.enter(Tag.push, Tag.ExpressionStatement);
    yield s.enter(Tag.expression, Tag.CallExpression, { bind });
    yield s.enter(Tag.callee, Tag.MemberExpression);
    yield s.tok(Tag.object, Tag.Identifier, {
      sym: loop.iterVar,
      lhs: false,
      rhs: true,
      decl: false
    });
    yield s.tok(Tag.property, Tag.Identifier, { node: { name: exitName } });
    yield* s.leave();
    yield s.enter(Tag.arguments, Tag.Array);
    yield* lab();
  }
  function* _forOfStmtImpl(sw, root) {
    for (const i of sw) {
      if (i.enter && (all || i.value.eff)) {
        switch (i.type) {
          case Tag.FunctionExpression:
          case Tag.ArrowFunctionExpression:
          case Tag.ClassExpression:
          case Tag.ObjectExpression:
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            yield i;
            if (!i.leave) {
              yield* _forOfStmtImpl(s.sub(), i.value);
              yield s.close(i);
            }
            continue;
          case Tag.ForInStatement:
            if (loose && !normPureForIn) break;
          case Tag.ForOfStatement:
            const loop = i.value;
            const sym = (loop.iterVar = Bind.tempVarSym(root, "loop"));
            let forOfInfo;
            const bind = (loop.bindIter =
              !loose &&
              i.type !== Tag.ForInStatement &&
              (loop.node.await || s.opts.pureForOf === false));
            const esProtocol =
              (bind && esEffProtocol) || (!bind && esPureProtocol);
            sym.declBlock = sym.declLoop = loop;
            sym.hasRefs = true;
            i.value.forOfInfo = forOfInfo;
            const lab = s.label();
            if (i.pos !== Tag.push) {
              yield s.enter(i.pos, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
            }
            let finlab;
            const iterVar = { sym, lhs: true, decl: true, forOfInfo };
            let iterResultSym = esProtocol && Bind.tempVarSym(root, "i");
            const init = Kit.toArray(
              readLeft(esProtocol ? iterResultSym : sym, forOfInfo)
            );
            let start = Kit.setType(i, Tag.ForStatement);
            const slab = s.label();
            yield s.enter(Tag.push, Tag.VariableDeclaration, {
              node: { kind: "var" },
              forOfInfo
            });
            yield s.enter(Tag.declarations, Tag.Array);
            if (esProtocol) {
              yield s.enter(Tag.push, Tag.VariableDeclarator);
              yield s.tok(Tag.id, Tag.Identifier, {
                sym: iterResultSym,
                lhs: false,
                rhs: false,
                decl: true
              });
              yield* s.leave();
            }
            yield s.enter(Tag.push, Tag.VariableDeclarator);
            yield s.tok(Tag.id, Tag.Identifier, iterVar);
            yield s.enter(Tag.init, Tag.CallExpression);
            yield s.tok(Tag.callee, Tag.Identifier, {
              sym:
                i.type === Tag.ForInStatement
                  ? forInIteratorId
                  : bind
                  ? effIteratorId
                  : iteratorId
            });
            yield s.enter(Tag.arguments, Tag.Array);
            const j = s.take();
            yield Kit.setPos(j, Tag.push);
            if (!j.leave) {
              yield* s.sub();
              yield Kit.setPos(s.take(), Tag.push);
            }
            yield* slab();
            if (finalize && i.type !== Tag.ForInStatement) {
              yield s.enter(Tag.push, Tag.TryStatement);
              finlab = s.label();
              yield s.enter(Tag.block, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
            }
            yield s.peel(Kit.setPos(start, Tag.push));
            const flab = s.label();
            yield s.enter(Tag.test, Tag.UnaryExpression, {
              node: { operator: "!" },
              forOfInfo
            });
            yield s.enter(Tag.argument, Tag.MemberExpression);
            let stepPos;
            const stepLab = s.label();
            if (noResult && !esProtocol) {
              yield s.enter(Tag.object, Tag.SequenceExpression);
              yield s.enter(Tag.expressions, Tag.Array);
              stepPos = Tag.push;
            } else {
              yield s.enter(Tag.object, Tag.AssignmentExpression, {
                node: { operator: "=" }
              });
              yield s.tok(Tag.left, Tag.Identifier, {
                sym: esProtocol ? iterResultSym : sym,
                lhs: true,
                rhs: false,
                decl: false
              });
              stepPos = Tag.right;
            }
            yield s.enter(stepPos, Tag.CallExpression, { bind, eff: bind });
            yield s.enter(Tag.callee, Tag.MemberExpression);
            yield s.tok(Tag.object, Tag.Identifier, {
              sym,
              lhs: false,
              rhs: true
            });
            yield s.tok(Tag.property, Tag.Identifier, {
              node: { name: esProtocol ? "next" : "step" }
            });
            yield* s.leave();
            yield s.tok(Tag.arguments, Tag.Array);
            yield* s.leave();
            if (noResult && !esProtocol)
              yield s.tok(Tag.push, Tag.Identifier, {
                sym,
                lhs: false,
                rhs: true
              });
            yield* stepLab();
            yield s.tok(Tag.property, Tag.Identifier, {
              node: { name: "done" }
            });
            yield* flab();
            const body = s.curLev();
            invariant(body.pos === Tag.body);
            if (body.type === Tag.BlockStatement) {
              yield s.peel();
              yield* s.peelTo(Tag.body);
              yield* init;
              yield* _forOfStmtImpl(s.sub(), root);
            } else {
              yield s.enter(Tag.body, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
              if (body.type === Tag.EmptyStatement) Kit.skip(s.one());
              else {
                yield* init;
                yield* Kit.reposOne(_forOfStmtImpl(s.one(), root), Tag.push);
              }
            }
            if (finlab) {
              yield* finlab();
              yield s.enter(Tag.finalizer, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
              yield* exit(loop, forOfInfo);
            }
            yield* lab();
            continue;
        }
      }
      yield i;
    }
  }
  return _forOfStmtImpl(s, s.first.value);
}

export const forOfStmt = s => forOfStmtImpl(false, s);
export const looseForOf = s => forOfStmtImpl(true, s);

/**
 * transforms `for(init; test; upd) body` into for(;;) {...}
 */
export const normalizeFor = Kit.pipe(
  Kit.map(
    Kit.pipe(
      recalcEff,
      Ctrl.recalc,
      function prepareContinue(s) {
        const sl = Kit.auto(s);
        function cntLab(n) {
          return n === "#" ? "$continue" : `${n}$continue`;
        }
        function* walk() {
          for (const i of sl.sub()) {
            if (i.value.eff) {
              switch (i.type) {
                case Tag.ForStatement:
                  if (
                    i.enter &&
                    i.value.cntRefs != null &&
                    i.value.cntRefs.length
                  ) {
                    const lab = sl.label();
                    yield sl.peel(i);
                    yield* sl.peelTo(Tag.body);
                    yield* sl.peelTo(Tag.body);
                    const cntBlock = sl.enter(Tag.push, Tag.BlockStatement, {
                      eff: true,
                      ctrlEff: true,
                      ctrl: cntLab(i.value.ctrl),
                      contLoop: i.value
                    });
                    i.value.cntBlock = cntBlock.value;
                    yield cntBlock;
                    yield sl.enter(Tag.body, Tag.Array);
                    yield* walk();
                    yield* lab();
                    continue;
                  }
                  break;
              }
            }
            yield i;
          }
        }
        return walk();
      },
      Kit.toArray
    )
  ),
  Array.from,
  Kit.map(
    Kit.pipe(
      function* removeContinue(s) {
        const sl = Kit.auto(s);
        for (const i of sl) {
          if (i.value.eff) {
            switch (i.type) {
              case Tag.ContinueStatement:
                if (i.enter) {
                  const { cntBlock } = i.value.block;
                  if (!cntBlock) throw sl.error("wrong `continue` label");
                  const brk = sl.tok(i.pos, Tag.BreakStatement, {
                    node: {
                      label: { type: "Identifier", name: cntBlock.ctrl }
                    },
                    eff: true,
                    bind: true,
                    block: cntBlock
                  });
                  yield brk;
                  (cntBlock.brkRefs || (cntBlock.brkRefs = [])).push(brk.value);
                  sl.close(i);
                }
                continue;
            }
          }
          yield i;
        }
      },
      function normalizeFor(s) {
        const sl = Kit.auto(s);
        function* walk() {
          for (const i of sl.sub()) {
            switch (i.type) {
              case Tag.ForStatement:
                if (!i.value.eff) {
                  yield i;
                  if (i.enter) yield* sl.sub();
                } else {
                  invariant(i.enter);
                  invariant(i.pos === Tag.push);
                  let upd = null,
                    test = null,
                    hasBody = false;
                  for (const j of sl.sub()) {
                    invariant(j.enter);
                    switch (j.pos) {
                      case Tag.init:
                        const ilab = sl.label();
                        if (j.type !== Tag.VariableDeclaration) {
                          yield sl.enter(Tag.push, Tag.ExpressionStatement);
                          yield sl.peel(Kit.setPos(j, Tag.expression));
                        } else {
                          j.value.stmt = true;
                          yield sl.peel(Kit.setPos(j, Tag.push));
                        }
                        yield* sl.sub();
                        yield* ilab();
                        break;
                      case Tag.test:
                        test = [sl.peel(j), ...sl.sub(), ...sl.leave()];
                        break;
                      case Tag.update:
                        upd = [
                          sl.peel(Kit.setPos(j, Tag.expression)),
                          ...sl.sub(),
                          ...sl.leave()
                        ];
                        break;
                      case Tag.body:
                        invariant(j.enter);
                        invariant(j.type === Tag.BlockStatement);
                        hasBody = true;
                        const blab = sl.label();
                        yield sl.enter(i.pos, Tag.BlockStatement, i.value);
                        yield sl.enter(Tag.body, Tag.Array);
                        yield sl.enter(Tag.push, repeat, {
                          stmt: true,
                          origLoop: i.value
                        });
                        i.value.node.init = i.value.node.test = i.value.node.update = null;
                        // yield sl.peel(Kit.setPos(j,Tag.push))
                        yield sl.enter(Tag.push, Tag.BlockStatement);
                        yield* sl.peelTo(Tag.body);
                        if (test != null) {
                          yield sl.enter(Tag.push, Tag.IfStatement);
                          yield* test;
                          // yield sl.enter(Tag.consequent,Tag.BlockStatement,j.value)
                          yield sl.peel(Kit.setPos(j, Tag.consequent));
                        } else yield sl.peel(Kit.setPos(j, Tag.push));
                        /** keeping options stored in this block statement */
                        // yield sl.enter(Tag.push,Tag.BlockStatement,j.value)
                        yield sl.enter(Tag.body, Tag.Array);
                        yield* walk();
                        if (upd != null) {
                          yield sl.enter(Tag.push, Tag.ExpressionStatement);
                          yield* upd;
                          yield* sl.leave();
                        }
                        if (test != null) {
                          yield* sl.leave();
                          yield* sl.leave();
                          yield sl.enter(Tag.alternate, Tag.BlockStatement);
                          yield sl.enter(Tag.body, Tag.Array);
                          const brk = sl.tok(Tag.push, Tag.BreakStatement, {
                            eff: true,
                            bind: true,
                            block: i.value,
                            forOfInfo: i.value.forOfInfo
                          });
                          (i.value.brkRefs || (i.value.brkRefs = [])).push(brk);
                          yield brk;
                        }
                        yield* blab();
                        sl.close(i);
                        break;
                      default:
                        invariant(false);
                    }
                  }
                  invariant(hasBody);
                }
                break;
              default:
                yield i;
            }
          }
        }
        return walk({});
      },
      Kit.completeSubst,
      recalcEff
    )
  )
);

export const repeat = symbol("repeat", "ctrl");

/** loops block scoping for ES5 output implementation */
export function blockScoping(sa) {
  const s = Kit.auto(sa);
  let topRoot = s.first.value;
  function* enterCase(value) {
    yield s.enter(Tag.push, Tag.SwitchCase);
    yield s.tok(Tag.test, Tag.NumericLiteral, { node: { value } });
    yield s.enter(Tag.consequent, Tag.Array);
  }
  function postproc(si) {
    const s = Kit.auto(Kit.toArray(si));
    function* walk() {
      for (const i of s.sub()) {
        if (i.enter && i.type === blockScopeSwitch) {
          if (i.value.enabled) {
            yield s.enter(Tag.push, Tag.SwitchStatement);
            const j = s.take();
            yield s.peel(Kit.setPos(j, Tag.discriminant));
            yield* walk();
            yield* s.leave();
            yield* s.sub();
          } else {
            yield s.enter(Tag.push, Tag.ExpressionStatement);
            yield* walk();
          }
          yield* s.leave();
          s.close(i);
          continue;
        }
        yield i;
      }
    }
    return walk(s);
  }
  function* walk(sw, root, subst, capt, ctrl, labs) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ReturnStatement:
            if (ctrl) {
              const lab = s.label();
              yield s.enter(i.pos, Tag.ReturnStatement, { block: ctrl.block });
              let pos = Tag.argument;
              if (s.curLev()) {
                let resSym = topRoot.blockResSym;
                if (!resSym) {
                  resSym = topRoot.blockResSym = Bind.tempVarSym(topRoot, "br");
                  topRoot.savedDecls.set(resSym, { raw: null });
                }
                yield s.enter(Tag.argument, Tag.SequenceExpression);
                yield s.enter(Tag.expressions, Tag.Array);
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, {
                  sym: resSym,
                  lhs: true,
                  rhs: false,
                  decl: false
                });
                yield* Kit.reposOne(
                  walk(s.sub(), root, subst, capt, ctrl, labs),
                  Tag.right
                );
                yield* s.leave();
                pos = Tag.push;
              }
              ctrl.retBlock = i.value.block;
              yield s.tok(pos, Tag.NumericLiteral, {
                node: { value: ctrl.ret || (ctrl.ret = ctrl.cnt++) }
              });
              yield* lab();
              s.close(i);
              continue;
            }
            break;
          case Tag.BreakStatement:
          case Tag.ContinueStatement:
            if (ctrl) {
              const lab =
                (i.value.node.label && i.value.node.label.name) ||
                (i.type === Tag.BreakStatement ? "##" : "#");
              const info = labs.get(lab);
              if (!info) break;
              const dest = i.type === Tag.BreakStatement ? info.brk : info.cnt;
              yield s.enter(i.pos, Tag.ReturnStatement, { block: ctrl.block });
              dest.block = i.value.block;
              yield s.tok(Tag.argument, Tag.NumericLiteral, {
                node: { value: dest.code || (dest.code = ctrl.cnt++) }
              });
              yield* s.leave();
              s.close(i);
              continue;
            }
            break;
          case Tag.Identifier:
            const { sym } = i.value;
            // TODO: capture can be avoided:
            // if the body is not effectful
            // and the var isn't captured in effectful closure
            if (sym && subst && sym.captLoop) {
              let copy;
              if (i.value.decl) {
                copy = Bind.tempVarSym(sym.declScope, sym.orig, sym.byVal);
                subst.set(sym, copy);
                if (capt) capt.push([sym, copy]);
              } else {
                copy = subst.get(sym);
              }
              if (copy) {
                i.value.node.name = null;
                i.value.sym = copy;
              }
            }
            break;
          case Tag.FunctionExpression:
          case Tag.ObjectMethod:
          case Tag.ClassMethod:
          case Tag.FunctionDeclaration:
          case Tag.ArrowFunctionExpression:
            yield i;
            const oldTopRoot = topRoot;
            topRoot = i.value;
            yield* walk(s.sub(), i.value, subst);
            topRoot = oldTopRoot;
            continue;
          case Tag.ForStatement:
          case Tag.ForOfStatement:
          case Tag.ForInStatement:
          case Tag.WhileStatement:
          case Tag.DoWhileStatement:
            yield i;
            if (i.value.track) {
              const capt = [];
              let j;
              const nsubst = new Map(subst);
              while ((j = s.curLev()) && j.pos !== Tag.body) {
                yield* walk(s.one(), root, nsubst, capt, labs);
              }
              const lab = s.label();
              let bs;
              if (j.type === Tag.BlockStatement) {
                yield s.peel();
                yield* s.peelTo(Tag.body);
                bs = s.sub();
              } else {
                yield s.enter(Tag.body, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                bs = s.one();
              }
              const blab = s.label();
              const sw = s.enter(Tag.push, blockScopeSwitch, {
                enabled: false
              });
              yield sw;
              let pos = Tag.expression;
              const wrapYldStar =
                i.value.eff && s.opts.ops && s.opts.ops.YieldExpression;
              const tlab = s.label();
              if (wrapYldStar) {
                yield s.enter(pos, Tag.YieldExpression, {
                  bind: true,
                  node: { delegate: true }
                });
                pos = Tag.argument;
              }
              yield s.enter(pos, Tag.CallExpression, {
                bind: !wrapYldStar && i.value.eff
              });
              const clab = s.label();
              const func = s.enter(Tag.callee, Tag.ArrowFunctionExpression, {
                node: { params: [] },
                opts: root.opts,
                coerce: true,
                topEff: i.value.eff,
                scopeDecls: new Set(),
                savedDecls: new Map()
              });
              yield func;
              yield s.enter(Tag.params, Tag.Array);
              for (const [sym] of capt)
                yield s.tok(Tag.push, Tag.Identifier, {
                  sym,
                  lhs: true,
                  rhs: false,
                  decl: true
                });
              yield* s.leave();
              const b = s.enter(Tag.body, Tag.BlockStatement, {
                ctrl: "#ret",
                labs: ["#ret"],
                ctrlEff: i.value.eff
              });
              yield b;
              const block = b.value;
              yield s.enter(Tag.body, Tag.Array);
              const lmap = new Map();
              const nctrl = { cnt: 0, block, labs: lmap };
              if (labs)
                for (const j of labs.keys()) lmap.set(j, { brk: {}, cnt: {} });
              for (const j of i.value.labs) lmap.set(j, { brk: {}, cnt: {} });
              lmap.set("##", { brk: {}, cnt: {} });
              yield* Kit.reposOne(
                walk(bs, func.value, subst, null, nctrl, lmap),
                Tag.push
              );
              yield* clab();
              yield s.enter(Tag.arguments, Tag.Array);
              for (const i of capt)
                yield s.tok(Tag.push, Tag.Identifier, {
                  sym: i[1],
                  lhs: false,
                  rhs: true,
                  decl: false
                });
              yield* tlab();
              let hasBrk = false;
              if (nctrl.cnt) {
                sw.value.enabled = true;
                yield s.enter(Tag.cases, Tag.Array);
                const clab = s.label();
                if (nctrl.ret != null) {
                  yield* enterCase(nctrl.ret);
                  yield s.enter(Tag.push, Tag.ReturnStatement, { block });
                  if (ctrl) {
                    const code = ctrl.ret || (ctrl.ret = ctrl.cnt++);
                    yield s.tok(Tag.argument, Tag.NumericLiteral, {
                      node: { value: code }
                    });
                  } else if (topRoot.blockResSym) {
                    yield s.tok(Tag.argument, Tag.Identifier, {
                      sym: topRoot.blockResSym,
                      lhs: false,
                      rhs: true,
                      decl: false
                    });
                  }
                  yield* clab();
                }
                for (const [k, { brk, cnt }] of lmap) {
                  const par =
                    k !== "#" && k !== "##" && ctrl && ctrl.labs.get(k);
                  if (cnt.code != null) {
                    yield* enterCase(cnt.code);
                    if (par) {
                      yield s.enter(Tag.push, Tag.ReturnStatement, {
                        block: ctrl.block
                      });
                      const value = par.cnt.code || (par.cnt.code = ctrl.cnt++);
                      par.cnt.block = cnt.block;
                      yield s.tok(Tag.argument, Tag.NumericLiteral, {
                        node: { value }
                      });
                    } else {
                      yield s.enter(Tag.push, Tag.ContinueStatement, {
                        block: cnt.block,
                        node: {
                          label:
                            k !== "#"
                              ? { type: "Identifier", name: k }
                              : undefined
                        }
                      });
                    }
                    yield* clab();
                  }
                  if (brk.code != null) {
                    if (k === "##") hasBrk = true;
                    yield* enterCase(brk.code);
                    if (par) {
                      yield s.enter(Tag.push, Tag.ReturnStatement, {
                        block: ctrl.block
                      });
                      const value = par.brk.code || (par.brk.code = ctrl.cnt++);
                      par.brk.block = brk.block;
                      yield s.tok(Tag.argument, Tag.NumericLiteral, {
                        node: { value }
                      });
                    } else {
                      yield s.enter(Tag.push, Tag.BreakStatement, {
                        block: brk.block,
                        node: {
                          label:
                            k !== "##"
                              ? { type: "Identifier", name: k }
                              : undefined
                        }
                      });
                    }
                    yield* clab();
                  }
                }
                yield s.enter(Tag.push, Tag.SwitchCase);
                yield s.enter(Tag.consequent, Tag.Array);
                yield s.tok(Tag.push, Tag.ContinueStatement, {
                  block: i.value
                });
              }
              if (hasBrk) {
                yield* blab();
                yield s.tok(Tag.push, Tag.BreakStatement, { block: i.value });
              }
              yield* lab();
            } else {
              let nlabs;
              if (labs) {
                nlabs = new Map(labs);
                for (const j of i.value.labs) nlabs.set(j, false);
              }
              yield* walk(s.sub(), root, subst, capt, ctrl, nlabs);
            }
            continue;
          case Tag.BlockStatement:
          case Tag.SwitchStatement:
            if (i.value.labs && i.value.labs.length) {
              let nlabs = new Map(labs);
              nlabs = new Map(labs);
              for (const j of i.value.labs)
                nlabs.set(j === "#" ? "##" : j, false);
              yield i;
              yield* walk(s.sub(), root, subst, capt, ctrl, nlabs);
              continue;
            }
        }
      }
      yield i;
    }
  }
  return postproc(walk(s, s.first.value));
}

const blockScopeSwitch = Kit.symbol("blockScopeSwitch");
