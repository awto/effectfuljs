module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets, Block }) => {
    const moduleAliases = {};
    const importRT = opts.importRT || "@effectful/debugger";
    if (opts.preInstrumentedLibs) {
      const root = opts.preInstrumentedLibs.substr
        ? opts.preInstrumentedLibs
        : "@effectful/debugger";
      for (const i in require("./libs.json")) {
        moduleAliases[i] = `${root}/libs/${i.replace("/", "-")}`;
      }
    }
    Object.assign(moduleAliases, opts.moduleAliases);
    return {
      options: {
        ...presets.defunct,
        name: "@effectful/debugger",
        importRT,
        contextBy: "this",
        par: false,
        topLevel: true,
        topIIFE: !opts.pureModule,
        contextState: true,
        inlinePureJumps: "tail",
        inlineJsExceptions: true,
        inlineTailCoerce: { singelton: "token" },
        inlineContAssign: false,
        modules: "commonjs",
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
        storeCont: "$state",
        wrapArguments: "args",
        before: {
          meta: injectScopeDescr,
          interpret: collectStmtsLoc
        },
        contextMethodOpsSpec: {
          constr: false,
          brk: false,
          imports: false,
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
        // TODO: parcel doesn't allow exclude etc, make an own option
        /*
        if (opts.file && opts.file.filename) {
          const name = opts.file.filename;
          const ext = name.substr(name.lastIndexOf("."));
          if (ext === ".css") return s;
        }
        */
        const objWrap = Kit.sysId("constr");
        const brk = Kit.sysId("brk");
        const unwrapSym = Kit.sysId("imports");
        T.run(insertBreaks(P.propagateOpts(configure())));
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
                    break;
                  /*
                    if (opts.blackbox) break;
                    yield* brkStmt(i.pos, i, "d");
                    s.close(i);
                    continue;
                  */
                  case Tag.CallExpression:
                    const la = s.cur();
                    if (
                      !opts.pureModule &&
                      la.type === Tag.Identifier &&
                      la.value.node.name === "require"
                    ) {
                      for (const j of s.sub())
                        if (j.pos === Tag.arguments) break;
                      const arg = [...s.one()];
                      // TODO: this requires a temp var
                      // since it may duplicate some side effects
                      yield* s.template(
                        i.pos,
                        "=$I(require($E),$E)",
                        { bind: true, expr: true },
                        unwrapSym
                      );
                      yield* arg;
                      yield* s.refocus();
                      yield* Kit.clone(arg);
                      yield* s.leave();
                      for (const j of s) if (j.value === i.value) break;
                      continue;
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
            yield s.enter(pos, Tag.ExpressionStatement);
            yield* s.template(
              Tag.expression,
              "=$I($E)",
              {
                bind: true,
                expr: true,
                brkDescr: i.value.node.loc,
                brkName: name
              },
              brk
            );
            /*
            yield s.enter(Block.op, {
              sym: brk,
              bindName: "brk",
              bind: true,
              brkDescr: i.value.node.loc,
              brkName: name
            });
            */
            yield s.tok(Tag.push, Tag.StringLiteral, {
              node: { value: name }
            });
            yield* position(i.value.node.loc);
            yield* s.leave();
            yield* s.leave();
          }
          function* wrap(i, bind, sym) {
            yield* s.template(i.pos, "=$I($E)", { bind, expr: true }, sym);
            yield s.peel(Kit.setPos(i, Tag.push));
            yield* _insertBreaks();
            yield* s.leave();
            yield* position(i.value.node.loc);
            yield* s.leave();
          }
        }
        function* configure() {
          for (const i of s) {
            if (i.enter) {
              switch (i.type) {
                case Tag.File:
                  if (opts.pureModule) break;
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
                  i.value.optsAssign = {
                    transform: true,
                    nodebug,
                    scopePrefix: true,
                    keepLastPure: "tail",
                    keepLastRaise: true,
                    inlinePureJumps: "tail",
                    inlineJsExceptions: true,
                    inlineTailCoerce: { singelton: "token" },
                    inlineContAssign: false,
                    injectFuncMeta: "meta",
                    inlinePureOp: false
                  };
                  if (nodebug)
                    Object.assign(i.value.optsAssign, {
                      scopePrefix: false,
                      inlinePureJumps: false,
                      inlineJsExceptions: false,
                      inlineTailCoerce: false,
                      injectFuncMeta: "syncMeta",
                      keepLastPure: false,
                      keepLastRaise: false,
                      inlinePureOp: "asis"
                    });
                  if (i.value.node.async || i.value.node.generator)
                    throw s.error(
                      "async and generator functions aren't supported yet"
                    );
                  break;
              }
            }
            yield i;
          }
        }
      }
    };
    function* position(loc) {
      if (!loc) {
        yield Kit.tok(Tag.push, Tag.NullLiteral);
        return;
      }
      const { start: f, end: l } = loc;
      const value = `${f.line}:${f.column}-${l.line}:${l.column}`;
      yield Kit.tok(Tag.push, Tag.StringLiteral, { node: { value } });
    }
    function collectStmtsLoc(si) {
      if (opts.blackbox) return si;
      const sa = Kit.toArray(si);
      const s = Kit.auto(sa);
      const root = s.first.value;
      const brks = (root.brksInfo = []);
      for (const i of s) {
        if (
          i.enter &&
          i.type === Block.letStmt &&
          i.value.eff &&
          i.value.goto
        ) {
          const la = s.cur().value;
          if (la.brkDescr)
            brks.push([la.brkName, la.brkDescr, i.value.goto.declSym]);
        }
      }
      return sa;
    }
    function injectScopeDescr(si) {
      if (opts.blackbox) return si;
      const s = Kit.auto(si);
      for (const i of s.first.value.scopes) {
        const args = i.metaArgs;
        const lab = s.label();
        args.push(
          i.funcId && i.funcId.strict
            ? s.tok(Tag.push, Tag.StringLiteral, {
                node: { value: i.funcId.orig }
              })
            : s.tok(Tag.push, Tag.NullLiteral),
          ...(i.node && i.node.loc
            ? position(i.node.loc)
            : [s.tok(Tag.push, Tag.NullLiteral)]),
          i.parentScope && i.parentScope.metaId
            ? s.tok(Tag.push, Tag.Identifier, { sym: i.parentScope.metaId })
            : s.tok(Tag.push, Tag.NullLiteral),
          s.enter(Tag.push, Tag.ObjectExpression),
          s.enter(Tag.properties, Tag.Array)
        );
        const flab = s.label();
        for (const j of i.scopeDecls) {
          if (!j.decl || !j.decl.value.node.loc || !j.fieldName) continue;
          let block = j.declRange;
          if (!block || !block.node.loc) continue;
          args.push(
            s.enter(Tag.push, Tag.ObjectProperty),
            s.tok(Tag.key, Tag.Identifier, { node: { name: j.fieldName } }),
            s.enter(Tag.value, Tag.ArrayExpression),
            s.enter(Tag.elements, Tag.Array),
            s.tok(Tag.push, Tag.StringLiteral, {
              node: { value: j.orig }
            }),
            ...position(j.decl.value.node.loc),
            ...position(block.node.loc),
            ...flab()
          );
        }
        args.push(...lab());
        if (i.brksInfo) {
          args.push(
            s.enter(Tag.push, Tag.ArrayExpression),
            s.enter(Tag.elements, Tag.Array)
          );
          for (const [name, loc, dest] of i.brksInfo) {
            args.push(
              s.enter(Tag.push, Tag.ArrayExpression),
              s.enter(Tag.elements, Tag.Array),
              s.tok(Tag.push, Tag.StringLiteral, { node: { value: name } }),
              ...position(loc),
              s.tok(Tag.push, Tag.NumericLiteral, {
                node: { value: dest.numConst }
              }),
              ...s.leave(),
              ...s.leave()
            );
          }
        }
        args.push(...lab());
      }
      return s;
    }
  }
);
