import * as Kit from "./kit";
import { Tag, invariant } from "./kit";
import * as State from "./state";
import * as Bind from "./bind";
import * as Block from "./block";

const emptyArr = [];

/** for module-level definitions we need to re-arrange its
 * declarations so they are visible from handlers
 */
export function flattenModuleDecls(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  if (!s.opts.topLevel || !root.hasTop) return s;
  const closConv = s.opts.closConv;
  return _topModuleVars(s);

  function* toExpr(i, j, vars) {
    const id = s.cur().value;
    vars.push(id);
    const lab = s.label();
    yield s.enter(i.pos, Tag.ExpressionStatement);
    yield s.enter(Tag.expression, Tag.AssignmentExpression, {
      node: { operator: "=" }
    });
    yield s.tok(Tag.left, Tag.Identifier, {
      sym: id.sym,
      node: id.node
    });
    yield s.peel(
      Kit.setType(
        Kit.setPos(j, Tag.right),
        j.type === Tag.ClassDeclaration
          ? Tag.ClassExpression
          : Tag.FunctionExpression
      )
    );
    yield* s.sub();
    yield* lab();
  }

  function* _topModuleVars(si) {
    const s = Kit.auto(si);
    for (const i of s) {
      yield i;
      if (i.pos === Tag.body) break;
    }
    const vars = [];
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ClassDeclaration:
          case Tag.FunctionDeclaration:
            if (closConv) {
              yield* toExpr(i, i, vars);
              break;
            }
          case Tag.ExportNamedDeclaration:
          case Tag.ExportDefaultDeclaration:
          case Tag.ExportAllDeclaration:
            if (closConv) {
              const la = s.cur();
              if (la.type === Tag.FunctionDeclaration) {
                yield i;
                const lab = s.label();
                yield s.enter(la.pos, Tag.VariableDeclaration, {
                  node: { kind: "var" }
                });
                yield s.enter(Tag.declarations, Tag.Array);
                yield s.enter(Tag.push, Tag.VariableDeclarator);
                const f = s.take();
                Kit.invariant(s.cur().pos === Tag.id);
                yield* s.one();
                yield s.enter(Tag.init, Tag.FunctionExpression, la.value);
                yield* s.sub();
                yield* lab();
                s.close(f);
                yield* s.sub();
                yield s.close(i);
                continue;
              }
            }
          case Tag.ImportDeclaration:
          case Tag.VariableDeclaration:
          case Tag.ExpressionStatement:
            yield* s.copy(i);
            break;
          default:
            yield i;
            if (i.leave) continue;
            for (const j of s.sub()) {
              if (j.enter) {
                switch (j.type) {
                  case Tag.ExpressionStatement:
                  case Tag.FunctionExpression:
                  case Tag.ClassExpression:
                  case Tag.ObjectExpression:
                  case Tag.ArrowFunctionExpression:
                    yield* s.copy(j);
                    continue;
                  case Tag.ClassDeclaration:
                  case Tag.FunctionDeclaration:
                    yield* toExpr(i, j, vars);
                    continue;
                  case Tag.VariableDeclaration:
                    let any = false;
                    const vlab = s.label();
                    for (const j of s.sub()) {
                      if (j.enter && j.type === Tag.VariableDeclarator) {
                        const pat = [];
                        for (const k of s.one()) {
                          if (
                            k.enter &&
                            k.type === Tag.Identifier &&
                            k.value.decl
                          ) {
                            vars.push(k.value);
                            pat.push(
                              s.tok(k.pos, Tag.Identifier, {
                                sym: k.value.sym,
                                node: k.value.node
                              })
                            );
                            s.close(k);
                          } else pat.push(k);
                        }
                        if (s.curLev()) {
                          if (!any) {
                            yield s.enter(i.pos, Tag.ExpressionStatement);
                            yield s.enter(
                              Tag.expression,
                              Tag.SequenceExpression
                            );
                            yield s.enter(Tag.expressions, Tag.Array);
                            any = true;
                          }
                          yield s.enter(Tag.push, Tag.AssignmentExpression, {
                            node: { operator: "=" }
                          });
                          yield* Kit.reposOne(pat, Tag.left);
                          yield* Kit.reposOne(s.one(), Tag.right);
                          yield* s.leave();
                        }
                      }
                    }
                    s.close(j);
                    yield* vlab();
                    continue;
                }
              }
              yield j;
            }
            yield s.close(i);
        }
      }
    }
    if (vars.length) {
      yield s.enter(Tag.push, Tag.VariableDeclaration, {
        node: { kind: "var" }
      });
      yield s.enter(Tag.declarations, Tag.Array);
      for (const i of vars) {
        yield s.enter(Tag.push, Tag.VariableDeclarator);
        yield s.tok(Tag.id, Tag.Identifier, { sym: i.sym, node: i.node });
        yield* s.leave();
      }
      yield* s.leave();
      yield* s.leave();
    }
    yield* s;
  }
}

/** moves frame steps to top level of JS module */
export function depsToTop(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const top = [];
  if (!root.hasTop) return s;
  return _depsToTop();
  function* _depsToTop() {
    for (const i of s) {
      yield i;
      if (i.pos === Tag.body && i.type === Tag.Array) break;
    }
    yield* Kit.skipTillFileBeg(s);
    yield* collect();
    for (const i of top) {
      yield* i;
    }
    yield* s;
  }
  function* collect() {
    for (const i of s.sub()) {
      if (i.enter && i.type === Tag.FunctionDeclaration && i.value.moveToTop) {
        top.push([i, ...collect(), s.close(i)]);
      } else yield i;
    }
  }
}

/** moves function constructors to meta constructors */
export function closConv(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const { opts } = root;
  if (!opts.closConv) return s;
  const { closureShortcuts } = opts;
  if (!opts.topLevel) throw s.error("`closConv` requires `topLevel`");
  if (opts.wrapFunction)
    throw s.error("`closConv` doesn't work with `wrapFunction`");
  return Kit.toArray(_closConv());
  function* _closConv() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ClassExpression:
          case Tag.ClassDeclaration:
            throw s.error("ES classes aren't yet supported with `closConv`");
          case Tag.ObjectMethod:
            throw s.error(
              "object methods aren't yet supported with `closConv`"
            );
          case Tag.ArrowFunctionExpression:
            throw s.error(
              "arrow functions aren't yet supported with `closConv`"
            );
          case Tag.FunctionExpression:
            if (!i.value.metaId) break;
            if (!i.value.opts.injectFuncMeta)
              throw s.error("`closConv` requires `injectFuncMeta`");
            const lab = s.label();
            const args = [];
            i.value.metaArgs[30] = args;
            args.push(
              s.enter(Tag.push, Tag.FunctionExpression),
              s.enter(Tag.params, Tag.Array),
              s.tok(Tag.push, Tag.Identifier, { sym: i.value.closureArgSym }),
              ...s.leave(),
              s.enter(Tag.body, Tag.BlockStatement),
              s.enter(Tag.body, Tag.Array),
              s.enter(Tag.push, Tag.ReturnStatement),
              s.peel(Kit.setPos(i, Tag.argument)),
              ..._closConv(),
              ...lab()
            );
            if (i.value.implFrame)
              args.push(
                s.tok(Tag.push, Tag.Identifier, {
                  sym: i.value.implFrame.value.declSym
                })
              );
            args.push(
              s.tok(Tag.push, Tag.Identifier, {
                sym: i.value.errMapSym || Kit.scope.undefinedSym
              })
            );
            args.push(
              s.tok(Tag.push, Tag.Identifier, {
                sym: i.value.resMapSym || Kit.scope.undefinedSym
              })
            );
            yield s.enter(i.pos, Tag.CallExpression);
            yield s.tok(Tag.callee, Tag.Identifier, { sym: i.value.metaId });
            yield s.enter(Tag.arguments, Tag.Array);
            if (closureShortcuts === false) {
              if (
                i.value.captureParent &&
                i.value.parScope &&
                i.value.parScope.captureInChildren !== false &&
                i.value.parScope.contextSym
              )
                yield s.tok(Tag.push, Tag.Identifier, {
                  sym: i.value.parScope.contextSym
                });
              else yield s.tok(Tag.push, Tag.NullLiteral);
            } else {
              if (i.value.closSavedDecls && i.value.closSavedDecls.size) {
                yield s.enter(Tag.push, Tag.ObjectExpression);
                yield s.enter(Tag.properties, Tag.Array);
                for (const [key, { init }] of i.value.closSavedDecls) {
                  yield s.enter(Tag.push, Tag.ObjectProperty);
                  yield s.tok(Tag.key, Tag.Identifier, {
                    node: { name: key.fieldName || key.orig }
                  });
                  yield* Kit.reposOne(init, Tag.value);
                  yield* s.leave();
                }
              }
            }
            yield* lab();
            continue;
        }
      }
      yield i;
    }
  }
}

/**
 * adds declarations and constructions for context objects
 */
export const contextDecls = Kit.map(function contextDecls(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const ctxSyms = [];
  const { topEff, contextSym } = root;
  const saved = root.savedDecls || (root.savedDecls = new Map());
  const decls = root.scopeDecls;
  for (const i of decls) if (i.interpr === Bind.ctxField) ctxSyms.push(i);
  // for not effectful function with captured
  if (
    ctxSyms.length ||
    (root.opts.transform &&
      (root.opts.scopeContext || root.opts.contextMethodOps))
  ) {
    contextSym.bound = true;
    State.allUniqFields(ctxSyms, s.opts.closVarPrefix, s.opts.closVarPostfix);
    // needs both because after loop block scoping pure functions may have
    // same options (TODO: unify them)
    const constr = topEff
      ? s.opts.scopeConstructor
      : s.opts.pureScopeConstructor;
    const constrSym = (root.constrSym = constr && Kit.sysId(constr));
    const wrapId = root.wrapId || root.closureArgSym;
    saved.set(contextSym, {
      raw: null,
      init: constr
        ? [
            s.enter(Tag.init, Tag.CallExpression),
            s.tok(Tag.callee, Tag.Identifier, { sym: constrSym, ns: false }),
            s.enter(Tag.arguments, Tag.Array),
            ...(wrapId
              ? [
                  s.tok(Tag.push, Tag.Identifier, {
                    sym: wrapId,
                    keepClos: true
                  })
                ]
              : emptyArr),
            ...(root.opts.passNewTarget
              ? [
                  s.tok(Tag.push, Tag.ThisExpression),
                  s.enter(Tag.push, Tag.MemberExpression),
                  s.tok(Tag.object, Tag.Identifier, { node: { name: "new" } }),
                  s.tok(Tag.property, Tag.Identifier, {
                    node: { name: "target" }
                  }),
                  ...s.leave()
                ]
              : emptyArr),
            ...s.leave(),
            ...s.leave()
          ]
        : [
            s.enter(Tag.init, Tag.ObjectExpression),
            s.enter(Tag.properties, Tag.Array),
            ...prop(s.opts.varStorageField),
            ...prop(
              s.opts.closureStorageField !== s.opts.varStorageField &&
                s.opts.closureStorageField
            ),
            ...s.leave(),
            ...s.leave()
          ]
    });
  }
  return s;

  function* prop(name) {
    if (name) {
      yield s.enter(Tag.push, Tag.ObjectProperty);
      yield s.tok(Tag.key, Tag.Identifier, { node: { name } });
      yield s.enter(Tag.value, Tag.ObjectExpression);
      yield s.tok(Tag.properties, Tag.Array);
      yield* s.leave();
      yield* s.leave();
    }
  }
});

/** converts context fields identifier to JS member expression */
export function substContextIds(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const { opts, contextSym, ctxDeps } = root;
  const { closureShortcuts } = opts;
  const varsSubField = opts.varStorageField;
  const closSubField = opts.closureStorageField || varsSubField;
  if (!contextSym) return s;
  return walk();
  function* emitSubField(subField) {
    if (subField && subField !== true) {
      yield s.enter(Tag.object, Tag.MemberExpression);
      yield s.tok(Tag.object, Tag.Identifier, {
        sym: contextSym,
        lhs: false,
        rhs: true,
        decl: false
      });
      yield s.tok(Tag.property, Tag.Identifier, {
        node: { name: subField }
      });
      yield* s.leave();
    } else {
      yield s.tok(Tag.object, Tag.Identifier, {
        sym: contextSym,
        lhs: false,
        rhs: true,
        decl: false
      });
    }
  }
  function* id(pos, sym) {
    invariant(sym.fieldName);
    const subField = sym.subField == null ? varsSubField : sym.subField;
    yield s.enter(pos, Tag.MemberExpression, { origSym: sym });
    if (ctxDeps && sym.declScope !== root) {
      const info = ctxDeps.get(sym.declScope);
      invariant(info);
      if (closureShortcuts === false) {
        if (!closSubField)
          throw s.error(
            `"closureShortcuts:false" requires "closureStorageField"`
          );
        const { distance } = info;
        invariant(distance > 0);
        if (subField) yield s.enter(Tag.object, Tag.MemberExpression);
        for (let i = 0; i < distance; i++)
          yield s.enter(Tag.object, Tag.MemberExpression);
        yield s.tok(Tag.object, Tag.Identifier, {
          sym: contextSym,
          lhs: false,
          rhs: true,
          decl: false
        });
        for (let i = 0; i < distance; i++) {
          yield s.tok(Tag.property, Tag.Identifier, {
            node: { name: closSubField }
          });
          yield* s.leave();
        }
        if (subField) {
          yield s.tok(Tag.property, Tag.Identifier, {
            node: { name: varsSubField }
          });
          yield* s.leave();
        }
      } else {
        const { copy } = info;
        if (copy.interpr === Bind.ctxField) {
          invariant(copy.fieldName);
          yield s.enter(Tag.object, Tag.MemberExpression, { origSym: copy });
          yield* emitSubField(copy.subField || closSubField);
          yield s.tok(Tag.property, Tag.Identifier, {
            node: { name: copy.fieldName }
          });
          yield* s.leave();
        } else {
          yield s.tok(Tag.object, Tag.Identifier, {
            sym: copy,
            lhs: false,
            rhs: true,
            decl: false
          });
        }
      }
    } else {
      yield* emitSubField(sym.subField == null ? varsSubField : sym.subField);
    }
    yield s.tok(Tag.property, Tag.Identifier, {
      node: { name: sym.fieldName }
    });
    yield* s.leave();
  }
  function* walk() {
    for (const i of s) {
      if (i.enter && i.type === Tag.Identifier) {
        const { sym } = i.value;
        if (
          !i.value.decl &&
          sym &&
          sym.interpr === Bind.ctxField &&
          !i.value.keepClos
        ) {
          yield* id(i.pos, sym);
          s.close(i);
          continue;
        }
      }
      yield i;
    }
  }
}

/** convert's a module's top level block into an export of IIFE */
export function topToIIFE(si) {
  const s = Kit.auto(si);
  const modSym = (s.first.value.modDescrSym = Kit.scope.newSym("$module"));
  if (!s.opts.topIIFE) return s;
  const module = s.first.value;
  const exportsSym = Kit.sysId("wrapExport");
  module.hasEsImports = false;
  return _topToIIFE();
  function* _topToIIFE() {
    let prog;
    for (const i of s) {
      yield i;
      if (i.type === Tag.Program) prog = i.value;
      if (i.pos === Tag.body) break;
    }
    yield* s.template(Tag.push, `module.exports = $I($E)`, exportsSym);
    const lab = s.label();
    yield s.enter(Tag.push, Tag.FunctionExpression, {
      opts: module.opts,
      func: true,
      transform: module.transform,
      topEff: module.topEff,
      node: { loc: prog.node.loc },
      babelHoistReHack: true
    });
    module.transform = false;
    module.topEff = false;
    yield s.enter(Tag.params, Tag.Array);
    yield s.tok(Tag.push, Tag.Identifier, { node: { name: "module" } });
    yield s.tok(Tag.push, Tag.Identifier, { node: { name: "exports" } });
    yield* s.leave();
    yield s.enter(Tag.body, Tag.BlockStatement, {
      node: { loc: prog.node.loc }
    });
    yield s.enter(Tag.body, Tag.Array);
    yield* s.sub();
    yield* lab();
    if (s.opts.injectModuleDescr)
      yield s.tok(Tag.push, Tag.Identifier, { sym: modSym });
    yield* s.leave();
    yield* s;
  }
}

/** interprets `callProtocol` */
export function convertCalls(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  if (!s.opts.callProtocol && !s.opts.newProtocol) return s;
  let tmpThis;
  return _convertCalls(s);

  function* _convertCalls(sw) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.NewExpression:
            const { newProtocol } = s.opts;
            if (!newProtocol) break;
            let newName = s.opts.newName || "construct";
            const npLab = s.label();
            if (newProtocol === "op") {
              const sym = Kit.sysId(newName);
              yield s.enter(i.pos, Block.op, { sym });
              yield* Kit.reposOne(_convertCalls(s.one()), Tag.push);
            } else if (newProtocol === "method") {
              yield s.enter(i.pos, Tag.CallExpression, i.value);
              yield s.enter(Tag.callee, Tag.MemberExpression);
              yield* Kit.reposOne(_convertCalls(s.one()), Tag.object);
              yield s.tok(Tag.property, Tag.Identifier, {
                node: { name: newName }
              });
              yield* s.leave();
              yield s.enter(Tag.arguments, Tag.Array);
            } else throw s.error(`not supported newProtocol:"${newProtocol}"`);
            const neArgs = s.take();
            yield s.enter(Tag.push, Tag.ArrayExpression);
            yield s.enter(Tag.elements, Tag.Array);
            yield* _convertCalls(s.sub());
            s.close(neArgs);
            s.close(i);
            yield* npLab();
            continue;
          case Tag.CallExpression:
            const protocol = s.opts.callProtocol;
            if (!protocol) break;
            const name = s.opts.callName || protocol;
            const la = s.cur();
            const lab = s.label();
            let sym;
            if (la.type === Tag.MemberExpression) {
              s.take();
              let obj = s.cur();
              let pos = i.pos;
              if (
                (obj.type === Tag.Identifier || obj.type === Block.bindPat) &&
                (sym = obj.value.sym)
              ) {
                Kit.skip(s.one());
                sym = obj.value.sym;
              } else {
                if (!tmpThis) tmpThis = Bind.tempVarSym(root);
                sym = tmpThis;
                yield s.enter(i.pos, Tag.SequenceExpression);
                yield s.enter(Tag.expressions, Tag.Array);
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, { sym });
                yield* Kit.reposOne(_convertCalls(s.one()), Tag.right);
                yield* s.leave();
                pos = Tag.push;
                obj = s.tok(Tag.object, Tag.Identifier, { sym });
              }
              yield s.enter(pos, i.type, i.value);
              yield s.enter(Tag.callee, Tag.MemberExpression, la);
              yield s.enter(Tag.object, Tag.MemberExpression);
              yield s.tok(Tag.object, obj.type, obj.value);
              yield* _convertCalls(s.one());
              yield* s.leave();
              s.close(la);
            } else {
              sym = Kit.scope.undefinedSym;
              yield s.enter(i.pos, i.type, i.value);
              yield s.enter(Tag.callee, Tag.MemberExpression);
              yield* Kit.reposOne(_convertCalls(s.one()), Tag.object);
            }
            yield s.tok(Tag.property, Tag.Identifier, { node: { name } });
            yield* s.leave();
            const args = s.take();
            yield s.enter(Tag.arguments, Tag.Array);
            yield s.tok(Tag.push, Tag.Identifier, { sym });
            if (protocol === "apply") {
              yield s.enter(Tag.push, Tag.ArrayExpression);
              yield s.enter(Tag.elements, Tag.Array);
            }
            yield* _convertCalls(s.sub());
            s.close(args);
            s.close(i);
            yield* lab();
            continue;
        }
      }
      yield i;
    }
  }
}
