import config from "../config";
import { saved } from "../state";
import * as S from "@effectful/serialization";

export interface Record {
  operations?: Operation;
  prev: Record | null;
}

/** operations trace - callbacks to be executed on reverting state */
export interface Operation {
  prev?: Operation;
  call(): void;
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

S.regOpaqueObject(notTraceable, "@effectful/debugger/notTraceable");
S.regOpaqueObject(notTraceable.wrap, "@effectful/debugger/notTraceable#wrap");

/** Class for representing trace data steps */
export class TraceData<T> {
  meta: TraceMeta<T>;
  proxy: T | null;
  target: T;
  lastUpdate: Record | null;
  prototypeChanged: boolean;
  proto?: any;

  constructor(meta: TraceMeta<T>, proxy: any, target: any) {
    this.meta = meta;
    this.proxy = proxy;
    this.target = target;
    this.lastUpdate = journal.now;
    this.prototypeChanged = false;
  }
}

export interface Journal {
  /** current checkpoint */
  now: Record | null;
  /** a list of changes to undo */
  past: Record | null;
  /** a list of changes to redo */
  future: Record | null;
}

export const journal: Journal = {
  now: null,
  past: null,
  future: null
};

export function reset() {
  journal.past = journal.now = journal.future = null;
}

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export function checkpoint(): Record {
  journal.future = null;
  const { now } = journal;
  if (now) now.prev = journal.past;
  journal.past = now;
  return (journal.now = {
    prev: null
  });
}

/**
 * Registers a function(`f`) to be executed on replay in backward order
 */
export const record: (f: Operation) => void = config.timeTravel
  ? function record(f: Operation) {
      if (!f) return;
      const { now } = journal;
      if (!now) return;
      f.prev = now.operations || undefined;
      now.operations = f;
    }
  : function() {};

/** runs all actions stored in the cocord */
export function replay(rec: Record) {
  for (let i = rec.operations; i != null; i = i.prev) i.call();
}

/** Returns own property names and symbols */
export function* allProps(obj: any): Iterable<string | symbol> {
  for (const i of _allProps()) {
    // if (i === traceDataSymbol /* || i === traceMetaSymbol*/) continue;
    yield i;
  }
  function* _allProps() {
    yield* Object.getOwnPropertyNames(obj);
    yield* Object.getOwnPropertySymbols(obj);
  }
}

class ObjectSnapshot<T> {
  data: TraceData<T>;
  at: Record | null;
  snapshot: { [name: string]: PropertyDescriptor };
  prev?: Operation;
  constructor(data: TraceData<T>) {
    this.data = data;
    this.at = data.lastUpdate;
    this.snapshot = Object.getOwnPropertyDescriptors(data.target);
    data.lastUpdate = journal.now;
    data.prototypeChanged = false;
  }
  call() {
    const { data, at, snapshot } = this;
    const { prototypeChanged, proto, target } = data;
    if (config.timeTravelForward) {
      data.lastUpdate = null;
      captureSnapshot(data);
      if (prototypeChanged) {
        data.proto = Object.getPrototypeOf(target);
        data.prototypeChanged = true;
      }
    }
    data.lastUpdate = at;
    if (prototypeChanged) Object.setPrototypeOf(target, proto);
    for (const i of allProps(target)) {
      if (!(i in snapshot)) delete (<any>target)[i];
    }
    for (const i of allProps(snapshot)) {
      const descr = (<any>snapshot)[i];
      if (!descr.set) {
        if (descr.enumerable && descr.writable) (<any>target)[i] = descr.value;
        else Object.defineProperty(target, i, descr);
      }
    }
  }
}

// shorter format
S.regConstructor(ObjectSnapshot, {
  write(ctx, value) {
    const res = <any>{};
    res.d = ctx.step(value.data, res, "d");
    res["@"] = ctx.step(value.at, res, "@");
    res.p = ctx.step(value.prev, res, "p");
    const snapshots: any[] = (res.i = []);
    for (const i of allProps(value.snapshot)) {
      const descr = (<any>value.snapshot)[i];
      if (!descr.set) {
        let flags = 0;
        if (!descr.enumerable) flags = flags | 1;
        if (!descr.writable) flags = flags | 2;
        if (!descr.configurable) flags = flags | 4;
        const prop: any[] = [i];
        snapshots.push(prop);
        prop.push(ctx.step(descr.value, prop, 1));
        if (flags !== 0) prop.push(flags);
      }
    }
    return res;
  },
  create() {
    return Object.create(ObjectSnapshot.prototype);
  },
  readContent(ctx, json, value) {
    value.data = ctx.step((<any>json).d);
    value.at = ctx.step((<any>json)["@"]);
    value.prev = ctx.step((<any>json).p);
    const snapshot: any = (value.snapshot = {});
    const items = <[string, any, number][]>(<any>json).i;
    for (const [name, propJson, flags] of items) {
      const enumerable = (flags & 1) === 0;
      const writable = (flags & 2) === 0;
      const configurable = (flags & 4) === 0;
      snapshot[name] = {
        enumerable,
        writable,
        configurable,
        value: ctx.step(propJson)
      };
    }
  },
  props: false
});

export function captureSnapshot<T>(data: TraceData<T>) {
  if (!journal.now || data.lastUpdate === journal.now) return;
  record(new ObjectSnapshot<T>(data));
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
  setTraceData(target, new TraceData(meta, proxy, target));
  return proxy;
}

export const defaultTraceMeta: TraceMeta<any> = {
  wrap(arg: any) {
    return defaultWrap(this, arg);
  },
  proto: null
};

S.regOpaqueObject(defaultTraceMeta, "@effectful/debugger/defaultTraceMeta");
S.regOpaqueObject(
  defaultTraceMeta.wrap,
  "@effectful/debugger/defaultTraceMeta#wrap"
);

export function wrapImpl<T extends MaybeTarget<T>>(target: T): T {
  if (!target) return target;
  const type = typeof target;
  if (type === "object" || type === "function") {
    if (getTraceData(target)) return target;
    return (target[traceMetaSymbol] || defaultTraceMeta).wrap(target);
  }
  return target;
}

export function setTraceData<T extends MaybeTarget<T>>(
  target: T,
  data: TraceData<T>
): T {
  target[traceDataSymbol] = data;
  return target;
}

export function getTraceData<T extends MaybeTarget<T>>(
  target: T
): TraceData<T> | undefined {
  if (!target) return undefined;
  const traceData = target[traceDataSymbol];
  if (traceData && traceData.proxy === target) return traceData;
  return undefined;
}

export function getTargetTraceData<T extends MaybeTarget<T>>(
  target: T
): TraceData<T> | undefined {
  if (!target) return undefined;
  const traceData = target[traceDataSymbol];
  if (traceData && traceData.target === target) return traceData;
  return undefined;
}

/**
 * if `target` is a proxy returns its enclosing value
 * or returns `target` otherwise
 */
export function unwrapTarget<T extends MaybeTarget<T>>(target: T): T {
  const data = getTraceData(target);
  if (!data) return target;
  return data.target;
}

/**
 * for values tracked by some proxy returns the proxy,
 * or returns `target` if it is already the proxy
 */
export function getWrapper<T extends MaybeTarget<T>>(maybeProxy: T): T {
  const data = getTargetTraceData(maybeProxy);
  if (!data) return maybeProxy;
  return <any>data.proxy;
}

/** Values wrapper injected by the compiler */
export const wrap: <T extends MaybeTarget<T>>(
  target: T
) => T = config.timeTravel
  ? wrapImpl
  : function wrap<T extends MaybeTarget<T>>(v: T): T {
      return v;
    };
