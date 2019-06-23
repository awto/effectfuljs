import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";

const journal = Core.journal;

const flush: () => void =
  config.timeTravel && config.mutationObserver ? DOM.flush : function() {};

/**
 * This rollbacks all changed objects and runs functions registered by `record`.
 * The `from` parameter is an object returned by `checkpoint` functions.
 * If `from` isn't specified rollbacks to the latest `checkpoint` call if it exists.
 */
export const undo = config.timeTravel
  ? function undo(from?: Core.Record) {
      flush();
      const savedPaused = journal.paused;
      journal.paused = true;
      try {
        return Core.undoImpl(from);
      } finally {
        flush();
        journal.paused = savedPaused;
      }
    }
  : function undo(_?: Core.Record): Core.Record | null {
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
export const wrap = config.timeTravel
  ? Core.wrapImpl
  : function wrap(v: Core.MaybeTarget): Core.MaybeTarget {
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
