import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";
import { Record } from "../state";
import * as State from "../state";
import * as S from "@effectful/serialization";
import { record2, record3, record4, record5, record6, record8 } from "./binds";

export const journal = Core.journal;
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

function recordContext() {
  record4(
    resetContextOp,
    context.top,
    context.debug,
    context.brk,
    context.value
  );
}

function resetContextOp(this: any) {
  const { a: top, b: debug, c: brk, d: value } = this;
  this.a = context.top;
  this.b = context.debug;
  this.c = context.brk;
  this.d = context.value;
  record(this);
  context.top = top;
  context.debug = debug;
  context.brk = brk;
  context.value = value;
}

S.regOpaqueObject(resetContextOp, "@effectful/debug/reset#ctx");

const checkpointImpl = function checkpoint() {
  if (!journal.enabled) return null;
  const cp = Core.checkpoint();
  const top = context.top;
  if (top) recordFrame(top);
  recordContext();
  return cp;
};

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export const checkpoint: () => Record | null = config.timeTravel
  ? config.mutationObserver
    ? function checkpoint() {
        flush();
        return checkpointImpl();
      }
    : checkpointImpl
  : function() {
      return null;
    };

/** Registers an operation to be called on `undo` in reverse direction */
export const record = config.timeTravel ? Core.record : function record() {};

export { Core, DOM };

/** disables tracing on a specific TypedArray object */
export const typedArrayDisableTrace = config.timeTravel
  ? function typedArrayDisableTrace(arr: any) {
      if (arr.set === Core.typedArraySaved.set) return;
      arr.set = Core.typedArraySaved.set;
      arr.sort = Core.typedArraySaved.sort;
      return arr;
    }
  : function typedArrayDisableTrace(arr: any) {
      return arr;
    };

/** disables tracing on a specific WeakMap object */
export const weakMapDisableTrace = config.timeTravel
  ? function weakMapDisableTrace(map: WeakMap<any, any>) {
      if (Core.weakMapSaved.set === map.set) return;
      map.set = Core.weakMapSaved.set;
      map.delete = Core.weakMapSaved.delete;
      return map;
    }
  : function weakMapDisableTrace(map: WeakMap<any, any>) {
      return map;
    };

/** disables tracing on a specific WeakSet object */
export const weakSetDisableTrace = config.timeTravel
  ? function weakSetDisableTrace(set: WeakSet<any>) {
      if (Core.weakSetSaved.add === set.add) return;
      set.add = Core.weakSetSaved.add;
      set.delete = Core.weakSetSaved.delete;
      return set;
    }
  : function weakSetDisableTrace(set: WeakSet<any>) {
      return set;
    };

function restoreFrameFullOp(this: any) {
  const { a: frame, b: saved } = this;
  this.b = State.saved.Object.assign({}, frame);
  State.saved.Object.assign(frame, saved);
  record(this);
}

S.regOpaqueObject(restoreFrameFullOp, "#frame");

function restoreFrameOp(this: any) {
  const { a: frame, b: goto, c: brk } = this;
  this.b = frame.goto;
  this.c = frame.brk;
  record(this);
  frame.goto = goto;
  frame.brk = brk;
  frame.timestamp = journal.now;
}

S.regOpaqueObject(restoreFrameOp, "#frame");

function restoreGeneratorFrameOp(this: any) {
  const {
    a: frame,
    b: goto,
    c: brk,
    d: delegate,
    e: running,
    f: sent,
    g: next,
    h: caller
  } = this;
  this.b = frame.goto;
  this.c = frame.brk;
  this.d = frame.delegate;
  this.e = frame.running;
  this.f = frame.sent;
  this.g = frame.next;
  this.h = frame.caller;
  record(this);
  frame.goto = goto;
  frame.brk = brk;
  frame.delegatee = delegate;
  frame.running = running;
  frame.sent = sent;
  frame.timestamp = journal.now;
  frame.next = next;
  frame.caller = caller;
}

S.regOpaqueObject(restoreGeneratorFrameOp, "#frame$g");

export function recordFrame(frame: State.Frame) {
  if (journal.enabled && frame.timestamp !== journal.now) {
    const kind = frame.meta.kind;
    if ((kind & State.GeneratorKind) !== 0) {
      if ((kind & State.AsyncKind) !== 0) {
        frame.timestamp = journal.now;
        //TODO: saved only needed properties
        record2(
          restoreFrameFullOp,
          frame,
          State.saved.Object.assign({}, frame)
        );
      } else {
        record8(
          restoreGeneratorFrameOp,
          frame,
          frame.goto,
          frame.brk,
          (<State.GeneratorFrame>frame).delegatee,
          (<State.GeneratorFrame>frame).running,
          (<State.GeneratorFrame>frame).sent,
          frame.next,
          frame.caller
        );
      }
    } else {
      if ((kind & State.AsyncKind) !== 0) {
        record2(
          restoreFrameFullOp,
          frame,
          State.saved.Object.assign({}, frame)
        );
      } else {
        record3(restoreFrameOp, frame, frame.goto, frame.brk);
      }
    }
  }
  /*
  if (journal.enabled && frame.timestamp !== journal.now) {
    frame.timestamp = journal.now;
    record2(restoreFrameFullOp, frame, State.saved.Object.assign({}, frame));
  }
*/
}
