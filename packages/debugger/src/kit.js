export const config = {
  /** replace standard runtime functions with their instrumented equivalents */
  replaceRT: true
};

/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */

export const context = {
  stack: null,
  brk: "loaded",
  modules: {},
  threads: [],
  startThread(first) {
    this.threads.push([first]);
  }
};

/**
 * converts a possibly instrumented function into a plain JS function,
 * by running it ignoring all breakpoints
 */
export const lift = func => (...args) => {
  const { stack: saved } = context;
  try {
    context.stack = null;
    let res = func(...args);
    if (res !== token) return res;
    context.stack = context.threads.pop();
    do {
      res = step();
    } while (res === token);
    return res;
  } finally {
    context.stack = saved;
  }
};

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
    top.resume(context.value);
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
      return this.resume((context.value = void 0));
    }
    context.startThread(this);
    return token;
  },
  chain(eff, dest) {
    this.$state = dest;
    if (eff !== token) context.value = eff;
    return token;
  },
  pure(value) {
    if (this.$inNew && (!value || typeof value !== "object"))
      value = this.$self;
    context.stack.shift();
    context.brk = null;
    context.value = value;
    return token;
  },
  raise(error) {
    context.stack.shift();
    context.value = error;
    context.brk = "throw";
    const callee = context.stack[0];
    if (callee) callee.$state = callee.$err(callee.$cur);
  },
  resume(value) {
    try {
      return this.$run((this.$cur = this.$state), value);
    } catch (e) {
      this.$state = this.$err(this.$cur);
      context.brk = "throw";
      context.value = e;
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
