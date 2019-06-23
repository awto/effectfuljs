import config from "../config";
import { saved } from "../state";

export interface Record {
  undone: boolean;
  version: number;
  operations?: Operation;
  prev: Record | null;
  next: Record | null;
}

/** operations trace - callbacks to be executed on reverting state */
export interface Operation {
  prev?: Operation;
  (): void;
}

/** extension point for tracing customization */
export const traceMetaSymbol = Symbol("@effectful/debugger/traceMeta");

/** trace related information stored in the object */
export const traceDataSymbol = Symbol("@effectful/debugger/traceData");

export interface MaybeTarget<T = unknown> {
  [traceMetaSymbol]?: TraceMeta<T>;
  [traceDataSymbol]?: TraceData<T>;
}

export interface Target<T = unknown> {
  [traceMetaSymbol]: TraceMeta<T>;
  [traceDataSymbol]: TraceData<T>;
}

export interface TraceMeta<T = unknown> {
  wrap(target: T): T;
  proto?: object | null;
}

export const notTraceable: TraceMeta<any> = {
  wrap(target: any): any {
    target[traceDataSymbol] = false;
    return target;
  }
};

/** Class for representing trace data steps */
export class TraceData<T> {
  meta: TraceMeta<T>;
  proxy: T | null;
  target: T;
  version: number;
  lastUpdate: Record | null;
  prototypeChanged: boolean;
  proto?: any;

  constructor(meta: TraceMeta<T>, proxy: any, target: any) {
    this.meta = meta;
    this.proxy = proxy;
    this.target = target;
    this.lastUpdate = journal.trace;
    this.version = journal.trace ? journal.trace.version : 0;
    this.prototypeChanged = false;
  }
}

interface Journal {
  trace: Record | null;
  paused: boolean;
}

export const journal: Journal = {
  /** a list of changes */
  trace: null,
  /** this is true when `undoing` changes to avoid re-recording them */
  paused: !config.timeTravel
};

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export function checkpoint(): Record {
  const next = {
    undone: false,
    version: journal.trace ? journal.trace.version + 1 : 0,
    prev: journal.trace,
    next: null
  };
  if (journal.trace) journal.trace.next = next;
  journal.trace = next;
  return next;
}

/**
 * Registers a function(`f`) to be executed on `undo` call
 * The functions are executed in backward order
 */
export function record(f: Operation) {
  if (!f) return;
  if (journal.trace && !journal.paused) {
    f.prev = journal.trace.operations || undefined;
    journal.trace.operations = f;
  }
}

export function undoImpl(from?: Record): Record | null {
  const { trace } = journal;
  if (!trace) return null;
  if (!from) from = trace;
  /*
  for (let i: Record | null = from; i != null; i = i.next) {
    const destVersion = i.version;
    if (i.undone) throw new TypeError("The checkpoint was already undone");
    i.undone = true;
    for (let j = i.snapshots; j; j = j.prev) {
      if (j.data.version >= destVersion) {
        j.call();
        j.data.version = destVersion;
      }
    }
    trace.snapshots = void 0;
  }
    */
  for (
    let i: Record | null = trace, till = from.prev;
    i != null && i != till;
    i = i.prev
  )
    for (let j = i.operations; j != null; j = j.prev) j();
  journal.trace = from.prev;
  if (from.prev) from.prev.next = null;
  return from;
}

/** Returns own property names and symbols */
export function* allProps(obj: any): Iterable<string | symbol> {
  yield* Object.getOwnPropertyNames(obj);
  yield* Object.getOwnPropertySymbols(obj);
}

export function captureSnapshot<T>(data: TraceData<T>) {
  if (journal.paused || !journal.trace || data.lastUpdate === journal.trace)
    return;
  const target = data.target;
  const lastUpdate = data.lastUpdate;
  data.lastUpdate = journal.trace;
  data.prototypeChanged = false;
  const snapshot = Object.getOwnPropertyDescriptors(target);
  record(() => {
    data.lastUpdate = lastUpdate;
    if (data.prototypeChanged) Object.setPrototypeOf(target, data.proto);
    for (const i of allProps(target))
      if (!(i in snapshot)) delete (<any>target)[i];
    for (const i of allProps(snapshot)) {
      const descr = (<any>snapshot)[i];
      if (!descr.set) {
        if (descr.enumberable && descr.writeable)
          (<any>target)[i] = descr.value;
        else Object.defineProperty(target, i, descr);
      }
    }
  });
}

export const defaultTraps: ProxyHandler<any> = {
  set(target, prop, value) {
    captureSnapshot(target[traceDataSymbol]);
    return Reflect.set(target, prop, value);
  },
  setPrototypeOf(target, proto) {
    const data = target[traceDataSymbol];
    captureSnapshot(data);
    data.prototypeChanged = true;
    data.proto = Object.getPrototypeOf(target);
    return Reflect.setPrototypeOf(target, unwrapTarget(proto));
  },
  // TODO: getters of __proto__ property should return wrapped prototype too
  getPrototypeOf(target) {
    return getWrapper(Object.getPrototypeOf(target));
  },
  deleteProperty(target, prop) {
    captureSnapshot(target[traceDataSymbol]);
    return Reflect.deleteProperty(target, prop);
  }
};

export const defaultTrapsWithGetter: ProxyHandler<any> = {
  ...defaultTraps,
  get(target, prop) {
    return Reflect.get(target, prop);
  }
};

export function defaultWrap<T extends MaybeTarget<T>>(
  meta: TraceMeta<T>,
  target: T,
  traps: ProxyHandler<T> = defaultTraps
): T {
  const { proto } = meta;
  if (proto) {
    const origProto = Object.getPrototypeOf(target);
    traps = {
      ...traps,
      getPrototypeOf() {
        return origProto;
      }
    };
    traps.getPrototypeOf = () => origProto;
    Object.setPrototypeOf(target, proto);
  }
  const proxy = new saved.Proxy(target, traps);
  target[traceDataSymbol] = new TraceData(meta, proxy, target);
  return proxy;
}

export const defaultTraceMeta: TraceMeta<any> = {
  wrap(arg: any) {
    return defaultWrap(this, arg);
  },
  proto: null
};

export function wrapImpl<T extends MaybeTarget<T>>(target: T): T {
  if (!target) return target;
  const type = typeof target;
  if (type === "object" || type === "function") {
    if (target.hasOwnProperty(traceDataSymbol)) return target;
    return (target[traceMetaSymbol] || defaultTraceMeta).wrap(target);
  }
  return target;
}

/**
 * if `target` is a proxy returns its enclosing value
 * or returns `target` otherwise
 */
export function unwrapTarget<T extends MaybeTarget<T>>(target: T): T {
  if (!target || !target.hasOwnProperty(traceDataSymbol)) return target;
  return (<any>target)[traceDataSymbol].target;
}

/**
 * for values tracked by some proxy returns the proxy,
 * or returns `target` if it is already the proxy
 */
export function getWrapper<T extends MaybeTarget<T>>(maybeProxy: T): T {
  if (!maybeProxy || !maybeProxy.hasOwnProperty(traceDataSymbol))
    return maybeProxy;
  return (<any>maybeProxy)[traceDataSymbol].proxy;
}
