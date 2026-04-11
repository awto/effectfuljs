export type CancellationCallback = () => void;
export type CancellationCallbacks = Set<CancellationCallback>;

/**
 * Zone.js-based cancellation context propagation.
 *
 * We keep a cancellation scope as a transaction-local `Set` of callbacks.
 * Rolling back a transaction drains its set.
 *
 * Zone.js is only used for context propagation (like AsyncLocalStorage /
 * AsyncContext), so we can swap the implementation later without changing the
 * public API.
 */

const kInstalled = Symbol.for("@effectful/cancelable/zone/installed");
const kTransaction = Symbol.for("@effectful/cancelable/zone/transaction");
const kZoneTransactionKey = "@effectful/cancelable/transaction";

type TransactionState = {
  committed: boolean;
  parentCallbacks?: CancellationCallbacks;
  parentDrain?: CancellationCallback;
  callbacks: CancellationCallbacks;
  zone: any;
  done: boolean;
};

export type Transaction = {
  /**
   * Runs `body` in this transaction scope.
   * Anything calling `addOnRollback` inside the body will register into it.
   */
  run<T>(body: () => T): T;
};

function ensureZone(): any {
  const g: any = globalThis as any;
  if (g.Zone) return g.Zone;

  // Prefer the Node bundle so `process.nextTick`, timers, etc are patched.
  try {
    require("zone.js/node");
  } catch (_e) {
    require("zone.js");
  }

  if (!g.Zone) {
    throw new Error("zone.js didn't initialize Zone");
  }
  return g.Zone;
}

function drain(callbacks: CancellationCallbacks): void {
  for (const cb of Array.from(callbacks)) {
    callbacks.delete(cb);
    try {
      cb();
    } catch (_e) {
      // ignore cancellation errors
    }
  }
}

export function currentCancellationCallbacks(): CancellationCallbacks | undefined {
  const tx = currentTransaction();
  if (!tx) return undefined;
  return getTransactionState(tx).callbacks;
}

function getTransactionState(tx: Transaction): TransactionState {
  const state = (tx as any)[kTransaction] as TransactionState | undefined;
  if (!state) {
    throw new Error("Invalid transaction object");
  }
  return state;
}

function currentTransaction(): Transaction | undefined {
  const Zone = (globalThis as any).Zone;
  if (!Zone) return undefined;
  return Zone.current.get(kZoneTransactionKey) as Transaction | undefined;
}

function requireTransaction(tx?: Transaction): Transaction {
  if (tx) return tx;
  const current = currentTransaction();
  if (!current) {
    throw new Error("No active transaction");
  }
  return current;
}

function rollbackInternal(state: TransactionState): void {
  if (state.done) return;
  state.done = true;

  if (state.parentCallbacks && state.parentDrain) {
    state.parentCallbacks.delete(state.parentDrain);
  }
  state.parentDrain = undefined;

  state.zone.run(() => drain(state.callbacks));
}

/**
 * Begins a nested cancellation "transaction".
 *
 * - Creates a fresh cancellation scope (`Set`).
 * - Registers a drain callback into the parent scope (if any), so parent
 *   cancellation cancels this transaction too.
 */
export function begin(name: string = "cancelable:tx"): Transaction {
  const Zone = ensureZone();
  const parentZone = Zone.current;
  const parentCallbacks = currentCancellationCallbacks();

  const callbacks: CancellationCallbacks = new Set<CancellationCallback>();
  const tx: any = {};
  const state: TransactionState = {
    committed: false,
    parentCallbacks,
    parentDrain: undefined,
    callbacks,
    zone: undefined,
    done: false,
  };
  Object.defineProperty(tx, kTransaction, { value: state });

  const zone = parentZone.fork({
    name,
    properties: { [kZoneTransactionKey]: tx },
  });
  state.zone = zone;

  let parentDrain: CancellationCallback | undefined;
  if (parentCallbacks) {
    parentDrain = () => rollbackInternal(state);
    parentCallbacks.add(parentDrain);
  }

  state.parentDrain = parentDrain;

  tx.run = function run<T>(body: () => T): T {
    return zone.run(body);
  };
  return tx as Transaction;
}

/**
 * Commits a transaction.
 *
 * This doesn't drain and doesn't detach from the parent, so rolling back the
 * parent later will still roll back this committed transaction too.
 *
 * In zone terms, "moving focus to parent" is done by simply leaving `tx.run`.
 */
export function commit(tx?: Transaction): void {
  const state = getTransactionState(requireTransaction(tx));
  if (state.done) {
    throw new Error("Transaction is already finished");
  }
  if (state.committed) {
    throw new Error("Transaction is already committed");
  }
  state.committed = true;
}

/**
 * Rolls back a transaction.
 *
 * - Drains the transaction scope.
 * - Detaches the transaction from the parent scope.
 */
export function rollback(tx?: Transaction): void {
  const state = getTransactionState(requireTransaction(tx));
  if (state.done) {
    throw new Error("Transaction is already finished");
  }
  rollbackInternal(state);
}

export function addOnRollback(callback: CancellationCallback): void {
  ensureZone();
  const callbacks = currentCancellationCallbacks();
  if (!callbacks) {
    throw new Error("No active transaction");
  }
  callbacks.add(callback);
}

export function removeOnRollback(callback: CancellationCallback): void {
  ensureZone();
  const callbacks = currentCancellationCallbacks();
  if (!callbacks) {
    throw new Error("No active transaction");
  }
  callbacks.delete(callback);
}

// Compatibility aliases (older naming).
export const addOnCancel = addOnRollback;
export const removeOnCancel = removeOnRollback;
export const deleteOnCancel = removeOnRollback;

export function cancel(target?: unknown): void {
  if (target instanceof Set) {
    drain(target as Set<CancellationCallback>);
    return;
  }
  const callbacks = currentCancellationCallbacks();
  if (callbacks) drain(callbacks);
}

export function withCancellationCallbacks<T>(
  callbacks: CancellationCallbacks,
  body: () => T,
): T {
  const Zone = ensureZone();
  const parentZone = Zone.current;

  // This is the "root" transaction for this async call tree.
  // Unlike `begin()`, it doesn't link to the parent transaction; it just
  // installs the provided callbacks set as the current scope.
  const tx: any = {};
  const state: TransactionState = {
    committed: false,
    parentCallbacks: undefined,
    parentDrain: undefined,
    callbacks,
    zone: undefined,
    done: false,
  };
  Object.defineProperty(tx, kTransaction, { value: state });

  const zone = parentZone.fork({
    name: "cancelable",
    properties: { [kZoneTransactionKey]: tx },
  });
  state.zone = zone;
  tx.run = function run<T>(fn: () => T): T {
    return zone.run(fn);
  };

  return zone.run(body);
}

function wrapCombinator(PromiseImpl: any, name: string): void {
  const original = PromiseImpl[name];
  if (typeof original !== "function") return;

  PromiseImpl[name] = function patchedCombinator(this: any, ...args: any[]) {
    const tx = begin("cancelable:" + name);
    const state = getTransactionState(tx);
    const base = tx.run(() => original.apply(this, args));
    commit(tx);
    return base.then(
      (value: any) => {
        rollbackInternal(state);
        return value;
      },
      (error: any) => {
        rollbackInternal(state);
        throw error;
      },
    );
  };
}

export function installCancelablePromise(PromiseImpl?: any): any {
  const BasePromise: any = PromiseImpl != null ? PromiseImpl : require("promise");
  if (BasePromise[kInstalled]) return BasePromise;

  ensureZone();
  Object.defineProperty(BasePromise, kInstalled, { value: true });

  const originalThen: any = BasePromise.prototype.then;
  BasePromise.prototype.then = function patchedThen(
    this: any,
    onFulfilled?: ((value: any) => any) | null,
    onRejected?: ((reason: any) => any) | null,
  ) {
    const Zone = (globalThis as any).Zone;
    if (!Zone) return originalThen.call(this, onFulfilled, onRejected);

    // The `promise` library uses `asap/raw` which flushes a *shared* callback
    // queue behind a single `process.nextTick(flush)`. Callbacks queued from
    // different Zones before the same flush would otherwise execute under the
    // Zone that scheduled the flush. Wrapping here binds handlers to the Zone
    // at attachment time so user code sees the correct cancellation scope.
    const zone = Zone.current;
    const wrappedOnFulfilled =
      typeof onFulfilled === "function"
        ? zone.wrap(onFulfilled, "Promise.then")
        : onFulfilled;
    const wrappedOnRejected =
      typeof onRejected === "function"
        ? zone.wrap(onRejected, "Promise.then")
        : onRejected;

    return originalThen.call(this, wrappedOnFulfilled, wrappedOnRejected);
  };

  wrapCombinator(BasePromise, "all");
  wrapCombinator(BasePromise, "race");
  wrapCombinator(BasePromise, "any");
  wrapCombinator(BasePromise, "allSettled");

  return BasePromise;
}
