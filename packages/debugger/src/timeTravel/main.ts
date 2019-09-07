import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";
import * as S from "@effectful/serialization";
import "./persist";

export const journal = Core.journal;

export const reset = Core.reset;

const flush: () => void =
  config.timeTravel && config.mutationObserver ? DOM.flush : function() {};

declare module "../state" {
  interface Frame extends Core.MaybeTarget<Frame> {}
}

const undoImpl: () => Core.Record | null = config.timeTravelForward
  ? function undo(): Core.Record | null {
      flush();
      const { now } = journal;
      if (!now) return null;
      const ops = now.operations;
      now.operations = void 0;
      for (let i = ops; i != null; i = i.prev) i.call();
      flush();
      let { future, past } = journal;
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
      flush();
      const { now, past } = journal;
      if (!now || !past) return null;
      journal.now = null;
      for (let i = past.operations; i != null; i = i.prev) i.call();
      journal.now = past;
      journal.past = past.prev;
      flush();
      return past;
    };

/**
 * This rollbacks all changed objects and runs functions registered by `record`,
 * (assumes an empty last checkpoint).
 */
export const undo: () => Core.Record | null = config.timeTravel
  ? undoImpl
  : function undo() {
      return null;
    };

export const redo: () => Core.Record | null = config.timeTravel
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
      for (let i = ops; i != null; i = i.prev) i.call();
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

export {
  wrap,
  Operation,
  Record,
  traceDataSymbol,
  traceMetaSymbol
} from "./core";

export { Core, DOM };

const deleteTag = {};

interface IPropSnapshot extends Core.Operation {
  target: any;
  index: string | symbol | number;
  oldValue: any;
  newValue: any;
  back: boolean;
}

const PropSnapshot: any = config.timeTravelForward
  ? function(
      this: IPropSnapshot,
      target: any,
      index: string | symbol | number,
      oldValue: any,
      newValue: any
    ) {
      this.target = target;
      this.index = index;
      this.newValue = newValue;
      this.oldValue = oldValue;
      this.back = true;
    }
  : function(
      this: IPropSnapshot,
      target: any,
      index: string | symbol | number,
      oldValue: any,
      newValue: any
    ) {
      this.target = target;
      this.index = index;
      this.newValue = newValue;
      this.oldValue = oldValue;
      this.back = true;
    };

PropSnapshot.prototype.call = config.timeTravelForward
  ? function(this: IPropSnapshot) {
      if (this.back) {
        if (this.oldValue === deleteTag) delete this.target[this.index];
        else this.target[this.index] = this.oldValue;
      } else this.target[this.index] = this.newValue;
      this.back = !this.back;
      Core.record(this);
    }
  : function(this: IPropSnapshot) {
      if (this.oldValue === deleteTag) delete this.target[this.index];
      else this.target[this.index] = this.oldValue;
    };
S.regConstructor(PropSnapshot);

/**
 * defines setter a getter in `value` to support time travel
 * TODO: delete handler
 */
export function propHack(value: any, propName: string) {
  const sym = Symbol(`${propName}`);
  Object.defineProperty(value, propName, {
    set(value) {
      this[sym] = value;
      Core.record(new PropSnapshot(this, propName, deleteTag, value));
      Object.defineProperty(this, propName, {
        configurable: true,
        set(value) {
          Core.record(new PropSnapshot(this, propName, this[sym], value));
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

if (config.persistTimeTravel) S.regConstructor(Core.TraceData);
else S.regConstructor(Core.TraceData, S.NotSerializableDescriptor);
