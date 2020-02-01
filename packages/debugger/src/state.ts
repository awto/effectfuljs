/**
 * Full state of a currently running program
 */

/** common prototype for call descriptions of each function */
export interface ProtoFrame {
  /** closure captured frame */
  $$: Frame;
  /** meta-data */
  meta: FunctionDescr;
  /** a constructed function's value */
  func: () => any;
}

/** function's call desciption */
export interface Frame extends ProtoFrame {
  /** current state */
  state: number;
  /** next iteration state */
  goto: number;
  /** captured `this` */
  self: object;
  /** if called as `new` expression */
  newTarget: boolean;
  /** where we stopped */
  brk: Brk | null;
  /** local variables */
  $: { [name: string]: any };
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

export enum BrkType {
  exeception,
  location,
  function,
  exit,
  debugger
}

/** breakpoint description */
export interface Brk {
  /** debugger's specific type of the breakpoint */
  type: BrkType;
  reason: string;
  /** unique identifier within the function */
  id: number;
  meta: FunctionDescr;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
  exit: boolean;
  scope: ScopeInfo;
  /** textual representation of the location */
  location: string;
}

/** module's description */
export interface Module {
  name: string;
  /** unique id for loaded modules */
  fullPath?: string;
  /** unique id for generated modules (e.g. `eval`) */
  id?: number;
  functions: { [name: string]: FunctionDescr };
  pure: boolean;
  topLevel: FunctionDescr | null;
  /** `module` object from CommonJS */
  cjs: any;
  version: number;
  /** parent's variables for eval*/
  evalCtx?: { [name: string]: [string, number] };
}

//TODO: babel doesn't support const enums
export const PlainKind = 0;
export const AsyncKind = 1;
export const GeneratorKind = 2;

/** function's description */
export type FunctionDescr = {
  /** module where the function is defined */
  module: Module;
  id: number | null;
  name: string;
  fullName: string;
  blackbox: boolean;
  parent?: FunctionDescr; // Frame?
  states: Brk[];
  canSkip: boolean;
  uniqName: string;
  params: string[];
  kind: number;
  func: (...args: any[]) => any;
  handler: (context: Frame, input: any) => any;
  errHandler: (state: number) => number;
  finHandler: (state: number) => number;
  constr: ($$: { [name: string]: any }) => any;
  evalMemo?: Map<string, (...args: any[]) => any>;
  exitBreakpoint: Brk | null;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
  location?: string;
};

export type NonBlackboxFunctionDescr = FunctionDescr & {
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
};

/** pre-calculated scope information */
export interface ScopeInfo {
  /** original variable name to its storing field name and depth to parent */
  [name: string]: [string, number];
}

/** passed to this runtime by compiler */
export type Scope = any[] &
  (
    | {
        /** scope object's field name to their original names */
        0: { [name: string]: string };
        /** parent's scope */
        1: Scope | null;
        /** memoized `ScopeInfo` */
        length: 2;
      }
    | {
        /** memoized `ScopeInfo` */
        2: ScopeInfo;
        length: 3;
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
  /** loaded modules */
  modules: { [name: string]: Module };
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
  eval: eval,
  Function,
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
  Set
};

/**
 * marks functions represeting a lazy value, the value is result
 * of the function's call
 */
export const thunkSymbol = Symbol("@effectful/debugger/thunk");

/**
 * if `value` is a lazy thunk it is executed and its result is returned
 * otherwise `value` is returned as is
 */
export function evalThunk<T>(value: { [thunkSymbol]: boolean } | T): T {
  return value && (<any>value)[thunkSymbol]
    ? ((context.call = value), (<any>value)())
    : value;
}

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
export type StateMap = ((state: number) => number) | undefined;

/** handler function */
export type Handler = (f: Frame, pat: any) => any;

/** breakpoint positions */
export type States = [Scope, string, string][];

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
  : function(path: string) {
      return path;
    };

/*
export function forInIterator(obj: object): Iterable<string> {
  return (function*() {
    for (const i in obj) yield i;
  })()[Symbol.iterator]();
}

*/

export function* forInIterator(obj: object): Iterable<string> {
  for (const i in obj) yield i;
}

export type SubGenerator = Iterator<any> & {
  throw?: (value: any) => Item;
  return?: (value: any) => Item;
};

export interface GeneratorFrame extends Frame {
  delegatee: SubGenerator | null;
  running: boolean;
  sent: any;
}

export type Item = { value: any; done: boolean };

export type AsyncSubGenerator = AsyncIterator<any> & {
  throw?: (value: any) => Promise<Item>;
  return?: (value: any) => Promise<Item>;
};

export interface AsyncGeneratorFrame extends Frame {
  delegatee: AsyncSubGenerator | null;
  running: boolean;
  queue: (() => void)[];
  cleanup(): void;
  onResolve: (value: any) => void;
  onReject: (reason: any) => void;
  promise: Promise<Item>;
  sent: any;
}
