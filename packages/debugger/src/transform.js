const asyncOps = {
  AwaitExpression: "awt",
  YieldExpression: true
};
const generatorOps = {
  YieldExpression: true
};
const asyncGeneratorOps = {
  AwaitExpression: "awt",
  YieldExpression: ["yldAG", "yldStarAG"]
};

const injectableOps = [
  "ret",
  "retA",
  "retAG",
  "retG",
  "brk",
  "token",
  "yld",
  "yldStar",
  "yldAG",
  "yldStarAG",
  "scopeG",
  "scopeAG",
  "scopeA",
  "scope",
  "frameA",
  "frameAG",
  "frameG",
  "frame",
  "unhandled",
  "unhandledA",
  "unhandledAG",
  "set",
  "del",
  "mcall"
];

let VERBOSE = process.env.EFFECTFUL_DEBUGGER_VERBOSE;

if (VERBOSE) {
  VERBOSE = VERBOSE[0].toLowerCase() === "t" || (!isNaN(VERBOSE) && +VERBOSE);
} else VERBOSE = false;

module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets }) => {
    const moduleAliases = {};
    const importRT = opts.importRT || "@effectful/debugger/api";
    if (opts.preInstrumentedLibs) {
      const root = opts.preInstrumentedLibs.substr
        ? opts.preInstrumentedLibs
        : "@effectful/debugger";
      for (const i in require("./deps.json")) {
        const suffix = opts.timeTravel ? "-t" : "";
        const path = `${root}/deps/${i.replace(/\//g, "-")}${suffix}`;
        moduleAliases[i] = path;
        if (i.includes("/")) moduleAliases[`${i}.js`] = path;
      }
    }
    const brk = Kit.sysId("brk");
    const unwrapSym = Kit.sysId("unwrapImport");
    const contextOpSym = Kit.sysId("context");
    const raiseSym = Kit.sysId("raise");
    const evalCtx = Kit.sysId("evalCtx");
    const handleSym = Kit.sysId("handle");
    const injectOps = {};
    if (opts.expInject !== false) {
      for (const i of injectableOps) {
        injectOps[i] = {};
      }
    }
    const before = {
      scope: replaceThrow,
      meta: injectScopeDescr,
      interpret: safeCalls,
      interpretOps: pauseCheck
    };
    Object.assign(moduleAliases, opts.moduleAliases);
    return {
      options: {
        ...presets.defunct,
        name: "@effectful/debugger",
        importRT,
        detectRT: false,
        scopeConstructor: "frame",
        contextBy: "parameter",
        par: false,
        topLevel: true,
        topIIFE: !opts.pureModule,
        inlineScopeOp: opts.blackbox ? "call" : false,
        contextState: true,
        modules: "commonjs",
        closureShortcuts: false,
        wrapFunction: opts.closure !== false ? null : "func",
        closConv: opts.closure !== false,
        injectModuleMeta: "module",
        defunctHandlerInProto: true,
        defunctCasesPassThrough: true,
        esForOf: true,
        esForAwaitOf: true,
        varStorageField: "$",
        closureStorageField: "$$",
        closVarPrefix: "",
        closVarPostfix: "",
        inlineRaiseOp: null,
        defunctStateDiscriminant: false,
        storeCont: "goto",
        storeRunningCont: "state",
        wrapArguments: "args",
        replaceGlobals: { eval: "evalAt" },
        injectEvalCtx: true,
        contextMethodOps: false,
        contextMethodOpsSpec: null,
        keepLastPure: "tail",
        keepLastRaise: true,
        inlinePureJumps: "tail",
        inlineTailCoerce: true,
        inlineContAssign: false,
        inlinePureOp: false,
        injectOps,
        before,
        pureForOf: false,
        delegateRedir: false,
        contextSymName: "$",
        normalizeAssign: true,
        normPureForIn: opts.timeTravel,
        normPureForOf: opts.timeTravel,
        optimizeContextVars: false,
        srcRoot: opts.srcRoot || true,
        optimizations: false,
        cleanupFrameVars: false,
        functionStateField: "sent",
        functionSentOps: {
          yldAG: true,
          yld: true,
          scopeG: true,
          scopeAG: true
        },
        combineOps: {
          awt: true,
          yld: true,
          yldStar: true,
          awtAG: true,
          yldAG: true,
          yldStarAG: true,
          brk: true
        },
        wrapPropAccess: opts.timeTravel
          ? {
              set: { name: "set" /*, bind: true*/ },
              delete: { name: "del" /*, bind: true*/ }
            }
          : null,
        ...opts,
        moduleAliases
      },
      main(input) {
        const s = Kit.auto(input);
        const opts = s.opts;
        s.first.value.evalCtxSym = evalCtx;
        if (VERBOSE)
          console.log(
            `transforming:"${opts.file &&
              opts.file
                .filename}", blackbox:${!!opts.blackbox}, timeTravel:${!!opts.timeTravel}`
          );
        T.run(P.propagateOpts(configure()));
        function* configure() {
          for (const i of s) {
            if (i.enter) {
              switch (i.type) {
                case Tag.ReturnStatement:
                  // hacking pre-transpiled arrow function's expression loc
                  if (!i.leave && s.curLev() && !i.value.node.loc)
                    i.value.node.loc = s.curLev().value.node.loc;
                  break;
                case Tag.ClassMethod:
                case Tag.ClassPrivateMethod:
                case Tag.ObjectMethod:
                  throw s.error("not supported function type");
                case Tag.File:
                  if (opts.pureModule) {
                    i.value.captureInChildren = false;
                    break;
                  }
                case Tag.ArrowFunctionExpression:
                case Tag.FunctionDeclaration:
                case Tag.FunctionExpression:
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
                  const patch = {
                    injectFuncMeta: "fun",
                    scopePrefix: opts.blackbox ? false : "scope",
                    returnName: "ret",
                    raiseName: "unhandled",
                    passNewTarget: false
                  };

                  let ops;
                  if (i.value.node.async) {
                    if (i.value.node.generator) {
                      patch.returnName = "retAG";
                      patch.raiseName = "unhandledAG";
                      patch.scopePrefix = "scopeAG";
                      patch.injectFuncMeta = "funAG";
                      ops = asyncGeneratorOps;
                    } else {
                      patch.returnName = "retA";
                      patch.raiseName = "unhandledA";
                      patch.scopePrefix = "scopeA";
                      patch.injectFuncMeta = "funA";
                      ops = asyncOps;
                    }
                  } else if (i.value.node.generator) {
                    patch.returnName = "retG";
                    patch.raiseName = "unhandledG";
                    patch.scopePrefix = "scopeG";
                    patch.injectFuncMeta = "funG";
                    ops = generatorOps;
                  } else {
                    patch.passNewTarget = true;
                  }
                  i.value.optsAssign = {
                    transform: true,
                    nodebug,
                    ops,
                    ...patch
                  };
                  break;
              }
            }
            yield i;
          }
        }
      }
    };
    function* replaceThrow(si) {
      const s = Kit.auto(insertBreaks(si));
      for (const i of s) {
        if (i.enter) {
          if (i.type === Tag.ThrowStatement) {
            yield s.enter(i.pos, Tag.ExpressionStatement, {
              node: { loc: i.value.node.loc },
              bind: true,
              eff: true
            });
            yield s.enter(Tag.expression, Tag.CallExpression, {
              node: { loc: i.value.node.loc },
              bind: true,
              eff: true
            });
            yield s.tok(Tag.callee, Tag.Identifier, { sym: raiseSym });
            yield s.enter(Tag.arguments, Tag.Array);
            yield* Kit.reposOne(s.sub(), Tag.push);
            yield* s.leave();
            yield* s.leave();
            yield* s.leave();
            s.close(i);
            continue;
          }
        }
        yield i;
      }
    }
    /** saving function's reference in call so we know the function is called in managed stack */
    function* safeCalls(si) {
      const s = Kit.auto(si);
      const callId = Kit.sysId("mcall");
      for (const i of s) {
        if (i.enter) {
          if (i.type === Tag.NewExpression || i.type === Tag.CallExpression) {
            const callee = s.cur();
            let sym;
            if (
              callee.type !== Tag.Identifier ||
              !(sym = callee.value.sym) ||
              !sym.lib
            ) {
              if (
                i.type === Tag.CallExpression &&
                callee.type === Tag.MemberExpression
              ) {
                s.take();
                const obj = [...s.one()];
                const prop = [...s.one()];
                yield* s.template(i.pos, "=$I($E)", callId);
                if (callee.value.node.computed)
                  yield* Kit.reposOne(prop, Tag.push);
                else
                  yield s.tok(Tag.push, Tag.StringLiteral, {
                    node: { value: prop[0].value.node.name }
                  });
                yield* Kit.reposOne(obj, Tag.push);
                s.close(callee);
                const args = s.take();
                yield* s.sub();
                s.close(args);
                yield* s.leave();
                s.close(i);
              } else if (sym && sym.global && sym.orig === "require") {
                for (const i of s) if (i.pos === Tag.arguments) break;
                const args = [...s.sub()];
                const hasSideEff = args.some(i => {
                  if (i.enter) {
                    switch (i.type) {
                      case Tag.CallExpression:
                      case Tag.AssignmentExpression:
                      case Tag.MemberExpression:
                      case Tag.UpdateExpression:
                        return true;
                    }
                  }
                  return false;
                });
                if (hasSideEff) {
                  yield* s.template(
                    i.pos,
                    "=$1.modulePath = $E, $.moduleId = require.resolve($1.modulePath), $2($1.modulePath)",
                    contextOpSym,
                    sym
                  );
                  yield* Kit.reposOne(args, Tag.right);
                } else {
                  yield* s.template(
                    i.pos,
                    "=$I.moduleId = require.resolve($E), $I($E)",
                    contextOpSym,
                    sym
                  );
                  yield* Kit.clone(args);
                  yield* s.refocus();
                  yield* args;
                }
                for (const j of s) if (j.value === i.value) break;
              } else {
                yield i;
                yield* s.template(Tag.callee, "=($I.call = $E)", contextOpSym);
                yield* Kit.reposOne(s.one(i), Tag.right);
              }
              yield* s.leave();
              continue;
            }
          }
        }
        yield i;
      }
    }
    function* pauseCheck(si) {
      const s = Kit.auto(si);
      const root = s.first.value;
      if (s.opts.scopePrefix) {
        yield* s;
        return;
      }
      for (const i of s) {
        yield i;
        if (i.pos === Tag.body && i.type === Tag.Array) break;
      }
      yield* s.template(
        Tag.push,
        `try {$_} catch(e) {return $I($I,e);}`,
        handleSym,
        root.contextSym
      );
      yield* s.sub();
      yield* s.leave();
      yield* s;
    }
    function insertBreaks(si) {
      const s = Kit.auto(si);
      return _insertBreaks();
      function* _insertBreaks() {
        for (const i of s.sub()) {
          if (i.enter && !s.opts.nodebug) {
            switch (i.type) {
              case Tag.VariableDeclaration:
                if (i.pos === Tag.left || i.pos === Tag.init) break;
              case Tag.ForStatement:
              case Tag.ReturnStatement:
              case Tag.BreakStatement:
              case Tag.ContinueStatement:
              case Tag.IfStatement:
              case Tag.SwitchStatement:
              case Tag.ThrowStatement:
              case Tag.TryStatement:
              case Tag.WhileStatement:
              case Tag.DoWhileStatement:
              case Tag.ForOfStatement:
              case Tag.ExpressionStatement:
              case Tag.WithStatement:
              case Tag.LabeledStatement:
                if (
                  opts.pureModule &&
                  i.value.parentBlock &&
                  i.value.parentBlock.origType === Tag.Program
                )
                  break;
                if (opts.blackbox) break;
                const lab = s.label();
                if (i.pos !== Tag.push) {
                  yield s.enter(i.pos, Tag.BlockStatement);
                  yield s.enter(Tag.body, Tag.Array);
                }
                if (i.value.node.loc) yield* brkStmt(Tag.push, i, "s");
                yield s.peel(Kit.setPos(i, Tag.push));
                // we don't want to break loop's labels (and there can be a few of them)
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
              case Tag.UpdateExpression:
              case Tag.CallExpression:
                const la = s.cur();
                if (
                  !opts.pureModule &&
                  la.type === Tag.Identifier &&
                  la.value.sym &&
                  la.value.sym.declScope == null
                ) {
                  const { name } = la.value.node;
                  if (name === "require") {
                    for (const j of s.sub()) if (j.pos === Tag.arguments) break;
                    const arg = [...s.one()];
                    // TODO: this requires a temp var
                    // since it may duplicate some side effects
                    yield* s.template(
                      i.pos,
                      "=$1($2($E))",
                      { bind: true, expr: true },
                      unwrapSym,
                      la.value.sym
                    );
                    yield* arg;
                    yield* s.leave();
                    for (const j of s) if (j.value === i.value) break;
                    continue;
                  }
                }
                i.value.bind = true;
                break;
              case Tag.UnaryExpression:
                if (i.value.node.operation !== "delete") break;
              case Tag.AssignmentExpression:
              case Tag.NewExpression:
                i.value.bind = true;
                break;
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
          node: { loc: i.value.node.loc }
        });
        yield s.tok(Tag.callee, Tag.Identifier, { sym: brk });
        yield s.enter(Tag.arguments, Tag.Array);
        yield s.tok(Tag.push, Tag.Identifier, {
          sym: evalCtx,
          node: { loc: i.value.node.loc },
          brkName: name
        });
        yield* lab();
      }
    }
    function position(loc) {
      if (!loc) return null;
      const { start: f, end: l } = loc;
      return `${f.line}:${f.column}-${l.line}:${l.column}`;
    }
    function injectScopeDescr(si) {
      if (opts.blackbox) return si;
      const s = Kit.auto(si);
      for (const i of s.first.value.scopes) {
        if (i.scopeMeta) {
          for (const j of i.scopeMeta) {
            j.node.push(j.value.brkName || null);
            j.node.push(position(j.value.node.loc));
          }
        }
        const fid = i.funcAlias || i.funcId;
        i.metaArgs[100] = [
          ...Kit.emitConst(
            Tag.push,
            fid && fid.strict ? fid.orig : null,
            position(i.node && i.node.loc),
            (i.parentScope && i.parentScope.metaId) || null,
            i.paramSyms.map(i => i.fieldName)
          )
        ];
      }
      return s;
    }
  }
);
