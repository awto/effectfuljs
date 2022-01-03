import * as R from "../index";
import * as assert from "assert";

async function hanging() {
  await new Promise(() => {});
}

async function hangingNoThrow() {
  try {
    await hanging();
  } catch (e) {
    return e;
  }
}

async function* hangingGen() {
  await hanging();
}

async function* hangingGenNoThrow() {
  try {
    await hanging();
  } catch (e) {
    yield e;
  }
}

function testDone(done, delayed) {
  delayed.then(() => done(), done);
}

describe("cancelation", function () {
  it("cancels a single async function", function (done) {
    const val = hanging();
    R.cancel(val);
    testDone(
      done,
      val.then(
        _ => assert.fail("should be rejected"),
        e => assert.strictEqual(e.constructor, R.CancelToken)
      )
    );
  });
  it("cancels a single async generator function", function (done) {
    const gen = hangingGen();
    testDone(
      done,
      gen.next().then(
        _ => assert.fail("should be rejected"),
        e => assert.strictEqual(e.constructor, R.CancelToken)
      )
    );
    R.cancel(gen);
  });
  it("throws an exception into an async function", function (done) {
    const val = hangingNoThrow();
    R.cancel(val);
    testDone(
      done,
      val.then(v => assert.strictEqual(v.constructor, R.CancelToken))
    );
  });
  it("throws an exception into an async generator function", function (done) {
    const gen = hangingGenNoThrow();
    testDone(
      done,
      gen.next().then(v => {
        assert.strictEqual(v.done, false);
        assert.strictEqual(v.value.constructor, R.CancelToken);
      })
    );
    R.cancel(gen);
  });
  for (const fun of [R.all, R.allWithCancel])
    it(`cancels \`${fun.name}\` children if the whole is cancelled`, function (done) {
      const threads = [hangingNoThrow(), hangingNoThrow()];
      const val = fun(threads);
      R.cancel(val);
      testDone(
        done,
        val.then(vals => {
          assert.strictEqual(vals.length, threads.length);
          for (const i of vals)
            assert.strictEqual(i.constructor, R.CancelToken);
        })
      );
    });
  for (const fun of [R.any, R.anyWithCancel])
    it(`cancels \`${fun.name}\` children if the whole is cancelled`, function (done) {
      const threads = [hangingNoThrow(), hangingNoThrow()];
      const val = fun(threads);
      R.cancel(val);
      testDone(
        done,
        val.then(val => assert.strictEqual(val.constructor, R.CancelToken))
      );
    });
  for (const [fun, rejected] of [
    [R.anyWithCancel, true],
    [R.anyWithCancel, false],
    [R.allWithCancel, true]
  ])
    it(`cancels the rest \`${fun.name}\` children after one of them is ${
      rejected ? "rejected" : "resolved"
    }`, function (done) {
      let cb;
      let exit = new Promise(i => (cb = i));
      async function hangingNoThrow() {
        try {
          await hanging();
        } catch (e) {
          assert.strictEqual(e.constructor, R.CancelToken);
        }
        cb();
      }
      const threads = [new R.Residual(), hangingNoThrow()];
      let val = fun(threads);
      if (rejected)
        val = val.then(
          () => assert.fail("should be rejected"),
          e => e
        );
      const ret = {};
      threads[0][rejected ? "reject" : "resume"](ret);
      testDone(
        done,
        Promise.all([val, exit]).then(([val]) => {
          assert.strictEqual(val, ret);
        })
      );
    });
});
