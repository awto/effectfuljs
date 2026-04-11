import * as assert from "node:assert";
import * as path from "node:path";

import {
  installCancelablePromise,
  cancel,
  withCancellationCallbacks,
  currentCancellationCallbacks,
  addOnRollback,
  removeOnRollback,
  begin,
  commit,
  rollback,
} from "../cancelable-zone";

function freshPromiseImpl(): any {
  const pkgRoot = path.dirname(require.resolve("promise/package.json"));
  const clearCache = () => {
    for (const k of Object.keys(require.cache)) {
      if (k === pkgRoot || k.startsWith(pkgRoot + path.sep)) {
        delete require.cache[k];
      }
    }
  };
  clearCache();
  const impl = require("promise");
  clearCache();
  return impl;
}

function delayThenable<T>(
  ms: number,
  value: T,
  state: { canceled: number; finished: number },
  mode: "resolve" | "reject" = "resolve",
) {
  return {
    then(
      resolve: (v: T) => void,
      reject: (e: unknown) => void,
    ): void {
      const callbacks = currentCancellationCallbacks();
      if (!callbacks) {
        throw new Error("expected active cancellation context");
      }

      let off = () => {};

      const id = setTimeout(() => {
        off();
        state.finished++;
        if (mode === "resolve") resolve(value);
        else reject(value);
      }, ms);

      const cancelCallback = () => {
        state.canceled++;
        clearTimeout(id);
      };

      addOnRollback(cancelCallback);
      off = () => {
        removeOnRollback(cancelCallback);
      };
    },
  };
}

describe("cancelable-zone", function () {
  const Promise = installCancelablePromise(freshPromiseImpl());

  it("keeps cancellation scopes separated across asap flush", async function () {
    const a = new Set<() => void>();
    const b = new Set<() => void>();

    const p1 = withCancellationCallbacks(a, () =>
      Promise.resolve(1).then(() => {
        assert.strictEqual(currentCancellationCallbacks(), a);
      }),
    );
    const p2 = withCancellationCallbacks(b, () =>
      Promise.resolve(1).then(() => {
        assert.strictEqual(currentCancellationCallbacks(), b);
      }),
    );

    await p1;
    await p2;
  });

  it("supports begin/commit/rollback transaction semantics", async function () {
    const parent = new Set<() => void>();
    let called = 0;

    const tx = withCancellationCallbacks(parent, () => {
      const tx = begin("t1");
      tx.run(() => {
        addOnRollback(() => {
          called++;
        });
      });
      commit(tx);
      return tx;
    });

    cancel(parent);
    assert.equal(called, 1);

    assert.throws(() => rollback(tx), /Transaction is already finished/);
    assert.throws(() => commit(tx), /Transaction is already finished/);
  });

  it("defaults commit/rollback to the current Zone transaction", async function () {
    const parent = new Set<() => void>();
    let called = 0;

    withCancellationCallbacks(parent, () => {
      const tx = begin("t2");
      tx.run(() => {
        addOnRollback(() => {
          called++;
        });
        commit();
        rollback();
      });
    });
    assert.equal(called, 1);

    assert.throws(() => rollback(), /No active transaction/);
  });

  it("throws on double rollback", async function () {
    const parent = new Set<() => void>();
    let called = 0;

    const tx = withCancellationCallbacks(parent, () => {
      const tx = begin("t3");
      tx.run(() => {
        addOnRollback(() => {
          called++;
        });
      });
      commit(tx);
      return tx;
    });

    rollback(tx);
    assert.equal(called, 1);
    assert.throws(() => rollback(tx), /Transaction is already finished/);
  });

  it("cancels remaining promises in Promise.race", async function () {
    const s1 = { canceled: 0, finished: 0 };
    const s2 = { canceled: 0, finished: 0 };

    const callbacks = new Set<() => void>();
    const value = await withCancellationCallbacks(callbacks, () => {
      const p1 = delayThenable(5, 1, s1, "resolve");
      const p2 = delayThenable(50, 2, s2, "resolve");
      return Promise.race([p1, p2]);
    });
    assert.equal(value, 1);

    await new globalThis.Promise((r) => setTimeout(r, 0));

    assert.equal(s1.canceled, 0);
    assert.equal(s2.canceled, 1);
  });

  it("cancels remaining promises in Promise.all on rejection", async function () {
    const s1 = { canceled: 0, finished: 0 };
    const s2 = { canceled: 0, finished: 0 };
    const s3 = { canceled: 0, finished: 0 };

    try {
      const callbacks = new Set<() => void>();
      await withCancellationCallbacks(callbacks, () => {
        const p1 = delayThenable(5, 1, s1, "resolve");
        const p2 = delayThenable(10, new Error("boom"), s2, "reject");
        const p3 = delayThenable(50, 3, s3, "resolve");
        return Promise.all([p1, p2, p3]);
      });
      assert.fail("expected rejection");
    } catch (e) {
      assert.equal((e as Error).message, "boom");
    }

    await new globalThis.Promise((r) => setTimeout(r, 0));

    assert.equal(s3.canceled, 1);
    assert.equal(s2.canceled, 0);
  });

  it("propagates cancellation from parent into combinator scope", async function () {
    const s1 = { canceled: 0, finished: 0 };
    const s2 = { canceled: 0, finished: 0 };

    const parent = new Set<() => void>();
    const p = withCancellationCallbacks(parent, () =>
      Promise.race([delayThenable(50, 1, s1), delayThenable(60, 2, s2)]),
    );

    cancel(parent);
    await new globalThis.Promise((r) => setTimeout(r, 10));

    assert.equal(s1.canceled, 1);
    assert.equal(s2.canceled, 1);
    assert.equal(s1.finished, 0);
    assert.equal(s2.finished, 0);
    await new globalThis.Promise((r) => setTimeout(r, 70));
    assert.equal(s1.finished, 0);
    assert.equal(s2.finished, 0);
    void p;
  });
});
