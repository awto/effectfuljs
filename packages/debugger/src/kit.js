/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */
import config from "./config";
import * as S from "@effectful/serialization";
import * as T from "./transform";
import * as path from "path";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as Trace from "./trace";

export const terminatedToken = new Error("Terminated");

const sysConsole = console;

export const constr = Trace.wrap;

export const context = {
  /** it will stop on break points */
  debug: true,
  /** everything is done */
  terminated: false,
  /** the engine now runs a function */
  running: false,
  /** current execution stack */
  stack: [],
  /** current breakpoint id */
  brk: null,
  /** loaded modules */
  modules: {},
  /** specifies next function needs to be executed synchronously */
  sync: false,
  /** saved context for synchronous functions */
  syncStack: [],
  /** in error state */
  error: false,
  /** next functions to run */
  queue: [],
  /** a current value to be passed into the top of `stack` (or an exception if `error:true`) */
  value: void 0
};

/**
 * Returns `JSON.stringify` serializable object with the whole
 * current execution state
 */
export function capture() {
  return S.write({
    stack: context.stack,
    queue: context.queue
  });
}

/**
 * Restores execution state from an object previously returned by
 * `capture` the current state is discarded
 */
export function restore(json) {
  ({ brk: context.brk, stack: context.stack, queue: context.queue } = S.read(
    json
  ));
}

/**
 * converts a function into another function doing the same, but all
 * callbacks executed within this function will be invoked synchronously
 */
export const region = func => {
  const ret = function(...args) {
    try {
      context.syncStack.push([context.stack, context.sync]);
      context.stack = [];
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
export const runSync = config.expTCExceptions
  ? function runSync(first) {
      const { stack, debug, value, brk } = context;
      context.stack = [first];
      context.debug = false;
      context.brk = null;
      try {
        while (!context.terminated) {
          try {
            return step();
          } catch (e) {
            if (e !== token) throw e;
          }
        }
      } finally {
        context.stack = stack;
        context.debug = debug;
        context.value = value;
        context.brk = brk;
      }
    }
  : function runSync(first) {
      let res;
      const { stack, debug, value, brk } = context;
      context.stack = [first];
      context.debug = false;
      context.brk = null;
      try {
        do {
          res = step();
        } while (res === token);
        return res;
      } finally {
        context.stack = stack;
        context.debug = debug;
        context.value = value;
        context.brk = brk;
      }
    };

export function args(value) {
  return Array.from(value);
}

export const token = { _effectToken: true };

export function module(name, module) {
  let info = context.modules[name];
  if (module && module.hot) module.hot.accept();
  if (info) {
    if (context.onUpdate) context.onUpdate(info);
    return info;
  }
  info = { name, functions: {}, version: 0 };
  if (!name) name = "console";
  S.regOpaqueObject(info, `module#${name}`);
  return (context.modules[name] = info);
}

/** function's meta-data property name */
export const metaDataSymbol = Symbol("@effectful/debugger/metaData");

/** module's meta-data property name */
export const moduleSymbol = Symbol("@effectful/debugger/module");

export function syncMeta(module, func) {
  const wrap = function($$) {
    return func({ $$ });
  };
  return wrap;
}

let metaCount = 0;

export function meta(
  module,
  func,
  handler,
  errHandler,
  finHandler,
  states,
  name,
  loc,
  parent
) {
  let info = module.functions[handler.name];
  if (!info) info = module.functions[handler.name] = {};
  if (!name) name = "*";
  if (!errHandler) errHandler = defaultErrHandler;
  const names = [name];
  for (let p = parent; p; p = p.parent) names.unshift(p.name);
  const fullName = `${path.basename(module.name)}:${names.join(".")}@${loc}`;
  const memo = [];
  let scopeId = 0;
  const prevStates = info.states;
  let prevStatesPos = 0;
  let stateId = 0;
  for (const [scope, kind, loc] of states) {
    let info;
    const [line, column, endLine, endColumn] = location(loc);
    if (prevStates) {
      while ((info = prevStates[prevStatesPos]).line < line) {
        prevStatesPos++;
      }
      if (info.line !== line && info.kind !== kind) info = null;
      else prevStatesPos++;
    }
    if (info == null) info = { kind, id: memo.length, func };
    else if (info.breakpoint && info.breakpoint.signal) {
      info.breakpoint.signal();
    }
    info.line = line;
    info.column = column;
    info.endLine = endLine;
    info.endColumn = endColumn;
    info.exit = false;
    S.regOpaqueObject(info, `s#${module.name}#${handler.name}#${stateId++}`);
    memo.push(info);
    if (scope.length === 4) info.scope = scope[2];
    else {
      info.scope = buildScope(scope);
      scope.push(scopeId++);
    }
    info.scopeId = scope[3];
  }
  const blackbox = (info.blackbox = loc == null);
  info.module = module;
  info.func = func;
  info.handler = handler;
  info.errHandler = errHandler;
  info.finHandler = finHandler;
  info.name = name;
  info.fullName = fullName;
  info.parent = parent;
  info.uniqName = `${info.module.name}#${info.handler.name}`;
  if (info.canSki == null) info.canSkip = false;
  if (info.id == null) info.id = metaCount++;
  info.states = memo;
  [info.line, info.column, info.endLine, info.endColumn] = location(loc);
  if (!blackbox) {
    memo.push(
      (info.exitBreakpoint = {
        kind: "exit",
        id: memo.length,
        func: info,
        scope: memo.length ? memo[0].scope : {},
        line: info.endLine,
        column: info.endColumn,
        endLine: info.endLine,
        endColumn: info.endColumn,
        exit: true
      })
    );
  } else info.exitBreakpoint = null;
  return info.constr || (info.constr = wrapMeta(info));
}

function buildScope(scope) {
  if (scope == null) return {};
  if (scope.length === 3) return scope[2];
  const [vars, par] = scope;
  const scopeInfo = {};
  scope.push(scopeInfo);
  const parScope = buildScope(par);
  for (const i in parScope) {
    const [field, depth] = parScope[i];
    scopeInfo[i] = [field, depth + 1];
  }
  for (const i in vars) scopeInfo[i] = [vars[i], 0];
  return scopeInfo;
}

function wrapMeta(info) {
  const funcDescr = S.regDescriptor({
    name: `p#${info.uniqName}`,
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
    typeofHint: "function",
    strictName: true
  });
  S.regDescriptor({
    name: `f@${info.uniqName}`,
    readContent(ctx, json, value) {
      value.$ = ctx.step(json.$);
    },
    create(ctx, json) {
      const closure = ctx.step(json.constr);
      const proto = closure[metaDataSymbol];
      return Object.create(proto);
    },
    write() {
      return {};
      /*
      const json = {};
      // json.constr = ctx.step(value.constructor, json, "constr");
      return json;
      */
    },
    strictName: true
  });
  function constr($$) {
    const proto = new Frame();
    proto.$meta = info;
    proto.$$ = $$;
    const closure = info.func(proto);
    closure[metaDataSymbol] = proto;
    closure[S.descriptorSymbol] = funcDescr;
    proto.constructor = closure;
    return closure;
  }
  constr[metaDataSymbol] = info;
  S.regOpaqueObject(constr, `c#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info, `i#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info.handler, `h#${info.module.name}#${info.name}`);
  if (info.errHandler)
    S.regOpaqueObject(info.errHandler, `eh#${info.module.name}#${info.name}`);
  return constr;
}

let queueCb;
let newThread = false;

/** an async iterable signaling start of each new sync thread */
export const threads = {
  [Symbol.asyncIterator]() {
    return this;
  },
  return() {
    context.terminated = true;
    if (queueCb) queueCb();
  },
  async next() {
    while (!context.terminated) {
      if (newThread) {
        newThread = false;
        return { done: false };
      }
      if (context.stack.length === 0) {
        while (context.queue.length !== 0) {
          const init = context.queue.shift();
          /* this is already in the stack, but we still need to signal it */
          if (init) {
            context.stack.push(init);
            /* this may be a simple function without breakpoints, 
             avoiding bothering the client for them  */
            step();
          }
          if (context.stack.length !== 0) return { done: false };
        }
      }
      await new Promise(i => (queueCb = i));
      queueCb = null;
    }
    return { done: true };
  }
};

/**
 * runs a computation until it encounters some breakpoint (returns `token)
 * or finishes the whole computation (returns the resulting value or throws an exception)
 */
export const step = config.expTCExceptions
  ? function step() {
      const savedRunning = context.running;
      try {
        context.running = true;
        const { stack } = context;
        while (!context.terminated) {
          if (!stack.length) {
            if (queueCb) queueCb();
            if (context.error) throw context.value;
            return context.value;
          }
          const top = stack[0];
          if (top.brk && top.brk.exit) {
            stack.shift();
            continue;
          }
          context.error = false;
          context.brk = null;
          try {
            top.resume();
          } catch (e) {
            if (e === token) {
              if (context.brk && context.debug) break;
              continue;
            }
            throw e;
          }
          if (context.brk && context.debug) break;
        }
      } finally {
        context.running = savedRunning;
      }
      return token;
    }
  : function step() {
      const savedRunning = context.running;
      try {
        context.running = true;
        const { stack } = context;
        while (!context.terminated) {
          if (!stack.length) {
            if (queueCb) queueCb();
            if (context.error) throw context.value;
            return context.value;
          }
          const top = stack[0];
          if (top.brk && top.brk.exit) {
            stack.shift();
            continue;
          }
          context.error = false;
          context.brk = null;
          top.resume();
          if (context.brk && context.debug) break;
        }
      } finally {
        context.running = savedRunning;
      }
      return token;
    };

function Frame() {}

const eff = config.expTCExceptions
  ? function() {
      throw token;
    }
  : function() {
      return token;
    };

const FramePrototype = (Frame.prototype = {
  scope(self, newTarget, dest) {
    if (newTarget) Trace.unwrapPrototype(self);
    this.$state = dest;
    this.newTarget = newTarget !== void 0;
    this.$self = self;
    if (context.sync) return runSync(this);
    /* some function is called not via `step` - this may be some event handler */
    const len = context.stack.length;
    if (!context.running) {
      /* if we can run it immediately */
      if (len === 0 && context.queue.length === 0) {
        context.stack.unshift(this);
        const res = step();
        if (res === token) {
          newThread = true;
          if (queueCb) queueCb();
        }
        return res;
      } else if (this.canSkip) {
        /*
         * some monkey-patched function is called not from within debugger's context
         * this may be webpack HMR or some test framework
         * WARNING! this however changes semantics, as this makes some sync code
         * to run before some other sync code is finished
         */
        return runSync(this);
      }
      /* something is already running, saving this for some next iteration */
      if (queueCb) queueCb();
      context.queue.push(this);
      return eff();
    }
    context.stack.unshift(this);
    this.resume();
    /* a shortcut for functions without breakpoints */
    if (context.stack.length === len) {
      if (context.error) throw context.value;
      return context.value;
    }
    return eff();
  },
  pure(value) {
    if (this.newTarget && (!value || typeof value !== "object"))
      value = this.$self;
    const brk =
      context.debug && (context.brk = this.brk = this.$meta.exitBreakpoint);
    this.$state = 0;
    if (!brk) context.stack.shift();
    context.value = value;
  },
  raise(error) {
    const callee = context.stack[1];
    if (config.verbose) sysConsole.error(error);
    this.$state = 0;
    context.value = error;
    const brk =
      context.debug && (context.brk = this.brk = this.$meta.exitBreakpoint);
    context.error = true;
    if (!brk) context.stack.shift();
    if (callee) callee.$state = callee.$meta.errHandler(callee.$state);
  },
  resume() {
    if (context.terminated) throw terminatedToken;
    try {
      const arg = context.value;
      context.value = void 0;
      context.error = false;
      this.$meta.handler(this, arg);
    } catch (e) {
      if (e === token) throw e;
      this.$state = this.$meta.errHandler(this.$state);
      if (config.verbose) sysConsole.error(e);
      context.error = true;
      context.value = e;
    }
  },
  eval(src, id) {
    return compileEval(src, this, this.$meta.states[id])(this);
  }
});

const locationRE = /^(\d+):(\d+)-(\d+):(\d+)$/;

/** parses location string into a tuple with a line, a column, a last last and a last column */
export function location(str) {
  const res = [];
  if (!str) return res;
  const re = locationRE.exec(str);
  if (!re || re.length < 5) return res;
  for (let i = 1; i < 5; i++) res.push(+re[i]);
  return res;
}

export function compileEval(code, func, state, blackbox) {
  const meta = func.$meta;
  const memo = meta.evalMemo || (meta.evalMemo = new Map());
  const key = `${code}@${state.scopeId}/${!!blackbox}`;
  let res = memo.get(key);
  if (res) return res;
  const wcode = `return function eval($$) { ${code} }`;
  const ast = babelParse(wcode, { allowReturnOutsideFunction: true });
  const body = ast.program.body[0].argument.body.body;
  if (body.length === 1 && body[0].type === "ExpressionStatement")
    body[0] = { type: "ReturnStatement", argument: body[0].expression };
  blackbox = blackbox || meta.blackbox || !context.debug;
  const tgt = babelGenerate(
    T.run(ast, {
      preInstrumentedLibs: true,
      blackbox,
      pureModule: true,
      evalCtx: state.scope,
      importRT: false,
      ns: "$effectful$debugger$lib$"
    }),
    { compact: true }
  ).code;
  res = new Function("$effectful$debugger$lib$", tgt)(exports);
  if (blackbox) res = region(res);
  memo.set(key, res);
  return res;
}

S.regOpaqueObject(FramePrototype, "debugger#frame");

function defaultErrHandler() {
  return 1;
}

export function frame(proto) {
  const res = Object.create(proto);
  res.$ = constr({});
  res.brk = null;
  return constr(res);
}

export function brk(id) {
  if (context.debug === false) return;
  const top = context.stack[0];
  top.brk = context.brk = top.$meta.states[id];
  return eff();
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
