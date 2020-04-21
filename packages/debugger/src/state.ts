// ensuring it is loaded before anything patched
import "@effectful/serialization";
import "@effectful/serialization/dom";
/**
 * Full state of a currently running program
 */
export interface Env {
  /** local variables */
  $: any[];
  /** local's sub-scope (loops block scoping) */
}

/** common prototype for call descriptions of each function */
export interface ProtoFrame extends Env {
  /** closure captured frame */
  // $: Env | null;
  /** meta-data */
  meta: FunctionDescr;
  /** a constructed function's value */
  func: () => any;
  parent: Frame | null;
}

/** function's call desciption */
export interface Frame extends ProtoFrame, Env {
  /** current state */
  state: number;
  /** next iteration state */
  goto: number;
  /** captured `this` */
  self: object | undefined;
  /** captured `arguments` */
  args: object | undefined;
  /** if called as `new` expression */
  newTarget: boolean;
  /** location's desciption */
  brk: Brk | null;
  /** current return value */
  result?: any;
  /** current exception value */
  error?: any;
  /** next function in the stack */
  next: Frame | null;
  /** like `next` but keeps real caller for coroutines */
  caller: Frame | null;
  /** set `context.debug = true` on exit */
  restoreDebug: boolean;
  /** called if function exits with some resulting value */
  onResolve: ((value: any) => void) | null;
  /** called if function exits with some exception */
  onReject: ((reason: any) => void) | null;
  /** the promise to settle on `onResolve`/`onReject` */
  promise: Promise<any> | null;
  /** when this frame was last updated */
  timestamp: Record | null;
  /**
   * if the frame is suspended this may provide some
   * information what exactly it is awaiting
   */
  awaiting?: any;
  /** the control flow is currently within generator's */
  running: boolean;
  done: boolean;
  /** global env object (searched by name) */
  $g: any;
}

export interface Record {
  operations?: Operation;
  prev: Record | null;
}

/** operations trace - callbacks to be executed on reverting state */
export interface Operation {
  prev?: Operation;
  call(): void;
}

export interface Journal {
  /** current checkpoint */
  now: Record | null;
  /** a list of changes to undo */
  past: Record | null;
  /** a list of changes to redo */
  future: Record | null;
  /** the data is collected now */
  enabled: boolean;
}

export const journal: Journal = {
  now: null,
  past: null,
  future: null,
  enabled: false
};

/** breakpoint description */
export interface Brk {
  /** debugger's specific type of the breakpoint */
  flags: BrkFlag;
  /** unique identifier within the function */
  id: number;
  meta: FunctionDescr;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
  scope: ScopeInfo;
  /** textual representation of the location */
  location: string;
  scopeDepth: number;
  logPoint: ((frame: Frame) => void) | null;
  breakpoint: {
    condition: (frame: Frame) => boolean | null;
    hitCondition: (frame: Frame) => number;
    hits: number;
    signal: () => void;
  } | null;
}

export enum BrkFlag {
  HAS_EH = 1 << 0,
  EXPR = 1 << 1,
  STMT = 1 << 2,
  DEBUGGER_STMT = 1 << 3,
  EXIT = 1 << 4
}

/** module's description */
export interface Module {
  name: string;
  /** unique id for loaded modules */
  fullPath?: string;
  /** unique id (a number for generated modules) */
  id?: number | string;
  functions: { [name: string]: FunctionDescr };
  // pure: boolean;
  topLevel: FunctionDescr;
  /** `module` object from CommonJS */
  cjs: any;
  version: number;
  /** parent's variables for eval */
  evalContext?: { [name: string]: VarInfo };
  /** string which is safe to use as a prefix to avoid clashes with other names */
  safePrefix: string;
  api: any;
  closSyms: { [name: string]: any };
  params: null | { [name: string]: any };
}

/** function's description */
export type FunctionDescr = {
  /** module where the function is defined */
  module: Module;
  id: number | null;
  name: string;
  origName: string | null;
  calleeName: number | null;
  fullName: string;
  blackbox: boolean;
  parent: FunctionDescr | null; // Frame?
  states: Brk[];
  statesByLine: Brk[];
  canSkip: boolean;
  uniqName: string;
  persistName: string;
  params: string[];
  flags: number;
  func: (...args: any[]) => any;
  handler: (frame: Frame, locals: { [name: string]: any }, input: any) => any;
  errHandler: (f: Frame, locals: { [name: string]: any }) => void;
  finHandler: (f: Frame, locals: { [name: string]: any }) => void;
  errState: number;
  finState: number;
  constr: ($$: { [name: string]: any }) => any;
  evalMemo?: Map<string, (...args: any[]) => any>;
  exitBreakpoint: Brk | null;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
  location?: string;
  code: string;
  /* number of frame-local variables */
  localsNum: number;
  /* number of variables in top scope */
  varsNum: number;
  /** where arguments start */
  shift: number;
  deps: FunctionDescr[];
  scopeDepth: number;
};

export type NonBlackboxFunctionDescr = FunctionDescr & {
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
};

/** describse variable scope (decl depth, function depth, location) */
export type VarInfo = [number, number, string | null];

/** pre-calculated scope information */
export interface ScopeInfo {
  /** original variable name to its storing index and depth to parent */
  [name: string]: VarInfo;
}

/** passed to this runtime by compiler */
export type Scope = any[] &
  (
    | {
      /** scope object's index and location to their original names */
      0: { [name: string]: [number, string | null] };
      /** parent's scope */
      1: Scope | null;
      /** statement's level */
      2: number;
      length: 3;
    }
    | {
      /** memoized `ScopeInfo` */
      3: ScopeInfo;
      length: 4;
    }
  );

export interface State {
  /** stopping on break points if `true`, otherwise ignoring them */
  debug: boolean;
  /** everything is done */
  terminated: boolean;
  /**
   * the engine now runs some code and expects a breakpoint
   * otherwise it is some new thread which isn't tracked by the debugger
   * and on next breakpoint it is suspended in `queue`, to run after
   * with `running: true` (if the breakpoints aren't ignored by `debug:false`)
   */
  running: boolean;
  /** current breakpoint id */
  brk: Brk | null;
  /** loaded modules (by full path) */
  modules: { [name: string]: Module };
  /** loaded modules (by CommonJs id) */
  modulesById: { [name: string]: Module };
  /** saved context for synchronous functions */
  syncStack: Job[];
  /** next functions to run */
  queue: Job[];
  /**
   * this is called if something a new thread is added into `queue`
   * or some thread was finished (so the caller can proceed with
   */
  onThread: () => void;
  /** in error state */
  error: boolean;
  /** currently propagating exception */
  exception: any;
  /** a current value to be passed into the top of `stack` (or an exception if `error:true`) */
  value: any;
  /** a callback called when some module's sources are changed */
  onLoad?: (module: Module, hot: boolean) => void;
  /** current execution stack */
  top: Frame | null;
  /** queries if the engine should stop on this `brk` */
  needsBreak: (brk: Brk, frame: Frame, param?: any) => boolean;
  /** reference of a function which is expected to be called */
  call: any;
  /** module id which is expected to be required */
  moduleId: string | null;
  /** currently suspended but not exited frames (e.g. on `await` expressions)  */
  suspended: Set<Frame>;
  /** stop on any exceptions */
  brkOnAnyException: boolean;
  /** stop on uncaught exceptions */
  brkOnUncaughtException: boolean;
  /**
   * `top` of currently debugging thread,
   * the value is saved here while some blackbox thread may run
   */
  activeTop: Frame | null;
  /** some new generated source can be debugged */
  onNewSource: (id: number, code: string) => void;
  /** stopping on a breakpoint */
  onStop: () => void;

  /** unique number of this execution context */
  threadId: number;
}

/** a part of context stores information about currently executing function */
export interface Job {
  top: Frame | null;
  debug: boolean;
  brk: Brk | null;
  value: any;
  stopOnEntry?: boolean;
}

/** global storage for the whole state of the running program */
export const context: State = {
  debug: false,
  terminated: false,
  running: false,
  brk: null,
  top: null,
  modules: {},
  modulesById: {},
  syncStack: [],
  error: false,
  queue: [],
  call: null,
  needsBreak: nop,
  value: void 0,
  suspended: new Set(),
  moduleId: null,
  brkOnAnyException: false,
  brkOnUncaughtException: false,
  onNewSource: nop,
  onThread: nop,
  onStop: nop,
  activeTop: null,
  threadId: 0,
  exception: null
};

export function nop() {
  return false;
}

/** original global objects monkey-patched by this runtime */
export const saved = {
  console,
  Proxy,
  Promise,
  // tslint:disable-next-line:object-literal-shorthand
  eval: eval,
  Function,
  FunctionMethods: {
    call: Function.prototype.call,
    apply: Function.prototype.apply,
    bind: Function.prototype.bind
  },
  promiseMethods: {
    then: Promise.prototype.then,
    catch: Promise.prototype.catch,
    finally: Promise.prototype.finally
  },
  Object: {
    defineProperty: Object.defineProperty,
    assign: Object.assign
  },
  Array: {
    shift: Array.prototype.shift,
    unshift: Array.prototype.unshift,
    push: Array.prototype.push,
    pop: Array.prototype.pop,
    splice: Array.prototype.splice,
    sort: Array.prototype.sort,
    reverse: Array.prototype.reverse
  },
  Map,
  Set,
  Reflect: {
    construct: Reflect.construct
  }
};

/**
 * marks functions represeting a lazy value, the value is result
 * of the function's call
 */
export const thunkSymbol = Symbol("@effectful/debugger/thunk");

export const token = { _effectToken: true };

/** function's meta-data property name */
export const dataSymbol = Symbol("@effectful/debugger/data");

interface IdsStore {
  free(descriptor: number): void;
  allocate(): number;
}

/** generates number from 0 till `1 << bits`, reuses numbers from `release` call  */
export function idsStore(bits: number = 16): IdsStore {
  // TODO: ensure optimization with typed arrays and SMI
  const max = 1 << bits;
  // stores elements of a linked list of free ids
  const store: number[] = [];
  let head = -1;
  return {
    free(id: number) {
      store[id] = head;
      head = id;
    },
    allocate(): number {
      if (head === -1) {
        const id = store.length;
        if (id > max) throw new Error("id's generator overflow");
        store.push(-1);
        return id;
      }
      const id = head;
      head = store[id];
      store[id] = -1;
      return id;
    }
  };
}

/** catch/finally handler state ids mapping */
export type StateMap = ((f: Frame) => void) | undefined;

/** handler function */
export type Handler = (f: Frame, pat: any) => any;

/** breakpoint positions */
export type States = [number, string, Scope][];

export const THREAD_BITS = 10;

export const THREAD_MASK = ~(-1 << THREAD_BITS);

export const MAX_ID = 1 << (32 - THREAD_BITS);

export function toGlobal(local: number) {
  if (local > MAX_ID) throw new Error("id value overflow");
  return (local << THREAD_BITS) | context.threadId;
}

export function toLocal(local: number) {
  return local >> THREAD_BITS;
}

export function toThread(local: number) {
  return local & THREAD_MASK;
}

export const isWindows =
  typeof process !== "undefined" && process.platform === "win32";

export const normalizeDrive = isWindows
  ? function normalizeDrive(path: string) {
    return path && path.length > 2 && path[1] === ":"
      ? path.charAt(0).toUpperCase() + path.slice(1)
      : path;
  }
  : function (path: string) {
    return path;
  };

export const normalizePath = isWindows
  ? function normalizePath(path: string) {
    return normalizeDrive(path.replace(/\\/g, "/"))
  }
  : function normalizePath(path: string) { return path; }

export class ForInIterator implements Iterable<string>, Iterator<string> {
  fields: string[];
  pos: number;
  obj: any;
  constructor(obj: any, fields: string[]) {
    this.fields = fields;
    this.pos = 0;
    this.obj = obj;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<string> {
    for (; ;) {
      if (this.pos >= this.fields.length)
        return { done: true, value: undefined };
      const value = this.fields[this.pos++];
      if (value in this.obj) return { done: false, value };
    }
  }
}
export function forInIterator(obj: object): Iterable<string> {
  const fields: string[] = [];
  for (let i in obj) fields.push(i);
  return new ForInIterator(obj, fields);
}

export interface GeneratorFrame extends Frame {
  sent: any;
  iter: Iterable<any>;
}

export type Item = { value: any; done: boolean };

export interface AsyncGeneratorFrame extends Frame {
  running: boolean;
  queue: (() => void)[];
  onResolve: (value: any) => void;
  onReject: (reason: any) => void;
  promise: Promise<Item>;
  sent: any;
  iter: AsyncIterable<any>;
}

export enum Flag {
  ASYNC_FUNCTION = 1 << 0,
  GENERATOR_FUNCTION = 1 << 1,
  ARROW_FUNCTION = 1 << 2,
  HAS_THIS = 1 << 3,
  HAS_ARGUMENTS = 1 << 4,
  FILE_TOP_LEVEL = 1 << 5,
  BLACKBOX = 1 << 7,
  SLOPPY = 1 << 8,
  HAS_FUNCTION_SENT = 1 << 9,
  HAS_DICTIONARY_SCOPE = 1 << 10
}

export function defaultErrHandler(f: Frame) {
  f.state = f.goto = f.meta.errState;
}

export function defaultFinHandler(f: Frame) {
  f.state = f.goto = f.meta.finState;
}

export function patchNative(obj: any, name: string | symbol, value: any) {
  saved.Object.defineProperty(obj, name, { configurable: true, writable: true, value });
}
