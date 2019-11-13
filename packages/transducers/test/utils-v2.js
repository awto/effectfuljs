import { Tag } from "../v2/types";
import { produce, consume } from "../v2/core";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as T from "@babel/types";
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

function toStr(iter) {
  const a = Array.from(iter);
  a[0].pos = a[a.length - 1].pos = Tag.top;
  return generate(consume(a).top, { compact: true }).code;
}

function pretty(str) {
  return generate(parse(str), { compact: true }).code;
}

describe("iterator utils", function() {
  it("to follow array's semantics", function() {
    expect([...filter(i => i > 2, [1, 2, 3, 4, 5])]).to.eql([3, 4, 5]);
    expect([...flatMap(i => [i, i + 1], [1, 2, 3])]).to.eql([1, 2, 2, 3, 3, 4]);
    expect([...map(i => i * 10, [1, 2, 3])]).to.eql([10, 20, 30]);
    expect([...cons(1, cons(2, []))]).to.eql([1, 2]);
    let n = 0;
    forEach(i => (n += i), [1, 2, 3]);
    expect(n).to.equal(6);
    expect([...reverse([1, 2, 3])]).to.eql([3, 2, 1]);
    expect([...group([[1, 1], [1, 2], [2, 1], [2, 2]])]).to.eql([
      [1, [1, 2]],
      [2, [1, 2]]
    ]);
    expect(
      [...groupUniq([[1, 1], [1, 1], [2, 2], [2, 2]])].map(([k, v]) => [
        k,
        [...v]
      ])
    ).to.eql([[1, [1]], [2, [2]]]);
    expect([
      ...groupWith(
        [[1, 1], [1, 2], [2, 1], [2, 2]],
        (w, v) => (w.push(v), w),
        v => []
      )
    ]).to.eql([[1, [1, 2]], [2, [1, 2]]]);
  });
});
