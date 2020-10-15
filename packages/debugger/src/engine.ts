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
  StateMap,
  States,
  normalizeDrive,
  toGlobal,
  native,
  Flag,
  BrkFlag,
  defaultErrHandler,
  defaultFinHandler,
  undef,
  signalThread,
  trace
} from "./state";

import * as State from "./state";
import * as TT from "./timeTravel/frame";
import { parse as babelParse } from "@babel/parser";
import babelGenerate from "@babel/generator";
import * as T from "./transform";
import * as path from "path";
import { setObjectDescriptor } from "@effectful/serialization";
import {
  regOpaqueObject,
  regFun,
  ModuleDescriptor,
  defaultBind,
  FunctionDescriptor
} from "./persist";
import { isValidIdentifier } from "@babel/types";

const globalNS = config.globalNS;

const { journal, context, token, closures, functions, thunks } = State;
const nativeFunction = native.Function;

const nativeApply = native.FunctionMethods.apply;
const nativeCall = native.FunctionMethods.call;

const defineProperty = native.Object.defineProperty;
const nativeToString = Function.prototype.toString;
const weakMapSet = native.WeakMap.set;
const weakMapDelete = native.WeakMap.delete;
const setPrototypeOf = native.Object.setPrototypeOf;
const reflectApply = native.Reflect.apply;

let curModule: Module = undefined as any; // this is always used in context where this is inited
let moduleChanged = false;

const recordFrame = config.timeTravel
  ? function recordFrame(top: Frame | null) {
      if (top && journal.enabled) TT.recordFrame(top);
    }
  : function recordFrame() {};

class ArgsTraps {
  func: Frame;
  $: any[];
  constructor(func: Frame) {
    this.func = func;
    this.$ = func.$;
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
    const meta = this.func.meta;
    const index = +prop;
    if (meta.params.length > index) return this.$[meta.shift + index];
    return Reflect.get(target, prop);
  }
}

const objectValues = Object.values;

export function compileModule(): Module | null {
  if (!moduleChanged) {
    if (curModule.exports) curModule.cjs.exports = curModule.exports;
    return null;
  }
  if (curModule.version === void 0) curModule.version = 0;
  else curModule.version++;
  if (!curModule.topLevel || curModule.topLevel.blackbox) return curModule;
  const funcs = objectValues(curModule.functions).reverse();
  const lines = (curModule.lines = new Array(curModule.topLevel.endLine));
  for (let meta of funcs) {
    const states = meta.states;
    for (const state of states) {
      if (state.flags | State.BrkFlag.STMT && state.line) {
        (lines[state.line] || (lines[state.line] = [])).push(state);
      }
    }
    for (let x = states.length; --x; ) {
      const state = states[x];
      if (state.flags | State.BrkFlag.STMT && state.line) {
        for (let j = state.line + 1, end = state.endLine; j <= end; ++j)
          (lines[j] || (lines[j] = [])).push(state);
      }
    }
  }
  let cur = null;
  for (let i = lines.length; i--; ) {
    const line = lines[i];
    if (!line) lines[i] = cur;
    else cur = lines[i];
  }
  return curModule;
}

export function getCurModule(): Module {
  return curModule;
}

export function argsWrap<T>(frame: Frame, value: Iterable<T>): T[] {
  const arr = native.Array.from(value);
  defineProperty(arr, "callee", {
    writable: true,
    enumerable: false,
    value: frame.func
  });
  return new native.Proxy(arr, new ArgsTraps(frame));
}

interface CjsModule {
  id: string;
  hot?: {
    accept(): void;
  };
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
    // something is loaded with node and webpack for example
    if (curModule && (!curModule.cjs || curModule.cjs.id !== cjs.id))
      curModule = <any>void 0;
  }
  regOpaqueObject(cjs, `cjs#${name}`);
  moduleChanged = !curModule;
  if (!curModule) curModule = <any>{ functions: {} };
  (<any>curModule).topLevel = null;
  regOpaqueObject(cjs, name + "$mod");
  context.modules[<any>(fullPath || id)] = curModule;
  setObjectDescriptor(curModule, ModuleDescriptor);
  if (cjs) {
    context.modulesById[cjs.id] = curModule;
    regOpaqueObject(cjs, `${cjs.id}$mod`);
  }
  curModule.name = name;
  curModule.require = require;
  curModule.fullPath = fullPath;
  curModule.id = id;
  context.moduleId = (cjs && cjs.id) || null;
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
  const top = !curModule.topLevel;
  let meta = curModule.functions[name];
  if (meta) {
    if (nativeToString.call(handler) === nativeToString.call(meta.handler)) {
      if (top) curModule.topLevel = meta;
      meta.handler = handler;
      return meta.func;
    }
    moduleChanged = true;
  } else if (!meta) meta = curModule.functions[name] = <FunctionDescr>{};
  if (top) curModule.topLevel = meta;
  if (!errHandler) errHandler = defaultErrHandler;
  if (!finHandler) finHandler = defaultFinHandler;
  const names = [origName || "*"];
  let parent: FunctionDescr | null = null;
  if (parentConstr) parent = <FunctionDescr>functions.get(parentConstr);
  for (let p = parent; p; p = p.parent) names.unshift(p.name);
  const uniqName = `${curModule.name}#${names.join(".")}`;
  const fullName = `${uniqName}@${loc || "?"}`;
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
            try {
              pushFrame(frame);
              return meta.handler(frame, frame.$, value);
            } catch (e) {
              return handle(frame, e);
            }
          }`
      )(api.pushFrame, api.handle, meta, context);
    }
    headCode = `return ${ctx}.iter`;
  } else {
    headCode = `
      try {
        ${ctx}pushFrame(${ctx});
        return ${ctx}.meta.handler(${ctx}, ${ctx}.$, null);
      } catch(e) {
        return ${ctx}M.handle(${ctx}, e);
      }`;
  }
  const constrParams = [
    "module",
    "exports",
    `${ctx}args`,
    `${ctx}context`,
    `${ctx}m`,
    `${ctx}M`,
    `${ctx}clos`,
    `${ctx}frame`,
    `${ctx}pushFrame`
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
      : api.frame,
    pushFrame
  ];
  constrParams.push(`return (function(${ctx}$){
    var ${ctx}$$ = ${ctx}$ && ${ctx}$.$;
    return ${ctx}clos(${ctx}$,${ctx}m,(function ${funcName}(${meta.params.join()}) {
      ${flags & Flag.SLOPPY ? "" : '"use strict";'}
      var ${ctx} = ${ctx}frame(${funcName},${ctx}m,${ctx}$,${ctx}$$,new.target);
      ${headLines.join("\n")}
      ${headCode}
      }));
})`);
  const constr: any = reflectApply(
    native.Reflect.construct(nativeFunction, constrParams),
    null,
    args
  );
  meta.func = constr;
  weakMapSet.call(functions, constr, meta);
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
      weakMapSet.call(closures, closure, {
        meta,
        parent
      });
      setObjectDescriptor(
        closure,
        FunctionDescriptor /*(<any>meta).descriptor*/
      );
      return closure;
    }
  : function clos(parent: Frame | null, meta: FunctionDescr, closure: any) {
      setPrototypeOf(closure, FunctionConstr.prototype);
      weakMapSet.call(closures, closure, {
        meta,
        parent
      });
      return closure;
    };

function __effectful__apply(this: any) {
  if (context.call === __effectful__apply) context.call = this;
  return reflectApply(<any>nativeApply, this, <any>arguments);
}

function __effectful__call(this: any) {
  if (context.call === __effectful__call) context.call = this;
  return reflectApply(<any>nativeCall, this, <any>arguments);
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

export function __effectful_mcall(prop: string, ...args: [any, ...any[]]) {
  const func = args[0][prop];
  if (!func) throw new TypeError(`${prop} isn't a function`);
  return reflectApply(<any>nativeCall, (context.call = func), args);
}

/**
 * runs a computation until it encounters some breakpoint (returns `token)
 * or finishes the whole computation (returns the resulting value or throws an exception)
 */
export function step() {
  try {
    context.running = true;
    const value = context.value;
    const top = context.top;
    const error = context.error;
    context.value = void 0;
    context.error = false;
    if (!top) return value;
    if (error) top.meta.errHandler(top, top.$);
    if (top.brk && top.brk.flags & BrkFlag.EXIT) {
      if (!context.enabled) {
        const restoreDebug = top.restoreEnabled;
        if (restoreDebug !== undef) {
          context.enabled = true;
          context.call = restoreDebug;
        }
      }
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
      (<Frame>top).error = e;
      if (
        !(<Frame>top).meta.blackbox &&
        context.exception !== e &&
        checkErrBrk(<Frame>top, e)
      ) {
        context.value = e;
        context.error = true;
        context.onStop();
        return token;
      }
      top = context.top;
      if (!top) {
        if (config.verbose) {
          // tslint:disable-next-line:no-console
          console.error(
            `Uncaught exception: ${e}(on any:${!!context.brkOnAnyException},on uncaught:${!!context.brkOnUncaughtException})`
          );
          if (config.debuggerDebug && e.stack) {
            // tslint:disable-next-line:no-console
            console.error("Real stack:", e.stack);
            // tslint:disable-next-line:no-console
            console.error("Original stack:", e._deb_stack);
          }
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

export function checkErrBrk(frame: Frame, e: any): boolean {
  if (!context.enabled) return false;
  context.exception = e;
  if (e && e.stack) {
    const stack = [String(e)];
    for (let i: Frame | null = frame; i; i = i.next) {
      if (i.brk)
        stack.push(
          `    at ${i.meta.origName} (${i.meta.module.name}:${i.brk.line}:${i.brk.column})`
        );
    }
    if (config.debuggerDebug) {
      try {
        defineProperty(e, "_deb_stack", { value: stack.join("\n") });
      } catch (e) {}
    } else e.stack = stack.join("\n");
  }
  let needsStop = false;
  if (context.brkOnAnyException) {
    needsStop = true;
  } else if (context.brkOnUncaughtException) {
    // avoiding running finally blocks
    needsStop = true;
    for (let i: Frame | null = frame; i; i = i.next) {
      if (hasEH(i)) {
        needsStop = (i.meta.flags & Flag.EXCEPTION_BOUNDARY) !== 0;
        break;
      }
    }
  }
  return needsStop;
}

export function handle(frame: Frame, e: any) {
  for (;;) {
    if (e === token) {
      if (context.running || frame.next) throw e;
      return e;
    }
    if (frame !== context.top) throw e;
    // tslint:disable-next-line:no-console
    const meta = frame.meta;
    frame.error = e;
    if (!meta.blackbox && e !== context.exception && checkErrBrk(frame, e)) {
      context.value = e;
      context.error = true;
      if (frame.next) {
        context.onStop();
        throw token;
      }
      context.onStop();
      return token;
    }
    meta.errHandler(frame, frame.$);
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
  const memo = meta.evalMemo || (meta.evalMemo = new native.Map());
  const key = `${src}@${meta.module.name}@${meta.uniqName}@${
    state ? state.id : "*"
  }/${context.enabled}}`;
  let resMeta = memo.get(key);
  if (!resMeta) {
    resMeta = compileEval(
      src,
      meta.module,
      state.scope,
      state.scopeDepth + 1,
      !context.enabled,
      null
    );
    memo.set(key, resMeta);
  }
  const func = resMeta.func(top);
  context.call = func;
  return nativeCall.call(func, top.self);
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

const indirMemo = new native.Map<string, string>();

/**
 * Like `compileEval` but returns a self-sufficient string, which can be
 * passed to, say, "vm". However, it doesn't memoize meta-data construction
 * (like `compileEval` does) though.
 */
export function compileEvalToString(
  code: string,
  params: string[] | null
): string {
  const savedEnabled = journal.enabled;
  try {
    journal.enabled = false;
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
        rt: false,
        ns: globalNS,
        relativeName: id,
        filename: `VM${id}.js`,
        iifeWrap: true,
        moduleExports: params == null ? "execModule" : "retModule",
        constrParams: { code },
        timeTravel: config.timeTravel,
        implicitCalls: config.implicitCalls
      }),
      { compact: true }
    ).code;
    indirMemo.set(key, tgt);
    return `/*!EDBG!*/(function() { ${tgt}; })()`;
  } finally {
    journal.enabled = savedEnabled;
  }
}

/**
 * executes a top level function for a current module
 * this is an API required for `compileEvalToString`
 */
export function execModule() {
  compileModule();
  return (context.call = curModule.topLevel.func(null))();
}

/**
 * returns a top level function for a current module
 * this is an API required for `compileEvalToString`
 */
export function retModule() {
  compileModule();
  return curModule.topLevel.func(null);
}

const functionConstrMemo = new native.Map<string, FunctionDescr>();

const savedEval = eval;

export const FunctionConstr = function Function(...args: any[]) {
  let res: any;
  if (context.enabled && context.call === Function) {
    const code = args.pop();
    const key = `${code}@Fn@/${context.enabled}/${args.join()}`;
    let meta = functionConstrMemo.get(key);
    if (!meta) {
      meta = compileEval(
        code,
        (context.top && context.top.meta && context.top.meta.module) || null,
        null,
        0,
        !context.enabled,
        args
      );
      functionConstrMemo.set(key, meta);
    }
    res = meta.func(null);
  } else res = native.Reflect.construct(nativeFunction, args);
  res.constructor = Function;
  return res;
};
if (config.patchRT) {
  FunctionConstr.prototype = Function.prototype;

  defineProperty(FunctionConstr.prototype, "call", {
    configurable: true,
    writable: true,
    value: __effectful__call
  });

  defineProperty(FunctionConstr.prototype, "apply", {
    configurable: true,
    writable: true,
    value: __effectful__apply
  });

  defineProperty(FunctionConstr.prototype, "bind", {
    configurable: true,
    writable: true,
    value: defaultBind
  });
  defineProperty(FunctionConstr.prototype, "toString", {
    configurable: true,
    writable: true,
    value() {
      // nothing to see here (lodash refuses to work with not native functions)
      let params: string = "";
      let name = this.name;
      const data = closures.get(this);
      if (
        (data && data.meta && !data.meta.blackbox) ||
        !State.nativeFuncs.has(this)
      )
        return nativeToString.call(this);
      return `function ${name || ""}(${params}) { [native code] }`;
    }
  });
}

regOpaqueObject(FunctionConstr, "@effectful/debugger/Function");
regOpaqueObject(__effectful__call, "@effectful/debugger/call");
regOpaqueObject(__effectful__apply, "@effectful/debugger/apply");
regOpaqueObject(defaultBind, "@effectful/debugger/bind");

export function indirEval(code: string): any {
  if (!context.enabled || context.call !== indirEval) return savedEval(code);
  const meta = compileEval(
    code,
    context.top ? context.top.meta.module : null,
    null,
    0,
    !context.enabled,
    null
  );
  const func = meta.func(null);
  context.call = func;
  return nativeCall.call(func, void 0);
}

function trim(n: string) {
  return n.trim();
}

function splitParams(param: string): string[] {
  return param.split(",").map(trim);
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
  const savedEnabled = journal.enabled;
  blackbox = blackbox || !context.top || context.top.meta.blackbox;
  try {
    journal.enabled = false;
    if (id == null) id = toGlobal(evalCnt++);
    if (!blackbox) context.onNewSource(id, code);
    const ast = babelParse(code, {
      allowReturnOutsideFunction: true
    });
    if (params == null) {
      const body = <any>ast.program.body;
      if (body.length === 1 && body[0].type === "ExpressionStatement")
        body[0] = { type: "ReturnStatement", argument: body[0].expression };
    } else {
      params = (<string[]>[]).concat(...params.map(splitParams));
    }
    const tgt = babelGenerate(
      T.run(ast, {
        preInstrumentedLibs: true,
        blackbox,
        pureModule: true,
        evalContext,
        evalParams: params,
        rt: false,
        ns: globalNS,
        relativeName: id,
        filename: `VM${id}.js`,
        moduleExports: null,
        iifeWrap: false,
        scopeDepth,
        constrParams: null,
        timeTravel: config.timeTravel,
        implicitCalls: config.implicitCalls
      }),
      { compact: true }
    ).code;
    const cjs = mod && mod.cjs;
    new nativeFunction(
      "exports",
      "require",
      "module",
      "__filename",
      "__dirname",
      tgt
    )(
      // exports,
      mod && (<any>mod).exports,
      (mod && mod.require) || (cjs && cjs.require),
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
    compileModule();
    const res = curModule.topLevel;
    return res;
  } finally {
    journal.enabled = savedEnabled;
  }
}

export function isDelayedResult(value: any): boolean {
  return value === token;
}

export function makeFrame(
  closure: any,
  meta: State.FunctionDescr,
  parent: State.Frame | null,
  $: any,
  newTarget: any
): Frame {
  let $g = global;
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
    newTarget,
    brk: null,
    next: null,
    caller: null,
    restoreEnabled: undef,
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

let TOP_LINES_STACK_NUM = 2;

function isStackFrameLine(line: string) {
  return (
    line.trim().length > 0 &&
    !/\binternal[/\\\\]|__effectful__|\(events\.js\:|\(net\.js\:|\bprocess\/browser\.js|\bdrainQueue\b/g.test(
      line
    )
  );
}

function numFrames(e: any): number {
  let s = String(e.stack)
    .split("\n")
    .filter(isStackFrameLine);
  return s.length;
}

// maybe there is a better way, but we need to know if the function call is async
// we just compare stack trace lines size here
setTimeout(function setupTopNumFrames() {
  TOP_LINES_STACK_NUM = numFrames(new Error("__effectful__stack")) + 1;
}, 0);

function scheduleCurrentThread() {
  context.queue.push({
    top: context.top,
    debug: context.enabled,
    value: context.value
  });
  context.top = null;
  signalThread();
  if (config.verbose)
    trace(`DEBUGGER: schedule a thread: ${State.stackDescr().join(" ==> ")}`);
  throw token;
}

export function pushFrame(frame: Frame): any {
  const next = context.top;
  frame.next = frame.caller = next;
  const res = (context.top = frame);
  if (next) {
    if (context.enabled) {
      if (!context.launched && !frame.meta.blackbox) {
        State.pauseEventQueue();
        scheduleCurrentThread();
      }
      if (context.call !== frame.func) {
        frame.restoreEnabled = context.call;
        context.enabled = false;
      }
    }
  } else {
    context.onFirstFrame();
    if (!context.running && context.enabled) {
      // so suddenly some transpiled function is executed
      // we could use `caller === null` but it could be called from a strict mode
      // on FF this is one line, but on Chrome two
      // the condition probably not always works
      if (numFrames(new Error("__effectful__stack")) <= TOP_LINES_STACK_NUM) {
        // we don't want that code to run if something is stopped on a breakpoint already
        // this way order of async functions is preserved
        if (context.pausedTop || context.queue.length) scheduleCurrentThread();
      }
    }
  }
  return res;
}

export function popFrame(top: Frame) {
  const next = top.next;
  if ((context.top = next) == null) signalThread();
  else recordFrame(next);
}

export const frame: (
  closure: any,
  meta: any,
  parent: any,
  vars: any[] | null,
  newTarget: any
) => any = config.timeTravel
  ? function frame(
      closure: any,
      meta: any,
      parent: any,
      vars: any[] | null,
      newTarget: any
    ): any {
      const top = context.top;
      recordFrame(top);
      return makeFrame(closure, meta, parent, vars, newTarget);
    }
  : makeFrame;

export function checkExitBrk(top: Frame, value: any) {
  const meta = top.meta;
  if (meta.blackbox) return;
  const brk = (context.brk = top.brk = meta.exitBreakpoint);
  if (brk && context.needsBreak(brk, top, value)) {
    context.value = value;
    context.error = false;
    context.onStop();
    throw token;
  }
}

export function ret(value: any): any {
  const top = <Frame>context.top;
  if (
    top.newTarget &&
    (!value || (typeof value !== "object" && typeof value !== "function"))
  )
    value = top.self;
  top.result = void 0;
  top.done = true;
  if (top.onResolve) {
    context.call = top.onResolve;
    top.onResolve(value);
  }
  if (context.enabled) {
    checkExitBrk(top, value);
  } else if (top.restoreEnabled !== undef) {
    context.enabled = true;
    context.call = top.restoreEnabled;
  }
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
  if (!context.enabled) {
    const restoreDebug = top.restoreEnabled;
    if (restoreDebug !== undef) {
      context.enabled = true;
      context.call = restoreDebug;
    }
  }
  popFrame(top);
  throw e;
}

export function brk(): any {
  if (context.enabled === false) return;
  const { needsBreak, top } = context;
  let p: Brk;
  if (
    top &&
    (p = top.brk = context.brk = top.meta.states[top.state]) &&
    needsBreak(p, top) &&
    context.enabled
  ) {
    context.onStop();
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

export function raise(e: any) {
  context.exception = undef;
  throw e;
}

export { token, context };

/** resets module's states (for tests) */
export function reset() {
  metaCount = 0;
  indirMemo.clear();
  functionConstrMemo.clear();
  context.pausedTop = context.top = null;
  context.running = false;
  context.brk = null;
  context.queue.length = 0;
  context.launched = false;
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
  const thunk = thunks.get(value);
  if (!thunk) return value;
  // defineProperty(value, thunkSymbol, { value: null, configurable: true });
  weakMapDelete.call(thunks, value);
  return thunk();
}

regOpaqueObject(nativeCall, "@effectful/debugger/native/call");
regOpaqueObject(nativeApply, "@effectful/debugger/native/apply");

export { config };
