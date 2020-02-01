import {
  Module,
  StateMap,
  Handler,
  FunctionDescr,
  States,
  Item,
  AsyncGeneratorFrame,
  Frame
} from "./state";
import * as State from "./state";
import { fun, resumeLocal, token, checkExitBrk, pop } from "./engine";
import * as Instr from "./instr/rt";
import { scopeInit, awtImpl, unhandledA } from "./async";
import { regOpaqueObject, regConstructor } from "@effectful/serialization";

const { context } = State;
const { defineProperty } = State.saved.Object;

class AsyncIterableThis {
  [Symbol.asyncIterator]() {
    return this;
  }
}

regConstructor(AsyncIterableThis);

class AsyncGenerator extends AsyncIterableThis {
  $frame: AsyncGeneratorFrame;
  constructor(frame: AsyncGeneratorFrame) {
    super();
    this.$frame = frame;
  }
}

regConstructor(AsyncGenerator);

defineProperty(AsyncGenerator.prototype, "next", {
  value: Instr.asyncGeneratorMethod(Instr.asyncNextImpl, <any>nextStep),
  configurable: true
});
defineProperty(AsyncGenerator.prototype, "throw", {
  value: Instr.asyncGeneratorMethod(Instr.asyncThrowImpl, nextThrowStep)
});
defineProperty(AsyncGenerator.prototype, "return", {
  value: Instr.asyncGeneratorMethod(Instr.asyncReturnImpl, nextReturnStep),
  configurable: true
});

function nextStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.promise = new Promise<Item>(scopeInit.bind(frame));
  return resumeLocal(frame, value);
}

regOpaqueObject(nextStep, "@effectful/debugger/ag#next");

function nextThrowStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.goto = frame.meta.errHandler(frame.state);
  return nextStep(frame, value);
}

regOpaqueObject(nextThrowStep, "@effectful/debugger/ag#throw");

function nextReturnStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.goto = frame.meta.finHandler(frame.state);
  return nextStep(frame, value);
}

regOpaqueObject(nextReturnStep, "@effectful/debugger/ag#return");

export function funAG(
  module: Module,
  func: (...args: any[]) => any,
  handler: Handler,
  err: StateMap,
  fin: StateMap,
  states: States,
  name: string,
  loc: string,
  parent: FunctionDescr | undefined,
  params: string[]
): ($$: { [name: string]: any }) => any {
  return fun(
    module,
    func,
    handler,
    err,
    fin,
    states,
    name,
    loc,
    parent,
    params,
    State.GeneratorKind | State.AsyncKind
  );
}

function cleanup(this: AsyncGeneratorFrame) {
  if (this.queue.length) (<() => void>this.queue.shift())();
  else this.running = false;
}

regOpaqueObject(cleanup, "@effectful/debugger/ag#cleanup");

export function scopeAG(goto: number) {
  const top = <AsyncGeneratorFrame>context.top;
  if (!context.debug && top.restoreDebug) context.debug = true;
  pop(top);
  top.goto = goto;
  top.next = null;
  top.queue = [];
  top.running = false;
  top.cleanup = cleanup;
  return (context.value = new AsyncGenerator(top));
}

function yldResolve(top: Frame, value: any) {
  context.suspended.delete(top);
  top.awaiting = token;
  (<AsyncGeneratorFrame>top).onResolve(
    (context.value = { value, done: false })
  );
}

function awtYldResolve(this: Frame, value: any) {
  yldResolve(this, value);
}

regOpaqueObject(awtYldResolve, "@effectful/debugger/awt#yld");

function awtDoneResolve(this: Frame, value: any) {
  context.suspended.delete(this);
  this.awaiting = token;
  (<AsyncGeneratorFrame>this).onResolve(
    (context.value = { value, done: true })
  );
  this.state = 0;
  if (context.debug) {
    checkExitBrk(this, value);
  } else if (this.restoreDebug) context.debug = true;
}

regOpaqueObject(awtDoneResolve, "@effectful/debugger/awt#done");

export function yldAG(value: any, goto: number): any {
  return awtImpl(value, goto, awtYldResolve);
}

export function retAG(value: any): any {
  return awtImpl(value, 0, awtDoneResolve);
}

export const unhandledAG = unhandledA;

function yldStartCb(dest: AsyncGeneratorFrame, value: any): Promise<any> {
  yldResolve(dest, value);
  return dest.promise;
}

export function yldStarAG(value: any, goto: number) {
  const top = <AsyncGeneratorFrame>context.top;
  pop(top);
  context.call = Instr.yldStarAGImpl;
  return Instr.yldStarAGImpl(top, value, goto, yldStartCb);
}
