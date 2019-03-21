/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */

export const context = {
  brk: "loaded",
  modules: {},
  stack: []
};

export const effectToken = { _effectToken: true };

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
      if (context.state === "raise") throw context.value;
      return context.value;
    }
    const top = context.stack[0];
    context.brk = null;
    top.resume(context.value);
  } while (context.brk == null);
  return effectToken;
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

class Instance {
  scope(dest) {
    this.$state = dest;
    this.$cont = (ctx, value) => this.step(ctx, value);
    context.stack.unshift(this);
    context.value = void 0;
    // this.resume();
    return effectToken;
  }
  chain(eff, dest) {
    this.$state = dest;
    if (eff !== effectToken) {
      context.value = eff;
    }
    return effectToken;
  }
  pure(value) {
    context.stack.shift();
    context.brk = "return";
    context.value = value;
    return effectToken;
  }
  raise(error) {
    context.stack.shift();
    context.value = error;
    context.brk = "throw";
    const callee = context.state[0];
    if (callee) callee.$state = callee.$err(callee.$cur);
  }
  resume(value) {
    try {
      this.$run((this.$cur = this.$state), value);
    } catch (e) {
      context.brk = "throw";
      context.value = e;
    }
  }
}

function defaultErrHandler() {
  return 1;
}

export function fun(func, meta, handler, errHandler) {
  const proto = Object.create(new Instance());
  proto.$run = handler;
  proto.constructor = func;
  proto.$meta = meta;
  proto.$err = errHandler || defaultErrHandler;
  func.$proto = proto;
  return func;
}

export function instance(fun) {
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
  return effectToken;
}

export function iterator(v) {
  return v[Symbol.iterator]();
}

export function asyncIterator(v) {
  return v[Symbol.asyncIterator]();
}
