/**
 * Functions called from code generated
 * by @effectful/debugger/transform preset
 */
import config from "./config";
import {
  Frame,
  Brk,
  FunctionDescr,
  Module,
  Scope,
  ScopeInfo,
  ProtoFrame,
  BrkType,
  Job
} from "./state";
import * as State from "./state";
import * as TT from "./timeTravel/main";
import * as S from "@effectful/serialization";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";

const context = State.context;
const saved = State.saved;
const token = State.token;
const dataSymbol = State.dataSymbol;
const unwrapPrototype = TT.unwrapPrototype;
const wrap = TT.wrap;

/**
 * converts a function into another function doing the same, but all
 * callbacks executed within this function will be invoked synchronously
 */
export function liftSync(
  func: (this: any, ...args: any[]) => any
): (this: any, ...args: any[]) => any {
  const ret = function(this: any, ...args: any[]) {
    return sync(() => func.apply(this, args));
  };
  S.regOpaqueObject(ret, `region${func.name || "?"}`);
  return ret;
}

/** evaluate function `func` in sync mode */
export function sync<T>(func: () => T): T {
  try {
    context.syncStack.push({
      top: context.top,
      debug: context.debug,
      brk: context.brk,
      value: context.value
    });
    context.top = null;
    context.debug = false;
    return func();
  } finally {
    const f = context.syncStack.pop();
    if (f) {
      context.top = f.top;
      context.debug = f.debug;
      context.brk = f.brk;
      context.value = f.value;
    }
  }
}

/** executes a thread starting from the `first` frame */
export function runSync(first: Frame) {
  const { top, debug, value, brk } = context;
  context.top = first;
  context.debug = false;
  context.brk = null;
  try {
    while (!context.terminated) {
      return step();
    }
  } finally {
    context.top = top;
    context.debug = debug;
    context.value = value;
    context.brk = brk;
  }
}

export function args<T>(value: Iterable<T>): Array<T> {
  return Array.from(value);
}

interface WebpackModule {
  hot?: {
    accept(): void;
  };
}

export function module(name: string, module: WebpackModule, pure: boolean) {
  let info = context.modules[name];
  if (module && module.hot) module.hot.accept();
  if (info) {
    if (context.onUpdate) context.onUpdate(info);
    return info;
  }
  info = { name, functions: {}, pure, topLevel: null };
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
  states: [Scope, string, string][],
  name: string,
  loc: string,
  parent: FunctionDescr | undefined
): ($$: { [name: string]: any }) => any {
  let meta = module.functions[handler.name];
  if (!meta) meta = module.functions[handler.name] = <FunctionDescr>{};
  if (!module.pure && !module.topLevel) module.topLevel = meta;
  if (!name) name = "*";
  if (!errHandler) errHandler = defaultErrHandler;
  if (!finHandler) finHandler = defaultFinHandler;
  const names = [name];
  for (let p = parent; p; p = p.parent) names.unshift(p.name);
  const fullName = `${module.name}:${names.join(".")}@${loc}`;
  const memo: Brk[] = [];
  for (const [scope, reason, loc] of states) {
    const [line, column, endLine, endColumn] = location(loc);
    let scopeInfo: ScopeInfo;
    if (scope.length === 3) {
      scopeInfo = scope[2];
    } else {
      scopeInfo = buildScope(scope);
    }
    const brk: Brk = {
      reason,
      type: BrkType.location,
      id: memo.length,
      meta,
      line,
      column,
      endLine,
      endColumn,
      exit: false,
      scope: scopeInfo,
      location: strLoc(line, column, endLine, endColumn)
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
  meta.location = loc;
  if (!meta.blackbox) {
    [meta.line, meta.column, meta.endLine, meta.endColumn] = location(loc);
    memo.push(
      (meta.exitBreakpoint = {
        type: BrkType.exit,
        reason: "exit",
        id: memo.length,
        meta,
        scope: memo.length ? memo[0].scope : {},
        line: meta.endLine,
        column: meta.endColumn,
        endLine: meta.endLine,
        endColumn: meta.endColumn,
        exit: true,
        location: strLoc(meta.line, meta.column, meta.endLine, meta.endColumn)
      })
    );
  } else meta.exitBreakpoint = null;
  return meta.constr || (meta.constr = wrapMeta(meta));
}

function strLoc(
  line?: number,
  column?: number,
  endLine?: number,
  endColumn?: number
) {
  return `${line || "?"}:${column || "?"}-${endLine || "?"}:${endColumn ||
    "?"}`;
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
      value[dataSymbol].$$ = ctx.step((<any>json).$$);
    },
    write(ctx, value) {
      const json: any = {};
      const proto = value[dataSymbol];
      json.$$ = ctx.step(proto.$$, json, "$$");
      return json;
    },
    overrideProps: { [dataSymbol]: false },
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
      const proto = closure[dataSymbol];
      return Object.create(proto);
    },
    write() {
      return {};
    },
    strictName: true
  });
  function constr($$?: { [name: string]: any }): (...args: any[]) => any {
    const proto = { meta: info, $$ };
    const closure = info.func(proto);
    closure[dataSymbol] = proto;
    closure[S.descriptorSymbol] = funcDescr;
    proto.constructor = closure;
    return closure;
  }
  (<any>constr)[dataSymbol] = info;
  S.regOpaqueObject(constr, `c#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info, `i#${info.module.name}#${info.name}`);
  S.regOpaqueObject(info.handler, `h#${info.module.name}#${info.name}`);
  if (info.errHandler && info.errHandler !== defaultErrHandler)
    S.regOpaqueObject(info.errHandler, `eh#${info.module.name}#${info.name}`);
  if (info.finHandler && info.finHandler !== defaultFinHandler)
    S.regOpaqueObject(info.finHandler, `fh#${info.module.name}#${info.name}`);
  return constr;
}

let queueCb: (() => void) | null = null;

/** an async iterable signaling start of each new sync thread */
export const threads: AsyncIterable<Job> &
  AsyncIterator<Job> & { stop: () => void } = {
  [Symbol.asyncIterator]() {
    return this;
  },
  stop() {
    context.terminated = true;
    if (queueCb) queueCb();
  },
  async next(): Promise<IteratorResult<Job>> {
    while (!context.terminated) {
      const queue = context.asyncQueue;
      if (!context.top && queue.length)
        return { done: false, value: <State.Job>queue.shift() };
      await new Promise(i => (queueCb = i));
      queueCb = null;
    }
    return { done: true, value: <Job>(<any>undefined) };
  }
};

/**
 * runs a computation until it encounters some breakpoint (returns `token)
 * or finishes the whole computation (returns the resulting value or throws an exception)
 */
export function step() {
  const savedRunning = context.running;
  try {
    context.running = true;
    let { top } = context;
    while (!context.terminated) {
      if (!top) {
        if (queueCb) queueCb();
        if (context.error) throw context.value;
        return context.value;
      }
      if (top.brk && top.brk.exit) {
        context.top = top = top.next;
        continue;
      }
      context.error = false;
      context.brk = null;
      try {
        const arg = context.value;
        context.value = void 0;
        context.error = false;
        top.meta.handler(top, arg);
      } catch (e) {
        if (e === token) {
          if (context.brk && context.debug) break;
          continue;
        }
        context.error = true;
        context.value = e;
        if (config.verbose) saved.console.error(e);
        top = <Frame>context.top;
        while (top && top.state === 1) {
          context.top = top = top.next;
          if (!top) throw e;
          top.state = top.meta.errHandler(top.state);
        }
        if (!top) throw e;
      }
      top = context.top;
    }
  } finally {
    context.running = savedRunning;
  }
  return token;
}

export function evalAt(src: string, id: number) {
  const top = <Frame>context.top;
  return compileEval(src, top.meta, top.meta.states[id])(top);
}

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
  meta: FunctionDescr,
  state: Brk,
  blackbox?: boolean
): (f: Frame) => any {
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
  if (blackbox) res = liftSync(res);
  memo.set(key, res);
  return res;
}

function defaultErrHandler() {
  return 1;
}

function defaultFinHandler() {
  return 0;
}

export function frame(proto: ProtoFrame, self: any, newTarget: any): any {
  if (newTarget) unwrapPrototype(self);
  return (context.top = wrap<Frame>({
    $$: proto.$$,
    state: 0,
    meta: proto.meta,
    self,
    newTarget: newTarget != null,
    $: wrap({}),
    brk: null,
    next: context.top
  }));
}

export function pure(value: any): any {
  const top = <Frame>context.top;
  if (top.newTarget && (!value || typeof value !== "object")) value = top.self;
  const brk = (context.brk = top.brk = context.debug
    ? top.meta.exitBreakpoint
    : null);
  if (brk && context.needsBreak(brk)) throw token;
  context.top = top.next;
  top.state = 0;
  return (context.value = value);
}

function startThread(brk: Brk) {
  //TODO: ignore
  context.asyncQueue.push({
    top: context.top,
    brk,
    debug: context.debug,
    value: context.value
  });
  context.top = null;
  if (queueCb) queueCb();
}

export function brk(id: number): any {
  if (context.debug === false) return;
  // if (context.ignore) throw token;
  const { needsBreak, top } = context;
  let p: Brk;
  if (
    top &&
    (p = top.brk = context.brk = top.meta.states[id]) &&
    needsBreak(p)
  ) {
    if (!context.running) startThread(p);
    throw token;
  }
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
    if (copy.set) copy.set = liftSync(copy.set);
    if (copy.get) copy.get = liftSync(copy.get);
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
