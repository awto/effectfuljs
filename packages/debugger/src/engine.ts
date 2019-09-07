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
  StateMap,
  Handler,
  States
} from "./state";
import * as State from "./state";
import * as TT from "./timeTravel/main";
import * as S from "@effectful/serialization";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";
// tslint:disable-next-line
const asap = require("asap");

const context = State.context;
const token = State.token;
const dataSymbol = State.dataSymbol;
const unwrapPrototype = TT.unwrapPrototype;
const wrap = TT.wrap;

class ArgsTraps<T> {
  func: Frame;
  target: T[];
  constructor(func: Frame, target: T[]) {
    this.func = func;
    this.target = target;
  }
  set(target: T[], prop: number, value: T) {
    if (isNaN(prop)) return Reflect.set(target, prop, value);
    const { func } = this;
    const params = func.meta.params;
    if (params) {
      const name = params[prop];
      if (name) func.$[name] = value;
    }
    return Reflect.set(target, prop, value);
  }
  get(target: T[], prop: number): T {
    if (isNaN(prop)) return Reflect.get(target, prop);
    const { func } = this;
    const params = func.meta.params;
    if (params) {
      const name = params[prop];
      if (name) return func.$[name];
    }
    return Reflect.get(target, prop);
  }
}

export function args<T>(value: Iterable<T>): Array<T> {
  const arr = [...value];
  const top = <Frame>context.top;
  Object.defineProperty(arr, "callee", {
    writable: false,
    enumerable: false,
    value: top.func
  });
  return new Proxy(arr, new ArgsTraps<T>(top, arr));
}

interface WebpackModule {
  hot?: {
    accept(): void;
  };
}

export function module(
  name: string,
  module: WebpackModule | null,
  pure: boolean
) {
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

export function fun(
  module: Module,
  func: (...args: any[]) => any,
  handler: Handler,
  errHandler: StateMap,
  finHandler: StateMap,
  states: States,
  name: string,
  loc: string | null,
  parent: FunctionDescr | undefined,
  params: string[]
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
  meta.params = params;
  if (meta.canSkip == null) meta.canSkip = false;
  if (meta.id == null) meta.id = metaCount++;
  meta.states = memo;
  if (loc) {
    meta.location = loc;
    [meta.line, meta.column, meta.endLine, meta.endColumn] = location(loc);
    memo.push(
      (meta.exitBreakpoint = {
        type: BrkType.exit,
        reason: "exit",
        id: memo.length,
        meta,
        scope: memo.length ? memo[0].scope : {},
        line: <number>meta.endLine,
        column: <number>meta.endColumn,
        endLine: <number>meta.endLine,
        endColumn: <number>meta.endColumn,
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
    (<any>proto).func = closure;
    closure.call = defaultCall;
    closure.apply = defaultApply;
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

// let queueCb: (() => void) | null = null;

let threadScheduled = false;
export function signalThread() {
  // if (queueCb) queueCb();
  if (threadScheduled) return;
  threadScheduled = true;
  asap(function() {
    threadScheduled = false;
    if (context.onThread) context.onThread();
  });
}

const fapply = Function.prototype.apply;
const fcall = Function.prototype.call;

function defaultApply(this: any) {
  context.call = this;
  return fapply.apply(this, <any>arguments);
}

S.regOpaqueObject(defaultApply, "@effectful/debugger/apply");

function defaultCall(this: any) {
  context.call = this;
  return fcall.apply(this, <any>arguments);
}

S.regOpaqueObject(defaultCall, "@effectful/debugger/call");

// let cancelNext = false;

/** an async iterable signaling start of each new sync thread */
/*
export const threads: AsyncIterable<Job> &
  AsyncIterator<Job> & {
    / ** stops the whole loop * /
    stop: () => void;
    / ** cancels current `next` * /
    cancel: () => void;
  } = {
  [Symbol.asyncIterator]() {
    return this;
  },
  stop() {
    context.terminated = true;
    threads.cancel();
  },
  cancel() {
    cancelNext = true;
    signalThread();
  },
  async next(): Promise<IteratorResult<Job>> {
    cancelNext = false;
    while (!context.terminated) {
      const queue = context.asyncQueue;
      if (!context.top && queue.length)
        return { done: false, value: <State.Job>queue.shift() };
      await new Promise(i => (queueCb = i));
      queueCb = null;
      if (cancelNext) break;
    }
    return { done: true, value: <Job>(<any>undefined) };
  }
};
*/

/**
 * runs a computation until it encounters some breakpoint (returns `token)
 * or finishes the whole computation (returns the resulting value or throws an exception)
 */
export function step() {
  try {
    context.running = true;
    const value = context.value;
    context.value = void 0;
    context.error = false;
    const top = context.top;
    if (!top) throw new TypeError("nothing to run");
    if (top.brk && top.brk.exit) {
      if (!context.debug && top.restoreDebug) context.debug = true;
      context.top = top.next;
    }
    return loop(value);
  } finally {
    signalThread();
    context.running = false;
  }
}

function loop(value: any): any {
  let top: Frame | null = context.top;
  // context.first = null;
  while (top) {
    try {
      value = top.meta.handler(top, value);
      top = context.top;
    } catch (e) {
      if (e === token) return e;
      top = context.top;
      if (!top) throw e;
      top.goto = top.meta.errHandler(top.state);
      value = e;
    }
  }
  return value;
}

export function call(frame: Frame, e: any) {
  try {
    frame.next = context.top;
    context.top = frame;
    return frame.meta.handler(frame, e);
  } catch (e) {
    return handle(frame, e);
  }
}

export function handle(frame: Frame, e: any) {
  for (;;) {
    if (e === token) {
      if (/*frame !== context.first*/ frame.next) throw e;
      // signalThread();
      return token; /*(
        frame.delayedResult || (frame.delayedResult = new ThenableExit(frame))
      )*/
    }
    if (frame !== context.top) throw e;
    try {
      frame.goto = frame.meta.errHandler(frame.state);
      return frame.meta.handler(frame, e);
    } catch (ex) {
      e = ex;
    }
  }
}

/** runs `top` until the first breakpoint */
export function resume(top: Frame, value: any): any {
  top.next = context.top;
  context.top = top;
  return loop(value);
}

export function evalAt(src: string, id: number) {
  const top = <Frame>context.top;
  (context.call = <any>compileEval(src, top.meta, top.meta.states[id]))(top);
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
  memo.set(key, res);
  return res;
}

function defaultErrHandler() {
  return 1;
}

function defaultFinHandler() {
  return 0;
}
/*
class ThenableExit {
  frame: Frame;
  constructor(frame: Frame) {
    this.frame = frame;
  }
  async then(
    onResolve: (value: any) => any,
    onReject: (reason: any) => any
  ): Promise<any> {
    const frame = this.frame;
    try {
      return onResolve(
        await (frame.promise ||
          (frame.promise = new saved.Promise((rs, rj) => {
            frame.onResolve = rs;
            frame.onReject = rj;
          })))
      );
    } catch (e) {
      context.call = onReject;
      return onReject(e);
    }
  }
}
*/
export function isDelayedResult(value: any): boolean {
  // return value instanceof ThenableExit;
  return value === token;
}

export function frame(proto: ProtoFrame, self: any, newTarget: any): any {
  if (newTarget) unwrapPrototype(self);
  const { meta, func } = proto;
  const next = context.top;
  const frame: Frame = {
    $$: proto.$$,
    state: 0,
    goto: 0,
    meta,
    func,
    self,
    newTarget: newTarget != null,
    $: wrap({}),
    brk: null,
    next,
    restoreDebug: false,
    awaiting: token,
    onResolve: null,
    onReject: null,
    promise: null /*,
    delayedResult: void 0*/
  };
  if (context.debug && next) {
    const call = context.call;
    const expected =
        call ===
        func /*||
      ((call === fapply || call === fcall) && context.obj === func)*/;
    if (!expected) {
      frame.restoreDebug = true;
      context.debug = false;
    }
  }
  const res = (context.top = wrap<Frame>(frame));
  // if (!next && !context.running) context.first = res;
  context.call /*= context.obj*/ = null;
  return res;
}

export function checkExitBrk(top: Frame, value: any) {
  const meta = top.meta;
  if (meta.blackbox) return;
  const brk = (context.brk = top.brk = meta.exitBreakpoint);
  if (brk && context.needsBreak(brk, value)) {
    context.value = value;
    context.error = false;
    throw token;
  }
}

export function ret(value: any): any {
  const top = <Frame>context.top;
  if (top.newTarget && (!value || typeof value !== "object")) value = top.self;
  top.state = top.goto = 0;
  if (top.onResolve) {
    context.call = top.onResolve;
    top.onResolve(value);
  }
  if (context.debug) {
    if (context.running) checkExitBrk(top, value);
  } else if (top.restoreDebug) context.debug = true;
  context.top = top.next;
  return value;
}

export function unhandled(e: any) {
  const top = <Frame>context.top;
  top.state = top.goto = 0;
  if (top.onReject) {
    context.call = top.onReject;
    top.onReject(e);
  }
  if (!context.debug && top.restoreDebug) context.debug = true;
  context.top = top.next;
  throw e;
}

export function brk(id: number): any {
  if (context.debug === false) return;
  const { needsBreak, top } = context;
  let p: Brk;
  if (
    top &&
    (p = top.brk = context.brk = top.meta.states[id]) &&
    needsBreak(p)
  ) {
    if (!context.running) {
      context.queue.push({
        top: context.top,
        brk: p,
        debug: context.debug,
        value: context.value
      });
      context.top = null;
      signalThread();
    }
    throw token;
  }
}

export function iterator<T>(v: Iterable<T>) {
  return v[Symbol.iterator]();
}

export function iteratorM<T>(v: AsyncIterable<T>) {
  return v[Symbol.asyncIterator]
    ? v[Symbol.asyncIterator]()
    : (<any>v)[Symbol.iterator]();
}

export function forInIterator(obj: object): Iterable<string> {
  return (function*() {
    for (const i in obj) yield i;
  })()[Symbol.iterator]();
}

if (config.patchRT && config.persistState) {
  Function.prototype.bind = function bind(
    this: any,
    self: any,
    ...args: any[]
  ): (...args: any[]) => any {
    return S.bind(this, self, ...args);
  };
}

export function then(
  p: Promise<any>,
  onResolve: (value: any) => any,
  onReject?: (reason: any) => any
) {
  context.call = <any>Promise.resolve;
  const res = <any>Promise.resolve(p);
  context.call = res.then;
  return res.then(onResolve, onReject);
}

export function liftSync(fun: (this: any, ...args: any[]) => any): any {
  return function(this: any) {
    const savedDebug = context.debug;
    try {
      context.debug = false;
      return fun.apply(this, <any>arguments);
    } finally {
      context.debug = savedDebug;
    }
  };
}

export { token, wrap, context };
