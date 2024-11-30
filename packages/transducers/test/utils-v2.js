import { Tag } from "../v2/types";
import { consume } from "../v2/core";
import generate from "@babel/generator";
import {
  filter,
  flatMap,
  forEach,
  map,
  cons,
  reverse,
  group,
  groupUniq,
  groupWith
} from "../v2/combinators";
import assert from "node:assert";

describe("iterator utils v2", function() {
  it("to follow array's semantics", function() {
    assert.deepStrictEqual([...filter(i => i > 2, [1, 2, 3, 4, 5])], [3, 4, 5]);
    assert.deepStrictEqual([...flatMap(i => [i, i + 1], [1, 2, 3])], [1, 2, 2, 3, 3, 4]);
    assert.deepStrictEqual([...map(i => i * 10, [1, 2, 3])], [10, 20, 30]);
    assert.deepStrictEqual([...cons(1, cons(2, []))], [1, 2]);
    let n = 0;
    forEach(i => (n += i), [1, 2, 3]);
    assert.strictEqual(n, 6);
    assert.deepStrictEqual([...reverse([1, 2, 3])], [3, 2, 1]);
    assert.deepStrictEqual([...group([[1, 1], [1, 2], [2, 1], [2, 2]])], [
      [1, [1, 2]],
      [2, [1, 2]]
    ]);
    assert.deepStrictEqual(
      [...groupUniq([[1, 1], [1, 1], [2, 2], [2, 2]])].map(([k, v]) => [
        k,
        [...v]
      ]),
      [[1, [1]], [2, [2]]]
    );
    assert.deepStrictEqual(
      [
        ...groupWith(
          [[1, 1], [1, 2], [2, 1], [2, 2]],
          (w, v) => (w.push(v), w),
          v => []
        )
      ],
      [[1, [1, 2]], [2, [1, 2]]]
    );
  });
});
