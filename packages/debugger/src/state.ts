/**
 * Full state of a currently running program
 */

/** common prototype for call desriptions of each function */
export interface ProtoFrame {
  /** closure captured frame */
  $$: Frame;
  /** meta-data */
  meta: FunctionDescr;
}

/** function's call desciption */
export interface Frame extends ProtoFrame {
  state: number;
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
  // the debegger's debugging purpose fields
  deb_id?: number;
  deb_from?: string;
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
  functions: { [name: string]: FunctionDescr };
  pure: boolean;
  topLevel: FunctionDescr | null;
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
      });

export interface State {
  /** stopping on break points if `true` */
  debug: boolean;
  /** everything is done */
  terminated: boolean;
  /** the engine now runs a function */
  running: boolean;
  /** current breakpoint id */
  brk: Brk | null;
  /** loaded modules */
  modules: { [name: string]: Module };
  /** saved context for synchronous functions */
  syncStack: Job[];
  /** next functions to run */
  asyncQueue: Job[];
  /** in error state */
  error: boolean;
  /** a current value to be passed into the top of `stack` (or an exception if `error:true`) */
  value: any;
  /** a callback called when some module's sources are changed */
  onUpdate?: (module: Module) => void;
  /** current execution stack */
  top: Frame | null;
  /** should the engine stop on this `brk` */
  needsBreak: (brk: Brk) => boolean;
}

/** stores information about currently executing function while some sync function runs */
export interface Job {
  top: Frame | null;
  debug: boolean;
  brk: Brk | null;
  value: any;
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
  asyncQueue: [],
  value: void 0,
  needsBreak() {
    return false;
  }
};

(<any>global).deb_context = context;

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
export const dataSymbol = Symbol("@effectful/debugger/data");

/** module's meta-data property name */
export const moduleSymbol = Symbol("@effectful/debugger/module");

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
