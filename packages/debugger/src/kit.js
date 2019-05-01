/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */

import config from "./config";
import * as S from "@effectful/serialization";

export const context = {
  stack: null,
  brk: "loaded",
  modules: {},
  threads: [],
  sync: false,
  syncStack: [],
  error: false,
  startThread(first) {
    if (this.sync) return runSync(first);
    this.threads.push(first);
    return token;
  }
};

/**
 * Returns `JSON.stringify` serializable object with the whole
 * current execution state
 */
export function capture() {
  return S.write({
    stack: context.stack,
    threads: context.threads,
    sync: context.sync,
    brk: context.brk
  });
}

/**
 * Restores execution state from an object previously returned by
 * `capture` the current state is discarded
 */
export function restore(json) {
  const { brk, threads, sync, stack } = S.read(json);
  context.brk = brk;
  context.error = false;
  context.threads = threads;
  context.sync = sync;
  context.stack = stack;
}

/**
 * converts a function into another function doing the same, but all
 * callbacks executed within this function will be invoked synchronously
 */
export const region = func => {
  const ret = function(...args) {
    try {
      context.syncStack.push([context.stack, context.sync]);
      context.stack = null;
      context.sync = true;
      return func.apply(this, args);
    } finally {
      [context.stack, context.sync] = context.syncStack.pop();
    }
  };
  S.regOpaqueObject(ret, `region${func.name || "?"}`);
  return ret;
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

export function args(value) {
  return Array.from(value);
}

export const token = { _effectToken: true };

export function module(name) {
  const module = { functions: [], name };
  S.regOpaqueObject(module, `module#${name}`);
  return (context.modules[name] = module);
}

export const metaDataSymbol = Symbol("@effectful/debugger/metaData");

export function syncMeta(module, func) {
  const wrap = function($$) {
    return func({ $$ });
  };
  return wrap;
}

export function meta(
  module,
  func,
  handler,
  errHandler,
  finHandler,
  name,
  loc,
  parent,
  scope
) {
  if (!name) name = "*";
  if (!errHandler) errHandler = defaultErrHandler;
  const info = {
    module,
    func,
    handler,
    errHandler,
    finHandler,
    name,
    loc,
    parent,
    scope
  };
  const wrap = wrapMeta(info);
  S.regOpaqueObject(info, `i#${info.module.name}#${info.name}`);
  module.functions.push(info);
  return wrap;
}

function wrapMeta(info) {
  const funcDescr = S.regDescriptor({
    name: `p#${info.module.name}#${info.name}`,
    create() {
      return constr();
    },
    readContent(ctx, json, value) {
      value[metaDataSymbol].$$ = ctx.step(json.$$);
    },
    write(ctx, value) {
      const json = {};
      const proto = value[metaDataSymbol];
      json.$$ = ctx.step(proto.$$, json, "$$");
      return json;
    },
    overrideProps: { [metaDataSymbol]: false },
    typeofHint: "function"
  });
  const frameDescr = S.regDescriptor({
    name: `f@${info.module.name}#${info.name}`,
    readContent(ctx, json, value) {
      value.$ = ctx.step(json.$);
    },
    create(ctx, json) {
      const closure = ctx.step(json.constr);
      const proto = closure[metaDataSymbol];
      return Object.create(proto);
    },
    write(ctx, value) {
      const json = {};
      // json.constr = ctx.step(value.constructor, json, "constr");
      return json;
    }
  });
  function constr($$) {
    const proto = Object.create(FramePrototype);
    proto.$meta = info;
    proto.$$ = $$;
    proto.$run = info.handler;
    proto.$err = info.errHandler;
    const closure = info.func(proto);
    closure[metaDataSymbol] = proto;
    closure[S.descriptorSymbol] = funcDescr;
    // proto[S.descriptorSymbol] = frameDescr;
    proto.constructor = closure;
    return closure;
  }
  S.regOpaqueObject(constr, `c#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info.handler, `h#${info.module.name}#${info.name}`);
  if (info.errHandler)
    S.regOpaqueObject(info.errHandler, `eh#${info.module.name}#${info.name}`);
  return constr;
}

export function step() {
  do {
    if (!context.stack.length) {
      context.stack = null;
      if (context.error) throw context.value;
      return context.value;
    }
    const top = context.stack[0];
    context.brk = null;
    context.error = false;
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
    this.newTarget = newTarget !== void 0;
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
    if (this.newTarget && (!value || typeof value !== "object"))
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
    context.error = true;
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
      context.error = true;
      context.value = e;
      return token;
    }
  }
};

S.regOpaqueObject(FramePrototype, "debugger#frame");

function defaultErrHandler() {
  return 1;
}

export function frame(proto) {
  const res = Object.create(proto);
  res.$ = {};
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

export function imports(value, name) {
  if (!value) return value;
  if (value[thunkSymbol]) {
    value = value();
    if (!value) return value;
  }
  if (!value[S.descriptorSymbol]) regModule(value, name);
  return value;
}

export function regModule(exp, name) {
  if (exp[S.descriptorSymbol]) return;
  if (!name) name = "?";
  if (typeof exp === "object" || typeof exp === "function")
    S.regOpaqueObject(exp, `module#${name}`);
  for (const i in exp) {
    const f = exp[i];
    if (!f) continue;
    const ty = typeof f;
    if (ty === "function" || ty === "object")
      S.regOpaqueObject(f, `export#${name}#${i}`);
    else if (ty === "symbol" && !Symbol.keyFor(f))
      S.regOpaquePrim(f, `export#${name}#${i}`);
  }
}

if (config.replaceRT) {
  const { defineProperty } = Object;
  Object.defineProperty = function definePropert(obj, prop, descr) {
    const copy = { ...descr };
    if (copy.set) copy.set = region(copy.set);
    if (copy.get) copy.get = region(copy.get);
    return defineProperty(obj, prop, descr);
  };
  Function.prototype.bind = function bind(self, ...args) {
    return S.bind(this, self, ...args);
  };
}
