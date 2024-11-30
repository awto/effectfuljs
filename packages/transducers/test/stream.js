import { produce, consume, Tag } from "..";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as T from "@babel/types";
import * as Kit from "../kit";
import * as Trace from "../trace";
import assert from "node:assert";

describe("lookahead iterator", function() {
  const COUNT = 1000; // ensuring no stack overflows
  it("should provide access to the next element", function() {
    const buf = Array.from(Array(COUNT + 1).keys());
    const s = Kit.auto(buf);
    assert.strictEqual(s.cur(), 0);
    let res = 0;
    for (const i of s) {
      if (i === COUNT) {
        assert.strictEqual(s.cur(), undefined);
      } else {
        assert.strictEqual(s.cur(), i + 1);
      }
    }
  });
  context("with array container", function() {
    it("should provide access to the next element", function() {
      const buf = Array.from(Array(COUNT + 1).keys());
      const s = Kit.auto(buf);
      assert.strictEqual(s.cur(), 0);
      let res = 0;
      for (const i of s) {
        if (i === COUNT) {
          assert.strictEqual(s.cur(), undefined);
        } else {
          assert.strictEqual(s.cur(), i + 1);
        }
      }
    });
  });
});

function toStr(iter) {
  const a = Array.from(iter);
  a[0].pos = a[a.length - 1].pos = Tag.top;
  return generate(consume(a).top, { compact: true }).code;
}

function compact(str) {
  return generate(parse(str), { compact: true }).code;
}

describe("scoped output", function() {
  function* gen() {
    const s = Kit.auto();
    const lab = s.label();
    yield s.enter(Tag.top, Tag.FunctionExpression);
    yield s.enter(Tag.params, Tag.Array);
    yield* s.leave();
    yield s.enter(Tag.body, Tag.BlockStatement);
    yield s.enter(Tag.body, Tag.Array);
    yield s.enter(Tag.push, Tag.ReturnStatement);
    yield s.tok(Tag.argument, T.numericLiteral(10));
    yield* lab();
  }
  it("should auto close all opened elements", function() {
    assert.strictEqual(toStr(gen()), "function(){return 10;}");
  });
});

describe("hierarchical iterator", function() {
  const prog = `
    function a() {
      const i = 10, j = 20
      {
        console.log(i)
        console.log(j)
      }
      let k = i + j
      console.log(k) 
    }`;
  it("should be able to traverse sub-levels", function() {
    const s = Kit.auto(produce(parse(prog)));
    let cnt = 0;
    assert.strictEqual(s.cur().type, Tag.File);
    for (const i of s) {
      if (i.enter && i.type === Tag.Array && i.pos === Tag.body) {
        assert.strictEqual(s.level, 3);
        assert.strictEqual(s.cur().type, Tag.FunctionDeclaration);
        for (const j of s.one()) {
          if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
            assert.strictEqual(s.cur().type, Tag.VariableDeclaration);
            assert.strictEqual(toStr(s.one()), "const i=10,j=20;");
            assert.strictEqual(s.cur().type, Tag.BlockStatement);
            for (const j of s.one()) {
              if (j.enter && j.type === Tag.Array && j.pos === Tag.body) {
                cnt++;
                assert.strictEqual(s.cur().type, Tag.ExpressionStatement);
                const j = [
                  s.enter(Tag.top, Tag.BlockStatement),
                  s.enter(Tag.body, Tag.Array),
                  ...s.sub(),
                  ...s.leave(),
                  ...s.leave()
                ];
                assert.strictEqual(s.curLev(), null);
                assert.strictEqual([...s.one()].length, 0);
                assert.strictEqual([...s.sub()].length, 0);
                assert.strictEqual(toStr(j), "{console.log(i);console.log(j);}");
              }
            }
            assert.strictEqual(s.curLev().type, Tag.VariableDeclaration);
            assert.strictEqual(s.cur().type, Tag.VariableDeclaration);
            const j = [
              s.enter(Tag.top, Tag.BlockStatement),
              s.enter(Tag.body, Tag.Array),
              ...s.sub(),
              ...s.leave(),
              ...s.leave()
            ];
            assert.strictEqual(toStr(j), "{let k=i+j;console.log(k);}");
            assert.strictEqual(s.cur().type, Tag.Array);
            assert.strictEqual(s.curLev(), null);
            assert.strictEqual([...s.sub()].length, 0);
            assert.strictEqual([...s.one()].length, 0);
          }
        }
      }
    }
    assert.strictEqual(cnt, 1);
  });
  context("with peel", function() {
    it("should manage input levels", function() {
      let cnt = 0;
      const s = Kit.auto(produce(parse(prog)));
      assert.strictEqual(s.cur().type, Tag.File);
      const i = [
        ...(function*() {
          const exit = s.label();
          yield s.peel();
          assert.strictEqual(s.cur().type, Tag.Program);
          yield s.peel();
          yield* s.peelTo(Tag.body);
          assert.strictEqual(s.cur().type, Tag.FunctionDeclaration);
          yield s.peel();
          yield* s.peelTo(Tag.body);
          assert.strictEqual(s.cur().type, Tag.Array);
          yield* s.peelTo(Tag.body);
          assert.strictEqual(s.cur().type, Tag.VariableDeclaration);
          yield* s.one();
          const iflab = s.label();
          assert.strictEqual(s.cur().type, Tag.BlockStatement);
          const j = s.peel();
          assert.strictEqual(s.cur().type, Tag.Array);
          yield j;
          yield* s.peelTo(Tag.body);
          assert.strictEqual(s.curLev().pos, Tag.push);
          yield s.enter(Tag.push, Tag.IfStatement);
          yield s.tok(Tag.test, T.identifier("i"));
          yield s.enter(Tag.consequent, Tag.BlockStatement);
          yield s.enter(Tag.body, Tag.Array);
          yield* s.sub();
          yield* iflab();
          yield* s.sub();
          yield* exit();
        })()
      ];
      assert.strictEqual(toStr(i), compact(`function a(){
        const i=10,j=20;
        {
            if(i) {
              console.log(i);
              console.log(j);
            }
        }
        let k=i+j;
        console.log(k);
      }`));
      let sn = Kit.auto(i);
      for (const j of sn) {
        if (j.pos === Tag.test) {
          cnt++;
          sn.peel(j);
          assert.strictEqual([...sn.sub()].length, 0);
          Kit.skip(sn.leave());
          assert.strictEqual([...sn.sub()].length, 32);
        }
      }
      sn = Kit.auto(i);
      for (const j of sn) {
        if (j.pos === Tag.test) {
          cnt++;
          assert.strictEqual([...sn.sub()].length, 32);
        }
      }
      assert.strictEqual(cnt, 2);
    });
  });
});

describe("template", function() {
  const s = Kit.auto();
  it("should fill the placeholders", function() {
    function* gen() {
      const s = Kit.auto();
      const fpos = yield* s.template(
        Tag.top,
        `
        function $_(a,$_) {
          $_
          console.log($_)
          $E
        }
      `
      );
      yield s.tok(fpos, T.identifier("F"));
      yield s.tok(yield* s.refocus(), T.identifier("X"));
      yield* s.toks(
        yield* s.refocus(),
        `*
                              console.log("hi")
                              console.log("there")`
      );
      yield* s.toks(yield* s.refocus(), `=a + b`);
      yield* s.toks(yield* s.refocus(), `=a = b`);
      yield* s.leave();
    }
    const res =
      'function F(a,X){console.log("hi");' +
      'console.log("there");console.log(a+b);a=b;}';
    assert.strictEqual(toStr(gen()), res);
    assert.strictEqual(toStr(gen()), res);
  });
});
