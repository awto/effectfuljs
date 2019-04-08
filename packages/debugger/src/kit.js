/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */

import config from "./config";

export const context = {
  stack: null,
  brk: "loaded",
  modules: {},
  threads: [],
  sync: false,
  startThread(first) {
    if (this.sync) return runSync(first);
    this.threads.push(first);
    return token;
  }
};

/**
 * converts a function into another function doing the same, but all
 * callbacks executed within this function will be invoked synchronously
 */
export const region = func =>
  function(...args) {
    const { stack: saved, rec: recSaved } = context;
    try {
      context.stack = null;
      context.sync = true;
      return func.apply(this, args);
    } finally {
      context.sync = recSaved;
      context.stack = saved;
    }
  };

/** executes a thread starting from the `first` frame */
export function runSync(first) {
  let res;
  context.stack = [first];
  do {
    res = step();
  } while (res === token);
  return res;
}

export const token = { _effectToken: true };

export function module(name) {
  return (context.modules[name] = { functions: [], name });
}

export function meta(module, scope) {
  const info = { module, scope };
  module.functions.push(info);
  return info;
}

export function step() {
  do {
    if (!context.stack.length) {
      context.stack = null;
      if (context.state === "raise") throw context.value;
      return context.value;
    }
    const top = context.stack[0];
    context.brk = null;
    top.resume();
  } while (context.brk == null);
  return token;
}

export function stepOut() {
  for (
    let len = context.stack.length - 1;
    context.stack.length > len;
    step()
  ) {}
}

export function stepOver() {
  for (let len = context.stack.length; context.stack.length > len; step()) {}
}

const FramePrototype = {
  scope(self, newTarget, dest) {
    this.$state = dest;
    this.$inNew = newTarget !== void 0;
    this.$self = self;
    if (context.stack) {
      context.stack.unshift(this);
      context.value = void 0;
      return this.resume();
    }
    return context.startThread(this);
  },
  chain(eff, dest) {
    this.$state = dest;
    if (eff !== token) context.value = eff;
    return token;
  },
  pure(value) {
    if (this.$inNew && (!value || typeof value !== "object"))
      value = this.$self;
    this.$state = 0;
    context.stack.shift();
    context.brk = null;
    context.value = value;
    return token;
  },
  raise(error) {
    this.$state = 0;
    context.stack.shift();
    context.value = error;
    context.brk = "throw";
    const callee = context.stack[0];
    if (callee) callee.$state = callee.$err(callee.$state);
  },
  resume() {
    try {
      const arg = context.value;
      context.value = void 0;
      return this.$run(arg);
    } catch (e) {
      this.$state = this.$err(this.$state);
      context.brk = "throw";
      context.value = e;
      return token;
    }
  }
};

function defaultErrHandler() {
  return 1;
}

export function func(func, meta, handler, errHandler) {
  const proto = Object.create(FramePrototype);
  proto.$run = handler;
  proto.constructor = func;
  proto.$meta = meta;
  proto.$err = errHandler || defaultErrHandler;
  func.$proto = proto;
  return func;
}

export function frame(fun) {
  const res = Object.create(fun.$proto);
  res.$ = {};
  res.$$ = {};
  return res;
}

export function constr(v) {
  return v;
}

export function brk(name, descr) {
  context.brk = name;
  context.stack[0].location = descr;
  return token;
}

export function iterator(v) {
  return v[Symbol.iterator]();
}

export function asyncIterator(v) {
  return v[Symbol.asyncIterator]();
}

export function forInIterator(obj) {
  return (function*() {
    for (const i in obj) yield i;
  })()[Symbol.iterator]();
}

/**
 * marks functions represeting a lazy value, the value is result
 * of the function's call
 */
export const thunkSymbol = Symbol("@effectful/debugger/thunk");

/**
 * if `value` is a lazy thunk it is executed and its result is returned
 * otherwise `value` is returned as is
 */
export function unwrap(value) {
  return value && value[thunkSymbol] ? value() : value;
}

if (config.replaceRT) {
  EventTarget.prototype.dispatchEvent = region(
    // TODO: this can be traceable
    EventTarget.prototype.dispatchEvent
  );
  const { defineProperty } = Object;
  Object.defineProperty = function definePropert(obj, prop, descr) {
    const copy = { ...descr };
    if (copy.set) copy.set = region(copy.set);
    if (copy.get) copy.get = region(copy.get);
    return defineProperty(obj, prop, descr);
  };
}