import config from "./config";
import {
  Frame,
  Module,
  Handler,
  StateMap,
  States,
  FunctionDescr,
  saved
} from "./state";
import * as State from "./state";
import {
  fun,
  checkExitBrk,
  resume,
  then,
  handle,
  signalThread,
  frame
} from "./engine";
import { regOpaqueObject } from "@effectful/serialization";

const { context, token } = State;

interface AsyncFrame extends Frame {
  onResolve: (arg: any) => void;
  onReject: (arg: any) => void;
  promise: Promise<any>;
}

let AsyncFunctionPrototype: any;

try {
  AsyncFunctionPrototype = Object.getPrototypeOf(
    saved.eval("(async function(){})")
  );
} catch (e) {
  function AsyncFunction() {}
  AsyncFunctionPrototype = AsyncFunction.prototype;
  AsyncFunctionPrototype[Symbol.toStringTag] = "AsyncFunction";
}

export function funA(
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
    State.AsyncKind
  );
}

export function scopeInit(
  this: AsyncFrame,
  rs: (value: any) => void,
  rj: (value: any) => void
) {
  this.onResolve = rs;
  this.onReject = rj;
}

regOpaqueObject(scopeInit, "@effectful/debugger/scopeInit");

export function scopeA(dest: number): Promise<any> {
  const top = <AsyncFrame>context.top;
  top.goto = dest;
  /*
  if (!top.promise) {
    context.call = <any>Promise;
    top.promise = new Promise(scopeInit.bind(top));
  }
*/
  try {
    return top.meta.handler(top, void 0);
  } catch (e) {
    return handle(top, e);
  }
} // = scope

export function frameA(proto: any, self: any) {
  const top = frame(proto, self, null);
  if (!top.promise) {
    context.call = <any>Promise;
    top.promise = new Promise(scopeInit.bind(top));
  }
  return top;
}

export function retA(value: any): any {
  const top = <AsyncFrame>context.top;
  context.call = top.onResolve;
  top.onResolve(value);
  top.state = top.goto = 0;
  if (context.debug) {
    checkExitBrk(top, top.promise);
  } else if (top.restoreDebug) context.debug = true;
  if ((context.top = top.next) == null) signalThread();
  return top.promise;
}

export function unhandledA(reason: any): any {
  const top = <AsyncFrame>context.top;
  context.call = top.onReject;
  top.onReject(reason);
  top.state = top.goto = 0;
  if (!context.debug && top.restoreDebug) context.debug = true;
  if ((context.top = top.next) == null) signalThread();
  return top.promise;
}

function awtOnResolve(this: Frame, value: any) {
  context.suspended.delete(this);
  this.awaiting = token;
  return resume(this, value);
}

regOpaqueObject(awtOnResolve, "@effectful/debugger/awt#resolve");

export function awtOnReject(this: AsyncFrame, error: any) {
  context.suspended.delete(this);
  this.awaiting = token;
  this.goto = this.meta.errHandler(this.state);
  return resume(this, error);
}
regOpaqueObject(awtOnReject, "@effectful/debugger/awt#reject");

export function awtImpl(
  asyncValue: any,
  goto: number,
  onResolve: (this: Frame, value: any) => any
) {
  const top = <AsyncFrame>context.top;
  if (!context.debug && top.restoreDebug) context.debug = true;
  context.suspended.add(top);
  top.awaiting = asyncValue;
  then(asyncValue, onResolve.bind(top), awtOnReject.bind(top));
  top.goto = goto;
  if ((context.top = top.next) == null) signalThread();
  top.next = null;
  return (context.value = top.promise);
}

export function awt(asyncValue: any, goto: number): any {
  return awtImpl(asyncValue, goto, awtOnResolve);
}
