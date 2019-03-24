module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets }) => {
    return {
      options: {
        ...presets.defunct,
        name: "@effectful/debugger",
        importRT: opts.importRT || "@effectful/debugger",
        contextBy: "this",
        par: false,
        topLevel: true,
        topIIFE: !opts.pureModule,
        contextState: true,
        inlinePureJumps: "tail",
        inlineJsExceptions: true,
        modules: "commonjs",
        scopeConstructor: "frame",
        wrapFunction: "func",
        injectModuleMeta: "module",
        injectFuncMeta: "meta",
        defunctHandlerInProto: true,
        esForOf: true,
        esForAwaitOf: true,
        // varStorageField: "$",
        // closureStorageField: "$$",
        closVarPrefix: "",
        closVarPostfix: "",
        inlineRaiseOp: null,
        passNewTarget: true,
        before: {
          meta: injectScopeDescr
        },
        contextMethodOpsSpec: {
          constr: false,
          brk: false,
          iterator: false,
          asyncIterator: false,
          forInIterator: false
        },
        ...opts
      },
      main(input) {
        const s = Kit.auto(input);
        const objWrap = Kit.sysId("constr");
        const brk = Kit.sysId("brk");
        T.run(insertBreaks(P.propagateOpts(configure())));
        function insertBreaks(si) {
          const s = Kit.auto(si);
          return _insertBreaks();
          function* _insertBreaks() {
            for (const i of s.sub()) {
              if (i.enter && s.opts.transform) {
                switch (i.type) {
                  case Tag.VariableDeclaration:
                    if (i.pos === Tag.left) break;
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
                    if (opts.blackbox) break;
                    const lab = s.label();
                    if (i.pos !== Tag.push) {
                      yield s.enter(i.pos, Tag.BlockStatement);
                      yield s.enter(Tag.body, Tag.Array);
                    }
                    if (i.value.node.loc)
                      yield* brkStmt(Tag.push, i, "statement");
                    yield s.peel(Kit.setPos(i, Tag.push));
                    if (!i.leave) yield* _insertBreaks();
                    yield* lab();
                    continue;
                  case Tag.DebuggerStatement:
                    if (opts.blackbox) break;
                    yield* brkStmt(i.pos, i, "debugger");
                    s.close(i);
                    continue;
                  case Tag.CallExpression:
                    if (s.opts.wrapCalls) {
                      if (!i.value.node.loc) break;
                      yield* wrap(i, true, "after-call");
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
              { bind: true, expr: true },
              brk
            );
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
                case Tag.ClassMethod:
                case Tag.ClassPrivateMethod:
                  i.value.optsAssign = {
                    transform: i.value.node.kind === "method"
                  };
                  break;
                case Tag.FunctionDeclaration:
                case Tag.File:
                case Tag.FunctionExpression:
                case Tag.ArrowFunctionExpression:
                case Tag.ObjectMethod:
                  i.value.optsAssign = {
                    transform: !i.value.node.async && !i.value.node.generator
                  };
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
    function injectScopeDescr(si) {
      if (opts.blackbox) return si;
      const sa = Kit.toArray(si);
      const s = Kit.auto(sa);
      for (const i of s) {
        if (
          i.enter &&
          i.value.wrapId &&
          i.value.scopeDecls &&
          i.value.scopeDecls.size
        ) {
          const args = i.value.metaArgs;
          const lab = s.label();
          args.push(
            s.enter(Tag.push, Tag.ObjectExpression),
            s.enter(Tag.properties, Tag.Array)
          );
          const flab = s.label();
          for (const j of i.value.scopeDecls) {
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
        }
      }
      return sa;
    }
  }
);
