import { Tag } from "./kit";
import * as Kit from "./kit";
import * as Block from "./block";
import * as Bind from "./bind";

const op = Block.op;

const opNamesMap = new Map();
const opNamesReserved = new Set();

const assignmentOps = {
  "=": Kit.sysId("set"),
  "+=": Kit.sysId("plusAssignOp"),
  "-=": Kit.sysId("minusAssignOp"),
  "*=": Kit.sysId("multAssignOp"),
  "/=": Kit.sysId("divAssignOp"),
  "%=": Kit.sysId("modAssignOp"),
  "<<=": Kit.sysId("lshiftAssignOp"),
  ">>=": Kit.sysId("rshiftAssignOp"),
  ">>>=": Kit.sysId("rushiftAssignOp"),
  "|=": Kit.sysId("bwOrAssignOp"),
  "^=": Kit.sysId("bwXorAssignOp"),
  "&=": Kit.sysId("bwAndAssignOp")
};

const unaryOps = {
  "-": Kit.sysId("unaryMinusOp"),
  "+": Kit.sysId("unaryPlusOp"),
  "!": Kit.sysId("notOp"),
  "~": Kit.sysId("invertOp"),
  typeof: Kit.sysId("typeofOp"),
  void: Kit.sysId("voidOp"),
  delete: Kit.sysId("del")
};

const binaryOps = {
  "==": Kit.sysId("eqOp"),
  "!=": Kit.sysId("neqOp"),
  "===": Kit.sysId("strictEqOp"),
  "!==": Kit.sysId("strictNeqOp"),
  "<": Kit.sysId("lsOp"),
  "<=": Kit.sysId("leOp"),
  ">": Kit.sysId("mrOp"),
  ">=": Kit.sysId("meOp"),
  "<<": Kit.sysId("lshiftOp"),
  ">>": Kit.sysId("rshiftOp"),
  ">>>": Kit.sysId("urshiftEqOp"),
  "+": Kit.sysId("plusOp"),
  "-": Kit.sysId("minusOp"),
  "*": Kit.sysId("multOp"),
  "/": Kit.sysId("divOp"),
  "%": Kit.sysId("modOp"),
  "|": Kit.sysId("bwOrOp"),
  "^": Kit.sysId("bwXorOp"),
  "&": Kit.sysId("bwAndOp"),
  in: Kit.sysId("inOp"),
  instanceof: Kit.sysId("instanceOfOp")
};

const updateOps = {
  "++": Kit.sysId("incrOp"),
  "--": Kit.sysId("decrOp")
};

const prefixUpdateOps = {
  "++": Kit.sysId("prefixIncrOp"),
  "--": Kit.sysId("prefixDecrOp")
};

const logicalOps = {
  "||": Kit.sysId("orOp"),
  "&&": Kit.sysId("andOp")
};

function getOpName(i) {
  switch (i.type) {
    case Tag.AssignmentExpression:
      return assignmentOps[i.value.node.operator];
    case Tag.BinaryExpression:
      return binaryOps[i.value.node.operator];
    case Tag.UnaryExpression:
      return unaryOps[i.value.node.operator];
    case Tag.UpdateExpression:
      return (i.value.node.prefix ? prefixUpdateOps : updateOps)[
        i.value.node.operator
      ];
    case Tag.LogicalExpression:
      return logicalOps[i.value.node.operator];
    case Tag.YieldExpression:
      if (i.value.node.delegate) return Kit.sysId("yldStar");
      return Kit.sysId("yld");
    case Tag.AwaitExpression:
      return Kit.sysId("chain");
  }
  let res = opNamesMap.get(i.type);
  if (res != null) return res;
  res = Kit.sysId(
    Kit.symName(i.type)
      .match(/[A-Z]/g)
      .join("")
  );
  Kit.invariant(!opNamesReserved.has(res));
  opNamesMap.set(i.type, res);
  return res;
}

export function inject(si) {
  const nset = new Map();
  const s = Kit.auto(si);
  const root = s.first.value;
  root.pureId = Kit.sysId(s.opts.returnName || "pure");
  function setEnv(ops) {
    for (const j in ops) {
      const v = ops[j];
      if (v === false) nset.delete(Tag[j]);
      else
        nset.set(
          Tag[j],
          v === true
            ? false
            : Array.isArray(v)
            ? v.map(Kit.sysId)
            : Kit.sysId(v)
        );
    }
  }
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        const ops = i.value.configDiff && i.value.configDiff.ops;
        if (ops != null) setEnv(ops);
        let v = nset.get(i.type);
        if (v != null) {
          if (i.type === Tag.YieldExpression && Array.isArray(v))
            v = v[Number(i.value.node.delegate || 0)];
          let name = v || getOpName(i);
          yield s.enter(i.pos, op, {
            node: {
              src: i.value,
              type: i.type,
              loc: i.value.node && i.value.node.loc
            },
            bind: true,
            expr: true,
            sym: name
          });
          yield* walk();
          yield* s.leave();
          s.close(i);
          continue;
        }
      }
      yield i;
    }
  }
  if (s.opts.ops != null) setEnv(s.opts.ops);
  if (!nset.size) return s;
  return walk();
}

export function interpret(si) {
  const s = Kit.auto(si);
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter && i.type === op) {
        const lab = s.label();
        let pos = i.pos;
        if (i.value.bind) {
          yield s.enter(pos, Block.effExpr);
          pos = Tag.expression;
        }
        yield s.enter(pos, Tag.CallExpression, {
          node: { loc: i.value.node && i.value.node.loc }
        });
        yield s.tok(Tag.callee, Tag.Identifier, { sym: i.value.sym });
        yield s.enter(Tag.arguments, Tag.Array);
        yield* Kit.repos(walk(), Tag.push);
        yield* lab();
        s.close(i);
        continue;
      }
      yield i;
    }
  }
  return walk();
}

/**
 * combines opts with bind into a single call for optimization purposes
 * e.g.
 *
 *    bind(yield a, cont) ==> bindYield(a, cont)
 */
export function combine(si) {
  const s = Kit.auto(si);
  const ops = s.opts.combineOps;
  return ops ? _combine() : s;
  function* _combine() {
    const defaultName = s.opts.bindName;
    const defaultSym = Kit.sysId(defaultName);
    for (const i of s) {
      yield i;
      if (i.enter && i.type === Block.letStmt && i.value.eff) {
        const j = s.curLev();
        if (j && j.type === op && (ops === true || ops[j.value.sym.orig])) {
          i.value.op = j.value;
          i.value.opSym = j.value.sym;
          i.value.bindName = j.value.sym.orig;
          s.take();
          if (!j.leave) {
            yield* s.sub();
            s.close(j);
          }
          continue;
        }
        i.value.op = null;
        i.value.opSym = defaultSym;
        i.value.bindName = defaultName;
      }
    }
  }
}

const globalObjNames = {
  window: true,
  global: true,
  globalThis: true
};

/** replaces property access with API calls */
export function propAccess(si) {
  const s = Kit.auto(si);
  const wrap = s.opts.wrapPropAccess;
  if (!wrap) return s;
  const root = s.first.value;
  const del = varOp(wrap.delete, "del");
  const set = varOp(wrap.set, "set");
  const get = varOp(wrap.get, "get");
  const call = varOp(wrap.call, "call");
  const constr = varOp(wrap.constr, "constr");
  const globals = wrap.globals;
  const locals = wrap.locals;
  const wrapArgs = wrap.arrArgs;
  if (set && s.opts.optimizeContextVars)
    throw s.error(
      "`wrapPropAccess:{set}` doesn't work yet with `optimizeContextVars:true`"
    );
  const postproc = root.postproc || (root.postproc = []);
  return _propAccess(s);
  function varOp(conf, defaultName) {
    if (!conf) return null;
    const sym = Kit.sysId(defaultName);
    sym.bindOp = conf.bind !== false;
    return sym;
  }
  function* _propAccess(sw) {
    for (const i of sw) {
      if (i.enter) {
        let sym, opSym;
        switch (i.type) {
          case Tag.UpdateExpression:
            if (set) {
              sym = set;
              opSym = getOpName(i);
            }
            break;
          case Tag.UnaryExpression:
            if (i.value.node.operator === "delete") {
              if (!del) {
                yield i;
                yield s.take();
                continue;
              }
              sym = del;
            }
            break;
          case Tag.CallExpression:
            if (call) sym = call;
            break;
          case Tag.NewExpression:
            if (constr) sym = constr;
            break;
          case Tag.AssignmentExpression:
            if (!set) {
              yield i;
              yield s.take();
              continue;
            }
            opSym = getOpName(i);
            sym = set;
            break;
          case Tag.Identifier:
            if (!i.value.rhs) break;
          case Tag.MemberExpression:
            if (get) {
              sym = get;
            }
            break;
        }
        if (sym) {
          let obj, prop;
          function splitMemberExpression(objTok) {
            obj = Kit.reposOneArr([..._propAccess(s.one())], Tag.push);
            if (!objTok.value.node.computed) {
              prop = [
                s.tok(Tag.push, Tag.StringLiteral, {
                  node: { value: s.cur().value.node.name }
                })
              ];
              Kit.skip(s.one());
            } else prop = Kit.reposOneArr([..._propAccess(s.one())], Tag.push);
          }
          if (!opSym) opSym = sym;
          if (sym === constr) {
            obj = Kit.reposOneArr([..._propAccess(s.one())], Tag.push);
            prop = [];
          } else if (sym === call) {
            const objTok = s.cur();
            if (objTok.type === Tag.MemberExpression) {
              s.take();
              splitMemberExpression(objTok);
              s.close(objTok);
            } else {
              obj = Kit.reposOneArr([..._propAccess(s.one())], Tag.push);
              prop = [
                root.sloppy
                  ? s.tok(Tag.push, Tag.Identifier, {
                      node: { name: "global" }
                    })
                  : s.tok(Tag.push, Tag.Identifier, {
                      sym: Kit.scope.undefinedSym
                    })
              ];
            }
          } else {
            const objTok = sym === get ? i : s.take();
            switch (objTok.type) {
              case Tag.MemberExpression:
                splitMemberExpression(objTok);
                break;
              case Tag.Identifier:
                const objSym = objTok.value.sym;
                if (
                  !objSym ||
                  objSym.singleAssign ||
                  (!objSym.global &&
                    (objSym.interpr !== Bind.ctxField || locals === false)) ||
                  (objSym.global && (!globals || globalObjNames[objSym.orig]))
                ) {
                  yield i;
                  if (sym !== get) yield objTok;
                  continue;
                }
                if (objSym.global) {
                  obj = [
                    s.tok(Tag.push, Tag.Identifier, {
                      node: { name: "global" }
                    })
                  ];
                  prop = [
                    s.tok(Tag.push, Tag.StringLiteral, {
                      node: { value: objSym.name }
                    })
                  ];
                } else {
                  const ctxSym = Kit.scope.newSym();
                  ctxSym.declScope = objSym.declScope;
                  ctxSym.interpr = objSym.interpr;
                  ctxSym.fieldName = null;
                  obj = [s.tok(Tag.push, Tag.Identifier, { sym: ctxSym })];
                  const val = s.tok(Tag.push, Tag.StringLiteral, {
                    sym,
                    node: { value: objSym.orig }
                  });
                  prop = [val];
                  postproc.push(
                    // core-loose is compiled without respect to the loops scope
                    (function(objSym, val) {
                      return function() {
                        val.value.node.value = objSym.fieldName;
                      };
                    })(objSym, val)
                  );
                }
                break;
              default:
                yield i;
                if (sym !== get) yield objTok;
                continue;
            }
            if (sym !== get) s.close(objTok);
          }
          yield s.enter(i.pos, op, {
            node: {
              src: i.value,
              loc: i.value.node && i.value.node.loc,
              type: i.type
            },
            bind: sym.bindOp,
            expr: sym.bindOp,
            sym: opSym
          });
          yield* obj;
          yield* prop;
          if (sym === set) yield* Kit.reposOne(_propAccess(s.sub()), Tag.push);
          else if (sym === call || sym === constr) {
            const args = s.take();
            if (!args.leave) {
              if (wrapArgs) {
                yield s.enter(Tag.push, Tag.ArrayExpression);
                yield s.enter(Tag.elements, Tag.Array);
              }
              yield* _propAccess(s.sub());
              if (wrapArgs) {
                yield* s.leave();
                yield* s.leave();
              }
              s.close(args);
            }
          }
          yield* s.leave();
          s.close(i);
          continue;
        }
      }
      yield i;
    }
  }
}

/**
 * converts update expressions and assignments without `=` operation into
 * assignments with `=`
 */
export function normalizeAssign(si) {
  let s = Kit.auto(si);
  if (!s.opts.normalizeAssign) return s;
  s = Kit.auto(Kit.toArray(Block.applyIgnoreResult(s)));
  const root = s.first.value;
  let tmps = [false, false];
  let updTmp;
  return _normalizeAssign(s);
  function* _normalizeAssign(sw) {
    for (const i of sw) {
      switch (i.type) {
        case Tag.AssignmentExpression:
        case Tag.UpdateExpression:
          const op = i.value.node.operator;
          if (op === "=") break;
          const upd = i.type === Tag.UpdateExpression;
          const retOld = upd && !i.value.node.prefix && !i.value.ignoreResult;
          const bop = upd ? op.substr(0, 1) : op.substr(0, op.length - 1);
          const j = s.cur();
          let pos = i.pos;
          const lab = s.label();
          let left;
          let seq;
          function* startSeq() {
            if (!seq) {
              seq = true;
              pos = Tag.push;
              yield s.enter(i.pos, Tag.SequenceExpression);
              yield s.enter(Tag.expressions, Tag.Array);
            }
          }
          if (j.type === Tag.MemberExpression) {
            left = [s.take()];
            for (let x = 0; x < 2; ++x) {
              const start = s.cur();
              if (Block.isEffFree(start)) {
                left.push(..._normalizeAssign(s.one()));
                continue;
              }
              if (!seq) {
                seq = true;
                pos = Tag.push;
                yield s.enter(i.pos, Tag.SequenceExpression);
                yield s.enter(Tag.expressions, Tag.Array);
              }
              yield* startSeq();
              let sym = tmps[x];
              if (!sym) {
                sym = Bind.tempVarSym(root);
                sym.singleAssign = true;
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, { sym });
                yield* Kit.reposOne(_normalizeAssign(s.one()), Tag.right);
                yield* s.leave();
                left.push(s.tok(start.pos, Tag.Identifier, { sym }));
              }
            }
            left.push(s.close(j));
          } else if (j.type === Tag.Identifier) {
            left = [...s.one()];
          } else if (
            j.type === Tag.ObjectPattern ||
            j.type === Tag.ArrayPattern
          ) {
            throw s.error(
              'destructuring isn\'t supported yet, apply "@babel/plugin-transform-destructuring"'
            );
          } else {
            Kit.skip(lab());
            break;
          }
          const right = upd
            ? [s.tok(Tag.right, Tag.NumericLiteral, { node: { value: 1 } })]
            : [..._normalizeAssign(s.one())];
          let leftArg = [...Kit.clone(left)];
          const leftTok = leftArg[0].value;
          leftTok.lhs = left[0].value.rhs = false;
          leftTok.rhs = true;
          if (retOld) {
            yield* startSeq();
            if (!updTmp) {
              updTmp = Bind.tempVarSym(root);
              updTmp.singleAssign = true;
            }
            yield s.enter(pos, Tag.AssignmentExpression, {
              node: { operator: "=" }
            });
            yield s.tok(Tag.left, Tag.Identifier, { sym: updTmp });
            yield* Kit.reposOne(leftArg, Tag.right);
            yield* s.leave();
            leftArg = [s.tok(Tag.left, Tag.Identifier, { sym: updTmp })];
          }
          yield s.enter(pos, Tag.AssignmentExpression, {
            node: { operator: "=" }
          });
          yield* Kit.reposOne(left, Tag.left);
          yield s.enter(Tag.right, Tag.BinaryExpression, {
            node: { operator: bop }
          });
          yield* Kit.reposOne(leftArg, Tag.left);
          yield* right;
          yield* s.leave();
          yield* s.leave();
          if (retOld) yield s.tok(pos, Tag.Identifier, { sym: updTmp });
          yield* lab();
          s.close(i);
          continue;
      }
      yield i;
    }
  }
}
