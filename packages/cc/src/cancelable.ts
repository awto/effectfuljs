export type CancellationCallback = () => void;
export type CancellationCallbacks = Set<CancellationCallback>;

export const CancellationCallbacksSymbol = Symbol.for(
  "@effectful/cancelable/cancellationCallbacks",
);

const kInstalled = Symbol.for("@effectful/cancelable/installed");

let activeCancellationCallbacks: CancellationCallbacks | undefined;

export function currentCancellationCallbacks(): CancellationCallbacks | undefined {
  return activeCancellationCallbacks;
}

export function addOnCancel(callback: CancellationCallback): void {
  const callbacks = activeCancellationCallbacks;
  if (!callbacks) {
    throw new Error("No active cancellation context");
  }
  callbacks.add(callback);
}

export function removeOnCancel(callback: CancellationCallback): void {
  const callbacks = activeCancellationCallbacks;
  if (!callbacks) {
    throw new Error("No active cancellation context");
  }
  callbacks.delete(callback);
}

export function withCancellationCallbacks<T>(
  callbacks: CancellationCallbacks | undefined,
  body: () => T,
): T {
  const prev = activeCancellationCallbacks;
  activeCancellationCallbacks = callbacks;
  try {
    return body();
  } finally {
    activeCancellationCallbacks = prev;
  }
}

export function getCancellationCallbacks(
  target: unknown,
): CancellationCallbacks | undefined {
  if (
    !target ||
    (typeof target !== "object" && typeof target !== "function")
  ) {
    return undefined;
  }
  return (target as any)[CancellationCallbacksSymbol] as
    | CancellationCallbacks
    | undefined;
}

export function setCancellationCallbacks(
  target: unknown,
  callbacks: CancellationCallbacks,
): void {
  if (
    !target ||
    (typeof target !== "object" && typeof target !== "function")
  ) {
    return;
  }
  const obj = target as any;
  if (obj[CancellationCallbacksSymbol] === callbacks) return;
  Object.defineProperty(obj, CancellationCallbacksSymbol, {
    value: callbacks,
    configurable: true,
  });
}

export function cancel(target: unknown): void {
  if (target instanceof Set) {
    drain(target as Set<CancellationCallback>);
    return;
  }
  const callbacks = getCancellationCallbacks(target);
  if (callbacks) drain(callbacks);
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

function wrapCombinator(PromiseImpl: any, name: string): void {
  const original = PromiseImpl[name];
  if (typeof original !== "function") return;

  PromiseImpl[name] = function patchedCombinator(this: any, ...args: any[]) {
    const parentCallbacks = activeCancellationCallbacks;
    const callCallbacks: CancellationCallbacks = new Set<CancellationCallback>();

    let parentDrain: CancellationCallback | undefined;
    if (parentCallbacks) {
      parentDrain = () => drain(callCallbacks);
      parentCallbacks.add(parentDrain);
    }

    const base = withCancellationCallbacks(callCallbacks, () =>
      original.apply(this, args),
    );

    setCancellationCallbacks(base, callCallbacks);

    return base.then(
      (value: any) => {
        if (parentCallbacks && parentDrain) parentCallbacks.delete(parentDrain);
        drain(callCallbacks);
        return value;
      },
      (error: any) => {
        if (parentCallbacks && parentDrain) parentCallbacks.delete(parentDrain);
        drain(callCallbacks);
        throw error;
      },
    );
  };
}

export function installCancelablePromise(PromiseImpl?: any): any {
  const BasePromise: any = PromiseImpl != null ? PromiseImpl : require("promise");
  if (BasePromise[kInstalled]) return BasePromise;

  Object.defineProperty(BasePromise, kInstalled, { value: true });

  const originalThen: any = BasePromise.prototype.then;
  BasePromise.prototype.then = function patchedThen(
    this: any,
    onFulfilled?: ((value: any) => any) | null,
    onRejected?: ((reason: any) => any) | null,
  ) {
    const callbacks = getCancellationCallbacks(this) || activeCancellationCallbacks;

    const wrappedOnFulfilled =
      typeof onFulfilled === "function" && callbacks
        ? (value: any) =>
            withCancellationCallbacks(callbacks, () => onFulfilled(value))
        : onFulfilled;

    const wrappedOnRejected =
      typeof onRejected === "function" && callbacks
        ? (reason: any) =>
            withCancellationCallbacks(callbacks, () => onRejected(reason))
        : onRejected;

    const next = originalThen.call(this, wrappedOnFulfilled, wrappedOnRejected);
    if (callbacks) setCancellationCallbacks(next, callbacks);
    return next;
  };

  wrapCombinator(BasePromise, "all");
  wrapCombinator(BasePromise, "race");
  wrapCombinator(BasePromise, "any");
  wrapCombinator(BasePromise, "allSettled");

  return BasePromise;
}
