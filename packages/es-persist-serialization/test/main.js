import * as R from "../index";
import * as assert from "assert";

describe("serialization", function() {
  it("should deeply clone control state", function(done) {
    let called = 0;
    function reject(e) {
      done(e);
    }
    function resume() {
      done();
    }
    R.regOpaqueObject(reject);
    R.regOpaqueObject(resume);
    const state = {};
    R.regOpaqueObject(state);
    async function main() {
      async function thread() {
        let i = 0;
        i++;
        await new Promise(i => setTimeout(i, 0));
        const cur = await R.current;
        if (cur && cur.resume) {
          state.value = R.write(cur);
        } else {
          assert.strictEqual(cur, 2);
          assert.ok(state.value);
          assert.strictEqual(i, 1);
          called++;
        }
        i++;
        return i;
      }
      assert.strictEqual(await thread(), 2);
      if (called) await R.abort;
      assert.ok(state);
      const next = R.read(state.value);
      next.resume(2);
      await next.cont;
    }
    main()[R.awaitSymbol]({ resume, reject });
  });
});
