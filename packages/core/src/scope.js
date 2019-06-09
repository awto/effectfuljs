import { Tag, invariant } from "./kit";
import * as Kit from "./kit";

/**
 * unfortunately ObjectMethod type in babylon AST doesn't fit the split
 * pattern, as next passes want the key to remain in parent scope
 * so this pass replaces them to `{Object|Class}Property` and `FunctionExpression`
 * on restore the value is converted back
 * back to {Object|Class}Property with `restoreMethods`
 */
function methodsHack(si) {
  const s = Kit.auto(si);
  function* _methodsHack(sw, cl) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ClassDeclaration:
          case Tag.ClassExpression:
            yield i;
            const j = s.cur();
            i.value.classId = j.pos === Tag.id && j.value.sym;
            yield* _methodsHack(s.sub(), i.value);
            continue;
          case Tag.ClassMethod:
          case Tag.ClassPrivateMethod:
            i.value.ref = cl;
          case Tag.ObjectMethod:
            if (i.value.node.kind === "method") {
              yield s.enter(
                i.pos,
                i.type === Tag.ObjectMethod
                  ? Tag.ObjectProperty
                  : Tag.ClassProperty,
                {
                  origType: i.type,
                  node: { computed: i.value.computed, static: i.value.static }
                }
              );
              const k = s.cur();
              yield* _methodsHack(s.one());
              yield s.enter(Tag.value, Tag.FunctionExpression, i.value);
              if (k.type === Tag.Identifier) {
                i.value.funcId = Kit.scope.newSym(k.value.node.name);
                i.value.origType = i.type;
                yield s.tok(Tag.id, Tag.Identifier, {
                  node: { name: k.value.node.name }
                });
              }
              yield* _methodsHack(s.sub());
              yield* s.leave();
              yield* s.leave();
              s.close(i);
              continue;
            }
        }
      }
      yield i;
    }
  }
  return _methodsHack(s);
}

/**
 * restorinng `{Object|Class}Method` from `{Object|Class}ObjectProperty`
 * saved before using `methodsHack`
 */
function restoreMethods(si) {
  const s = Kit.auto(si);
  function* _restoreMethods(sw) {
    for (const i of sw) {
      if (
        i.enter &&
        (i.type === Tag.ObjectProperty || i.type === Tag.ClassProperty) &&
        i.value.origType != null &&
        i.value.origType !== i.type
      ) {
        const key = Kit.toArray(_restoreMethods(s.one()));
        if (s.cur().type === Tag.FunctionExpression) {
          const f = s.take();
          if (s.cur().pos === Tag.id) Kit.skip(s.one());
          yield s.enter(i.pos, i.value.origType, f.value);
          yield* key;
          yield* _restoreMethods(s.sub());
          yield* s.leave();
          s.close(f);
          s.close(i);
          continue;
        }
        yield i;
        yield* key;
        continue;
      } else if (i.enter && !i.leave && i.type === Tag.ClassExpression) {
        yield i;
        if (i.value.classId && s.cur().pos !== Tag.id)
          yield s.tok(Tag.id, Tag.Identifier, { sym: i.value.classId });
      } else if (
        i.enter &&
        i.type === Tag.FunctionExpression &&
        i.value.origType === Tag.FunctionDeclaration
      ) {
        yield i;
        if (s.cur().pos === Tag.id) Kit.skip(s.one());
        yield s.tok(Tag.id, Tag.Identifier, {
          sym: Kit.scope.newSym(i.value.funcId.name),
          decl: true
        });
      } else yield i;
    }
  }
  return _restoreMethods(s);
}

/**
 * takes a stream of tokens and split it into an array of streams
 * with each element representing a function from the original stream
 */
export function splitScopes(si) {
  const s = Kit.auto(methodsHack(si));
  const module = s.first.value;
  const scopes = (module.scopes = []);
  const frames = [];
  frames.push([..._splitScopes(s.take())]);
  if (module.opts.metaParentClosure) {
    for (const i of scopes) {
      let sym = null;
      for (let j = i.parentScope; j && (sym = j.metaId); j = j.parentScope)
        break;
      i.metaArgs[20] = [
        sym
          ? s.tok(Tag.push, Tag.Identifier, { sym })
          : s.tok(Tag.push, Tag.NullLiteral)
      ];
    }
  }
  return frames;
  function* _splitScopes(p) {
    yield s.enter(Tag.top, p.type, p.value);
    for (const i of s.sub()) {
      if (i.enter && !i.leave && s.curLev() != null && i.value.func) {
        frames.push([..._splitScopes(i)]);
        // reversing to make closure parents go first
        scopes.unshift(i.value);
        i.value.parScope = p.value;
        i.value.module = module;
        if (!i.value.funcId) i.value.funcId = Kit.scope.newSym("fn");
        if (i.value.opts.wrapFunction)
          i.value.wrapId =
            i.type === Tag.FunctionExpression
              ? i.value.funcId
              : Kit.scope.newSym(i.value.funcId.orig);
        i.value.wrapArgs = [];
        if (i.value.opts.injectFuncMeta) {
          i.value.metaId = Kit.scope.newSym(`meta$${i.value.funcId.orig}`);
          i.value.metaArgs = {};
          i.value.wrapArgs.push(
            s.tok(Tag.push, Tag.Identifier, { sym: i.value.metaId })
          );
        }
        yield s.tok(i.pos, i.type, i.value);
        continue;
      }
      yield i;
    }
    yield* s.leave();
    s.close(p);
  }
}

export function injectMeta(si) {
  const s = Kit.auto(si);
  const module = s.first.value;
  if (!module.scopes.length) return s;
  return _injectMeta();
  function* _injectMeta() {
    for (const i of s) {
      yield i;
      if (i.pos === Tag.declarations) break;
    }
    yield* s.sub();
    const lab = s.label();
    if (module.memoVars && module.memoVars.size) {
      for (const [sym, init] of module.memoVars) {
        yield s.enter(Tag.push, Tag.VariableDeclarator);
        yield s.tok(Tag.id, Tag.Identifier, { sym });
        yield* init;
        yield* s.leave();
      }
    }
    for (const i of module.scopes) {
      const name = i.opts.injectFuncMeta;
      if (!name) continue;
      const sym = Kit.sysId(name);
      yield s.enter(Tag.push, Tag.VariableDeclarator);
      yield s.tok(Tag.id, Tag.Identifier, { sym: i.metaId });
      yield s.enter(Tag.init, Tag.CallExpression);
      yield s.tok(Tag.callee, Tag.Identifier, { sym });
      yield s.enter(Tag.arguments, Tag.Array);
      for (const j in i.metaArgs) yield* i.metaArgs[j];
      yield* lab();
    }
    yield* s;
  }
}

/**
 * converts list of token streams into a single stream with all scopes
 * unfolded in original positions
 */
export function restore(root, scopes) {
  let start;
  const m = new Map();
  for (const i of scopes) {
    const value = i[0].value;
    if (value === root) start = i;
    else m.set(value, i);
  }
  invariant(start);
  return restoreMethods(_restore(start, Tag.top));
  function* _restore(si, pos, type) {
    const s = Kit.toArray(si);
    const first = s[0];
    if (!type) type = first.type;
    yield Kit.enter(pos, type, first.value);
    invariant(s[0].pos === Tag.top);
    invariant(s[s.length - 1].pos === Tag.top);
    invariant(s[s.length - 1].value === s[0].value);
    for (const i of s.slice(1, s.length - 1)) {
      if (i.value.func) {
        const sub = m.get(i.value);
        if (sub != null) {
          if (i.enter) {
            yield* _restore(sub, i.pos, i.type);
          }
          continue;
        }
      }
      yield i;
    }
    yield Kit.leave(pos, type, first.value);
  }
}

/** runs `pass` for each function in `s` */
export const subScopes = Kit.curry(function(pass, s) {
  const res = [];
  for (const i of splitScopes(s)) res.push([...pass(i)]);
  return restore(res);
});

const emptyMap = new Map();

function injectModuleDescr(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  if (!(s.opts.injectFuncMeta || s.opts.injectModuleMeta) || !root.hasEff)
    return s;
  const sym = root.modDescrSym;
  const postfix = s.opts.evalCtx ? "" : ",module";
  const name =
    s.opts.injectModuleDescr && s.opts.injectModuleDescr.substr
      ? s.opts.injectModuleDescr
      : "module";
  return _injectModuleDescr();
  function* _injectModuleDescr() {
    for (const i of s) {
      yield i;
      if (i.enter && i.pos === Tag.body) break;
    }
    yield* s.template(
      Tag.push,
      `var $I = $I.${name}($E${postfix})`,
      { metaInfo: true },
      sym,
      root.$ns
    );
    let module = "*";
    const { file } = s.opts;
    if (file) {
      module = file.filename;
      if (s.opts.srcRoot) {
        const root =
          s.opts.srcRoot === true ? file.root || file.cwd : s.opts.srcRoot;
        if (module.startsWith(root)) module = module.substr(root.length);
      }
    }
    if (s.opts.moduleNamePrefix)
      module = `${s.opts.moduleNamePrefix}@${module}`;
    yield s.tok(Tag.push, Tag.StringLiteral, { node: { value: module } });
    yield* s.leave();
    for (const i of s) {
      if (i.enter && i.value.func && i.value.metaArgs)
        i.value.metaArgs[10] = [s.tok(Tag.push, Tag.Identifier, { sym })];
      yield i;
    }
  }
}

/**
 * if `wrapFunction` is set for a function expression or declaration
 * it will be wrapped with the call to runtime function with name
 * from the argument value
 */
export function funcWraps(si) {
  const s = Kit.auto(injectModuleDescr(si));
  const root = s.first.value;
  const ns = root.$ns;
  const mods = root.injectRT || emptyMap;
  const rootDefs = mods.get(ns);
  return hoist(_funcWraps(s));
  function sysId(name) {
    const sym = Kit.sysId(name);
    if (rootDefs) rootDefs.usages.add(sym);
    return sym;
  }
  function check(i) {
    if (i.value.topEff && i.value.opts.transform) {
      if (i.value.opts.wrapFunction) return true;
      if (i.value.opts.defunctHandlerInProto && !i.value.opts.closConv)
        throw s.error(
          "`defunctHandlerInProto` requires `wrapFunction` or `closConv`"
        );
    }
    return false;
  }
  function* implFrame(root) {
    if (root.wrapArgs) yield* root.wrapArgs;
    if (!root.opts.defunctHandlerInProto) return;
    if (!root.opts.defunct)
      throw s.error("`defunctHandlerInProto` requires `defunct`");
    const sym = root.implFrame && root.implFrame.value.declSym;
    if (!sym) return;
    if (root.opts.topLevel) yield s.tok(Tag.push, Tag.Identifier, { sym });
    else yield s.tok(Tag.push, Tag.Identifier, { sym: Kit.scope.undefinedSym });
    yield s.tok(Tag.push, Tag.Identifier, {
      sym: root.errMapSym || Kit.scope.undefinedSym
    });
    yield s.tok(Tag.push, Tag.Identifier, {
      sym: root.resMapSym || Kit.scope.undefinedSym
    });
  }
  function hoist(si) {
    const s = Kit.auto(Kit.toArray(si));
    let nsFound = !root.nsImported;
    return _hoist(s);
    function* _hoist(sw, subst) {
      for (const i of sw) {
        if (i.enter) {
          switch (i.type) {
            case Tag.ClassDeclaration:
            case Tag.ClassExpression:
              if (i.value.wraps.length) {
                const decl = i.type === Tag.ClassDeclaration;
                const lab = s.label();
                let pos = i.pos;
                let sym;
                let slab;
                if (decl) {
                  sym = s.cur().value.sym;
                  invariant(sym);
                  if (i.pos !== Tag.push) {
                    yield s.enter(i.pos, Tag.BlockStatement);
                    yield s.enter(Tag.body, Tag.Array);
                    pos = Tag.push;
                  }
                  slab = s.label();
                } else {
                  yield s.enter(pos, Tag.SequenceExpression);
                  yield s.enter(Tag.expressions, Tag.Array);
                  slab = s.label();
                }
                for (const j of i.value.wraps) {
                  if (!j.keySimple) {
                    const sym = j.key[0].value.substTempVar;
                    yield s.enter(Tag.push, Tag.AssignmentExpression, {
                      node: { operator: "=" }
                    });
                    yield s.tok(Tag.left, Tag.Identifier, { sym });
                    yield* Kit.reposOne(j.key, Tag.right);
                    yield* s.leave();
                    j.key = [s.tok(Tag.property, Tag.Identifier, { sym })];
                  }
                }
                if (!decl) {
                  sym = i.value.wrapsTempVar;
                  yield s.enter(Tag.push, Tag.AssignmentExpression, {
                    node: { operator: "=" }
                  });
                  yield s.tok(Tag.left, Tag.Identifier, { sym });
                  pos = Tag.right;
                }
                yield s.peel(Kit.setPos(i, pos));
                const nsubst = new Map();
                for (const j of i.value.wraps) {
                  nsubst.set(
                    j.wrapId,
                    (j.buf = [
                      ...(function*() {
                        yield s.enter(Tag.push, Tag.MemberExpression, {
                          node: { computed: j.computed }
                        });
                        if (j.static) {
                          yield s.tok(Tag.object, Tag.Identifier, { sym });
                        } else {
                          yield s.enter(Tag.object, Tag.MemberExpression);
                          yield s.tok(Tag.object, Tag.Identifier, { sym });
                          yield s.tok(Tag.property, Tag.Identifier, {
                            node: { name: "prototype" }
                          });
                          yield* s.leave();
                        }
                        yield* Kit.reposOne(j.key, Tag.property);
                        yield* s.leave();
                        if (j.params) yield* j.params;
                      })()
                    ])
                  );
                }
                yield* _hoist(s.sub(), nsubst);
                yield* slab();
                if (decl) {
                  yield s.enter(Tag.push, Tag.ExpressionStatement);
                  yield s.enter(Tag.expression, Tag.SequenceExpression);
                  yield s.enter(Tag.expressions, Tag.Array);
                }
                const elab = s.label();
                for (const { name, ns, buf } of i.value.wraps) {
                  yield s.enter(Tag.push, Tag.CallExpression);
                  yield s.tok(Tag.callee, Tag.Identifier, {
                    sym: sysId(name),
                    ns
                  });
                  yield s.enter(Tag.arguments, Tag.Array);
                  yield* buf;
                  yield* elab();
                }
                if (!decl) yield s.tok(Tag.push, Tag.Identifier, { sym });
                yield* lab();
                continue;
              }
              break;
            case Tag.ClassPrivateMethod:
            case Tag.ClassMethod:
            case Tag.ClassProperty:
            case Tag.ClassPrivateProperty:
              yield i;
              const ksym = s.cur().value.substTempVar;
              if (ksym) {
                yield s.tok(Tag.key, Tag.Identifier, { sym: ksym });
                Kit.skip(s.one());
              }
              continue;
            case Tag.Identifier:
              let substBuf;
              const { sym } = i.value;
              if (sym) {
                if (
                  subst &&
                  i.pos !== Tag.property &&
                  (substBuf = subst.get(i.value.sym))
                ) {
                  yield* Kit.clone(substBuf);
                } else {
                  yield* s.copy(i);
                }
                if (sym === ns && i.value.lhs) {
                  const j = s.cur();
                  if (!j || !j.leave || j.type !== Tag.VariableDeclarator)
                    nsFound = true;
                }
                continue;
              }
              break;
            case Tag.Program:
              if (i.value.wraps.length) {
                const lab = s.label();
                yield s.peel(i);
                yield* s.peelTo(Tag.body);

                while (s.curLev() && !nsFound) yield* _hoist(s.one(), subst);
                yield* Kit.skipTillFileBeg(s);
                yield* i.value.wraps;
                yield* _hoist(s.sub(), subst);
                yield* lab();
                continue;
              }
              break;
            case Tag.BlockStatement:
              if (i.value.wraps && i.value.wraps.length) {
                const lab = s.label();
                yield s.peel(i);
                yield* s.peelTo(Tag.body);
                yield* i.value.wraps;
                yield* _hoist(s.sub(), subst);
                yield* lab();
                continue;
              }
              break;
          }
        }
        yield i;
      }
    }
  }
  function* _funcWraps(sw, block, classKeys, classMethods) {
    function tempVar(name, sym = Kit.scope.newSym(name)) {
      const lab = s.label();
      block.push(
        s.enter(Tag.push, Tag.VariableDeclaration, { node: { kind: "var" } }),
        s.enter(Tag.declarations, Tag.Array),
        s.enter(Tag.push, Tag.VariableDeclarator),
        s.tok(Tag.id, Tag.Identifier, { sym, decl: true })
      );
      block.push(...lab());
      return sym;
    }
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Tag.Program:
          case Tag.BlockStatement:
            yield i;
            yield* _funcWraps(s.sub(), (i.value.wraps = []));
            continue;
          case Tag.ObjectMethod:
            if (check(i)) {
              const lab = s.label();
              yield s.peel(Kit.setType(i, Tag.ObjectProperty));
              yield* s.one();
              yield s.enter(Tag.value, Tag.CallExpression);
              yield s.tok(Tag.callee, Tag.Identifier, {
                ns: i.value.$ns,
                sym: sysId(i.value.opts.wrapFunction)
              });
              yield s.enter(Tag.arguments, Tag.Array);
              yield s.enter(Tag.push, Tag.FunctionExpression);
              yield s.tok(Tag.id, Tag.Identifier, { sym: i.value.wrapId });
              yield* _funcWraps(s.sub(), block);
              yield* s.leave();
              yield* implFrame(i.value);
              yield* lab();
              continue;
            }
            break;
          case Tag.ClassPrivateMethod:
          case Tag.ClassMethod:
          case Tag.ClassProperty:
          case Tag.ClassPrivateProperty:
            if (!check(i)) break;
            yield i;
            let key = Kit.toArray(_funcWraps(s.one(), block));
            yield* key;
            let keySimple = false;
            let computed = i.value.node.computed;
            switch (key[0].type) {
              case Tag.Identifier:
              case Tag.StringLiteral:
              case Tag.NumericLiteral:
              case Tag.BooleanLiteral:
                keySimple = true;
                break;
              case Tag.MemberExpression:
                keySimple =
                  key[1].type === Tag.Identifier &&
                  key[1].value.sym === Kit.scope.SymbolSym;
                break;
            }
            if (!keySimple) classKeys.push(key);
            yield* _funcWraps(s.sub(), block);
            if (check(i) && i.value.node.kind === "method")
              classMethods.push({
                key,
                keySimple,
                static: i.value.node.static,
                computed,
                name: i.value.opts.wrapFunction,
                wrapId: i.value.wrapId,
                ns: i.value.$ns,
                params: [...implFrame(i.value)]
              });
            continue;
          case Tag.ClassExpression:
          case Tag.ClassDeclaration:
            yield i;
            const keys = [];
            const wraps = (i.value.wraps = []);
            yield* _funcWraps(s.sub(), block, keys, wraps);
            if (!wraps.length) continue;
            if (wraps.some(i => !i.keySimple)) {
              for (const j of keys) j[0].value.substTempVar = tempVar();
            }
            if (i.value.wraps.length && i.type === Tag.ClassExpression) {
              i.value.wrapsTempVar = tempVar(
                i.value.node.id && i.value.node.id.name
              );
            }
            continue;
          case Tag.FunctionDeclaration:
            if (check(i) && i.value.funcId) {
              const lab = s.label();
              const wraps = [
                s.enter(Tag.push, Tag.VariableDeclaration, {
                  node: { kind: "var" }
                }),
                s.enter(Tag.declarations, Tag.Array),
                s.enter(Tag.push, Tag.VariableDeclarator),
                s.tok(Tag.id, Tag.Identifier, {
                  sym: i.value.wrapId,
                  decl: true
                }),
                s.enter(Tag.init, Tag.CallExpression),
                s.tok(Tag.callee, Tag.Identifier, {
                  ns: i.value.$ns,
                  sym: sysId(i.value.opts.wrapFunction)
                }),
                s.enter(Tag.arguments, Tag.Array),
                s.tok(Tag.push, Tag.Identifier, { sym: i.value.funcId }),
                ...implFrame(i.value),
                ...lab()
              ];
              if (i.pos === Tag.push || i.pos === Tag.declaration) {
                yield s.peel(i);
                yield* _funcWraps(s.sub());
                yield* s.leave();
                block.push(...wraps);
              } else {
                yield s.enter(i.pos, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
                yield* wraps;
                yield s.peel(i);
                yield* Kit.reposOne(_funcWraps(s.sub(), block), Tag.push);
                yield* s.leave();
              }
              yield* lab();
              continue;
            }
            break;
          case Tag.FunctionExpression:
            if (check(i)) {
              const lab = s.label();
              yield s.enter(i.pos, Tag.CallExpression);
              yield s.tok(Tag.callee, Tag.Identifier, {
                ns: i.value.$ns,
                sym: sysId(i.value.opts.wrapFunction)
              });
              yield s.enter(Tag.arguments, Tag.Array);
              yield s.peel(Kit.setPos(i, Tag.push));
              if (s.cur().pos !== Tag.id)
                yield s.tok(Tag.id, Tag.Identifier, { sym: i.value.wrapId });
              else s.cur().value.sym = i.value.wrapId;
              yield* _funcWraps(s.sub(), block);
              yield* s.leave();
              yield* implFrame(i.value);
              yield* lab();
              continue;
            }
            break;
          case Tag.ArrowFunctionExpression:
            if (check(i)) {
              const lab = s.label();
              tempVar(null, i.value.wrapId);
              yield s.enter(i.pos, Tag.AssignmentExpression, {
                node: { operator: "=" }
              });
              yield s.tok(Tag.left, Tag.Identifier, { sym: i.value.wrapId });
              yield s.enter(Tag.right, Tag.CallExpression);
              yield s.tok(Tag.callee, Tag.Identifier, {
                ns: i.value.$ns,
                sym: sysId(i.value.opts.wrapFunction)
              });
              yield s.enter(Tag.arguments, Tag.Array);
              yield s.peel(Kit.setPos(i, Tag.push));
              yield* _funcWraps(s.sub(), block);
              yield* s.leave();
              yield* implFrame(i.value);
              yield* lab();
              continue;
            }
            break;
        }
      }
      yield i;
    }
  }
}

/**
 * if arrow function has expression, converts it into block statement
 * with return to simplify next steps
 */
export function arrowFunToBlock(si) {
  const s = Kit.auto(si);
  return _arrowFunToBlock(s);
  function* _arrowFunToBlock(sw) {
    for (const i of sw) {
      yield i;
      if (
        i.enter &&
        i.type === Tag.ArrowFunctionExpression &&
        i.value.opts.transform
      ) {
        i.value.node.expression = false;
        while (s.cur().pos !== Tag.body) yield* _arrowFunToBlock(s.one());
        if (s.cur().type !== Tag.BlockStatement) {
          const lab = s.label();
          yield s.enter(Tag.body, Tag.BlockStatement, {
            decls: s.cur().value.decls
          });
          yield s.enter(Tag.body, Tag.Array);
          yield s.enter(Tag.push, Tag.ReturnStatement);
          yield* Kit.reposOne(_arrowFunToBlock(s.one()), Tag.argument);
          yield* lab();
        }
      }
    }
  }
}
