import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";

export const journal = Core.journal;

export const reset = Core.reset;

const flush: () => void =
  config.timeTravel && config.mutationObserver ? DOM.flush : function() {};

declare module "../state" {
  interface Frame extends Core.MaybeTarget<Frame> {}
}

const undoImpl: () => Core.Record | null = config.timeTravelForward
  ? function undo(): Core.Record | null {
      const { now, past } = journal;
      if (!now || !past) return null;
      const { future } = journal;
      now.prev = future;
      journal.future = now;
      journal.now = past;
      journal.past = past.prev;
      const ops = past.operations;
      past.operations = void 0;
      for (let i = ops; i != null; i = i.prev) i();
      return past;
    }
  : function undo() {
      const { now, past } = journal;
      if (!now || !past) return null;
      journal.now = null;
      for (let i = past.operations; i != null; i = i.prev) i();
      journal.now = past;
      journal.past = past.prev;
      return past;
    };

/**
 * This rollbacks all changed objects and runs functions registered by `record`,
 * (assumes an empty last checkpoint).
 */
export const undo: () => Core.Record | null = config.timeTravel
  ? function undo() {
      flush();
      try {
        return undoImpl();
      } finally {
        flush();
      }
    }
  : function undo() {
      return null;
    };

export const redo: () => Core.Record | null = config.timeTravel
  ? function redo() {
      flush();
      const { now, future } = journal;
      if (!now || !future) return null;
      const ops = now.operations;
      now.operations = void 0;
      for (let i = ops; i != null; i = i.prev) i();
      flush();
      const { past } = journal;
      now.prev = past;
      journal.past = now;
      journal.now = future;
      journal.future = future.prev;
      return future;
    }
  : function redo() {
      return null;
    };

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export const checkpoint: () => Core.Record | null = config.timeTravel
  ? config.mutationObserver
    ? function checkpoint() {
        flush();
        return Core.checkpoint();
      }
    : Core.checkpoint
  : function() {
      return null;
    };

/** Values wrapper injected by the compiler */
export const wrap: <T extends Core.MaybeTarget<T>>(
  target: T
) => T = config.timeTravel
  ? Core.wrapImpl
  : function wrap<T extends Core.MaybeTarget<T>>(v: T): T {
      return v;
    };

/** Registers an operation to be called on `undo` in reverse direction */
export const record = config.timeTravel
  ? Core.record
  : function record(_: Core.Operation) {};

/**
 * when constructing new objects replacing its prototype to unwrapped one,
 * otherwise it will catch all setters of not yet wrapped target
 */
export const unwrapPrototype = config.timeTravel
  ? function(target: Core.Target) {
      const proto = Object.getPrototypeOf(target);
      if (proto.hasOwnProperty(Core.traceDataSymbol))
        Object.setPrototypeOf(target, proto[Core.traceDataSymbol].target);
    }
  : function(_: Core.Target) {};

export { Operation, Record, traceDataSymbol, traceMetaSymbol } from "./core";

export { Core, DOM };

/** defines setter a getter in `value` to support time travel */
export function propHack(value: any, propName: string) {
  const sym = Symbol(`${propName}`);
  Object.defineProperty(value, propName, {
    set(value) {
      Core.record(() => delete this[propName]);
      this[sym] = value;
      Object.defineProperty(this, propName, {
        configurable: true,
        set(value) {
          const oldValue = this[sym];
          Core.record(() => (this[sym] = oldValue));
          this[sym] = value;
        },
        get() {
          return this[sym];
        }
      });
    },
    get() {}
  });
}
