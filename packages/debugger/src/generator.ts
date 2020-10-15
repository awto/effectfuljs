import { FunctionDescr, GeneratorFrame } from "./state";
import * as State from "./state";
import config from "./config";
import {
  pushFrame,
  popFrame,
  makeFrame,
  clos,
  checkExitBrk,
  unhandled,
  handle,
  FunctionConstr
} from "./engine";
import { regConstructor, regOpaqueObject } from "@effectful/serialization";
const { context, native } = State;

const { defineProperty, setPrototypeOf } = native.Object;

class IterableThis {
  [Symbol.iterator]() {
    return this;
  }
}

regConstructor(IterableThis);

class Generator extends IterableThis {
  _frame: GeneratorFrame;
  constructor(frame: GeneratorFrame) {
    super();
    this._frame = frame;
  }
}

regConstructor(Generator);

const Gp = <any>Generator.prototype;

defineProperty(Gp, "throw", {
  value: function raise(e: any) {
    context.call = context.call === raise ? next : null;
    const frame = this._frame;
    frame.error = e;
    frame.meta.errHandler(frame, frame.$);
    return this.next(e);
  },
  configurable: true,
  writable: true
});

function next(this: any, value: any) {
  const frame = this._frame;
  if (frame.running) throw new Error("Generator is already running");
  frame.sent = value;
  frame.running = true;
  context.call = context.call === next ? frame.func : null;
  pushFrame(frame);
  try {
    return frame.meta.handler(frame, frame.$, value);
  } catch (e) {
    return handle(frame, e);
  }
}

defineProperty(Gp, "return", {
  value: function ret(this: any, r: any) {
    context.call = context.call === ret ? next : null;
    const frame = this._frame;
    frame.meta.finHandler(frame, frame.$);
    frame.result = r;
    return this.next(r);
  },
  configurable: true,
  writable: true
});

defineProperty(Gp, "next", {
  value: next,
  configurable: true,
  writable: true
});

function GeneratorFunction() {}

regOpaqueObject(GeneratorFunction);

function GeneratorFunctionPrototype() {}

setPrototypeOf(GeneratorFunctionPrototype, FunctionConstr.prototype);

regOpaqueObject(GeneratorFunctionPrototype);

GeneratorFunctionPrototype.prototype = Gp;
GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor = GeneratorFunction;
(<any>GeneratorFunctionPrototype)[
  Symbol.toStringTag
] = GeneratorFunction.displayName = "GeneratorFunction";

export function closG($$: any, meta: FunctionDescr, closure: any) {
  const res = clos($$, meta, closure);
  Object.setPrototypeOf(res, GeneratorFunctionPrototype);
  /*
  const proto = (res.prototype = Object.create(Gp));
  defineProperty(proto, "next", {
    value: meta.handler,
    configurable: true
  });*/
  res.prototype = Object.create(Gp);
  return res;
}

export const frameG: (
  closure: any,
  meta: any,
  parent: any,
  vars: any[] | null,
  newTarget: any
) => GeneratorFrame = config.expInlineNext
  ? function frameG(
      closure: any,
      meta: any,
      parent: any,
      vars: any[] | null,
      newTarget: any
    ) {
      const frame = <GeneratorFrame>(
        makeFrame(closure, meta, parent, vars, newTarget)
      );
      const iter = Object.create(closure.prototype);
      frame.iter = iter;
      iter.next = (<any>frame.meta).nextImpl;
      iter._frame = frame;
      return frame;
    }
  : function frameG(
      closure: any,
      meta: any,
      parent: any,
      vars: any[] | null,
      newTarget: any
    ) {
      const frame = <GeneratorFrame>(
        makeFrame(closure, meta, parent, vars, newTarget)
      );
      const iter = Object.create(closure.prototype);
      frame.iter = iter;
      iter._frame = frame;
      return frame;
    };

export function yld(value: any): any {
  const frame = <GeneratorFrame>context.top;
  const res = (context.value = { value, done: false });
  if (!context.enabled && frame.restoreEnabled !== State.undef)
    context.enabled = true;
  popFrame(frame);
  frame.running = false;
  return res;
}

export function retG(value: any): any {
  const frame = <GeneratorFrame>context.top;
  const res = (context.value = { value, done: true });
  frame.result = void 0;
  frame.running = false;
  frame.done = true;
  if (context.enabled) checkExitBrk(frame, res);
  else if (frame.restoreEnabled !== State.undef) context.enabled = true;
  popFrame(frame);
  return res;
}

export function unhandledG(e: any) {
  const frame = <GeneratorFrame>context.top;
  frame.running = false;
  frame.done = true;
  return unhandled(e);
}
