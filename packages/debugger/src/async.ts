import { Frame, native } from "./state";
import * as State from "./state";
import {
  checkExitBrk,
  resume,
  then,
  frame as frameImpl,
  popFrame
} from "./engine";
import { regOpaqueObject } from "@effectful/serialization";

const { context, token } = State;

interface AsyncFrame extends Frame {
  onReturn: (arg: any) => void;
  onError: (arg: any) => void;
  promise: Promise<any>;
}

let AsyncFunctionPrototype: any;

try {
  AsyncFunctionPrototype = Object.getPrototypeOf(
    native.eval("(async function(){})")
  );
} catch (e) {
  function AsyncFunction() {}
  AsyncFunctionPrototype = AsyncFunction.prototype;
  AsyncFunctionPrototype[Symbol.toStringTag] = "AsyncFunction";
}

export function scopeInit(
  this: AsyncFrame,
  rs: (value: any) => void,
  rj: (value: any) => void
) {
  this.onReturn = rs;
  this.onError = rj;
}

regOpaqueObject(scopeInit, "@effectful/debugger/scopeInit");

export function frameA(closure: State.Closure, newTarget: any) {
  const frame = <AsyncFrame>frameImpl(closure, newTarget);
  const savedCall = context.call;
  context.call = <any>Promise;
  frame.promise = new Promise(scopeInit.bind(frame));
  context.call = savedCall;
  return frame;
}

export function retA(value: any): any {
  const top = <AsyncFrame>context.top;
  context.call = top.onReturn;
  top.onReturn(value);
  top.done = true;
  top.result = void 0;
  if (context.enabled) {
    checkExitBrk(top, top.promise);
  } else if (top.restoreEnabled !== State.undef) context.enabled = true;
  popFrame(top);
  return top.promise;
}

export function unhandledA(reason: any): any {
  const top = <AsyncFrame>context.top;
  context.call = top.onError;
  top.onError(reason);
  top.done = true;
  if (!context.enabled && top.restoreEnabled !== State.undef)
    context.enabled = true;
  popFrame(top);
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
  this.error = error;
  this.meta.errHandler(this, this.$);
  return resume(this, error);
}
regOpaqueObject(awtOnReject, "@effectful/debugger/awt#reject");

export function awt(asyncValue: any): any {
  const top = <AsyncFrame>context.top;
  context.suspended.add(top);
  top.awaiting = asyncValue;
  then(asyncValue, awtOnResolve.bind(top), awtOnReject.bind(top));
  if (!context.enabled && top.restoreEnabled !== State.undef)
    context.enabled = true;
  popFrame(top);
  top.next = null;
  return (context.value = top.promise);
}
