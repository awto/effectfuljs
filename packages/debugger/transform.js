"use strict";

module.exports = require("@effectful/core").babelPlugin((opts, {
  Tag,
  Kit,
  Transform: T,
  Policy: P,
  presets,
  Block
}) => {
  const moduleAliases = {};
  const importRT = opts.importRT || "@effectful/debugger/api";

  if (opts.preInstrumentedLibs) {
    const root = opts.preInstrumentedLibs.substr ? opts.preInstrumentedLibs : "@effectful/debugger";

    for (const i in require("./deps.json")) {
      moduleAliases[i] = `${root}/deps/${i.replace("/", "-")}`;
    }
  }

  const objWrap = Kit.sysId("wrap");
  const brk = Kit.sysId("brk");
  const unwrapSym = Kit.sysId("unwrapImport");
  Object.assign(moduleAliases, opts.moduleAliases);
  return {
    options: { ...presets.defunct,
      name: "@effectful/debugger",
      importRT,
      detectRT: false,
      contextBy: "parameter",
      par: false,
      topLevel: true,
      topIIFE: !opts.pureModule,
      contextState: true,
      inlinePureJumps: "tail",
      inlineJsExceptions: true,
      inlineTailCoerce: opts.expTCExceptions || {
        singelton: "token"
      },
      inlineContAssign: false,
      modules: "commonjs",
      closureShortcuts: false,
      wrapFunction: opts.closure !== false ? null : "func",
      closConv: opts.closure !== false,
      injectModuleMeta: "module",
      defunctHandlerInProto: true,
      scopeConstructor: "frame",
      // injectFuncMeta: "meta",
      esForOf: true,
      esForAwaitOf: true,
      varStorageField: "$",
      closureStorageField: "$$",
      closVarPrefix: "",
      closVarPostfix: "",
      inlineRaiseOp: null,
      defunctStateDiscriminant: false,
      passNewTarget: true,
      storeCont: "state",
      wrapArguments: "args",
      replaceGlobals: {
        eval: true
      },
      injectEvalCtx: true,
      before: {
        scope: insertBreaks,
        meta: injectScopeDescr
      },
      contextMethodOpsSpec: {
        wrap: false,
        brk: false,
        unwrapImport: false,
        iterator: false,
        asyncIterator: false,
        forInIterator: false,
        token: false,
        args: false
      },
      moduleAliases,
      ...opts
    },

    main(input) {
      const s = Kit.auto(input);
      const opts = s.opts;
      T.run(P.propagateOpts(configure()));

      function* configure() {
        for (const i of s) {
          if (i.enter) {
            switch (i.type) {
              case Tag.File:
                if (opts.pureModule) {
                  i.value.captureInChildren = false;
                  break;
                }

              case Tag.ClassMethod:
              case Tag.ClassPrivateMethod:
              case Tag.FunctionDeclaration:
              case Tag.FunctionExpression:
              case Tag.ArrowFunctionExpression:
              case Tag.ObjectMethod:
                const body = i.value.node.body || i.value.node.program;
                let nodebug = false;

                if (body && body.directives) {
                  for (const j of body.directives) {
                    if (j.value && j.value.value === "nodebug") {
                      nodebug = true;
                      break;
                    }
                  }
                }

                i.value.captureParent = true;
                i.value.optsAssign = {
                  transform: true,
                  nodebug,
                  scopePrefix: true,
                  keepLastPure: "tail",
                  keepLastRaise: true,
                  inlinePureJumps: "tail",
                  inlineJsExceptions: true,
                  inlineTailCoerce: opts.expTCExceptions || {
                    singelton: "token"
                  },
                  inlineContAssign: false,
                  injectFuncMeta: "meta",
                  inlinePureOp: false
                };
                if (nodebug) Object.assign(i.value.optsAssign, {
                  scopePrefix: false,
                  inlinePureJumps: false,
                  inlineJsExceptions: false,
                  inlineTailCoerce: null,
                  injectFuncMeta: "syncMeta",
                  keepLastPure: false,
                  keepLastRaise: false,
                  inlinePureOp: "asis"
                });
                if (i.value.node.async || i.value.node.generator) throw s.error("async and generator functions aren't supported yet");
                break;
            }
          }

          yield i;
        }
      }
    }

  };

  function insertBreaks(si) {
    const s = Kit.auto(si);
    return _insertBreaks();

    function* _insertBreaks() {
      for (const i of s.sub()) {
        if (i.enter && !s.opts.nodebug) {
          switch (i.type) {
            case Tag.VariableDeclaration:
              if (i.pos === Tag.left || i.pos === Tag.init) break;

            case Tag.ReturnStatement:
            case Tag.BreakStatement:
            case Tag.ContinueStatement:
            case Tag.IfStatement:
            case Tag.SwitchStatement:
            case Tag.ThrowStatement:
            case Tag.TryStatement:
            case Tag.WhileStatement:
            case Tag.DoWhileStatement:
            case Tag.ForStatement:
            case Tag.ForOfStatement:
            case Tag.ExpressionStatement:
            case Tag.WithStatement:
            case Tag.LabeledStatement:
              if (opts.blackbox || opts.pureModule && i.value.parentBlock && i.value.parentBlock.origType === Tag.Program) break;
              const lab = s.label();

              if (i.pos !== Tag.push) {
                yield s.enter(i.pos, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
              }

              if (i.value.node.loc) yield* brkStmt(Tag.push, i, "s");
              yield s.peel(Kit.setPos(i, Tag.push)); // we don't want to break loop's labels (and there can be a few of them)

              if (i.type === Tag.LabeledStatement) {
                for (;;) {
                  const j = s.peel();
                  yield j;
                  if (j.type !== Tag.LabeledStatement) break;
                }
              }

              if (!i.leave) yield* _insertBreaks();
              yield* lab();
              continue;

            case Tag.DebuggerStatement:
              if (opts.blackbox || opts.debuggerStmt === false) break;
              yield* brkStmt(i.pos, i, "debugger");
              s.close(i);
              continue;

            case Tag.CallExpression:
              const la = s.cur();

              if (!opts.pureModule && la.type === Tag.Identifier && la.value.sym && la.value.sym.declScope == null) {
                const {
                  name
                } = la.value.node;

                if (name === "require") {
                  for (const j of s.sub()) if (j.pos === Tag.arguments) break;

                  const arg = [...s.one()]; // TODO: this requires a temp var
                  // since it may duplicate some side effects

                  yield* s.template(i.pos, "=$I($I($E),$E)", {
                    bind: true,
                    expr: true
                  }, unwrapSym, la.value.sym);
                  yield* arg;
                  yield* s.refocus();
                  yield* Kit.clone(arg);
                  yield* s.leave();

                  for (const j of s) if (j.value === i.value) break;

                  continue;
                }
              }

              i.value.bind = true;
              break;

            case Tag.NewExpression:
              i.value.bind = true;

            case Tag.ObjectExpression:
            case Tag.ArrayExpression:
              yield* wrap(i, false, objWrap);
              continue;
          }
        }

        yield i;
      }
    }

    function* brkStmt(pos, i, name) {
      const lab = s.label();
      yield s.enter(pos, Tag.ExpressionStatement);
      yield s.enter(Tag.expression, Tag.CallExpression, {
        bind: true,
        expr: true,
        node: {
          loc: i.value.node.loc
        },
        injectScopeMeta: true,
        brkDescr: i.value.node.loc,
        brkName: name
      });
      yield s.tok(Tag.callee, Tag.Identifier, {
        sym: brk
      });
      yield s.enter(Tag.arguments, Tag.Array);
      yield* lab();
    }

    function* wrap(i, bind, sym) {
      yield* s.template(i.pos, "=$I($E)", {
        bind,
        expr: true
      }, sym);
      yield s.peel(Kit.setPos(i, Tag.push));
      yield* _insertBreaks();
      yield* s.leave();
      yield* Kit.emitConst(position(i.value.node.loc));
      yield* s.leave();
    }
  }

  function position(loc) {
    if (!loc) return null;
    const {
      start: f,
      end: l
    } = loc;
    return `${f.line}:${f.column}-${l.line}:${l.column}`;
  }

  function injectScopeDescr(si) {
    if (opts.blackbox) return si;
    const s = Kit.auto(si);

    for (const i of s.first.value.scopes) {
      if (!i.scopeMeta) console.log(i.funcId.name);

      if (i.scopeMeta) {
        for (const j of i.scopeMeta) {
          j.node.push(j.value.brkName || null);
          j.node.push(position(j.value.node.loc));
        }
      }

      i.metaArgs[100] = [...Kit.emitConst(Tag.push, i.funcId && i.funcId.strict ? i.funcId.orig : null, position(i.node && i.node.loc), i.parentScope && i.parentScope.metaId || null)];
    }

    return s;
  }
});