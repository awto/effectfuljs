import * as State from "../state";
import * as S from "@effectful/serialization";
import * as Binds from "./binds";
import * as Core from "./core";

const { record } = Core;
const { record2, record5, record9 } = Binds;

export const journal = State.journal;
const context = State.context;

function recordContext() {
  record5(
    resetContextOp,
    context.top,
    context.enabled,
    context.brk,
    context.value,
    context.error
  );
}

function resetContextOp(this: any) {
  const { a: top, b: enabled, c: brk, d: value, e: error } = this;
  this.a = context.top;
  this.b = context.enabled;
  this.c = context.brk;
  this.d = context.value;
  this.e = context.error;
  record(this);
  context.top = top;
  context.enabled = enabled;
  context.brk = brk;
  context.value = value;
  context.error = error;
}

S.regOpaqueObject(resetContextOp, "@effectful/debug/reset#ctx");

export function checkpoint() {
  if (!journal.enabled) return null;
  const cp = Core.checkpoint();
  const top = context.top;
  if (top) recordFrame(top);
  recordContext();
  return cp;
}

function restoreFrameFullOp(this: any) {
  const { a: frame, b: saved } = this;
  this.b = State.native.Object.assign({}, frame);
  State.native.Object.assign(frame, saved);
  record(this);
}

S.regOpaqueObject(restoreFrameFullOp, "#frame");

function restoreFrameOp(this: any) {
  const { a: frame, b: goto, c: state, d: brk, e: $ } = this;
  this.b = frame.goto;
  this.c = frame.state;
  this.d = frame.brk;
  this.e = frame.$;
  record(this);
  frame.goto = goto;
  frame.state = state;
  frame.brk = brk;
  frame.timestamp = journal.now;
  frame.$ = $;
}

S.regOpaqueObject(restoreFrameOp, "#frame");

function restoreGeneratorFrameOp(this: any) {
  const {
    a: frame,
    b: goto,
    c: state,
    d: brk,
    e: $,
    f: running,
    g: sent,
    h: next,
    i: caller
  } = this;
  this.b = frame.goto;
  this.c = frame.state;
  this.d = frame.brk;
  this.e = frame.$;
  this.f = frame.running;
  this.g = frame.sent;
  this.h = frame.next;
  this.i = frame.caller;
  record(this);
  frame.goto = goto;
  frame.state = state;
  frame.brk = brk;
  frame.$ = $;
  frame.running = running;
  frame.sent = sent;
  frame.timestamp = journal.now;
  frame.next = next;
  frame.caller = caller;
}

S.regOpaqueObject(restoreGeneratorFrameOp, "#frame$g");

const Flag = State.Flag;

export function recordFrame(frame: State.Frame) {
  if (journal.enabled && frame.timestamp !== journal.now) {
    const flags = frame.meta.flags;
    if (flags & Flag.GENERATOR_FUNCTION) {
      if (flags & Flag.ASYNC_FUNCTION) {
        frame.timestamp = journal.now;
        // TODO: saved only needed properties
        record2(
          restoreFrameFullOp,
          frame,
          State.native.Object.assign({}, frame)
        );
      } else {
        record9(
          restoreGeneratorFrameOp,
          frame,
          frame.goto,
          frame.state,
          frame.brk,
          frame.$,
          (<State.GeneratorFrame>frame).running,
          (<State.GeneratorFrame>frame).sent,
          frame.next,
          frame.caller
        );
      }
    } else {
      if ((flags & Flag.ASYNC_FUNCTION) !== 0) {
        record2(
          restoreFrameFullOp,
          frame,
          State.native.Object.assign({}, frame)
        );
      } else {
        record5(
          restoreFrameOp,
          frame,
          frame.goto,
          frame.state,
          frame.brk,
          frame.$
        );
      }
    }
  }
}
