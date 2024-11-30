import * as Kit from "./kit";
import { Tag, symbol, invariant } from "@effectful/transducers";
import * as Block from "./block";
import * as Bind from "./bind";
import * as Loop from "./loops";
import * as Ctrl from "./control";

const emptyArr = [];
const emptySet = new Set();

/**
 * moves all variable declarations in decls field of a root Val
 *
 *      type Val = Val & { savedDecls?: Map<Sym,{raw?:Token[],init?:Token[]}> }
 */
export const saveDecls = Kit.pipe(
  function* saveDecls(s) {
    const sl = Kit.auto(s);
    const top = sl.peel();
    const root = top.value;
    const decls = top.value.savedDecls || (top.value.savedDecls = new Map());
    const { closConv } = root.opts;
    if (closConv) {
      root.closSavedDecls = new Map();
      root.closureArgSym = Kit.scope.newSym("x");
    }
    function* _saveDecls(pureTry) {
      for (const i of sl.sub()) {
        if (i.enter) {
          switch (i.type) {
            case Tag.ClassDeclaration:
              const id = sl.cur().value.sym;
              if (!decls.has(id)) decls.set(id, { raw: null });
              yield sl.enter(i.pos, Tag.ExpressionStatement);
              yield sl.enter(Tag.expression, Tag.AssignmentExpression, {
                node: { operator: "=" }
              });
              yield sl.tok(Tag.left, Tag.Identifier, { sym: id });
              yield* sl.copy(
                Kit.setType(Kit.setPos(i, Tag.right), Tag.ClassExpression)
              );
              yield* sl.leave();
              yield* sl.leave();
              continue;
            case Tag.FunctionDeclaration:
              const old = decls.get(i.value.funcId);
              const init = [
                ...sl.copy(
                  Kit.setType(Kit.setPos(i, Tag.init), Tag.FunctionExpression)
                )
              ];
              if (old)
                old.init = old.init
                  ? [
                      sl.enter(Tag.init, Tag.SequenceExpression),
                      sl.enter(Tag.expressions, Tag.Array),
                      ...Kit.reposOneArr(old.init, Tag.push),
                      ...Kit.reposOneArr(init, Tag.push),
                      ...sl.leave(),
                      ...sl.leave()
                    ]
                  : init;
              else
                decls.set(i.value.funcId, {
                  raw: null,
                  init
                });
              if (i.value.wrapId) i.value.funcId = i.value.wrapId;
              continue;
            case Tag.TryStatement:
              if (!i.value.eff) {
                yield i;
                yield* _saveDecls(true);
                continue;
              }
              break;
            case Tag.CatchClause:
              if (sl.cur().pos === Tag.param) {
                if (pureTry) {
                  yield i;
                  for (const k of sl.one()) {
                    yield k;
                    if (
                      k.enter &&
                      k.type === Tag.Identifier &&
                      k.value.sym &&
                      k.value.decl
                    ) {
                      k.value.sym.interpr = null;
                    }
                  }
                } else {
                  const ids = [];
                  for (const j of sl.one()) {
                    if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                      const { sym } = j.value;
                      if (!decls.has(sym)) decls.set(sym, { raw: null });
                      j.value.lhs = true;
                      j.value.rhs = false;
                      j.value.decl = false;
                    }
                    ids.push(j);
                  }
                  const sym = Bind.tempVarSym(top.value, "ex");
                  const lab = sl.label();
                  yield sl.peel(i);
                  yield sl.tok(Tag.param, Tag.Identifier, { sym });
                  yield sl.peel();
                  yield* sl.peelTo(Tag.body);
                  const blab = sl.label();
                  yield sl.enter(Tag.push, Tag.ExpressionStatement);
                  yield sl.enter(Tag.expression, Tag.AssignmentExpression, {
                    node: { operator: "=" }
                  });
                  yield* Kit.reposOne(ids, Tag.left);
                  yield sl.tok(Tag.right, Tag.Identifier, {
                    sym,
                    lhs: false,
                    rhs: true,
                    decl: false
                  });
                  yield* blab();
                  yield* _saveDecls();
                  yield* lab();
                }
                continue;
              }
              break;
            case Tag.VariableDeclaration:
              const kind = i.value.node.kind;
              i.value.node.kind = "var";
              const declarators = [];
              const stmt = i.pos !== Tag.init && i.pos !== Tag.left;
              sl.peel(i);
              sl.peel();
              for (const j of sl.sub()) {
                invariant(j.enter);
                invariant(j.type === Tag.VariableDeclarator);
                let hasInit = false;
                const asgn = [];
                const id = [...sl.one()];
                asgn.push(...id);
                for (const j of id) {
                  if (j.enter && j.type === Tag.Identifier && j.value.decl) {
                    const sym = j.value.sym;
                    if (!sym.noDecl && !decls.has(sym)) {
                      decls.set(sym, { raw: null, node: j.value.node });
                    }
                    j.value.decl = false;
                  }
                }
                if (sl.cur().pos === Tag.init) {
                  asgn.push(...Kit.reposOne(sl.one(), Tag.right));
                  hasInit = true;
                } else if (kind === "let" && i.pos !== Tag.left) {
                  asgn.push(
                    sl.tok(Tag.right, Tag.Identifier, {
                      sym: Kit.scope.undefinedSym
                    })
                  );
                  hasInit = true;
                }
                if (hasInit) {
                  id[0].pos = id[id.length - 1].pos = Tag.left;
                  declarators.push(asgn);
                } else {
                  if (i.pos === Tag.left) {
                    id[0].pos = id[id.length - 1].pos = i.pos;
                    yield* id;
                  } else yield sl.tok(i.pos, Tag.Null);
                }
                sl.close(j);
              }
              if (declarators.length) {
                if (stmt && i.pos === Tag.push) {
                  for (const k of declarators) {
                    yield sl.enter(Tag.push, Tag.ExpressionStatement);
                    yield sl.enter(Tag.expression, Tag.AssignmentExpression, {
                      node: { operator: "=" }
                    });
                    yield* k;
                    yield* sl.leave();
                    yield* sl.leave();
                  }
                } else {
                  const lab = sl.label();
                  if (stmt) yield sl.enter(i.pos, Tag.ExpressionStatement);
                  let pos = stmt ? Tag.expression : i.pos;
                  if (declarators.length !== 1) {
                    yield sl.enter(pos, Tag.SequenceExpression);
                    yield sl.enter(Tag.expressions, Tag.Array);
                    pos = Tag.push;
                  }
                  for (const k of declarators) {
                    yield sl.enter(pos, Tag.AssignmentExpression, {
                      node: { operator: "=" }
                    });
                    yield* k;
                    yield* sl.leave();
                  }
                  yield* lab();
                }
              }
              Kit.skip(sl.leave());
              Kit.skip(sl.leave());
              continue;
          }
        }
        yield i;
      }
    }
    yield top;
    yield* _saveDecls();
    yield* sl.leave();
  },
  Kit.removeNulls,
  handleSpecVars,
  Array.from
);

/** restores declaration removed `saveDecls` in the beginning of root's body */
export function restoreDecls(s) {
  let sl = Kit.auto(s);
  if (sl.first.type === Tag.ArrowFunctionExpression) {
    const loc = sl;
    sl = Kit.auto(
      Kit.toArray(
        (function* () {
          let i;
          for (i of loc) {
            if (i.pos === Tag.body) break;
            yield i;
          }
          if (i.type !== Tag.BlockStatement) {
            const lab = loc.label();
            yield loc.enter(Tag.body, Tag.BlockStatement, {
              decls: i.value.decls
            });
            yield loc.enter(Tag.body, Tag.Array);
            yield loc.enter(Tag.push, Tag.ReturnStatement);
            yield loc.peel(Kit.setPos(i, Tag.argument));
            yield* loc.sub();
            yield* lab();
          } else yield i;
          yield* loc;
        })()
      )
    );
  }
  const root = sl.first.value;
  const { ctxDeps, savedDecls: saved } = root;
  let closures = saved;
  const noOpts = sl.opts.optimizations === false;
  let closArg;
  const { closConv } = root.opts;
  if (closConv) {
    closures = root.closSavedDecls;
    closArg = root.closureArgSym;
  }
  if (ctxDeps && ctxDeps.size && root.opts.closureShortcuts !== false) {
    for (const [scope, { copy, fld, ctx }] of ctxDeps) {
      const init = [];
      const varField = scope.opts.varStorageField;
      const closField = scope.opts.closureStorageField;
      if (fld) {
        if (fld.interpr === Bind.ctxField) {
          init.push(sl.enter(Tag.init, Tag.MemberExpression));
          if (fld.subField) {
            init.push(
              sl.enter(Tag.object, Tag.MemberExpression),
              sl.tok(Tag.object, Tag.Identifier, { sym: ctx }),
              sl.tok(Tag.property, Tag.Identifier, {
                node: { name: fld.subField }
              }),
              ...sl.leave()
            );
          } else init.push(sl.tok(Tag.object, Tag.Identifier, { sym: ctx }));
          init.push(
            sl.tok(Tag.property, Tag.Identifier, {
              node: { name: fld.fieldName }
            }),
            ...sl.leave()
          );
        } else init.push(sl.tok(Tag.init, Tag.Identifier, { sym: fld }));
      } else {
        const pos = varField ? Tag.object : Tag.init;
        init.push(sl.tok(pos, Tag.Identifier, { sym: ctx }));
        if (varField) {
          init.unshift(sl.enter(Tag.init, Tag.MemberExpression));
          init.push(
            sl.tok(Tag.property, Tag.Identifier, { node: { name: varField } }),
            ...sl.leave()
          );
        }
      }
      if (closConv && !closField) {
        saved.set(copy, {
          raw: null,
          init: [
            sl.enter(Tag.init, Tag.MemberExpression),
            sl.tok(Tag.object, Tag.Identifier, { sym: closArg }),
            sl.tok(Tag.property, Tag.Identifier, {
              node: { name: copy.fieldName || copy.orig }
            }),
            ...sl.leave()
          ]
        });
      }
      closures.set(copy, { raw: null, init });
    }
  }
  return _restoreDecls(sl);
  function* _restoreDecls(sw) {
    for (const i of sw) {
      yield i;
      if (i.enter) {
        if (
          ((i.value.savedDecls != null && i.value.savedDecls.size) ||
            (i.value.paramSyms && i.value.paramSyms.length)) &&
          !i.leave &&
          sl.curLev()
        ) {
          for (const j of sl.sub()) {
            yield j;
            if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
              const assigns = [];
              const decls = [];
              const { funcId } = i.value;
              if (funcId) {
                const copy = root.funcAlias;
                if (
                  funcId.interpr === Bind.ctxField &&
                  funcId.declScope === i.value &&
                  ((noOpts && funcId.bound) || funcId.hasReads)
                ) {
                  assigns.push({
                    sym: funcId,
                    init: [
                      sl.tok(Tag.right, Tag.Identifier, {
                        sym: copy,
                        lhs: false,
                        rhs: true,
                        decl: false
                      })
                    ]
                  });
                }
                // this makes more likely for the function to have same name
              } else if (i.value.origType !== Block.frame) {
                i.value.funcAlias = Kit.scope.newSym();
              }
              decls.push(
                ...[...i.value.savedDecls].sort((a, b) => a[0].num - b[0].num)
              );
              const vars = [];
              const raw = [];
              if (i.value.paramSyms) {
                for (const sym of i.value.paramSyms) {
                  if (sym.interpr === Bind.ctxField) {
                    const copy = (sym.decl.value.sym = Kit.scope.newSym(
                      sym.orig
                    ));
                    copy.copyOf = sym;
                    sym.localCopy = copy;
                    copy.type = sym.type;
                    assigns.push({
                      sym,
                      init: [
                        sl.tok(Tag.right, Tag.Identifier, {
                          sym: copy,
                          lhs: false,
                          rhs: true,
                          decl: false
                        })
                      ]
                    });
                  }
                }
              }
              for (const [k, v] of decls) {
                if (k.removed) continue;
                if (v.raw) raw.push(v);
                else {
                  v.sym = k;
                  if (k.interpr === Bind.ctxField || k.param) {
                    if (v.init) {
                      assigns.push({
                        sym: k,
                        init: Kit.reposOneArr(v.init, Tag.right)
                      });
                    }
                  } else vars.push(v);
                }
              }
              if (vars.length) {
                const lab = sl.label();
                yield sl.enter(Tag.push, Tag.VariableDeclaration, {
                  node: { kind: "var" }
                });
                yield sl.enter(Tag.declarations, Tag.Array);
                for (const { sym, init } of vars) {
                  if (sym.substSym) continue;
                  yield sl.enter(Tag.push, Tag.VariableDeclarator);
                  yield sl.tok(Tag.id, Tag.Identifier, { sym, decl: true });
                  if (init) yield* init;
                  yield* sl.leave();
                }
                yield* lab();
              }

              for (const j of decls) if (j[1].raw != null) yield* j[1].raw;
              if (assigns.length) {
                for (const { sym, init } of assigns) {
                  yield sl.enter(Tag.push, Tag.ExpressionStatement);
                  yield sl.enter(Tag.expression, Tag.AssignmentExpression, {
                    node: { operator: "=" }
                  });
                  yield sl.tok(Tag.left, Tag.Identifier, {
                    sym,
                    lhs: true,
                    rhs: false,
                    decl: false
                  });
                  yield* init;
                  yield* sl.leave();
                  yield* sl.leave();
                }
              }
              // babel's hoist re-hack
              if (i.value.babelHoistReHack) {
                yield sl.enter(Tag.push, Tag.BlockStatement);
                yield sl.enter(Tag.body, Tag.Array);
                yield* _restoreDecls(sl.sub());
                yield* sl.leave();
                yield* sl.leave();
              }
              break;
            }
          }
        }
      }
    }
  }
}

/** calculates for each Identifier lhs/rhs fields */
function* calcRefKind(si) {
  for (const i of Kit.resetFieldInfo(si)) {
    yield i;
    if (i.enter) {
      const fi = i.value.fieldInfo;
      i.value.lhs = fi && fi.mod;
      i.value.rhs = fi && fi.expr;
    }
  }
}

/** identifier is passed threaded between effectful frames as their args */
export const byVal = symbol("state.byVal");
/** identifier is passed as field of an object */
export const byRef = symbol("state.byRef");

/** handles byVal, byRef directives */
function calcVarsHandling(si) {
  const s = Kit.auto(si);
  const top = s.first.value;
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case byVal:
          case byRef:
            for (const i of s.sub()) {
              if (i.enter) {
                if (i.type !== Tag.Identifier || i.value.sym)
                  throw s.error("expected list of declared identifiers");
                i.value.sym.byVal = i.type === byVal;
                i.value.sym.byValStrict = true;
              }
            }
            s.close(i);
            continue;
          case Tag.Identifier:
            const si = i.value.sym;
            if (si != null && si.decl) {
              const symRoot = si.declScope;
              si.global = !symRoot || symRoot === top;
              si.track = !!s.track;
              if (si.byVal == null) si.byVal = !si.global && s.opts.state;
              si.singleAssign = undefined;
            }
        }
      }
      yield i;
    }
  }
  return walk();
}

/**
 * for each variable sets its usages scope (list of functions where the
 * variable is used except declaration function)
 *
 *     type Sym = Sym &
 *       { funcRef?: FuncValue -- function the symbol references
 *         singleAssign: boolean,
 *         -- function where the var is read or modified(except where declared)
 *         refScopes: FuncValue[],
 *         interpr: enum { ctxField, closureVar, paramThread
 *                         undefined -- simple local variable
 *                         .... } -- anything else specified in other passes
 *               }
 *     type ScopeVal = ScopeVal & {
 *         scopeDecls: Set<Sym>, -- symbols declared in this scope
 *         -- captured by the scope but declared in some upper scope
 *         scopeCapt: Set<Sym>,
 *         -- scope objects (closure captured) to be used in this function
 *         ctxDeps: Map<ScopeVal,{copy?:Sym,src?:ScopeVal,distance:number}>
 *         }
 *     type IdValue = IdValue & { localFuncRef?: FuncValue }
 *     type LoopValue = LoopValue & { captureRefs: Set<Sym> }
 */
export function calcRefScopes(si) {
  let sa = Kit.toArray(calcVarsHandling(calcRefKind(si)));
  let s = Kit.auto(sa);
  let funcs = [];
  const top = s.first.value;
  top.global = true;
  let allDecls = [];
  let supers = new Set();
  function collectScopes(root) {
    const decls = (root.scopeDecls = new Set(root.paramSyms));
    root.contextSym = Kit.scope.newSym(
      s.opts.contextSymName || (root.funcId && root.funcId.name) || "ctx"
    );
    const ctxState = root.opts.contextState;
    root.contextSym.bound =
      s.opts.scopeContext ||
      (s.opts.topLevel && !s.opts.state) ||
      ctxState ||
      false;
    const capt = (root.scopeCapt = new Set());
    if (root.savedDecls) {
      for (const i of root.savedDecls.keys()) decls.add(i);
    } else root.savedDecls = new Map();
    funcs.push(root);
    root.track = false;
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.Super:
            supers.add(root);
            break;
          case Tag.FunctionDeclaration:
          case Tag.ArrowFunctionExpression:
          case Tag.FunctionExpression:
          case Tag.ObjectMethod:
          case Tag.ClassMethod:
            i.value.parentScope = root;
            collectScopes(i.value);
            break;
          case Tag.Identifier:
            const si = i.value.sym;
            if (si != null) {
              const { lhs } = i.value;
              const symRoot = si.declScope;
              if (!symRoot) break;
              if (i.value.decl) {
                symRoot.scopeDecls.add(si);
                allDecls.push(i.value);
                si.singleAssign = si.singleAssign == null ? lhs : false;
              } else {
                i.value.ext = false;
                if (lhs) si.singleAssign = false;
                const decl = si.declScope;
                if (decl !== root) {
                  (si.refScopes || (si.refScopes = new Set())).add(root);
                  capt.add(si);
                  // copy all vars into intermediate topLevels
                  for (
                    let j = root.parentScope;
                    j && j !== decl;
                    j = j.parentScope
                  ) {
                    if (j.opts.transform && j.opts.topLevel) {
                      j.scopeCapt.add(si);
                      si.refScopes.add(j);
                    }
                  }
                  i.value.ext = true;
                }
              }
            }
        }
      }
    }
  }
  collectScopes(s.first.value);
  // propagating function needs transformation flag
  for (const i of funcs) {
    if (i.opts.transform && i.topEff) {
      for (const j of i.scopeDecls) {
        j.track = true;
        if (j.refScopes) {
          for (const k of j.refScopes) {
            k.track = true;
          }
        }
      }
      for (const j of i.scopeCapt) {
        j.track = true;
        j.declScope.track = true;
        for (const k of j.refScopes) k.track = true;
      }
      i.track = true;
    } else if (i.opts.blockScoping) {
      for (const j of i.scopeCapt) j.track = true;
    }
  }
  // if loop's scope variable is captured somewhere else,
  // the whole loop is translated to a function, so they
  // start capturing other variables
  const loops = new Set();
  // collects loops for block scoping
  for (const i of allDecls) {
    const si = i.sym;
    if (si.singleAssign && !si.byValStrict) si.byVal = false;
    if (si.refScopes && (si.track || si.declScope.track) && si.captLoop) {
      loops.add(si.captLoop);
      si.captLoop.track = true;
      si.track = true;
    }
  }
  if (loops.size && s.opts.loopBlockScoping) {
    for (const i of allDecls) {
      i.sym.refScopes = null;
      i.sym.singleAssign = null;
    }
    funcs = [];
    sa = Kit.toArray(Kit.scope.reset(Loop.blockScoping(sa)));
    s = Kit.auto(sa);
    allDecls = [];
    collectScopes(s.first.value);
  }
  for (const i of funcs) {
    const opts = i.opts || top.opts;
    if (opts.topLevel && !i.global && !opts.contextState)
      throw s.error("`topLevel:true` requires `contextState:true`", i);
    if (opts.topLevel && !i.global && opts.contextBy === "reference")
      throw s.error(
        "`topLevel:true` isn't compatible with `contextBy:'reference'`",
        i
      );
    if (opts.contextState && !i.ctxDeps && !i.global) i.ctxDeps = new Map();
    if (!i.funcId) i.funcId = Kit.scope.newSym("f");
    if (i.captureParent == null) i.captureParent = false;
    if (i.captureInChildren == null) i.captureInChildren = true;
  }
  for (const i of allDecls) {
    const si = i.sym;
    si.closCapt = si.track && !!si.refScopes;
    if (si.closCapt) si.byVal = false;
    const decl = si.declScope;
    if (si.refScopes && si.track && !decl.global && !si.global) {
      for (const j of si.refScopes) {
        if (j.ctxDeps && decl !== j && !j.ctxDeps.has(decl)) {
          j.captureParent = true;
          if (j.opts.closureShortcuts === false) {
            for (
              let distance = 1, k = j.parentScope, f = j;
              k;
              k = k.parentScope, ++distance
            ) {
              if (k === decl) {
                f.ctxDeps.set(decl, { decl, distance });
                break;
              }
              k.captureParent = true;
            }
          } else {
            const fid = decl.funcId ? decl.funcId.name : "ctx";
            for (let k = j.parentScope, f = j; k; k = k.parentScope) {
              if (k === decl) {
                f.ctxDeps.set(decl, { decl, fid, ctx: decl.contextSym });
                break;
              }
              if (k.opts.transform && k.opts.topLevel) {
                f.ctxDeps.set(decl, { decl, fid, ctx: k.contextSym, ref: k });
                if (k.ctxDeps.has(decl)) break;
                f = k;
              }
            }
          }
        }
      }
    }
    Bind.setSymInterpr(si);
  }
  for (const i of supers) {
    const ctxDeps = i.ctxDeps;
    if (ctxDeps) {
      const p = i.parentScope;
      if (p && p.opts.transform && p.opts.topLevel && !ctxDeps.has(p)) {
        const fid = p.funcId ? p.funcId.name : "ctx";
        ctxDeps.set(p, { decl: p, fid, ctx: p.contextSym, distance: 1 });
      }
    }
  }
  for (const i of funcs) {
    if (i.ctxDeps && i.opts.closureShortcuts !== false) {
      for (const j of i.ctxDeps.values()) {
        j.copy = Bind.tempVarSym(i, j.fid);
        if (i.opts.closureStorageField)
          j.copy.subField = i.opts.closureStorageField;
        j.fld = j.ref && j.ref.ctxDeps.get(j.decl).copy;
      }
    }
  }
  return sa;
}

/**
 * lhs goes before rhs in the streams, this pass reorders them so value's
 * sources are always before the target in assignments,
 * also assigns `source` field of lhs to a first token of rhs
 * returns stream of identifier values only
 * for IIFE specifies adds `isLocal` field for the function
 */
export function reorderVarUsages(si) {
  const s = Kit.auto(si);
  function* walk(sw) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.CallExpression:
            if (s.opts.localCallOpt) {
              const callee = s.curLev();
              if (callee) {
                switch (callee.type) {
                  case Tag.FunctionExpression:
                  case Tag.ArrowFunctionExpression:
                    callee.value.isLocal = true;
                    callee.value.localFuncRef = callee.value;
                }
              }
            }
            break;
          case Tag.FunctionDeclaration:
            yield* s.one();
          case Tag.FunctionExpression:
            const j = s.curLev();
            if (j && j.pos === Tag.id) {
              j.value.source = i.value;
            }
            break;
          case Tag.AssignmentExpression:
          case Tag.VariableDeclarator:
            yield i;
            const first = [...s.one()];
            const l = s.curLev();
            if (l) first[0].value.source = l.value;
            yield* walk(s.one());
            yield* first;
            continue;
        }
      }
      yield i;
    }
  }
  return walk(s);
}

/**
 * calculates states reads and writes into
 *
 *  type FrameVal = FrameVal & {
 *     stateVars: {
 *       r: Set<Sym>, // vars read by the frame
 *       w: Set<Sym>, // written in the frame
 *       s: Set<Sym>  // variable is re-set in this (write without first read)
 *       }
 *
 */
export function calcFrameStateVars(si) {
  const sa = Kit.toArray(si);
  const root = sa[0].value;
  root.pureExitFrame.stateVars = { r: emptySet, w: emptySet, c: emptySet };
  const frames = root.cfg;
  if (!frames.length) return sa;
  for (const frame of frames)
    frame.stateVars = { r: new Set(), w: new Set(), s: new Set() };
  const functionSentOps = root.opts.functionSentOps || {};
  const first = frames[0].stateVars;
  for (const i of root.scopeDecls) {
    if (i.interpr && i.interpr !== Bind.closureVar) {
      const sd = root.savedDecls.get(i);
      if (sd) {
        if (!sd.raw && !(sd.init && sd.init.length)) root.savedDecls.delete(i);
      }
    }
  }
  if (root.paramSyms) {
    for (const i of root.paramSyms) {
      first.w.add(i);
      first.s.add(i);
    }
  }
  for (const [sym, { init }] of root.savedDecls) {
    if (init) {
      first.w.add(sym);
      first.s.add(sym);
    }
  }
  const functionSentSym = root.functionSentSym;
  for (const frame of frames) {
    const { w, r, s } = frame.stateVars;
    if (frame.patSym) {
      w.add(frame.patSym);
      s.add(frame.patSym);
    }
    if (frame.errSym) {
      w.add(frame.errSym);
      s.add(frame.errSym);
    }
    if (functionSentSym && frame.wfsent) {
      w.add(functionSentSym);
      s.add(functionSentSym);
    }
    for (const i of frame.steps) {
      const sW = (i.stepW = new Set());
      const sR = (i.stepR = new Set());
      const sS = (i.stepSet = new Set());
      const { content } = i;
      const sub = Kit.share(content);
      for (const j of sub) {
        if (j.enter) {
          switch (j.type) {
            /**
             * TODO: It is a very pessimistic version, number of variables
             * to copy and read can be greatly reduced by forming CFG like
             * for effectful frames, this requires converting the whole code
             * into CFG though
             * here trying to handle at least some simple cases
             */
            case Tag.AssignmentExpression:
              if (j.value.node.operator === "=") {
                const lhs = new Set();
                for (const k of Kit.single(sub)) {
                  if (k.enter) {
                    switch (k.type) {
                      case Tag.Identifier:
                        if (k.value.sym && k.value.sym.interpr) {
                          if (k.value.lhs) {
                            if (!sR.has(k.value.sym)) lhs.add(k.value.sym);
                            sW.add(k.value.sym);
                          } else {
                            if (!sS.has(k.value.sym)) sR.add(k.value.sym);
                          }
                        }
                        break;
                      case Block.bindPat:
                        if (!sS.has(k.value.sym)) sR.add(k.value.sym);
                    }
                  }
                }
                const subR = new Set();
                _inner(Kit.single(sub), sW, subR, sS, frame);
                for (const k of subR) {
                  sR.add(k);
                  lhs.delete(k);
                }
                lhs.forEach(sS.add, sS);
                break;
              }
              _inner(Kit.tillVal(j.value, sub), sW, sR, sS, frame);
              break;
            case Block.letStmt:
              if (!j.value.eff) {
                if (j.value.sym) {
                  if (!sR.has(j.value.sym)) sS.add(j.value.sym);
                  sW.add(j.value.sym);
                }
                break;
              }
            case Ctrl.jump:
              _jump(j.value, sW, sR, sS);
              break;
            case Tag.SequenceExpression:
            case Tag.Array:
            case Tag.ExpressionStatement:
              break;
            case Tag.BlockStatement:
              if (j.value.labs && j.value.labs.length) break;
            default:
              _inner(Kit.cons(j, Kit.tillVal(j.value, sub)), sW, sR, sS, frame);
          }
        }
      }
      sW.forEach(w.add, w);
      for (const j of sR) if (!s.has(j)) r.add(j);
      sS.forEach(s.add, s);
    }
    for (const j of Kit.concat(w, r)) {
      if (j.interpr === Bind.ctxField && j.declScope !== root) r.add(j);
    }
  }
  function _jump(v, w, r, s) {
    const { goto, frameArgs } = v;
    if (goto && goto.dynamicJump) {
      if (goto.declSym.interpr) r.add(goto.declSym);
      if (goto.catchContRedir && goto.catchContRedir.declSym.interpr)
        r.add(goto.catchContRedir.declSym);
      if (goto.resultContRedir && goto.resultContRedir.declSym.interpr)
        r.add(goto.resultContRedir.declSym);
    }
    if (frameArgs)
      for (const f of frameArgs.values()) {
        if (f.interpr && !s.has(f)) r.add(f);
      }
    if (functionSentSym && functionSentOps[v.bindName]) {
      // this frame can write function.sent
      for (const j of v.gotoDests) j.wfsent = true;
    }
  }
  function _inner(iter, sW, sR, sS, frame) {
    for (const i of iter) {
      if (i.enter) {
        switch (i.type) {
          case Tag.Identifier:
            if (i.value.sym && i.value.sym.interpr) {
              if (i.value.sym === functionSentSym) {
                if (frame.stateVars.w.has(functionSentSym)) {
                  // used in same frame, it may be simply replaced with bind var
                  i.value.sym =
                    frame.patSym ||
                    frame.commonPatSym ||
                    (frame.patSym = Kit.scope.newSym("p"));
                  i.value.sym.dummy = false;
                  i.value.sym.bound = true;
                }
              }
              if (i.value.lhs) sW.add(i.value.sym);
              if (i.value.rhs && !sS.has(i.value.sym)) sR.add(i.value.sym);
            }
            break;
          case Block.bindPat:
            if (!sS.has(i.value.sym)) sR.add(i.value.sym);
            break;
          case Block.letStmt:
            if (i.value.sym && i.value.sym.interpr) sW.add(i.value.sym);
            if (!i.value.eff) break;
          case Ctrl.jump:
            _jump(i.value, sW, sR, sS);
        }
      }
    }
  }
}

/** to be called in the beginning of the transformation */
export const prepare = calcRefScopes;

/**
 * calculates parameters for each frame definition
 */
function resolveFrameParams(cfg) {
  for (const i of cfg) {
    const locals = (i.frameLocals = new Set());
    const params = i.frameParams || (i.frameParams = new Set());
    const sw = i.stateVars;
    const exits = i.exits;
    const patSym = i.errSym || i.patSym;
    if (sw != null) {
      for (const i of sw.r) params.add(i);
      if (exits != null) {
        for (const j of sw.w) {
          if (j.track && j !== patSym && !sw.r.has(j) && !params.has(j))
            locals.add(j);
        }
      }
    }
  }
}

/** generates declarations for local vars */
function localsDecls(cfg) {
  for (const i of cfg) {
    const locals = i.frameLocals;
    if (locals) {
      const vars = [];
      if (i.first) {
        for (const j of locals) {
          if (!j.param) vars.push(j);
        }
      } else vars.push(...locals);
      if (vars.length) {
        const m = i.savedDecls || (i.savedDecls = new Map());
        for (const j of vars)
          if (!j.interpr || (j.interpr === Bind.paramThread && !m.has(j)))
            m.set(j, { raw: null });
      }
    }
  }
}

/**
 * propagates informations about variable required to be read to
 * all control flow ancestors chain (calculates `frameParamClos`)
 */
function propagateArgs(cfg) {
  // propagating writes in fact rarely needed, only if there are some
  // uninitialized variables
  function allReads(frame, seen) {
    if (frame.frameParamsClos != null) return frame.frameParamsClos;
    if (seen.has(frame)) return emptySet;
    seen = new Set(seen);
    seen.add(frame);
    const res = new Set(frame.frameParams);
    if (frame.exits != null) {
      for (const i of frame.exits) {
        const assigned = (i.frameArgs && [...i.frameArgs.keys()]) || emptyArr;
        for (const j of i.gotoDests) {
          const cur = new Set(allReads(j, seen));
          assigned.forEach(cur.delete, cur);
          cur.forEach(res.add, res);
        }
      }
      if (frame.catchContRedir)
        new Set(allReads(frame.catchContRedir, seen)).forEach(res.add, res);
    }
    const locals = frame.frameLocals;
    if (locals != null) locals.forEach(res.delete, res);
    if (frame.patSym) res.delete(frame.patSym);
    if (frame.errSym) res.delete(frame.errSym);
    return res;
  }
  // propagating transitive closure of each frame's parameter
  // each frame needs to receive all vars it needs,
  // plus all the frames which could be next in control flow
  for (const i of Kit.reverse(cfg)) i.frameParamsClos = allReads(i, new Set());
}

/**
 * makes all `syms` to have uniq name among them only
 * with prefix `pref` and postfix `postf`
 */
export function allUniqFields(syms, pref = "", postf = "") {
  const names = new Set();
  const epref = pref ? "" : "_";
  // TODO: group by field name
  for (const sym of syms) {
    let name = `${pref}${sym.orig}${postf}`;
    if (!name.length) name = "_";
    for (
      let cnt = 0;
      names.has(name);
      cnt++, name = `${pref}${sym.orig || epref}${cnt}${postf}`
    ) {}
    names.add(name);
    sym.fieldName = name;
  }
}

/** replaces this, arguments, self with special variables */
export function handleSpecVars(si) {
  const sa = Kit.toArray(si);
  // if not transform no needs to change anthing
  if (!sa[0].value.topEff) return sa;
  let usesThis = false,
    usesArgs = false;
  function collect() {
    const s = Kit.auto(sa);
    for (const i of s) {
      if (i.enter) {
        switch (i.type) {
          case Tag.Super:
            usesThis = true;
            break;
          case Tag.ThisExpression:
            usesThis = true;
            break;
          case Tag.Identifier:
            if (i.value.sym === Kit.scope.argumentsSym) usesArgs = true;
            break;
        }
      }
    }
  }
  const s = Kit.auto(sa);
  const root = s.first.value;
  const opts = s.opts;
  collect();
  root.usesThis = usesThis;
  const static_ = root.node && root.node.static;
  if (!usesThis && !usesArgs) return sa;
  let storeRoot = root;
  while (storeRoot && storeRoot.origType === Tag.ArrowFunctionExpression)
    storeRoot = storeRoot.parentScope;
  if (!storeRoot) return sa;
  const decls = storeRoot.savedDecls || (storeRoot.savedDecls = new Map());
  let thisSym;
  if (usesThis) {
    thisSym = storeRoot.thisSym;
    if (!thisSym) {
      thisSym = storeRoot.thisSym = Bind.tempVarSym(storeRoot, "_this");
      thisSym.singleAssign = true;
      decls.set(thisSym, {
        raw: null,
        init: [s.tok(Tag.init, Tag.ThisExpression)]
      });
      storeRoot.scopeDecls.add(thisSym);
    }
    if (storeRoot !== root) {
      thisSym.closCapt = true;
      (thisSym.refScopes || (thisSym.refScopes = new Set())).add(root);
      root.scopeCapt.add(thisSym);
    }
  }
  let argsSym;
  if (usesArgs) {
    argsSym = storeRoot.argsSym;
    if (!argsSym) {
      argsSym = storeRoot.argsSym = Bind.tempVarSym(storeRoot, "_args");
      decls.set(argsSym, {
        raw: null,
        init: storeRoot.opts.wrapArguments
          ? [
              ...s.toks(
                Tag.init,
                "$I($I)",
                Kit.sysId(storeRoot.opts.wrapArguments),
                Kit.scope.argumentsSym
              )
            ]
          : [s.tok(Tag.init, Tag.Identifier, { sym: Kit.scope.argumentsSym })]
      });
      storeRoot.scopeDecls.add(argsSym);
    }
    if (storeRoot !== root) {
      argsSym.closCapt = true;
      (argsSym.refScopes || (argsSym.refScopes = new Set())).add(root);
      root.scopeCapt.add(argsSym);
    }
  }
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ThisExpression:
            Kit.skip(s.copy(i));
            if (opts.thisField) {
              yield* s.toks(
                i.pos,
                `=$I.${opts.thisField}`,
                { pure: true },
                root.contextSym
              );
            } else {
              invariant(thisSym);
              yield s.tok(i.pos, Tag.Identifier, {
                sym: thisSym,
                lhs: false,
                rhs: true,
                decl: false
              });
            }
            continue;
          case Tag.CallExpression:
            if (s.cur().type !== Tag.MemberExpression) break;
            const m = s.take();
            if (s.cur().type !== Tag.Super) {
              yield i;
              yield m;
              continue;
            }
            yield i;
            yield s.enter(Tag.callee, Tag.MemberExpression);
            yield s.enter(Tag.object, Tag.MemberExpression, m.value);
            yield* walk();
            yield* s.leave();
            s.close(m);
            yield s.tok(Tag.property, Tag.Identifier, {
              node: { name: "call" }
            });
            yield* s.leave();
            yield* s.till(i => i.pos === Tag.arguments);
            yield s.tok(Tag.push, Tag.Identifier, {
              sym: thisSym,
              lhs: false,
              rhs: true,
              decl: false
            });
            continue;
          case Tag.Super:
            if (!root.ref) break;
            let classSym = root.ref.classId;
            if (!classSym) classSym = root.ref.classId = Kit.scope.newSym("C");
            yield* s.toks(
              i.pos,
              static_
                ? "=$1.getPrototypeOf($2.prototype)"
                : "=$1.getPrototypeOf($2.prototype)",
              Kit.scope.ObjectSym,
              classSym
            );
            s.close(i);
            continue;
          case Tag.Identifier:
            if (i.value.sym === Kit.scope.argumentsSym) {
              invariant(argsSym);
              Kit.skip(s.copy(i));
              yield s.tok(i.pos, Tag.Identifier, {
                sym: argsSym,
                lhs: false,
                rhs: true,
                decl: false
              });
              continue;
            }
        }
      }
      yield i;
    }
  }
  return walk();
}

/** if variable is used only in 1 frame no needs to store it in a context */
function prepareContextVars(root, cfg) {
  const ctxSyms = [];
  const resSym = root.resSym;
  const allOpts = root.opts.optimizations !== false;
  const opt = root.opts.optimizeContextVars !== false && allOpts;
  // TODO: check if eval is in scope
  if (allOpts) {
    const first = cfg[0];
    for (const i of root.ctxDeps.values()) if (i.copy) i.copy.hasReads = true;
    for (const i of cfg) {
      if (i === first) continue;
      const sw = i.stateVars;
      if (!sw) continue;
      for (const j of sw.r) {
        j.hasReads = true;
      }
    }
    for (const i of cfg) {
      if (i === first) continue;
      const sw = i.stateVars;
      if (!sw) continue;
      for (const j of sw.w) {
        if (j.hasReads || j === i.patSym || j === i.errSym || j === resSym)
          continue;
        (j.writeFrames || (j.writeFrames = new Set())).add(i);
      }
    }
    for (const i of root.scopeDecls) {
      if (opt && !i.closCapt && i.writeFrames) {
        i.interpr = null;
        i.fieldName = null;
        const decl = root.savedDecls.get(i);
        if (!decl || (decl.init && decl.raw)) root.savedDecls.delete(i);
        if (i.writeFrames)
          for (const f of i.writeFrames)
            (f.savedDecls || (f.savedDecls = new Map())).set(i, { raw: null });
      }
      if (i.interpr === Bind.ctxField && i.subField !== false) ctxSyms.push(i);
    }
  } else {
    for (const i of root.scopeDecls) {
      if (i.interpr === Bind.ctxField && i.subField !== false) ctxSyms.push(i);
    }
  }
  allUniqFields(ctxSyms, root.opts.closVarPrefix, root.opts.closVarPostfix);
}

export function calcFlatCfg(cfg, sa) {
  const root = sa[0].value;
  const opt = root.opts.optimizations;
  if (opt) calcFrameStateVars(sa);
  if (root.opts.contextState) prepareContextVars(root, cfg);
  if (opt) {
    resolveFrameParams(cfg);
    propagateArgs(cfg);
    localsDecls(cfg);
  }
}
