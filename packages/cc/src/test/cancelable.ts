import * as assert from "node:assert";
import * as path from "node:path";
import {
  installCancelablePromise,
  cancel,
  withCancellationCallbacks,
  currentCancellationCallbacks,
  getCancellationCallbacks,
  setCancellationCallbacks,
} from "../cancelable";

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

      callbacks.add(cancelCallback);
      off = () => {
        callbacks.delete(cancelCallback);
      };
    },
  };
}

describe("cancelable", function () {
  const Promise = installCancelablePromise(freshPromiseImpl());

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

  it("cancels remaining promises in Promise.any after first fulfillment", async function () {
    const s1 = { canceled: 0, finished: 0 };
    const s2 = { canceled: 0, finished: 0 };
    const s3 = { canceled: 0, finished: 0 };

    const callbacks = new Set<() => void>();
    const v = await withCancellationCallbacks(callbacks, () => {
      const p1 = delayThenable(5, new Error("nope"), s1, "reject");
      const p2 = delayThenable(10, 2, s2, "resolve");
      const p3 = delayThenable(50, 3, s3, "resolve");
      return Promise.any([p1, p2, p3]);
    });
    assert.equal(v, 2);

    await new globalThis.Promise((r) => setTimeout(r, 0));

    assert.equal(s3.canceled, 1);
    assert.equal(s2.canceled, 0);
  });

  it("propagates cancellation context through then", async function () {
    let called = 0;
    const callbacks: Set<() => void> = new Set<() => void>();
    const p0 = Promise.resolve(1);
    setCancellationCallbacks(p0, callbacks);
    const p1 = p0.then(() => {
      const current = currentCancellationCallbacks();
      if (!current) {
        throw new Error("expected active cancellation context");
      }
      assert.strictEqual(current, callbacks);
      current.add(() => {
        called++;
      });
    });
    assert.strictEqual(getCancellationCallbacks(p1), callbacks);
    await p1;
    cancel(callbacks);
    assert.equal(called, 1);
  });

  it("propagates cancellation from parent set into combinator call set", async function () {
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
