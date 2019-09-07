const INLINE_FRAME = `=$1.top = { $$$: $2.$$$, meta: $2.meta, self, 
newTarget: new.target !=  null, $: {}, brk: null, exitBrk: null, next: $1.top }`;
const INLINE_FRAME_TT = `=$3($1.top = { $$$: $2.$$$, meta: proto.meta, self,
newTarget: newTarget != null, $: $3({}), brk: null, exitBrk: null, next: $1.top })`;
const INLINE_BRK = `= $3.debug
     && ($2 = ($1.brk = $3.brk = $1.meta.states[$E])) 
     && $2.check && ($2.check === true || $2.check()) && $5()
`;
const INLINE_PURE = (alreadyPat, blackbox, empty) => `=(
  ${alreadyPat || empty ? "" : "($2 = $E),"}
  ($1.newTarget && ${empty ? "" : "(!$2 || typeof $2 !== 'object') &&"}
   ($2 = $1.self)),
  ($1.state = 0),
  ($3.value = $2),
  ${blackbox ? "" : "(($3.brk = $1.brk = $1.exitBrk) && $5()),"}
  ($3.top = $1.next),
  ${empty ? "void 0" : "$2"});
`;

const INJECT_FRAME = tt => `
function $1(proto, self, newTarget) {
  ${tt ? "if (newTarget) unwrapPrototype(self);" : ""}
  return $3.top = ${tt ? "wrap" : ""}({
    $$$: proto.$$$,
    state: 0,
    meta: proto.meta,
    self,
    newTarget: new.target != null,
    $: ${tt ? "wrap({})" : "{}"},
    brk: null,
    exitBrk: null,
    next: $3.top
  })
}
`;

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

module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets }) => {
    const moduleAliases = {};
    const importRT =
      opts.importRT ||
      (opts.backend
        ? `@effectful/debugger/backends/${opts.backend}`
        : "@effectful/debugger/api");
    if (opts.preInstrumentedLibs) {
      const root = opts.preInstrumentedLibs.substr
        ? opts.preInstrumentedLibs
        : "@effectful/debugger";
      for (const i in require("./deps.json")) {
        const path = `${root}/deps/${i.replace(/\//g, "-")}`;
        moduleAliases[i] = path;
        if (i.includes("/")) moduleAliases[`${i}.js`] = path;
      }
    }
    const objWrap = Kit.sysId("wrap");
    const brk = Kit.sysId("brk");
    const unwrapSym = Kit.sysId("unwrapImport");
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
      "frameA",
      "frameAG",
      "frameG",
      "frame"
    ];
    const pureSym = Kit.sysId("pure");
    const contextOpSym = Kit.sysId("context");
    const stopSym = Kit.sysId("stop");
    const evalCtx = Kit.sysId("evalCtx");
    const handleSym = Kit.sysId("handle");
    const injectOps = {};
    if (opts.expInline) opts.expInject = 0;
    if (opts.expInject) {
      for (const i of injectableOps) {
        const descr = (injectOps[i] = {});
        if (opts.expInject === 2) {
          descr.init = String(require("./engine")[i])
            .replace(i, "$1")
            .replace(/\bcontext\b/g, "$3");
          descr.deps = ["context"];
        }
      }
      injectOps.frame =
        opts.inject === 2
          ? {
              init: INJECT_FRAME(opts.timeTravel),
              deps: ["context"]
            }
          : {};
      if (opts.timeTracel) injectOps.frame.deps.push("wrap");
    }
    if (opts.expInject === 2 || opts.expInline) {
      injectOps["context"] = {};
      injectOps["stop"] = {
        init: "function $1() { throw $2.token }"
      };
    }
    const before = {
      scope: insertBreaks,
      meta: injectScopeDescr,
      interpret: v => safeCalls(v)
    };
    if (opts.expInline) before.interpretOps = inlineOps;
    else before.interpretOps = pauseCheck;
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
        inlineScopeOp: "call",
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
        ...opts,
        moduleAliases
      },
      main(input) {
        const s = Kit.auto(input);
        const opts = s.opts;
        s.first.value.evalCtxSym = evalCtx;
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
                    scopePrefix: false,
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
                      // patch.delegateRedir = ["delegate", "delegateAG"];
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
                    // patch.delegateRedir = ["delegateAG", "delegateRetAG"];
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
    /** saving function's reference in call so we know the function is called in managed stack */
    function* safeCalls(si) {
      const s = Kit.auto(si);
      for (const i of s) {
        if (
          i.enter &&
          (i.type === Tag.NewExpression || i.type === Tag.CallExpression)
        ) {
          const callee = s.cur();
          let sym;
          if (
            callee.type !== Tag.Identifier ||
            !(sym = callee.value.sym) ||
            (!sym.lib && !(sym.global && sym.orig === "require"))
          ) {
            if (
              i.type === Tag.CallExpression &&
              callee.type === Tag.MemberExpression
            ) {
              s.take();
              const obj = [...s.one()];
              const prop = [...s.one()];
              yield* s.template(
                i.pos,
                // "=($1.call = $E).call($1.obj = $E, $E)",
                "=($1.call = $E).call($E)",
                contextOpSym
              );
              yield Kit.setPos(callee, Tag.right);
              yield* obj;
              yield* prop;
              yield Kit.setPos(s.close(callee), Tag.right);
              yield* s.refocus();
              yield* Kit.reposOne(Kit.clone(obj), /*Tag.right*/ Tag.push);
              const args = s.take();
              yield* s.sub();
              s.close(args);
              yield* s.leave();
              s.close(i);
            } else {
              yield i;
              yield* s.template(Tag.callee, "=($I.call = $E)", contextOpSym);
              yield* Kit.reposOne(s.one(i), Tag.right);
            }
            yield* s.leave();
            continue;
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
    function* inlineOps(si) {
      const s = Kit.auto(si);
      const root = s.first.value;
      root.savedDecls.set(root.contextSym, {
        init: [
          ...s.toks(
            Tag.init,
            opts.timeTravel ? INLINE_FRAME_TT : INLINE_FRAME,
            contextOpSym,
            root.closureArgSym,
            objWrap
          )
        ]
      });
      const pat = root.commonPatSym;
      for (const i of s) {
        if (i.enter) {
          if (i.type === Tag.CallExpression) {
            const callee = s.cur();
            if (callee.type === Tag.Identifier) {
              const sym = callee.value.sym;
              if (sym === brk || sym === pureSym) {
                for (const j of s) if (j.pos === Tag.arguments) break;
                const empty = s.curLev() == null;
                const alreadyPat = s.cur().value.sym === pat;
                const pos = yield* (empty || alreadyPat
                  ? s.toks
                  : s.template
                ).call(
                  s,
                  i.pos,
                  sym === pureSym
                    ? INLINE_PURE(alreadyPat, opts.blackbox, empty)
                    : INLINE_BRK,
                  root.contextSym,
                  pat,
                  contextOpSym,
                  root.$ns,
                  stopSym
                );
                if (!alreadyPat && !empty) {
                  yield* Kit.reposOne(s.sub(), pos);
                  yield* s.leave();
                }
                for (const j of s) if (j.value === i.value) break;
                continue;
              }
            }
          }
        }
        yield i;
      }
      return s;
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
                if (
                  opts.blackbox ||
                  (opts.pureModule &&
                    i.value.parentBlock &&
                    i.value.parentBlock.origType === Tag.Program)
                )
                  break;
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
                      "=$I($I($E),$E)",
                      { bind: true, expr: true },
                      unwrapSym,
                      la.value.sym
                    );
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
                if (opts.timeTravel) {
                  yield* wrap(i, false, objWrap);
                  continue;
                }
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
          node: { loc: i.value.node.loc },
          brkName: name
        });
        yield s.tok(Tag.callee, Tag.Identifier, { sym: brk });
        yield s.enter(Tag.arguments, Tag.Array);
        yield s.tok(Tag.push, Tag.Identifier, {
          sym: evalCtx,
          node: { loc: i.value.node.loc }
        });
        yield* lab();
      }
      function* wrap(i, bind, sym) {
        yield* s.template(i.pos, "=$I($E)", { bind, expr: true }, sym);
        yield s.peel(Kit.setPos(i, Tag.push));
        yield* _insertBreaks();
        yield* s.leave();
        yield* Kit.emitConst(position(i.value.node.loc));
        yield* s.leave();
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
