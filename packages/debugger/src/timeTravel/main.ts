import config from "../config";
import * as Core from "./core";
import * as DOM from "./dom";
import { Record } from "../state";
import * as State from "../state";
import * as S from "@effectful/serialization";

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
      for (let i = ops; i != null; i = i.prev) {
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
      for (let i = ops; i != null; i = i.prev) {
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
  record(
    resetContext.bind(null, {
      top: context.top,
      debug: context.debug,
      brk: context.brk,
      value: context.value
    })
  );
}

function resetContext(job: State.Job) {
  recordContext();
  context.top = job.top;
  context.debug = job.debug;
  context.brk = job.brk;
  context.value = job.value;
}

S.regOpaqueObject(resetContext, "@effectful/debug/reset#ctx");

function checkpointImpl() {
  if (!journal.enabled) return null;
  const cp = Core.checkpoint();
  recordContext();
  return cp;
}

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

const assign = Core.objectSaved.assign;

function frameData(f: State.Frame): any {
  // TODO: for usual frame goto is enough, so it is possible to avoid creating the object
  const res: any = assign({}, f);
  delete res[S.descriptorSymbol];
  return res;
}

function resetFrame(f: State.Frame, stored: any) {
  record(resetFrame.bind(null, f, frameData(f)));
  assign(f, stored);
}

S.regOpaqueObject(resetFrame, "@effectful/debugger/frame#trace");

const frameTraps = {
  set(f: any, prop: any, value: any, receiver: any) {
    if (journal.enabled && journal.now && f.timestamp !== journal.now) {
      f.timestamp = journal.now;
      record(resetFrame.bind(null, receiver, frameData(f)));
    }
    f[prop] = value;
    return true;
  }
};

const wrapDescriptor = S.regDescriptor({
  ...S.descriptorTemplate,
  name: "@effectful/debugger/object",
  create() {
    return wrapFrame(<any>{});
  }
});

export const wrapFrame = config.timeTravel
  ? function(f: State.Frame): State.Frame {
      (<any>f)[S.descriptorSymbol] = wrapDescriptor;
      return new Proxy(f, frameTraps);
    }
  : function(v: State.Frame) {
      return v;
    };

/** Registers an operation to be called on `undo` in reverse direction */
export const record = config.timeTravel ? Core.record : function record() {};

export { Core, DOM };
