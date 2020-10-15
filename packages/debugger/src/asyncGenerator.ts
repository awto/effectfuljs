import { Item, AsyncGeneratorFrame, Frame } from "./state";
import * as State from "./state";
import {
  resumeLocal,
  token,
  checkExitBrk,
  popFrame,
  makeFrame
} from "./engine";
import { scopeInit, unhandledA } from "./async";
import { regOpaqueObject, regConstructor } from "@effectful/serialization";

const { context } = State;
const { defineProperty } = State.native.Object;

class AsyncIterableThis {
  [Symbol.asyncIterator]() {
    return this;
  }
}

regConstructor(AsyncIterableThis);

class AsyncGenerator extends AsyncIterableThis {
  _frame: AsyncGeneratorFrame;
  constructor(frame: AsyncGeneratorFrame) {
    super();
    this._frame = frame;
  }
}

regConstructor(AsyncGenerator);

function runQueue(
  this: AsyncGeneratorFrame,
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>,
  value: any,
  rs: (value: any) => any,
  rj: (reason: any) => any
) {
  this.sent = value;
  this.onResolve = rs;
  this.onReject = rj;
  step(this, value);
}

regOpaqueObject(runQueue, "@effectful/debugger/ag#runQueue");

export function enqueue(
  this: AsyncGeneratorFrame,
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>,
  value: any,
  rs: (value: any) => any,
  rj: (reason: any) => any
) {
  this.queue.push(runQueue.bind(this, step, value, rs, rj));
}

export function asyncGeneratorMethod(
  step: (frame: AsyncGeneratorFrame, value: any) => Promise<Item>
): (this: { _frame: AsyncGeneratorFrame }, value: any) => Promise<Item> {
  return function(this: { _frame: AsyncGeneratorFrame }, value: any) {
    const frame = this._frame;
    context.call = Promise;
    if (frame.running)
      return new Promise<Item>(enqueue.bind(frame, step, value));
    frame.running = true;
    frame.sent = value;
    frame.promise = new Promise<Item>(scopeInit.bind(frame));
    return step(frame, value);
  };
}

defineProperty(AsyncGenerator.prototype, "next", {
  value: asyncGeneratorMethod(<any>nextStep),
  configurable: true
});

defineProperty(AsyncGenerator.prototype, "throw", {
  value: asyncGeneratorMethod(nextThrowStep)
});

defineProperty(AsyncGenerator.prototype, "return", {
  value: asyncGeneratorMethod(nextReturnStep),
  configurable: true
});

function nextStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  return resumeLocal(frame, value);
}

regOpaqueObject(nextStep, "@effectful/debugger/ag#next");

function nextThrowStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.error = value;
  frame.meta.errHandler(frame, frame.$);
  return nextStep(frame, value);
}

regOpaqueObject(nextThrowStep, "@effectful/debugger/ag#throw");

function nextReturnStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.meta.finHandler(frame, frame.$);
  return nextStep(frame, value);
}

regOpaqueObject(nextReturnStep, "@effectful/debugger/ag#return");

function dequeue(frame: AsyncGeneratorFrame) {
  if (frame.queue.length) (<() => void>frame.queue.shift())();
  else frame.running = false;
}

export function frameAG(
  closure: any,
  meta: any,
  parent: any,
  vars: any[] | null,
  newTarget: any
) {
  const frame = <AsyncGeneratorFrame>(
    makeFrame(closure, meta, parent, vars, newTarget)
  );
  const iter = new AsyncGenerator(frame);
  frame.iter = <any>iter;
  frame.next = null;
  frame.queue = [];
  frame.running = false;
  return frame;
}

export function yldAG(value: any): any {
  const top = <AsyncGeneratorFrame>context.top;
  context.suspended.delete(top);
  top.awaiting = token;
  context.call = top.onResolve;
  top.onResolve((context.value = { value, done: false }));
  popFrame(top);
  dequeue(top);
  return top.promise;
}

export function retAG(value: any): any {
  const top = <AsyncGeneratorFrame>context.top;
  context.suspended.delete(top);
  top.awaiting = token;
  context.call = top.onResolve;
  top.onResolve({ value, done: true });
  top.done = true;
  top.result = void 0;
  dequeue(top);
  if (context.enabled) {
    checkExitBrk(top, top.promise);
  } else if (top.restoreEnabled !== State.undef) context.enabled = true;
  popFrame(top);
  return top.promise;
}

export function unhandledAG(reason: any): any {
  dequeue(<AsyncGeneratorFrame>context.top);
  return unhandledA(reason);
}
