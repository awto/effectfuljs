import { Tag } from "../core";
import * as Kit from "../kit";

export default Kit.pipe(
  Kit.wrap("instrumentation", function(s) {
    let curId = 0;
    const src = (s.opts.file && s.opts.file.filenameRelative) || "?";
    function* walk(pn, fv) {
      for (const i of s.sub()) {
        switch (i.type) {
          case Tag.Identifier:
            //TODO: needs checking if arguments variable not in scope
            if (
              fv != null &&
              i.pos !== Tag.key &&
              i.pos !== Tag.property &&
              i.value.node.name === "arguments"
            ) {
              fv.hasArgs = true;
              Kit.skip(s.copy(i));
              yield s.tok(i.pos, Tag.Identifier, {
                node: { name: "e$y$arguments" }
              });
              continue;
            }
            break;
          case Tag.ThisExpression:
            if (fv) {
              fv.hasThis = true;
              Kit.skip(s.copy(i));
              yield s.tok(i.pos, Tag.Identifier, {
                node: { name: "e$y$this" }
              });
            }
            continue;
          case Tag.Class:
          case Tag.ClassDeclaration:
            if (i.enter) {
              if (i.value.node.id != null) {
                yield i;
                yield* walk(pn.concat([i.value.node.id.name]));
                continue;
              }
            }
            break;
          case Tag.FunctionDeclaration:
          case Tag.FunctionExpression:
          case Tag.ObjectMethod:
          case Tag.ClassMethod:
          case Tag.ArrowFunctionExpression:
            if (i.enter) {
              const n = i.value.node;
              if (Kit.hasAnnot(n, "@NOPROF")) break;
              let nm,
                sn,
                ln = "?",
                id = n.id || n.key;
              if (id != null && id.name != null) {
                sn = id.name;
              } else {
                sn = `F${curId++}`;
              }
              const nl = pn.concat(sn);
              nm = nl.join(".");
              nm += "@" + src;
              if (n.loc != null) {
                ln = `${n.loc.start.line}[${n.loc.start.column}]`;
              }
              const lab = s.label();
              yield s.peel(i);
              const j = yield* s.findPos(Tag.body);
              const expr = j.type !== Tag.BlockStatement;
              if (expr) {
                i.value.node.expression = false;
                yield s.enter(Tag.body, Tag.BlockStatement);
                yield s.enter(Tag.body, Tag.Array);
              } else {
                yield s.peel(j);
                yield* s.peelTo(Tag.body);
              }
              yield s.enter(Tag.push, Tag.ReturnStatement);
              yield s.enter(Tag.argument, Tag.CallExpression);
              yield s.tok(Tag.callee, Tag.Identifier, {
                node: { name: n.generator ? "e$y$prof$g" : "e$y$prof" }
              });
              yield s.enter(Tag.arguments, Tag.Array);
              yield s.tok(Tag.push, Tag.StringLiteral, { node: { value: nm } });
              yield s.tok(Tag.push, Tag.StringLiteral, { node: { value: ln } });
              yield s.enter(Tag.push, Tag.FunctionExpression, {
                node: { params: [], generator: n.generator }
              });
              n.generator = false;
              yield s.enter(Tag.body, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
              if (expr) {
                yield s.enter(Tag.push, Tag.ReturnStatement);
                yield s.peel(Kit.setPos(j, Tag.argument));
              }
              yield* walk(nl, i.value);
              yield* lab();
              continue;
            }
            break;
        }
        yield i;
      }
    }
    return walk([]);
  }),
  Array.from,
  //TODO: common pass
  Kit.wrap("instrumentation-spec-vars", function(s) {
    function* walk() {
      for (const i of s.sub()) {
        yield i;
        if (i.enter) {
          switch (i.type) {
            case Tag.FunctionDeclaration:
            case Tag.FunctionExpression:
            case Tag.ArrowFunctionExpression:
            case Tag.ClassMethod:
            case Tag.ObjectMethod:
              if (i.value.hasThis || i.value.hasArgs) {
                const lab = s.label();
                yield* s.peelTo(Tag.body);
                yield* s.peelTo(Tag.body);
                //TODO: uniq names
                if (i.value.hasThis)
                  yield* s.toks(Tag.push, "const e$y$this = this");
                if (i.value.hasArgs)
                  yield* s.toks(Tag.push, "const e$y$arguments = arguments");
                yield* walk(true);
                yield* lab();
              }
              break;
          }
        }
      }
    }
    return walk(false);
  })
);
