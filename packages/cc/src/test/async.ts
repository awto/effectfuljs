import _ctrl from "@effectful/js/macro";
import { reflect, reify } from "../async";
import * as assert from "assert";

describe("async functions", function () {
  it("should wait for promises", function () {
    return reflect(function () {
      const a = reify(Promise.resolve(1));
      assert.equal(a, 1);
      const b = reify(Promise.resolve(2));
      assert.equal(b, 2);
    });
  });
  it("should throw an exception", function () {
    return reflect(function () {
      try {
        reify(Promise.reject(new Error("test")));
        assert.fail("should throw an exception");
      } catch (e) {
        assert.equal((e as Error).message, "test");
      }
    });
  });
});
