module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets }) => ({
    options: {
      ...presets.defunct,
      name: "@effectful/debugger",
      importRT: "@effectful/debugger",
      contextBy: "this",
      par: false,
      topLevel: true,
      topIIFE: true,
      contextState: true,
      inlinePureJumps: "tail",
      inlineJsExceptions: true,
      modules: "commonjs",
      wrapFunction: "fun",
      injectModuleDescr: "module",
      ...opts
    },
    main(input) {
      const s = Kit.auto(input);
      const stmtbrk = Kit.sysId("stmt");
      const debbrk = Kit.sysId("debugger");
      const callBrk = Kit.sysId("call");
      const objWrap = Kit.sysId("constr");
      T.run(insertBreaks(P.propagateOpts(configure())));
      function insertBreaks(si) {
        const s = Kit.auto(si);
        return _insertBreaks();
        function* _insertBreaks() {
          for (const i of s.sub()) {
            if (i.enter && s.opts.transform) {
              switch (i.type) {
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
                case Tag.VariableDeclaration:
                case Tag.ExpressionStatement:
                case Tag.WithStatement:
                  const lab = s.label();
                  if (i.pos !== Tag.push) {
                    yield s.enter(i.pos, Tag.BlockStatement);
                    yield s.enter(Tag.body, Tag.Array);
                  }
                  yield* brkStmt(i, stmtbrk);
                  yield s.peel(Kit.setPos(i, Tag.push));
                  if (!i.leave) yield* _insertBreaks();
                  yield* lab();
                  continue;
                case Tag.DebuggerStatement:
                  yield* brkStmt(i, debbrk);
                  s.close(i);
                  continue;
                case Tag.CallExpression:
                  yield* wrap(i, true, callBrk);
                  continue;
                case Tag.ObjectExpression:
                case Tag.ArrayExpression:
                case Tag.NewExpression:
                  yield* wrap(i, false, objWrap);
                  continue;
              }
            }
            yield i;
          }
        }
        function* position(i) {
          const { start: f, end: l } = i.value.node.loc;
          const value = `${f.line}:${f.column}-${l.line}:${l.column}`;
          yield s.tok(Tag.push, Tag.StringLiteral, { node: { value } });
        }
        function* brkStmt(i, sym) {
          yield s.enter(i.pos, Tag.ExpressionStatement);
          yield* s.template(Tag.expression, "=$I($E)", { bind: true }, sym);
          yield* position(i);
          yield* s.leave();
          yield* s.leave();
        }
        function* wrap(i, bind, sym) {
          yield* s.template(i.pos, "=$I($E)", { bind }, sym);
          yield s.peel(Kit.setPos(i, Tag.push));
          yield* _insertBreaks();
          yield* s.leave();
          yield* position(i);
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
  })
);
