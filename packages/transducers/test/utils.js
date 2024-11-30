import { produce, consume, Tag } from "..";
import * as Kit from "../kit";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import assert from "node:assert";

function toStr(iter) {
  const a = Array.from(iter);
  a[0].pos = a[a.length - 1].pos = Tag.top;
  return generate(consume(a).top, { compact: true }).code;
}

function pretty(str) {
  return generate(parse(str), { compact: true }).code;
}

describe("pack", function() {
  it("should keep only interesting elements in the stream", function() {
    const prog = `
        function a() {
          {
            console.log(i)
            console.log(j)
          }
          let k = i + j
          console.log(k) 
        }`;
    const s = produce(parse(prog));
    const packed = [...Kit.pack(i => i.type === Tag.BlockStatement, s)];
    let numBlocks = 0;
    let numPacks = 0;
    let others = 0;
    for (const i of packed) {
      if (i.type === Tag.BlockStatement) numBlocks++;
      else if (i.type === Kit.packed) numPacks++;
      else others++;
    }
    assert.strictEqual(numBlocks, 4);
    assert.strictEqual(numPacks, 5);
    assert.strictEqual(others, 0);
    assert.strictEqual(toStr(Kit.unpack(packed)), pretty(prog));
  });
});

describe("iterator utils", function() {
  it("to follow array's semantics", function() {
    assert.deepStrictEqual([...Kit.filter(i => i > 2, [1, 2, 3, 4, 5])], [3, 4, 5]);
    assert.deepStrictEqual([...Kit.flatMap(i => [i, i + 1], [1, 2, 3])], [
      1,
      2,
      2,
      3,
      3,
      4
    ]);
    assert.deepStrictEqual([...Kit.map(i => i * 10, [1, 2, 3])], [10, 20, 30]);
    assert.deepStrictEqual([...Kit.cons(1, Kit.cons(2, []))], [1, 2]);
    const [h, r] = Kit.la([1, 2, 3]);
    assert.strictEqual(h, 1);
    assert.deepStrictEqual([...r], [1, 2, 3]);
    let n = 0;
    Kit.forEach(i => (n += i), [1, 2, 3]);
    assert.strictEqual(n, 6);
    assert.deepStrictEqual([...Kit.reverse([1, 2, 3])], [3, 2, 1]);
    assert.deepStrictEqual([...Kit.group([[1, 1], [1, 2], [2, 1], [2, 2]])], [
      [1, [1, 2]],
      [2, [1, 2]]
    ]);
    assert.deepStrictEqual(
      [...Kit.groupUniq([[1, 1], [1, 1], [2, 2], [2, 2]])].map(([k, v]) => [
        k,
        [...v]
      ]),
      [[1, [1]], [2, [2]]]
    );
    assert.deepStrictEqual(
      [
        ...Kit.groupWith(
          [[1, 1], [1, 2], [2, 1], [2, 2]],
          (w, v) => (w.push(v), w),
          v => []
        )
      ],
      [[1, [1, 2]], [2, [1, 2]]]
    );
  });
});

describe("empty expressions cleaner", function() {
  it("should remove any useless identifier only expressions", function() {
    const prog = `
        function a() {
          console.log((i,j),(i,k=10,(i,j)));
          i, j = 10, k, m;
          i;
          i, j, k;
          return i, j, k; 
        }`;
    function* ignoreIds(s) {
      for (const i of s) {
        if (i.enter && i.type === Tag.Identifier) i.value.canIgnore = true;
        yield i;
      }
    }
    const res = toStr(
      Kit.cleanEmptyExprs(Array.from(ignoreIds(produce(parse(prog)))))
    );
    assert.strictEqual(
      res,
      pretty(`
      function a() {
        console.log(j,(k=10,j));
        j=10;
        return k;
      }`)
    );
  });
});
