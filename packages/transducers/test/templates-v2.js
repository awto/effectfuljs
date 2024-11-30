import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { pipe } from "../v2/combinators";
import { Tag } from "../v2/types";
import * as Core from "../v2/core";
import * as Scope from "../v2/scope";
import { toks, template, emitConst } from "../v2/template";
import assert from "node:assert";

const gen = ast =>
  generate(ast, { retainLines: false, concise: true, quotes: "'" }).code;

const pretty = pipe(v => v.toString(), parse, gen);

const impl = pass =>
  pipe(
    i => i.toString(),
    parse,
    Core.produce,
    Core.resetFieldInfo,
    Scope.prepare,
    pass,
    Scope.resolve,
    Core.consume,
    gen
  );

describe("templates substitutions v2", function() {
  const code = `function a() {
    fn1("A");
    fn2("B"+"C","D");
    fn3("E"+fn4("F"),fn5("G"));
  }`;

  it("should substitute `toks` expression", function() {
    assert.strictEqual(
      impl(function(root) {
        for (const i of Core.dft(root)) {
          if (i.type === Tag.Identifier && i.pos === Tag.callee && i.sym)
            Core.replace(i, toks(i.pos, `=call($I)`, i.sym));
        }
        return root;
      })(code),
      pretty(`function a() {
        call(fn1)("A");
        call(fn2)("B" + "C", "D");
        call(fn3)("E" + call(fn4)("F"), call(fn5)("G"));
      }`)
    );
  });
  it("should substitute `emitConst` expressions", function() {
    assert.strictEqual(
      impl(function(root) {
        let num = 0;
        for (let i = root.firstChild, j; i !== root; i = j) {
          j = Core.next(i);
          if (i.type === Tag.StringLiteral)
            Core.replace(
              i,
              emitConst(i.pos, {
                str: { val: i.node.value },
                num: [num, ++num]
              })
            );
        }
        return root;
      })(code),
      pretty(`function a() {
        fn1({ str: { val: "A" }, num: [0, 1] });
        fn2(
          { str: { val: "B" }, num: [1, 2] } +
            { str: { val: "C" }, num: [2, 3] },
          { str: { val: "D" }, num: [3, 4] }
        );
        fn3(
          { str: { val: "E" }, num: [4, 5] } +
            fn4({ str: { val: "F" }, num: [5, 6] }),
          fn5({ str: { val: "G" }, num: [6, 7] })
        );
      }`)
    );
  });
  it("should substitute `template` expressions", function() {
    assert.strictEqual(
      impl(function(root) {
        let num = 0;
        for (const i of Core.dft(root)) {
          if (
            i.pos === Tag.arguments &&
            i.firstChild.type !== Tag.ObjectExpression
          ) {
            const [t, a, b] = template(Tag.push, `=({a:$E,b:$E})`);
            const na = i.firstChild;
            const nb =
              na.nextSibling === na
                ? Core.tok(Tag.value, Tag.NullLiteral, {})
                : Core.detach(na.nextSibling);
            na.pos = nb.pos = Tag.value;
            Core.detach(na);
            i.last = i;
            Core.replace(a, na);
            Core.replace(b, nb);
            Core.append(i, t);
          }
        }
        return root;
      })(code),
      pretty(`function a() {
        fn1({ a: "A", b: null });
        fn2({ a: "B" + "C", b: "D" });
        fn3({ a: "E" + fn4({ a: "F", b: null }), b: fn5({ a: "G", b: null }) });
      }`)
    );
  });
});
