import * as Kit from "./kit";
import { Tag, invariant } from "./kit";
import * as State from "./state";
import * as Bind from "./bind";

const emptyArr = [];

/** moves frame steps to top level of JS module */
export function depsToTop(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const top = [];
  if (!root.hasTop) return s;
  let t = _depsToTop();
  if (s.opts.topLevel) t = _topModuleVars(t);
  return t;
  function* _depsToTop() {
    yield* s.till(i => i.pos === Tag.body && i.type === Tag.Array);
    while (s.cur().type === Tag.ImportDeclaration) yield* s.one();
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
  /** for module-level definitions we need to re-arrange its
   * declarations so they are visible from handlers
   */
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
          case Tag.ExportNamedDeclaration:
          case Tag.ExportDefaultDeclaration:
          case Tag.ExportAllDeclaration:
          case Tag.ImportDeclaration:
          case Tag.FunctionDeclaration:
          case Tag.ClassDeclaration:
          case Tag.VariableDeclaration:
          case Tag.ExpressionStatement:
            yield* s.copy(i);
            break;
          default:
            yield i;
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

/** moves function constructors to meta constructors */
export function closConv(si) {
  const s = Kit.auto(si);
  const { opts } = s.first.value;
  if (!opts.closConv) return s;
  if (!opts.topLevel) throw s.error("`closConv` requires `topLevel`");
  if (!opts.injectFuncMeta)
    throw s.error("`closConv` requires `injectFuncMeta`");
  if (opts.wrapFunction)
    throw s.error("`closConv` doesn't work with `wrapFunction`");
  return Kit.toArray(_closConv());
  function* _closConv() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.FunctionExpression:
            if (!i.value.metaId) break;
            const lab = s.label();
            i.value.metaArgs.push(
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
              i.value.metaArgs.push(
                s.tok(Tag.push, Tag.Identifier, {
                  sym: i.value.implFrame.value.declSym
                })
              );
            yield s.enter(i.pos, Tag.CallExpression);
            yield s.tok(Tag.callee, Tag.Identifier, { sym: i.value.metaId });
            yield s.enter(Tag.arguments, Tag.Array);
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
    saved.set(contextSym, {
      raw: null,
      init: constr
        ? [
            s.enter(Tag.init, Tag.CallExpression),
            s.tok(Tag.callee, Tag.Identifier, { sym: constrSym, ns: false }),
            s.enter(Tag.arguments, Tag.Array),
            ...(root.wrapId
              ? [
                  s.tok(Tag.push, Tag.Identifier, {
                    sym: root.wrapId,
                    keepClos: true
                  })
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
    yield s.enter(pos, Tag.MemberExpression, { origSym: sym });
    if (ctxDeps && sym.declScope !== root) {
      const info = ctxDeps.get(sym.declScope);
      invariant(info);
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
    } else {
      yield* emitSubField(sym.subField || varsSubField);
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
  if (!s.opts.topIIFE) return s;
  const module = s.first.value;
  const exportsSym = Kit.sysId("exports");
  module.hasEsImports = false;
  return _topToIIFE();
  function* _topToIIFE() {
    for (const i of s) {
      yield i;
      if (i.pos === Tag.body) break;
    }
    const lab = s.label();
    yield* s.template(Tag.push, `module.exports = $I($E)`, exportsSym);
    yield s.enter(Tag.push, Tag.FunctionExpression, {
      opts: module.opts,
      func: true,
      transform: module.transform,
      topEff: module.topEff,
      node: { loc: module.node.loc }
    });
    module.transform = false;
    module.topEff = false;
    yield s.enter(Tag.params, Tag.Array);
    yield s.tok(Tag.push, Tag.Identifier, { node: { name: "module" } });
    yield s.tok(Tag.push, Tag.Identifier, { node: { name: "exports" } });
    yield* s.leave();
    yield s.enter(Tag.body, Tag.BlockStatement, {
      node: { loc: module.node.loc }
    });
    yield s.enter(Tag.body, Tag.Array);
    yield* s.sub();
    yield* lab();
    yield* s;
  }
}
