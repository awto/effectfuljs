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
  VarInfo,
  ProtoFrame,
  StateMap,
  States,
  normalizeDrive,
  toGlobal,
  saved,
  Flag,
  BrkFlag,
  defaultErrHandler,
  defaultFinHandler,
  thunkSymbol
} from "./state";
import * as State from "./state";
import * as TTCore from "./timeTravel/core";
import * as TT from "./timeTravel/main";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";
import * as path from "path";
import * as S from "@effectful/serialization";
import { regOpaqueObject, regFun, ModuleDescriptor } from "./persist";
import { isValidIdentifier } from "@babel/types";

// tslint:disable-next-line
const asap = require("asap");

const Map = saved.Map;

const globalNS = config.globalNS;

const { journal, context, token, dataSymbol } = State;
const SavedFunction = State.saved.Function;
const savedApply = State.saved.FunctionMethods.apply;
const savedCall = State.saved.FunctionMethods.call;
const defineProperty = saved.Object.defineProperty;

let curModule: Module = undefined as any; // this is always used in context where this is inited

const recordFrame = config.timeTravel
  ? function recordFrame(top: Frame | null) {
      if (top && journal.enabled) TT.recordFrame(top);
    }
  : function recordFrame() {};

class ArgsTraps {
  func: Frame;
  constructor(func: Frame) {
    this.func = func;
  }
  set(target: any[], prop: any, value: any) {
    if (typeof prop === "symbol" || isNaN(prop))
      return Reflect.set(target, prop, value);
    const { func } = this;
    func.$[func.meta.shift + +prop] = value;
    return Reflect.set(target, prop, value);
  }
  get(target: any[], prop: any): any {
    if (typeof prop === "symbol" || isNaN(prop))
      return Reflect.get(target, prop);
    const { func } = this;
    const meta = func.meta;
    const index = +prop;
    if (meta.params.length > index) return func.$[meta.shift + index];
    return Reflect.get(target, prop);
  }
}

export function getCurModule(): Module {
  return curModule;
}

export function argsWrap<T>(frame: Frame, value: Iterable<T>): T[] {
  const arr = Array.from(value);
  defineProperty(arr, "callee", {
    writable: true,
    enumerable: false,
    value: frame.func
  });
  return new Proxy(arr, new ArgsTraps(frame));
}

interface CjsModule {
  id: string;
  hot?: {
    accept(): void;
  };
  __effectful_js_require: any;
}

export function module(
  this: any,
  modName: string | number,
  evalContext: { [name: string]: VarInfo } | undefined,
  cjs: CjsModule | undefined,
  require: any,
  safePrefix: string,
  closSyms: { [name: string]: any },
  params: { [name: string]: any } | null
) {
  let fullPath: string | undefined;
  let name: string;
  let id: number | undefined;
  if (typeof modName === "number") {
    id = modName;
    name = `#eval_${id}.js`;
  } else {
    name = modName;
    fullPath = normalizeDrive(path.join(config.srcRoot, name));
  }
  curModule = context.modules[<any>(fullPath || id)];
  if (!require) require = <any>closSyms["__webpack_require__"];
  if (cjs) {
    if (cjs.hot) cjs.hot.accept();
    cjs.__effectful_js_require = require;
  }
  regOpaqueObject(cjs, `cjs#${name}`);
  if (!curModule) curModule = <any>{ functions: {} };
  regOpaqueObject(cjs, name + "$mod");
  context.modules[<any>(fullPath || id)] = curModule;
  (<any>curModule)[S.descriptorSymbol] = ModuleDescriptor;
  if (cjs) {
    context.modulesById[cjs.id] = curModule;
    regOpaqueObject(cjs, `${cjs.id}$mod`);
  }
  curModule.name = name;
  curModule.fullPath = fullPath;
  curModule.id = id;
  context.moduleId = (cjs && cjs.id) || null;
  if (curModule.version === void 0) curModule.version = 0;
  else curModule.version++;
  curModule.cjs = cjs;
  curModule.evalContext = evalContext;
  curModule.safePrefix = safePrefix;
  curModule.api = this;
  curModule.closSyms = closSyms;
  curModule.params = params;
  return curModule;
}

let metaCount = 0;

export const parentTag = { _parentTag: true };

export function fun(
  name: string,
  origName: string | null,
  calleeName: number | null,
  parentConstr: ((this: any, ...args: any[]) => any) | null,
  params: string[],
  localsNum: number,
  varsNum: number,
  loc: string | null,
  flags: number,
  handler: (this: any, p: any) => any | string,
  errHandler: StateMap,
  finHandler: StateMap,
  scopeDepth: number,
  states: States
): (this: any, ...args: any[]) => any {
  let meta = curModule.functions[name];
  if (!meta) meta = curModule.functions[name] = <FunctionDescr>{};
  const top = !curModule.topLevel;
  if (top) curModule.topLevel = meta;
  if (!errHandler) errHandler = defaultErrHandler;
  if (!finHandler) finHandler = defaultFinHandler;
  const names = [origName || "*"];
  let parent: FunctionDescr | null = null;
  if (parentConstr) parent = (<any>parentConstr)[dataSymbol];
  for (let p = parent; p; p = p.parent) names.unshift(p.name);
  const fullName = `${curModule.name}:${names.join(".")}@${loc || "?"}`;
  const uniqName = `${curModule.name}#${name}`;
  let persistName = parent ? parent.persistName : curModule.name;
  if (!top) persistName += "#" + (origName || "*");
  const memo: Brk[] = [];
  const evalContext = curModule.evalContext || {};
  if (loc) {
    meta.location = loc;
    [meta.line, meta.column, meta.endLine, meta.endColumn] = location(loc);
  }
  for (const [flags, loc, scope] of states) {
    const [line, column, endLine, endColumn] = location(loc);
    let id = memo.length;
    const brk: Brk = {
      flags,
      id,
      meta,
      line,
      column,
      endLine,
      endColumn,
      scope: scope ? buildScope(scope, evalContext) : evalContext,
      scopeDepth: scope[2],
      location: strLoc(line, column, endLine, endColumn),
      breakpoint: null,
      logPoint: null
    };
    regOpaqueObject(brk, `s#${persistName}#${id}`);
    memo.push(brk);
  }
  meta.varsNum = varsNum;
  meta.shift = calleeName ? 2 : 1;
  meta.exitBreakpoint = memo[memo.length - 1];
  meta.blackbox = (flags & Flag.BLACKBOX) !== 0;
  meta.origName = origName || "(anonymous)";
  meta.calleeName = calleeName;
  meta.module = curModule;
  meta.flags = flags || 0;
  meta.handler = handler;
  meta.errHandler = errHandler;
  meta.finHandler = finHandler;
  meta.name = name;
  meta.fullName = fullName;
  meta.parent = parent;
  meta.uniqName = uniqName;
  meta.persistName = persistName;
  meta.params = params;
  meta.localsNum = localsNum;
  meta.errState = states.length - 2;
  meta.finState = states.length - 1;
  if (meta.id == null) meta.id = metaCount++;
  meta.states = memo;
  meta.statesByLine = memo.filter(hasLine).sort(byLine);
  meta.deps = [];
  meta.scopeDepth = scopeDepth;
  if (parent) parent.deps.push(meta);
  const headLines: string[] = [];
  const ctx = curModule.safePrefix;
  let funcName = meta.origName;
  if (funcName) {
    if (!isValidIdentifier(funcName) || meta.params.indexOf(funcName) !== -1)
      funcName = ctx + funcName.replace(/\W/g, "_");
  } else {
    funcName = ctx + meta.name;
  }
  let varsInit = [`${ctx}.$`];
  if (meta.calleeName) varsInit.push(funcName);
  varsInit.push(...meta.params);
  varsInit.fill("void 0", varsInit.length, (varsInit.length = meta.varsNum));
  headLines.push(`${ctx}.$ = [${varsInit.join()}]`);
  const isArrow = flags & Flag.ARROW_FUNCTION;
  const isAsync = flags & Flag.ASYNC_FUNCTION;
  const isGenerator = flags & Flag.GENERATOR_FUNCTION;
  if (flags & Flag.HAS_THIS)
    headLines.push(`${ctx}.self = ${isArrow ? ctx + "$.self" : "this"}`);
  if (flags & Flag.HAS_ARGUMENTS)
    headLines.push(
      `${ctx}.args = ${
        isArrow ? ctx + "$.args" : `${ctx}args(${ctx},arguments)`
      }`
    );
  const api = curModule.api;
  let headCode;
  if (isGenerator) {
    if (config.expInlineNext) {
      (<any>meta).nextImpl = new Function(
        "pushFrame",
        "handle",
        "meta",
        "context",
        `return function next(value) {
            const frame = this._frame;
            if (frame.running)
              throw new Error("Generator is already running");
            frame.sent = value;
            frame.running = true;
            context.call = context.call === next ? frame.func : null;
            pushFrame(frame);
            try {
              return meta.handler(frame, frame.$, value);
            } catch (e) {
              return handle(frame, e);
            }
          }`
      )(api.pushFrame, api.handle, meta, context);
    }
    headCode = `return ${ctx}.iter`;
  } else {
    headCode = `try { return ${ctx}.meta.handler(${ctx}, ${ctx}.$, null); } 
                catch(e) {return ${ctx}M.handle(${ctx},e);}`;
  }
  const constrParams = [
    "module",
    "exports",
    `${ctx}args`,
    `${ctx}context`,
    `${ctx}m`,
    `${ctx}M`,
    `${ctx}clos`,
    `${ctx}frame`
  ];
  const cjs = curModule.cjs;
  const args = [
    cjs,
    cjs && cjs.exports,
    argsWrap,
    context,
    meta,
    api,
    isAsync || !isGenerator ? api.clos : api.closG,
    isAsync
      ? isGenerator
        ? api.frameAG
        : api.frameA
      : isGenerator
      ? api.frameG
      : api.frame
  ];
  constrParams.push(`return (function(${ctx}$){
    return ${ctx}clos(${ctx}$,${ctx}m,(function ${funcName}(${meta.params.join()}) {
      ${flags & Flag.SLOPPY ? "" : '"use strict";'}
      var ${ctx} = ${ctx}frame(${funcName},new.target);
      ${headLines.join("\n")}
      ${headCode}
      }));
})`);
  const constr: any = saved.Reflect.construct(
    SavedFunction,
    constrParams
  ).apply(null, args);
  meta.func = constr;
  (<any>constr)[dataSymbol] = meta;
  if (config.expFunctionConstr) constr.constructor = FunctionConstr;
  if (config.persistState) regFun(meta);
  return meta.func;
}

function hasLine(b: Brk): boolean {
  return (b.flags & State.BrkFlag.STMT) !== 0 && b.line > 0;
}

function byLine(a: Brk, b: Brk): number {
  return a.line - b.line;
}

function strLoc(
  line?: number,
  column?: number,
  endLine?: number,
  endColumn?: number
) {
  return `${line || "?"}:${column == null ? "?" : column}-${endLine || "?"}:${
    endColumn == null ? "?" : endColumn
  }`;
}

function buildScope(
  scope: Scope,
  parent: { [name: string]: VarInfo }
): ScopeInfo {
  if (scope == null) return parent;
  if (scope.length === 4) return scope[3];
  const [vars, par, depth] = scope;
  const scopeInfo: ScopeInfo = {};
  scope.push(scopeInfo);
  const parScope = par ? buildScope(par, parent) : parent;
  if (parScope) Object.assign(scopeInfo, parScope);
  // tslint:disable-next-line:forin
  for (const i in vars) {
    const info = vars[i];
    if (!info) continue;
    const [declDepth, declLoc] = info;
    scopeInfo[i] = [declDepth, depth, declLoc];
  }
  return scopeInfo;
}

export const clos: any = config.persistState
  ? function clos(parent: Frame | null, meta: FunctionDescr, closure: any) {
      /*defineProperty(closure, "call", {
        configurable: true,
        value: defaultCall
      });
      defineProperty(closure, "apply", {
        configurable: true,
        value: defaultApply
      });
      defineProperty(closure, dataSymbol, {
        configurable: true,
        value: { meta, parent, $: parent && parent.$ }
      });
      defineProperty(closure, S.descriptorSymbol, {
        configurable: true,
        value: (<any>meta).descriptor
      });*/
      closure.call = defaultCall;
      closure.apply = defaultApply;
      closure[dataSymbol] = { meta, parent, $: parent && parent.$ };
      closure[S.descriptorSymbol] = (<any>meta).descriptor;
      return closure;
    }
  : function clos(parent: Frame | null, meta: FunctionDescr, closure: any) {
      closure.call = defaultCall;
      closure.apply = defaultApply;
      closure[dataSymbol] = { meta, parent, $: parent && parent.$ };
      return closure;
    };

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

regOpaqueObject(defaultApply, "@effectful/debugger/apply");

function defaultCall(this: any) {
  context.call = context.call === defaultCall ? this : null;
  return savedCall.apply(this, <any>arguments);
}

export function wrapBuiltinFunc(func: any) {
  func.call = defaultCall;
  func.apply = defaultApply;
  return func;
}

export function pushScope(varsNum: number) {
  const top = <Frame>context.top;
  const cur = Array(varsNum);
  cur[0] = top.$;
  return (top.$ = cur);
}

export function copyScope() {
  const top = <Frame>context.top;
  return (top.$ = top.$.slice());
}

export function popScope() {
  const top = <Frame>context.top;
  return (top.$ = top.$[0]);
}

export function mcall(prop: string, ...args: [any, ...any[]]) {
  const func = args[0][prop];
  if (!func) throw new TypeError(`${prop} isn't a function`);
  return savedCall.apply((context.call = func), args);
}

regOpaqueObject(defaultCall, "@effectful/debugger/call");

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
    if (top.brk && top.brk.flags & BrkFlag.EXIT) {
      if (!context.debug && top.restoreDebug) context.debug = true;
      popFrame(top);
    }
    return loop(value);
  } finally {
    context.running = false;
  }
}

export function loop(value: any): any {
  let top: Frame | null = context.top;
  while (top) {
    try {
      recordFrame(top);
      value = top.meta.handler(top, top.$, value);
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
        if (top) {
          top.error = e;
          top.meta.errHandler(top, top.$);
        }
        return token;
      }
      top = context.top;
      if (!top) {
        if (config.verbose) {
          // tslint:disable-next-line:no-console
          console.error(
            `Uncaught exception: ${e}(on any:${!!context.brkOnAnyException},on uncaught:${!!context.brkOnUncaughtException})`
          );
          if (config.debuggerDebug)
            // tslint:disable-next-line:no-console
            console.error("Original stack:", e._deb_stack);
        }
        throw e;
      }
      top.error = value = e;
      top.meta.errHandler(top, top.$);
    }
  }
  return value;
}

/** resumes execution of the current stack */
export function resume(frame: Frame, e: any) {
  try {
    frame.next = context.top;
    context.top = frame;
    recordFrame(frame);
    return frame.meta.handler(frame, frame.$, e);
  } catch (e) {
    return handle(frame, e);
  }
}

/** like `resume` but appends the frame to the current stack */
export function resumeLocal(frame: Frame, e: any) {
  try {
    frame.caller = frame.next = context.top;
    context.top = frame;
    recordFrame(frame);
    return frame.meta.handler(frame, frame.$, e);
  } catch (e) {
    return handle(frame, e);
  }
}

/** checks if the current frame's state has an exception handler */
function hasEH(frame: Frame): boolean {
  return (frame.meta.states[frame.state].flags & BrkFlag.HAS_EH) !== 0;
}

function checkErrBrk(frame: Frame, e: any): boolean {
  if (!context.debug) return false;
  if (e && context.exception !== e) {
    context.exception = e;
    if (e.stack) {
      const stack = [String(e)];
      for (let i: Frame | null = frame; i; i = i.next) {
        if (i.brk)
          stack.push(
            `    at ${i.meta.name} (${i.meta.module.name}:${i.brk.line}:${i.brk.column})`
          );
      }
      if (config.debuggerDebug) {
        try {
          defineProperty(e, "_deb_stack", { value: stack.join("\n") });
        } catch (e) {}
      } // else e.stack = stack.join("\n");
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
    // tslint:disable-next-line:no-console
    const meta = frame.meta;
    frame.error = e;
    meta.errHandler(frame, frame.$);
    if (checkErrBrk(frame, e)) {
      context.value = e;
      context.error = true;
      if (frame.next) throw token;
      context.onStop();
      return token;
    }
    try {
      recordFrame(frame);
      return frame.meta.handler(frame, frame.$, null);
    } catch (ex) {
      e = ex;
    }
  }
}

export function evalAt(src: string) {
  const top = <Frame>context.top;
  const meta = top.meta;
  const state = top.meta.states[top.state];
  const memo = meta.evalMemo || (meta.evalMemo = new Map()); // : indirMemo;
  const key = `${src}@${meta.uniqName}@${state ? state.id : "*"}/${
    context.debug
  }}`;
  let resMeta = memo.get(key);
  if (!resMeta) {
    resMeta = compileEval(
      src,
      meta.module,
      state.scope,
      state.scopeDepth + 1,
      !context.debug,
      null
    );
    memo.set(key, resMeta);
  }
  const func = resMeta.func(top);
  context.call = func;
  return savedCall.call(func, top.self);
}

const locationRE = /^(\d+):(\d+)-(\d+):(\d+)$/;

const undefLoc = [0, 0, 0, 0];

/** parses location string into a tuple with a line, a column, a last last and a last column */
export function location(str: string): number[] {
  if (!str) return undefLoc;
  const res: number[] = [];
  const re = locationRE.exec(str);
  if (!re || re.length < 5) return res;
  for (let i = 1; i < 5; i++) res.push(+re[i]);
  return res;
}

let evalCnt = 0;

const indirMemo = new Map<string, string>();

/**
 * Like `compileEval` but returns a self-sufficient string, which can be
 * passed to, say, "vm". However, it doesn't memoize meta-data construction
 * (like `compileEval` does) though.
 */
export function compileEvalToString(
  code: string,
  params: string[] | null
): string {
  const top = context.top;
  const meta = top && top.meta;
  const blackbox = !meta || meta.blackbox;
  const key = code + "@" + blackbox;
  let tgt = indirMemo.get(key);
  if (tgt) return tgt;
  const id = toGlobal(evalCnt++);
  if (!blackbox) context.onNewSource(id, code);
  const ast = babelParse(code, {
    allowReturnOutsideFunction: true
  });
  if (params == null) {
    const body = <any>ast.program.body;
    if (body.length === 1 && body[0].type === "ExpressionStatement")
      body[0] = { type: "ReturnStatement", argument: body[0].expression };
  }
  tgt = babelGenerate(
    T.run(ast, {
      preInstrumentedLibs: true,
      blackbox,
      pureModule: true,
      evalContext: null,
      evalParams: params,
      directEval: false,
      rt: false,
      ns: globalNS,
      relativeName: id,
      filename: `VM${id}.js`,
      iifeWrap: true,
      moduleExports: params == null ? "execModule" : "retModule",
      constrParams: { code }
    }),
    { compact: true }
  ).code;
  indirMemo.set(key, tgt);
  return `(function() { ${tgt}; })()`;
}

/**
 * executes a top level function for a current module
 * this is an API required for `compileEvalToString`
 */
export function execModule() {
  return (context.call = curModule.topLevel.func(null))();
}

/**
 * returns a top level function for a current module
 * this is an API required for `compileEvalToString`
 */
export function retModule() {
  return curModule.topLevel.func(null);
}

const functionConstrMemo = new Map<string, FunctionDescr>();

const savedEval = eval;

export const FunctionConstr = function Function(...args: any[]) {
  let res: any;
  if (context.debug && context.call === Function) {
    const code = args.pop();
    const key = `${code}@Fn@/${context.debug}/${args.join()}`;
    let meta = functionConstrMemo.get(key);
    if (!meta) {
      meta = compileEval(
        code,
        (context.top && context.top.meta && context.top.meta.module) || null,
        null,
        0,
        !context.debug,
        args
      );
      functionConstrMemo.set(key, meta);
    }
    res = meta.func(null);
    // const txt = compileEvalToString(code, args);
    // res = savedEval(txt);
  } else res = saved.Reflect.construct(SavedFunction, args);
  res.constructor = Function;
  return res;
};
FunctionConstr.prototype = Function.prototype;
regOpaqueObject(FunctionConstr, "@effectful/debugger/Function");

export function indirEval(code: string): any {
  if (!context.debug || context.call !== indirEval) return savedEval(code);
  const meta = compileEval(
    code,
    context.top ? context.top.meta.module : null,
    null,
    0,
    !context.debug,
    null
  );
  const func = meta.func(null);
  context.call = func;
  return savedCall.call(func, void 0);
  // return savedEval(compileEvalToString(code, null));
}

export function compileEval(
  code: string,
  mod: Module | null,
  evalContext: { [name: string]: VarInfo } | null,
  scopeDepth: number | null,
  blackbox: boolean,
  params: string[] | null,
  id?: number
): FunctionDescr {
  if (id == null) id = toGlobal(evalCnt++);
  if (!blackbox) context.onNewSource(id, code);
  const ast = babelParse(code, {
    allowReturnOutsideFunction: true
  });
  if (params == null) {
    const body = <any>ast.program.body;
    if (body.length === 1 && body[0].type === "ExpressionStatement")
      body[0] = { type: "ReturnStatement", argument: body[0].expression };
  }
  const tgt = babelGenerate(
    T.run(ast, {
      preInstrumentedLibs: true,
      blackbox,
      pureModule: true,
      evalContext,
      evalParams: params,
      directEval: evalContext != null,
      rt: false,
      ns: globalNS,
      relativeName: id,
      filename: `VM${id}.js`,
      moduleExports: null,
      iifeWrap: false,
      scopeDepth,
      constrParams: null
    }),
    { compact: true }
  ).code;
  const cjs = mod && mod.cjs;
  new SavedFunction(
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
    mod ? mod.fullPath : ".",
    mod && mod.fullPath ? path.dirname(mod.fullPath) : ""
  );
  curModule.params = {
    code,
    parent: mod && (mod.fullPath || mod.id),
    evalContext,
    scopeDepth,
    id,
    params,
    blackbox
  };
  const res = curModule.topLevel;
  return res;
}

export function isDelayedResult(value: any): boolean {
  return value === token;
}

export function makeFrame(closure: any, newTarget: any): Frame {
  const { meta, $, parent } = <ProtoFrame>closure[dataSymbol];
  let $g = parent ? parent.$g : global;
  // uses globals AND eval
  // if (meta.flags & Flag.HAS_DICTIONARY_SCOPE) $g = Object.create($g);
  const frame: Frame = {
    $,
    $g,
    meta,
    state: 0,
    goto: 0,
    done: false,
    running: false,
    parent,
    func: closure,
    newTarget: newTarget != null,
    brk: null,
    next: null,
    caller: null,
    restoreDebug: false,
    awaiting: token,
    onResolve: null,
    onReject: null,
    promise: null,
    timestamp: journal.now,
    result: void 0,
    error: void 0,
    self: void 0,
    args: void 0
  };
  return frame;
}

export function pushFrame(frame: Frame): any {
  const next = context.top;
  frame.next = frame.caller = next;
  if (context.debug && next) {
    if (context.call !== frame.func) {
      frame.restoreDebug = true;
      context.debug = false;
    }
  }
  const res = (context.top = frame);
  // context.call = null;
  return res;
}

export function popFrame(top: Frame) {
  const next = top.next;
  if ((context.top = next) == null) signalThread();
  else recordFrame(next);
}

export const frame: (closure: any, newTarget: any) => any = config.timeTravel
  ? function frame(closure: any, newTarget: any): any {
      const top = context.top;
      recordFrame(top);
      return pushFrame(makeFrame(closure, newTarget));
    }
  : function frame(closure: any, newTarget: any) {
      return pushFrame(makeFrame(closure, newTarget));
    };

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
  // top.state = top.goto = 0;
  top.result = void 0;
  top.done = true;
  if (top.onResolve) {
    context.call = top.onResolve;
    top.onResolve(value);
  }
  if (context.debug) {
    checkExitBrk(top, value);
  } else if (top.restoreDebug) context.debug = true;
  popFrame(top);
  return value;
}

export function unhandled(e: any) {
  const top = <Frame>context.top;
  // top.state = top.goto = 0;
  if (top.onReject) {
    context.call = top.onReject;
    top.onReject(e);
  }
  top.error = void 0;
  top.done = true;
  if (!context.debug && top.restoreDebug) context.debug = true;
  popFrame(top);
  throw e;
}

export function brk(): any {
  if (context.debug === false) return;
  const { needsBreak, top } = context;
  let p: Brk;
  let stopOnEntry = false;
  let stopped = !context.running;
  if (
    top &&
    (p = top.brk = context.brk = top.meta.states[top.state]) &&
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
}

export function iterator<T>(v: Iterable<T>) {
  return (context.call = v[Symbol.iterator]), v[Symbol.iterator]();
}

export function iteratorM<T>(v: AsyncIterable<T>) {
  return v[Symbol.asyncIterator]
    ? ((context.call = v[Symbol.asyncIterator]), v[Symbol.asyncIterator]())
    : ((context.call = (<any>v)[Symbol.iterator]), (<any>v)[Symbol.iterator]());
}

export const forInIterator = config.timeTravel
  ? TTCore.forInIterator
  : State.forInIterator;

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

export { del, set, gset, gdel, lset, ldel } from "./timeTravel/core";

/** resets module's states (for tests) */
export function reset() {
  metaCount = 0;
  indirMemo.clear();
  functionConstrMemo.clear();
  context.activeTop = context.top = null;
  context.running = false;
  context.brk = null;
  context.queue.length = 0;
}

export function iterErr(iter: any, reason: any) {
  if (!(context.call = iter.throw)) throw reason;
  return iter.throw(reason);
}

export function iterErrUndef() {
  return TypeError("The iterator does not provide a 'throw' method.");
}

export function iterFin(iter: any, value: any) {
  if (!(context.call = iter.return)) return { value, done: true };
  return iter.return(value);
}

export function iterNext(iter: any, value: any) {
  return (context.call = iter.next), iter.next(value);
}

/**
 * if `value` is a lazy thunk it is executed and its result is returned
 * otherwise `value` is returned as is
 */
export function force(value: any): any {
  if (!value) return value;
  const code = value[thunkSymbol];
  if (!code) return value;
  defineProperty(value, thunkSymbol, { value: 0, configurable: true });
  if (code === 1) return token;
  throw token;
}

export { config };
