/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */
import config from "./config";
import {
  context,
  Frame,
  Brk,
  FunctionDescr,
  Module,
  Scope,
  ScopeInfo,
  BrkKind,
  saved,
  terminationToken,
  token,
  metaDataSymbol
} from "./state";
import { unwrapPrototype, wrap } from "./trace/main";
import * as S from "@effectful/serialization";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";

/**
 * converts a function into another function doing the same, but all
 * callbacks executed within this function will be invoked synchronously
 */
export const region: (
  func: (this: any, ...args: any[]) => any
) => (this: any, ...args: any[]) => any = func => {
  const ret = function(this: any, ...args: any[]) {
    try {
      context.syncStack.push({
        stack: context.stack,
        sync: context.sync,
        brk: context.brk,
        value: context.value
      });
      context.stack = [];
      context.sync = true;
      return func.apply(this, args);
    } finally {
      const f = context.syncStack.pop();
      if (f) {
        context.stack = f.stack;
        context.sync = f.sync;
        context.brk = f.brk;
        context.value = f.value;
      }
    }
  };
  S.regOpaqueObject(ret, `region${func.name || "?"}`);
  return ret;
};

var deb_: any = global;

/** executes a thread starting from the `first` frame */
export const runSync = config.expTCExceptions
  ? function runSync(first: Frame) {
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
  : function runSync(first: Frame) {
      let res: any;
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

export function args<T>(value: Iterable<T>): Array<T> {
  return Array.from(value);
}

interface WebpackModule {
  hot?: {
    accept(): void;
  };
}

export function module(name: string, module: WebpackModule) {
  let info = context.modules[name];
  if (module && module.hot) module.hot.accept();
  if (info) {
    // if (context.onUpdate) context.onUpdate(info);
    return info;
  }
  info = { name, functions: {} };
  if (!name) name = "console";
  S.regOpaqueObject(info, `module#${name}`);
  return (context.modules[name] = info);
}

export function syncMeta<Closure, Res>(
  _: Module,
  func: (ctx: { $$: Closure }) => Res
): (c: any) => Res {
  const wrap = function($$: Closure) {
    return func({ $$ });
  };
  return wrap;
}

let metaCount = 0;

export function meta(
  module: Module,
  func: (...args: any[]) => any,
  handler: (f: Frame, pat: any) => any,
  errHandler: ((state: number) => number) | undefined,
  finHandler: ((state: number) => number) | undefined,
  states: [Scope, BrkKind, string][],
  name: string,
  loc: string,
  parent: FunctionDescr | undefined
): ($$: { [name: string]: any }) => any {
  let meta = module.functions[handler.name];
  if (!meta) meta = module.functions[handler.name] = <FunctionDescr>{};
  if (!name) name = "*";
  if (!errHandler) errHandler = defaultErrHandler;
  if (!finHandler) finHandler = defaultFinHandler;
  const names = [name];
  for (let p = parent; p; p = p.parent) names.unshift(p.name);
  const fullName = `${module.name}:${names.join(".")}@${loc}`;
  const memo: Brk[] = [];
  for (const [scope, kind, loc] of states) {
    const [line, column, endLine, endColumn] = location(loc);
    let scopeInfo: ScopeInfo;
    if (scope.length === 3) {
      scopeInfo = scope[2];
    } else {
      scopeInfo = buildScope(scope);
    }
    const brk: Brk = {
      kind,
      id: memo.length,
      meta,
      line,
      column,
      endLine,
      endColumn,
      exit: false,
      scope: scopeInfo
    };
    S.regOpaqueObject(brk, `s#${module.name}#${handler.name}#${brk.id}`);
    memo.push(brk);
  }
  meta.blackbox = loc == null;
  meta.module = module;
  meta.func = func;
  meta.handler = handler;
  meta.errHandler = errHandler;
  meta.finHandler = finHandler;
  meta.name = name;
  meta.fullName = fullName;
  meta.parent = parent;
  meta.uniqName = `${meta.module.name}#${meta.handler.name}`;
  if (meta.canSkip == null) meta.canSkip = false;
  if (meta.id == null) meta.id = metaCount++;
  meta.states = memo;
  if (!meta.blackbox) {
    [meta.line, meta.column, meta.endLine, meta.endColumn] = location(loc);
    memo.push(
      (meta.exitBreakpoint = {
        kind: "exit",
        id: memo.length,
        meta,
        scope: memo.length ? memo[0].scope : {},
        line: meta.endLine,
        column: meta.endColumn,
        endLine: meta.endLine,
        endColumn: meta.endColumn,
        exit: true
      })
    );
  } else meta.exitBreakpoint = null;
  return meta.constr || (meta.constr = wrapMeta(meta));
}

function buildScope(scope: Scope): ScopeInfo {
  if (scope == null) return {};
  if (scope.length === 3) return scope[2];
  const [vars, par] = scope;
  const scopeInfo: ScopeInfo = {};
  scope.push(scopeInfo);
  if (par) {
    const parScope = buildScope(par);
    for (const i in parScope) {
      const [field, depth] = parScope[i];
      scopeInfo[i] = [field, depth + 1];
    }
  }
  for (const i in vars) scopeInfo[i] = [vars[i], 0];
  return scopeInfo;
}

function wrapMeta(
  info: FunctionDescr
): ($$?: { [name: string]: any }) => (...args: any) => any {
  const funcDescr = S.regDescriptor<any>({
    name: `p#${info.uniqName}`,
    create() {
      return constr();
    },
    readContent(ctx, json, value) {
      value[metaDataSymbol].$$ = ctx.step((<any>json).$$);
    },
    write(ctx, value) {
      const json: any = {};
      const proto = value[metaDataSymbol];
      json.$$ = ctx.step(proto.$$, json, "$$");
      return json;
    },
    overrideProps: { [metaDataSymbol]: false },
    typeofHint: "function",
    strictName: true
  });
  S.regDescriptor<any>({
    name: `f@${info.uniqName}`,
    readContent(ctx, json, value) {
      value.$ = ctx.step((<any>json).$);
    },
    create(ctx, json) {
      const closure = ctx.step((<any>json).constr);
      const proto = closure[metaDataSymbol];
      return Object.create(proto);
    },
    write() {
      return {};
    },
    strictName: true
  });
  function constr($$?: { [name: string]: any }): (...args: any[]) => any {
    const proto = new CallFrame(info, $$);
    const closure = info.func(proto);
    closure[metaDataSymbol] = proto;
    closure[S.descriptorSymbol] = funcDescr;
    proto.constructor = closure;
    return closure;
  }
  (<any>constr)[metaDataSymbol] = info;
  S.regOpaqueObject(constr, `c#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info, `i#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info.handler, `h#${info.module.name}#${info.name}`);
  if (info.errHandler)
    S.regOpaqueObject(info.errHandler, `eh#${info.module.name}#${info.name}`);
  return constr;
}

let queueCb: (() => void) | null = null;
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
        while (context.asyncQueue.length !== 0) {
          const init = context.asyncQueue.shift();
          /* this is already in the stack, but we still need to signal it */
          if (init) {
            // context.stack.push(init);
            context.stack = init.stack;
            context.sync = init.sync;
            context.brk = init.brk;
            context.value = init.value;
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

const emptyClosure: { [name: string]: any } = {};

class CallFrame {
  meta: FunctionDescr;
  $$: { [name: string]: any };
  constructor(meta: FunctionDescr, $$?: { [name: string]: any }) {
    this.meta = meta;
    this.$$ = $$ || emptyClosure;
  }
  scope(this: Frame, self: any, newTarget: boolean, dest: number) {
    if (newTarget) unwrapPrototype(self);
    this.state = dest;
    this.newTarget = newTarget !== void 0;
    this.self = self;
    if (context.sync) return runSync(this);
    /* some function is called not via `step` - this may be some event handler */
    const len = context.stack.length;
    if (!context.running) {
      /* if we can run it immediately */
      if (len === 0 && context.asyncQueue.length === 0) {
        context.stack.unshift(this);
        const res = step();
        if (res === token) {
          newThread = true;
          if (queueCb) queueCb();
        }
        return res;
      }
      const { stack, debug, value, brk } = context;
      context.stack = [this];
      context.brk = null;
      try {
        const res = step();
        if (res === token) {
          newThread = true;
          if (queueCb) queueCb();
          context.asyncQueue.push({
            stack: context.stack,
            sync: context.sync,
            brk: context.brk,
            value: context.value
          });
        }
        return res;
      } finally {
        context.stack = stack;
        context.debug = debug;
        context.value = value;
        context.brk = brk;
      }

      //  if (this.meta.canSkip) {
      /*
       * some monkey-patched function is called not from within debugger's context
       * this may be webpack HMR or some test framework
       * WARNING! this however changes semantics, as this makes some sync code
       * to run before some other sync code is finished
       */
      //      return runSync(this);
      //      }

      /* something is already running, saving this for some next iteration */

      //      if (queueCb) queueCb();

      //      context.asyncQueue.push(this);
      // return eff();
    }
    context.stack.unshift(this);
    this.resume();
    /* a shortcut for functions without breakpoints */
    if (context.stack.length === len) {
      if (context.error) throw context.value;
      return context.value;
    }
    return eff();
  }
  pure(this: Frame, value: any) {
    if (this.newTarget && (!value || typeof value !== "object"))
      value = this.self;
    const brk =
      context.debug && (context.brk = this.brk = this.meta.exitBreakpoint);
    this.state = 0;
    if (!brk) context.stack.shift();
    context.value = value;
  }
  raise(this: Frame, error: any) {
    const callee = context.stack[1];
    if (config.verbose) saved.console.error(error);
    this.state = 0;
    context.value = error;
    const brk =
      context.debug && (context.brk = this.brk = this.meta.exitBreakpoint);
    context.error = true;
    if (!brk) context.stack.shift();
    if (callee) callee.state = callee.meta.errHandler(callee.state);
  }
  resume(this: Frame) {
    if (context.terminated) throw terminationToken;
    try {
      const arg = context.value;
      context.value = void 0;
      context.error = false;
      this.meta.handler(this, arg);
    } catch (e) {
      if (e === token) throw e;
      this.state = this.meta.errHandler(this.state);
      if (config.verbose) saved.console.error(e);
      context.error = true;
      context.value = e;
    }
  }
  eval(this: Frame, src: string, id: number) {
    return compileEval(src, this, this.meta.states[id])(this);
  }
}

const eff = config.expTCExceptions
  ? function() {
      throw token;
    }
  : function() {
      return token;
    };

const locationRE = /^(\d+):(\d+)-(\d+):(\d+)$/;

/** parses location string into a tuple with a line, a column, a last last and a last column */
export function location(str: string): number[] {
  const res: number[] = [];
  if (!str) return res;
  const re = locationRE.exec(str);
  if (!re || re.length < 5) return res;
  for (let i = 1; i < 5; i++) res.push(+re[i]);
  return res;
}

let evalCnt = 0;

export function compileEval(
  code: string,
  func: Frame,
  state: Brk,
  blackbox?: boolean
) {
  const meta = func.meta;
  const memo = meta.evalMemo || (meta.evalMemo = new Map());
  const key = `${code}@${state.id}/${!!blackbox}`;
  let res = memo.get(key);
  if (res) return res;
  const id = evalCnt++;
  const wcode = `return function eval_${id}($$) { ${code} }`;
  const ast = babelParse(wcode, { allowReturnOutsideFunction: true });
  const body = (<any>ast.program.body[0]).argument.body.body;
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
      moduleName: `#eval_${id}`,
      ns: "$effectful$debugger$lib$"
    }),
    { compact: true }
  ).code;
  res = new Function("$effectful$debugger$lib$", tgt)(exports);
  if (blackbox) res = region(res);
  memo.set(key, res);
  return res;
}

S.regOpaqueObject(CallFrame.prototype, "debugger#frame");

function defaultErrHandler() {
  return 1;
}

function defaultFinHandler() {
  return 0;
}

export function frame(proto: Frame) {
  const res = Object.create(proto);
  res.$ = wrap({});
  res.brk = null;
  return wrap(res);
}

export function brk(id: number): any {
  if (context.debug === false) return;
  const top = context.stack[0];
  top.brk = context.brk = top.meta.states[id];
  return eff();
}

export function iterator<T>(v: Iterable<T>) {
  return v[Symbol.iterator]();
}

export function asyncIterator<T>(v: AsyncIterable<T>) {
  return v[Symbol.asyncIterator]();
}

export function forInIterator(obj: object): Iterable<string> {
  return (function*() {
    for (const i in obj) yield i;
  })()[Symbol.iterator]();
}

if (config.patchRT) {
  const { defineProperty } = Object;
  Object.defineProperty = function definePropert(obj, prop, descr) {
    const copy = { ...descr };
    if (copy.set) copy.set = region(copy.set);
    if (copy.get) copy.get = region(copy.get);
    return defineProperty(obj, prop, descr);
  };
  Function.prototype.bind = function bind(
    this: any,
    self: any,
    ...args: any[]
  ): (...args: any[]) => any {
    return S.bind(this, self, ...args);
  };
}

export { token, wrap };
