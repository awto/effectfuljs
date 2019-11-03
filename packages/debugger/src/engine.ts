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
  States,
  normalizeDrive,
  toGlobal
} from "./state";

import * as State from "./state";
import * as TT from "./timeTravel/main";
import * as S from "@effectful/serialization";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";
import * as path from "path";

// tslint:disable-next-line
const asap = require("asap");

const journal = TT.journal;
const context = State.context;
const token = State.token;
const dataSymbol = State.dataSymbol;
const wrapFrame = TT.wrapFrame;
const SavedFunction = Function;
const savedApply = SavedFunction.prototype.apply;
const savedCall = SavedFunction.prototype.call;
const CallSym = Symbol("@effectful/debugger/call");
const ApplySym = Symbol("@effectful/debugger/call");

(<any>Function.prototype)[CallSym] = defaultCall;
(<any>Function.prototype)[ApplySym] = defaultApply;

class ArgsTraps<T> {
  func: Frame;
  target: T[];
  constructor(func: Frame, target: T[]) {
    this.func = func;
    this.target = target;
  }
  set(target: T[], prop: any, value: T) {
    if (typeof prop === "symbol" || isNaN(prop))
      return Reflect.set(target, prop, value);
    const { func } = this;
    const params = func.meta.params;
    if (params) {
      const name = params[prop];
      if (name) func.$[name] = value;
    }
    return Reflect.set(target, prop, value);
  }
  get(target: T[], prop: any): T {
    if (typeof prop === "symbol" || isNaN(prop))
      return Reflect.get(target, prop);
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
  const arr = Array.from(value);
  const top = <Frame>context.top;
  Object.defineProperty(arr, "callee", {
    writable: false,
    enumerable: false,
    value: top.func
  });
  return new Proxy(arr, new ArgsTraps<T>(top, arr));
}

interface CjsModule {
  id: string;
  hot?: {
    accept(): void;
  };
  __effectful_js_require: any;
}

export function module(
  modName: string | number,
  evalCtx: { [name: string]: [string, number] } | undefined,
  module: CjsModule | undefined,
  require?: any,
  pure?: boolean
) {
  let fullPath: string | undefined;
  let name: string;
  let id: number | undefined;
  if (typeof modName === "number") {
    id = modName;
    name = `#eval_${id}.js`;
  } else {
    name = modName;
    fullPath = normalizeDrive(path.resolve(path.join(config.srcRoot, name)));
  }
  let info = fullPath && context.modules[<any>(fullPath || id)];
  if (module) {
    if (module.hot) module.hot.accept();
    module.__effectful_js_require = require;
  }
  if (info) {
    context.moduleId = (module && module.id) || null;
    info.version++;
    return info;
  }
  info = {
    name,
    fullPath,
    id,
    functions: {},
    pure: !!pure,
    topLevel: null,
    cjs: module,
    version: 0,
    evalCtx
  };
  S.regOpaqueObject(info, `module#${name}`);
  context.modules[<any>(fullPath || id)] = info;
  return info;
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

export function scope(dest: number): any {
  const top = <Frame>context.top;
  top.goto = dest;
  try {
    return top.meta.handler(top, void 0);
  } catch (e) {
    return handle(top, e);
  }
}

const deb_console = console;

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
  const fullName = `${module.name}:${names.join(".")}@${loc || "?"}`;
  const memo: Brk[] = [];
  const evalCtx = module.evalCtx || {};
  for (const [scope, reason, loc] of states) {
    if (!scope) continue;
    const [line, column, endLine, endColumn] = location(loc);
    if (scope == null)
      deb_console.error("NO SCOPES IN ", func, name, handler, states);
    const scopeInfo =
      scope.length === 3 ? scope[2] : buildScope(scope, evalCtx);
    const brk: Brk = {
      reason,
      type: reason === "debugger" ? BrkType.debugger : BrkType.location,
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
  meta.uniqName = `${module.name}#${handler.name}`;
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

function buildScope(
  scope: Scope,
  parent: { [name: string]: [string, number] }
): ScopeInfo {
  if (scope == null) return parent;
  if (scope.length === 3) return scope[2];
  const [vars, par] = scope;
  const scopeInfo: ScopeInfo = {};
  scope.push(scopeInfo);
  const parScope = par ? buildScope(par, parent) : parent;
  if (parScope) {
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
  if (config.expFunctionConstr) constr.constructor = FunctionConstr;
  return constr;
}

let threadScheduled = false;
export function signalThread() {
  if (threadScheduled) return;
  threadScheduled = true;
  asap(function() {
    threadScheduled = false;
    context.onThread();
  });
}

function defaultApply(this: any) {
  context.call = context.call === defaultApply ? this : null;
  return savedApply.apply(this, <any>arguments);
}

S.regOpaqueObject(defaultApply, "@effectful/debugger/apply");

function defaultCall(this: any) {
  context.call = context.call === defaultCall ? this : null;
  return savedCall.apply(this, <any>arguments);
}

export function mcall(prop: string, ...args: [any, ...any[]]) {
  return savedCall.apply((context.call = args[0][prop]), args);
}

S.regOpaqueObject(defaultCall, "@effectful/debugger/call");

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
      pop(top);
    }
    // checkpoint();
    return loop(value);
  } finally {
    context.running = false;
  }
}

export function loop(value: any): any {
  let top: Frame | null = context.top;
  while (top) {
    try {
      value = top.meta.handler(top, value);
      top = context.top;
    } catch (e) {
      if (e === token) {
        context.onStop();
        return e;
      }
      if (checkErrBrk(<Frame>top, e)) {
        context.value = e;
        context.error = true;
        context.onStop();
        if (top) top.goto = top.meta.errHandler(top.state);
        return token;
      }
      top = context.top;
      if (!top) throw e;
      top.goto = top.meta.errHandler(top.state);
      value = e;
    }
  }
  return value;
}

/** resumes execution of the current stack */
export function resume(frame: Frame, e: any) {
  try {
    frame.next = context.top;
    context.top = frame;
    return frame.meta.handler(frame, e);
  } catch (e) {
    return handle(frame, e);
  }
}

/** like `resume` but does't interpret any exception */
export function resumeWithThrow(top: Frame, value: any): any {
  top.next = context.top;
  context.top = top;
  return loop(value);
}

/** like `resume` but appends the frame to the current stack */
export function resumeLocal(frame: Frame, e: any) {
  try {
    frame.caller = frame.next = context.top;
    context.top = frame;
    return frame.meta.handler(frame, e);
  } catch (e) {
    return handle(frame, e);
  }
}

/** checks if the current frame's state has an exception handler */
function hasEH(frame: Frame): boolean {
  const meta = frame.meta;

  for (let state = frame.state; state !== 1; ) {
    const err = meta.errHandler(state);
    if (err === 1) return false;
    const fin = meta.finHandler(state);
    if (fin !== err) return true;
    state = fin;
  }
  return false;
}

function checkErrBrk(frame: Frame, e: any): boolean {
  if (!context.debug) return false;
  if (e && context.exception !== e) {
    context.exception = e;
    if (e.stack) {
      if (config.debuggerDebug)
        Object.defineProperty(e, "_deb_stack", { value: e.stack });
      const stack = [String(e)];
      for (let i: Frame | null = frame; i; i = i.next) {
        if (i.brk)
          stack.push(
            `    at ${i.meta.name} (${i.meta.module.name}:${i.brk.line}:${
              i.brk.column
            })`
          );
      }
      if (!config.debuggerDebug) e.stack = stack.join("\n");
    }
    let needsStop = false;
    if (context.brkOnAnyException) {
      needsStop = true;
    } else if (context.brkOnUncaughtException) {
      // avoiding running finally blocks
      needsStop = true;
      for (let i: Frame | null = frame; i; i = i.next) {
        if (hasEH(i)) {
          needsStop = false;
          break;
        }
      }
    }
    return needsStop;
  }
  return false;
}

export function handle(frame: Frame, e: any) {
  for (;;) {
    if (e === token) {
      if (frame.next) throw e;
      context.onStop();
      return token;
    }
    if (frame !== context.top) throw e;
    if (!frame.next && config.debuggerDebug) console.error("Uncaught", e.stack);
    const meta = frame.meta;
    const goto = meta.errHandler(frame.state);
    if (checkErrBrk(frame, e)) {
      context.value = e;
      context.error = true;
      frame.goto = goto;
      if (frame.next) throw token;
      context.onStop();
      return token;
    }
    frame.goto = goto;
    try {
      return meta.handler(frame, e);
    } catch (ex) {
      e = ex;
    }
  }
}

export function evalAt(src: string, id: number) {
  const top = <Frame>context.top;
  const func = compileEval(src, top.meta, top.meta.states[id]);
  const data = (<any>func)[dataSymbol];
  data.$$ = top;
  try {
    context.call = func;
    return savedCall.call(func, top.self);
  } finally {
    data.$$ = null;
  }
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

const indirMemo = new Map<string, string>();

export function compileIndirEval(code: string): string {
  const top = context.top;
  const meta = top && top.meta;
  const blackbox = !meta || meta.blackbox;
  const key = code + "@" + blackbox;
  let tgt = indirMemo.get(key);
  if (tgt) return tgt;
  const id = toGlobal(evalCnt++);
  if (!blackbox) context.onNewSource(id, code);
  const wcode =
    `return ($effectful$debugger$lib$.context.call=` +
    `(function() {\n${code}\n}))();`;
  const ast = babelParse(wcode, {
    allowReturnOutsideFunction: true,
    startLine: 0
  });
  const body = (<any>ast.program.body[0]).argument.callee.right.body.body;
  if (body.length === 1 && body[0].type === "ExpressionStatement")
    body[0] = { type: "ReturnStatement", argument: body[0].expression };
  tgt = babelGenerate(
    T.run(ast, {
      preInstrumentedLibs: true,
      blackbox,
      pureModule: true,
      importRT: false,
      moduleName: id,
      ns: "$effectful$debugger$lib$"
    }),
    { compact: false }
  ).code;
  indirMemo.set(key, tgt);
  return tgt;
}

const functionConstrMemo = new Map<string, string>();

export function compileFunctionConstr(args: any[], code: string) {
  const top = context.top;
  const meta = top && top.meta;
  const blackbox = !meta || meta.blackbox;
  const id = toGlobal(evalCnt++);
  const wcode = `return (function(${args.join()}) {\n${code}\n})`;
  let tgt = functionConstrMemo.get(wcode);
  if (!tgt) {
    if (!blackbox) context.onNewSource(id, code);
    const ast = babelParse(wcode, {
      allowReturnOutsideFunction: true,
      startLine: 0
    });
    tgt = babelGenerate(
      T.run(ast, {
        preInstrumentedLibs: true,
        blackbox,
        pureModule: true,
        importRT: false,
        moduleName: id,
        ns: "$effectful$debugger$lib$"
      }),
      { compact: false }
    ).code;
  }
  return tgt;
}

export const FunctionConstr = function Function(...args: any[]) {
  let res: any;
  if (context.debug) {
    const tgt = compileFunctionConstr(args, args.pop());
    res = new SavedFunction("module", tgt)(
      context.top && context.top.meta.module
    );
  } else res = Reflect.construct(SavedFunction, args);
  res.constructor = Function;
  return res;
};
FunctionConstr.prototype = Function.prototype;

S.regOpaqueObject(FunctionConstr, "@effectful/debugger/Function");

const savedEval = eval;

export function indirEval(code: string): any {
  if (!context.debug) return savedEval(code);
  const wcode = compileIndirEval(code);
  return new SavedFunction("module", wcode)(
    context.top && context.top.meta.module
  );
}

export function compileEval(
  code: string,
  meta: FunctionDescr,
  state: Brk,
  blackbox?: boolean
): () => any {
  const memo = meta.evalMemo || (meta.evalMemo = new Map());
  const key = `${code}@${state.id}/${!!blackbox}`;
  let res = memo.get(key);
  if (res) return res;
  const id = toGlobal(evalCnt++);
  if (!blackbox) context.onNewSource(id, code);
  const wcode = `return function() {\n${code}\n}`;
  const ast = babelParse(wcode, {
    allowReturnOutsideFunction: true,
    startLine: 0
  });
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
      moduleName: id,
      ns: "$effectful$debugger$lib$"
    }),
    { compact: true }
  ).code;
  const mod = meta.module;
  const cjs = mod && meta.module.cjs;
  res = new SavedFunction(
    // "$effectful$debugger$lib$",
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    tgt
  )(
    // exports,
    mod && (<any>mod).exports,
    cjs && (cjs.__effectful_js_require || cjs.require),
    mod,
    mod.fullPath,
    mod && mod.fullPath ? path.dirname(mod.fullPath) : ""
  );
  memo.set(key, res);
  return res;
}

function defaultErrHandler() {
  return 1;
}

function defaultFinHandler() {
  return 0;
}

export function isDelayedResult(value: any): boolean {
  return value === token;
}

export function frame(proto: ProtoFrame, self: any, newTarget: any): any {
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
    $: {},
    brk: null,
    next,
    caller: next,
    restoreDebug: false,
    awaiting: token,
    onResolve: null,
    onReject: null,
    promise: null,
    timestamp: journal.now
  };
  if (context.debug && next) {
    const call = context.call;
    const expected = call === func;
    if (!expected) {
      frame.restoreDebug = true;
      context.debug = false;
    }
  }
  const res = (context.top = wrapFrame(frame));
  context.call = null;
  return res;
}

export function checkExitBrk(top: Frame, value: any) {
  const meta = top.meta;
  if (meta.blackbox) return;
  const brk = (context.brk = top.brk = meta.exitBreakpoint);
  if (brk && context.needsBreak(brk, top, value)) {
    context.value = value;
    context.error = false;
    if (!context.running) {
      context.queue.push({
        top: context.top,
        brk,
        debug: context.debug,
        value: context.value,
        stopOnEntry: true
      });
      context.top = null;
      signalThread();
    }
    // context.top = top;
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
    checkExitBrk(top, value);
  } else if (top.restoreDebug) context.debug = true;
  pop(top);
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
  pop(top);
  throw e;
}

export function brk(id: number): any {
  if (context.debug === false) return;
  const { needsBreak, top } = context;
  let p: Brk;
  let stopOnEntry = false;
  let stopped = !context.running;
  if (
    top &&
    (p = top.brk = context.brk = top.meta.states[id]) &&
    ((stopOnEntry = needsBreak(p, top)) || (stopped && context.activeTop))
  ) {
    if (stopped) {
      context.queue.push({
        top: context.top,
        brk: p,
        debug: context.debug,
        value: context.value,
        stopOnEntry
      });
      context.top = null;
      signalThread();
    }
    throw token;
  }
  // checkpoint();
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

const {
  boundFunSymbol,
  boundThisSymbol,
  boundArgsSymbol,
  descriptorSymbol
} = S;

const BindDescriptor = S.regDescriptor({
  name: "#b",
  create() {
    return makeBind();
  },
  write() {
    return {};
  },
  overrideProps: {
    arguments: false,
    caller: false,
    length: false,
    name: false,
    prototype: false
  }
});

function makeBind(): (...args: any[]) => any {
  function bind(...rest: any[]): any {
    const fun = (<any>bind)[boundFunSymbol];
    context.call = context.call === bind ? fun : null;
    const boundArgs: any[] = (<any>bind)[boundArgsSymbol];
    //avoiding spreads because they are monkey patched
    const arr: any[] = Array(rest.length + boundArgs.length + 1);
    arr[0] = (<any>bind)[boundThisSymbol];
    let index = 0;
    for (const i of boundArgs) arr[++index] = i;
    for (const i of rest) arr[++index] = i;
    return savedCall.apply(fun, <any>arr);
  }
  (<any>bind)[descriptorSymbol] = BindDescriptor;
  return bind;
}

if (config.patchRT && config.persistState) {
  FunctionConstr.prototype.bind = SavedFunction.prototype.bind = function bind(
    this: any,
    self: any,
    ...args: any[]
  ): (...args: any[]) => any {
    const bind = <any>makeBind();
    bind[boundFunSymbol] = this;
    bind[boundThisSymbol] = self;
    bind[boundArgsSymbol] = args;
    return bind;
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

export function raise(e: any) {
  context.exception = null;
  throw e;
}

export { token, context };
export { del, set } from "./timeTravel/core";

/** resets module's states (for tests) */
export function reset() {
  metaCount = 0;
  evalCnt = 0;
  indirMemo.clear();
  functionConstrMemo.clear();
  context.activeTop = context.top = null;
  context.running = false;
  context.brk = null;
  context.queue.length = 0;
}

export function pop(top: Frame) {
  if ((context.top = top.next) == null) signalThread();
}
