import {
  FunctionDescr,
  GeneratorFrame,
  saved,
  Module,
  StateMap,
  States,
  Handler
} from "./state";
import * as State from "./state";
import { fun, clos, checkExitBrk, unhandled, pop } from "./engine";
import * as Instr from "./instr/rt";
import { regConstructor, regOpaqueObject } from "@effectful/serialization";

const { context } = State;

const { defineProperty } = saved.Object;

class IterableThis {
  [Symbol.iterator]() {
    return this;
  }
}

regConstructor(IterableThis);

class Generator extends IterableThis {
  $frame: GeneratorFrame;
  constructor(frame: GeneratorFrame) {
    super();
    this.$frame = frame;
  }
}

regConstructor(Generator);

const Gp = <any>Generator.prototype;

defineProperty(Gp, "next", {
  value: Instr.generatorMethod(Instr.generatorNext),
  configurable: true
});
defineProperty(Gp, "throw", {
  value: Instr.generatorMethod(Instr.generatorThrow),
  configurable: true
});
defineProperty(Gp, "return", {
  value: Instr.generatorMethod(Instr.generatorReturn),
  configurable: true
});

function GeneratorFunction() {}

regOpaqueObject(GeneratorFunction);

function GeneratorFunctionPrototype() {}

regOpaqueObject(GeneratorFunctionPrototype);

GeneratorFunctionPrototype.prototype = Gp;
GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor = GeneratorFunction;
(<any>GeneratorFunctionPrototype)[
  Symbol.toStringTag
] = GeneratorFunction.displayName = "GeneratorFunction";

export function funG(
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
    State.GeneratorKind
  );
}

export function closG($$: any, meta: FunctionDescr, closure: any) {
  const res = clos($$, meta, closure);
  Object.setPrototypeOf(res, GeneratorFunctionPrototype);
  res.prototype = Object.create(Gp);
  return res;
}

export function scopeG(goto: number) {
  const top = <GeneratorFrame>context.top;
  if (!context.debug && top.restoreDebug) context.debug = true;
  pop(top);
  top.goto = goto;
  top.next = null;
  const caller = top.func;
  const esProto =
      caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
    res = Object.create(esProto);
  res.$frame = top;
  return res;
}

export function yld(value: any, goto: number): any {
  const top = <GeneratorFrame>context.top;
  const res = (context.value = { value, done: false });
  top.goto = goto;
  if (!context.debug && top.restoreDebug) context.debug = true;
  pop(top);
  return res;
}

export function retG(value: any): any {
  const top = <GeneratorFrame>context.top;
  const res = (context.value = { value, done: true });
  top.state = top.goto = 0;
  if (context.debug) checkExitBrk(top, res);
  else if (top.restoreDebug) context.debug = true;
  pop(top);
  return res;
}

export const unhandledG = unhandled;

export function yldStar(value: any, goto: number): any {
  const top = <GeneratorFrame>context.top;
  pop(top);
  context.call = Instr.yldStarImpl;
  return Instr.yldStarImpl(top, value, goto);
}
