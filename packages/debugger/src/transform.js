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
  "frameA",
  "frameAG",
  "frameG",
  "frame",
  "unhandled",
  "unhandledA",
  "unhandledAG",
  "set",
  "delete"
];

module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets, Block }) => {
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
        const suffix = opts.timeTravel ? "-t" : "";
        const path = `${root}/deps/${i.replace(/\//g, "-")}${suffix}`;
        moduleAliases[i] = path;
        if (i.includes("/")) moduleAliases[`${i}.js`] = path;
      }
    }
    const brk = Kit.sysId("brk");
    const unwrapSym = Kit.sysId("unwrapImport");
    const savePropSym = Kit.sysId("upd");
    const contextOpSym = Kit.sysId("context");
    const stopSym = Kit.sysId("stop");
    const evalCtx = Kit.sysId("evalCtx");
    const handleSym = Kit.sysId("handle");
    const injectOps = {};
    if (opts.expInject !== false) {
      for (const i of injectableOps) {
        const descr = (injectOps[i] = {});
      }
    }
    const before = {
      scope: insertBreaks,
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
        normalizeAssign: true,
        normPureForIn: opts.timeTravel,
        normPureForOf: opts.timeTravel,
        optimizeContextVars: !opts.timeTravel,
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
              set: { name: "set", bind: false },
              delete: { name: "del", bind: false }
            }
          : null,
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
    /** time traveling log */
    function opsLog(si) {
      if (!opts.timeTravel) return si;
      const s = Kit.auto(si);
      const root = s.first.value;
      debugger;
      const { contextSym } = root;
      const varsPool = [];
      let varsPoolPos = 0;
      return _opsLog(s, true);
      function tmpVar(ids) {
        if (varsPoolPos < varsPool.length) return varsPool[varsPoolPos++];
        const res = Kit.scope.newSym();
        varsPool.push(res);
        varsPoolPos++;
        ids.push(res);
        return res;
      }
      function isEffFree(i) {
        switch (i.type) {
          case Block.bindPat:
          case Tag.Identifier:
          case Tag.RegExpLiteral:
          case Tag.NullLiteral:
          case Tag.StringLiteral:
          case Tag.BooleanLiteral:
          case Tag.NumericLiteral:
            return true;
        }
        return false;
      }
      function* getEffFree(buf, ids) {
        const res = [..._opsLog(s.one())];
        if (isEffFree(res[0])) {
          buf.push(...res);
          return Kit.reposOne(Kit.clone(res), Tag.push);
        }
        const sym = tmpVar(ids);
        const pos = res[0].pos;
        buf.push(s.tok(pos, Tag.Identifier, { sym }));
        yield* s.template(Tag.push, `=$I=$E`, sym);
        yield* Kit.reposOne(res, Tag.right);
        yield* s.leave();
        return [s.tok(Tag.push, Tag.Identifier, { sym })];
      }
      function* _opsLog(sw, ids, top) {
        for (const i of sw) {
          if (i.enter) {
            switch (i.type) {
              case Tag.FunctionDeclaration:
                yield i;
                for (const j of sw) {
                  yield j;
                  if (j.pos === Tag.body && j.type === Tag.Array) break;
                }
                const fids = [];
                const fbuf = [..._opsLog(s.sub(), fids, true)];
                if (fids.length) {
                  yield s.enter(Tag.push, Tag.VariableDeclaration, {
                    node: { kind: "var" }
                  });
                  yield s.enter(Tag.declarations, Tag.Array);
                  for (const sym of fids) {
                    yield s.enter(Tag.push, Tag.VariableDeclarator);
                    yield s.tok(Tag.id, Tag.Identifier, { sym });
                    yield* s.leave();
                  }
                  yield* s.leave();
                  yield* s.leave();
                }
                yield* fbuf;
                continue;
              case Tag.UnaryExpression:
                if (i.value.node.operator !== "delete") break;
              case Tag.UpdateExpression:
              case Tag.AssignmentExpression:
                const arg = s.cur();
                if (
                  arg.type === Tag.Identifier &&
                  arg.value.sym &&
                  arg.value.sym.global
                ) {
                  yield* s.template(
                    i.pos,
                    `=$I(global,"${arg.value.sym.name}"), $E`,
                    savePropSym
                  );
                  yield Kit.setPos(i, Tag.push);
                  yield* _opsLog(s.sub(), top);
                  yield Kit.setPos(s.close(i), Tag.push);
                  yield* s.leave();
                  continue;
                }
                if (arg.type !== Tag.MemberExpression) break;
                s.take();
                const objTok = s.cur();
                if (
                  objTok.type === Tag.Identifier &&
                  objTok.value.sym &&
                  (objTok.value.sym === contextSym ||
                    objTok.value.sym === contextOpSym)
                ) {
                  yield i;
                  yield arg;
                  continue;
                }
                if (top) varsPoolPos = 0;
                const buf = [Kit.setPos(i, Tag.push), arg];
                let obj, prop;
                yield s.enter(i.pos, Tag.SequenceExpression);
                yield s.enter(Tag.expressions, Tag.Array);
                obj = yield* getEffFree(buf, ids);
                if (arg.value.node.computed) prop = yield* getEffFree(buf, ids);
                else {
                  const p = s.cur();
                  buf.push(...s.one());
                  prop = [
                    s.tok(Tag.push, Tag.StringLiteral, {
                      node: { value: p.value.node.name }
                    })
                  ];
                }
                buf.push(s.close(arg));
                yield* s.template(Tag.push, `=$I($E)`, savePropSym);
                yield* obj;
                yield* prop;
                yield* s.leave();
                yield* buf;
                yield* _opsLog(s.sub(), false);
                yield Kit.setPos(s.close(i), Tag.push);
                yield* s.leave();
                yield* s.leave();
                continue;
              case Tag.ObjectPattern:
              case Tag.ArrayPattern:
                throw s.error(
                  'destructuring isn\'t supported, apply "@babel/plugin-transform-destructuring"'
                );
              default:
                yield i;
                continue;
            }
          }
          yield i;
        }
      }
    }
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
                "=($1.call = $E).call($E)",
                contextOpSym
              );
              yield Kit.setPos(callee, Tag.right);
              yield* obj;
              yield* prop;
              yield Kit.setPos(s.close(callee), Tag.right);
              yield* s.refocus();
              yield* Kit.reposOne(Kit.clone(obj), Tag.push);
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
