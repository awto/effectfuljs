import { Module, StateMap, Handler, FunctionDescr, States } from "./state";
import * as State from "./state";
import { fun, call, token } from "./engine";
import { Item, AsyncGeneratorFrame } from "./instr/rt";
import * as Instr from "./instr/rt";
import { scopeInit, awtImpl, unhandledA } from "./async";
import { regOpaqueObject, regConstructor } from "@effectful/serialization";

const { context } = State;

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

(<any>AsyncGenerator.prototype).next = Instr.asyncGeneratorMethod(
  Instr.asyncNextImpl,
  <any>nextStep
);

(<any>AsyncGenerator.prototype).throw = Instr.asyncGeneratorMethod(
  Instr.asyncThrowImpl,
  nextThrowStep
);
(<any>AsyncGenerator.prototype).return = Instr.asyncGeneratorMethod(
  Instr.asyncReturnImpl,
  nextReturnStep
);

function nextStep(frame: AsyncGeneratorFrame, value: any): Promise<Item> {
  frame.promise = new Promise<Item>(scopeInit.bind(frame));
  return call(frame, value);
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
  return Object.setPrototypeOf(
    fun(module, func, handler, err, fin, states, name, loc, parent, params),
    AsyncGenerator.prototype
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
  context.top = top.next;
  top.goto = goto;
  top.next = null;
  top.queue = [];
  top.running = false;
  top.cleanup = cleanup;
  return (context.value = new AsyncGenerator(top));
}

function awtYldResolve(this: State.Frame, value: any) {
  context.suspended.delete(this);
  this.awaiting = token;
  (<AsyncGeneratorFrame>this).onResolve(
    (context.value = { value, done: false })
  );
}

regOpaqueObject(awtYldResolve, "@effectful/debugger/awt#yld");

function awtDoneResolve(this: State.Frame, value: any) {
  context.suspended.delete(this);
  this.awaiting = token;
  (<AsyncGeneratorFrame>this).onResolve(
    (context.value = { value, done: true })
  );
}

regOpaqueObject(awtDoneResolve, "@effectful/debugger/awt#done");

export function yldAG(value: any, goto: number): any {
  return awtImpl(value, goto, awtYldResolve);
}

export function retAG(value: any): any {
  return awtImpl(value, 0, awtDoneResolve);
}

export const unhandledAG = unhandledA;

export function yldStarAG(value: any, goto: number) {
  const top = <AsyncGeneratorFrame>context.top;
  context.top = top.next;
  return Instr.yldStarAGImpl(top, value, goto);
}
