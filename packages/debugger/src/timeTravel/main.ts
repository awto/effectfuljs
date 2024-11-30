import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";
import { Record } from "../state";
import * as State from "../state";
import * as Frame from "./frame";
import * as Objects from "./objects";

export const journal = State.journal;

const context = State.context;

export const reset = Core.reset;

const flush: () => void =
  config.timeTravel && config.mutationObserver ? DOM.flush : function() {};

/**
 * This rollbacks all changed objects and runs functions registered by `record`,
 * (assumes an empty last checkpoint).
 */
export const undo: () => Record | null = config.timeTravel
  ? function undo(): Record | null {
      flush();
      const { now } = journal;
      if (!now) return null;
      const ops = now.operations;
      now.operations = void 0;
      for (let i = ops, j; i != null; i = j) {
        j = i.prev; // `call` may reschedule the same object
        context.call = i;
        i.call();
      }
      flush();
      const { future, past } = journal;
      now.prev = future;
      journal.future = now;
      journal.now = past;
      if (past) {
        journal.past = past.prev;
        past.prev = null;
      } else {
        journal.past = null;
      }
      return past;
    }
  : function undo() {
      return null;
    };

export const redo: () => Record | null = config.timeTravel
  ? function redo() {
      flush();
      const { future } = journal;
      if (!future) return null;
      const ops = future.operations;
      future.operations = void 0;
      const { now } = journal;
      if (now) now.prev = journal.past;
      journal.past = now;
      journal.now = future;
      journal.future = future.prev;
      for (let i = ops, j; i != null; i = j) {
        j = i.prev;
        context.call = i;
        i.call();
      }
      flush();
      return future;
    }
  : function redo() {
      return null;
    };

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export const checkpoint: () => Record | null = config.timeTravel
  ? config.mutationObserver
    ? function checkpoint() {
        flush();
        return Frame.checkpoint();
      }
    : Frame.checkpoint
  : function() {
      return null;
    };

/** Registers an operation to be called on `undo` in reverse direction */
export const record = config.timeTravel ? Core.record : function record() {};

export { Core, DOM };

/** disables tracing on a specific TypedArray object */
export const typedArrayDisableTrace = config.timeTravel
  ? function typedArrayDisableTrace(arr: any) {
      if (arr.set === Objects.nativeTypedArray.set) return;
      arr.set = Objects.nativeTypedArray.set;
      arr.sort = Objects.nativeTypedArray.sort;
      return arr;
    }
  : function typedArrayDisableTrace(arr: any) {
      return arr;
    };

export const recordFrame = config.timeTravel
  ? Frame.recordFrame
  : function recordFrame() {};

export const forInIterator = config.timeTravel
  ? Objects.forInIterator
  : State.forInIterator;
