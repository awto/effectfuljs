/**
 * Full state of a currently running program
 */

/** function's call desciption */
export interface Frame {
  state: number;
  self: object;
  meta: FunctionDescr;
  newTarget: boolean;
  brk: Brk | null;
  resume(): void;
}

export type BrkKind = "s" | "error" | "exit";

/** breakpoint description */
export interface Brk {
  /** debugger's specific type of the breakpoint */
  kind: BrkKind;
  /** unique identifier within the function */
  id: number;
  meta: FunctionDescr;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
  exit: boolean;
  scope: ScopeInfo;
}

/** module's description */
export interface Module {
  name: string;
  functions: { [name: string]: FunctionDescr };
}

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
  func: (...args: any[]) => any;
  handler: (context: Frame, input: any) => any;
  errHandler: (state: number) => number;
  finHandler: (state: number) => number;
  constr: ($$: { [name: string]: any }) => any;
  evalMemo?: Map<string, (...args: any[]) => any>;
} & (
  | { blackbox: true; exitBreakpoint: null }
  | {
      blackbox: false;
      exitBreakpoint: Brk;
      line: number;
      column: number;
      endLine: number;
      endColumn: number;
    });

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
      });

export interface State {
  /** it will stop on break points */
  debug: boolean;
  /** everything is done */
  terminated: boolean;
  /** the engine now runs a function */
  running: boolean;
  /** current execution stack */
  stack: Frame[];
  /** current breakpoint id */
  brk: Brk | null;
  /** loaded modules */
  modules: { [name: string]: Module };
  /** specifies next function needs to be executed synchronously */
  sync: boolean;
  /** saved context for synchronous functions */
  syncStack: Job[];
  /** next functions to run */
  asyncQueue: Job[];
  /** in error state */
  error: boolean;
  /** a current value to be passed into the top of `stack` (or an exception if `error:true`) */
  value: any;
}

/** stores information about currently executing function while some sync function runs */
export interface Job {
  stack: Frame[];
  sync: boolean;
  brk: Brk | null;
  value: any;
}

/** global storage for the whole state of the running program */
export const context: State = {
  debug: true,
  terminated: false,
  running: false,
  stack: [],
  brk: null,
  modules: {},
  sync: false,
  syncStack: [],
  error: false,
  asyncQueue: [],
  value: void 0
};

/** original global objects monkey-patched by this runtime */
export const saved = {
  console,
  Proxy,
  Object: {
    defineProperty: Object.defineProperty
  }
};

export const terminationToken = new Error("Terminated");

/**
 * marks functions represeting a lazy value, the value is result
 * of the function's call
 */
export const thunkSymbol = Symbol("@effectful/debugger/thunk");

/**
 * if `value` is a lazy thunk it is executed and its result is returned
 * otherwise `value` is returned as is
 */
export function evalThunk<T>(value: { [thunkSymbol]: () => T } | T): T {
  return value && (<any>value)[thunkSymbol] ? (<any>value)() : value;
}

export const token = { _effectToken: true };

/** function's meta-data property name */
export const metaDataSymbol = Symbol("@effectful/debugger/metaData");

/** module's meta-data property name */
export const moduleSymbol = Symbol("@effectful/debugger/module");
