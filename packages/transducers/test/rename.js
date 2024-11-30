import { produce, consume, Tag, symbol } from "..";
import * as Kit from "../kit";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import assert from "node:assert";

const Scope = symbol("Scope", "ctrl");

const subst = Kit.curry(function* subst(dict, s) {
  for (const i of s) {
    switch (i.type) {
      case Tag.Identifier:
        const n = dict[i.value.node.name];
        if (n) {
          if (i.enter) yield* produce(n, i.pos);
          continue;
        }
        break;
      case Scope:
        if (i.enter) {
          dict = Object.create(dict);
          for (const j in i.value) dict[j] = false;
        } else dict = Object.getPrototypeOf(dict);
        break;
    }
    yield i;
  }
});

function* scope(s) {
  let inScope = null,
    buf = null;
  const stack = [];
  for (const i of s) {
    switch (i.type) {
      case Tag.FunctionExpression:
      case Tag.FunctionDeclaration:
        if (i.enter) {
          inScope = {};
          stack.push(inScope);
          buf = [];
          for (let j of i.value.node.params) {
            if (j.name) inScope[j.name] = false;
          }
          // it needs to scan whole function because variable declaration
          // may be defined after variable usage
          buf.push({
            enter: true,
            leave: false,
            pos: false,
            value: inScope,
            type: Scope
          });
          buf.push(i);
        } else {
          stack.pop();
          if (stack.length === 0) {
            for (let j of buf) yield j;
            buf = null;
          }
          yield i;
          yield { enter: false, leave: true, pos: false, value: inScope };
          inScope = Object.getPrototypeOf(inScope);
        }
        continue;
      case Tag.VariableDeclaration:
        if (i.enter && inScope) {
          for (const { id } of i.value.node.declarations)
            if (id.name) inScope[id.name] = true;
        }
        break;
    }
    if (buf) buf.push(i);
    else yield i;
  }
}

const filter = Kit.curry(function* filter(pred, s) {
  for (let i of s) {
    if (pred(i)) yield i;
  }
});

const rename = Kit.pipe(
  parse,
  produce,
  scope,
  subst({ i: { type: "Identifier", name: "j" } }),
  consume,
  v => v.top,
  generate,
  v => v.code
);

function pretty(txt) {
  return generate(parse(txt)).code;
}

describe("transducers composition", function() {
  it("rename", function() {
    assert.strictEqual(rename(`var i;`), pretty(`var j;`));
    assert.strictEqual(rename(`i;`), pretty(`j;`));
    assert.strictEqual(rename(`function a() { return i; }`), pretty(`function a() { return j; }`));
    assert.strictEqual(
      rename(`
                  i + k;
                  `),
      pretty(`
                                      j + k;
                                      `)
    );
    assert.strictEqual(
      rename(`
                  console.log(i + k);
                  `),
      pretty(`
                                      console.log(j + k);
                                      `)
    );
    assert.strictEqual(
      rename(`
                  console.log(i + k);
                  function a() {
                    var i;
                    console.log(i + k);
                  }
                  `),
      pretty(`
                                       console.log(j + k);
                                       function a() {
                                         var i;
                                         console.log(i + k);
                                       }`)
    );
    assert.strictEqual(
      rename(`
                  console.log(i + k);
                  function a(i) {
                    console.log(i + k);
                  }
                  `),
      pretty(`
                                      console.log(j + k);
                                      function a(i) {
                                        console.log(i + k);
                                      }`)
    );
  });
});
