import config from "../config";
import * as S from "@effectful/serialization";
import { Journal, Record, Operation, saved, context } from "../state";

const ALWAYS = false;

export const journal: Journal = {
  now: null,
  past: null,
  future: null,
  enabled: false
};

export function reset(enabled: boolean = true) {
  journal.enabled = enabled;
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
    objectSnapshots: null,
    dataSnapshots: null,
    prev: null
  });
}

/**
 * Registers a function(`f`) to be executed on replay in backward order,
 * if time traveling is enabled
 */
export const record: (f: {
  call(this: any, ...args: any): any;
}) => void = config.timeTravel
  ? function record(f: Operation) {
      if (!f) return;
      const { now } = journal;
      if (!now) return;
      (<any>f).prev = now.operations || undefined;
      now.operations = f;
    }
  : function() {};

/** runs all actions stored in the snapshot */
export function replay(rec: Record) {
  for (let i = rec.operations; i != null; i = i.prev) i.call();
}

/** `record` a function with bound arguments if `journal.enabled` */
/*
export const recordBind: (
  func: (...args: any[]) => any,
  ...args: any[]
) => void = config.timeTravel
  ? function() {
      if (journal.enabled) record(bind.apply(void 0, <any>arguments));
    }
  : function() {};
*/

export const set: (
  obj: any,
  name: string /* | symbol | number */,
  value: any
) => any = config.timeTravel
  ? function(obj: any, name: string, value: any) {
      const setter = obj[SetSymbol];
      if (setter) return setter(obj, name, value);
      takeObjectSnapshot(obj);
      return (obj[name] = value);
    }
  : function(obj: any, name: string, value: any) {
      return (obj[name] = value);
    };

S.regOpaqueObject(set, "@effectful/debugger/obj#set");

export const del: (
  obj: any,
  name: string /* | symbol | number */
) => any = config.timeTravel
  ? function(obj: any, name: string) {
      const deleter = obj[SetSymbol];
      if (deleter) return deleter(obj, name);
      takeObjectSnapshot(obj);
      return delete obj[name];
    }
  : function(obj: any, name: string) {
      return delete obj[name];
    };

S.regOpaqueObject(del, "@effectful/debugger/obj#delete");

// TODO: defineProperty, setPrototype, Reflect etc patches

export const objectSaved = {
  freeze: Object.freeze,
  isFrozen: Object.isFrozen,
  seal: Object.seal,
  isSealed: Object.isSealed,
  preventExtensions: Object.preventExtensions,
  isExtensible: Object.isExtensible,
  setPrototypeOf: Object.setPrototypeOf,
  defineProperties: Object.defineProperties,
  defineProperty: Object.defineProperty,
  assign: Object.assign
};

// TODO: this is not yet close to be ES compatible
const frozen = new WeakSet();
const sealed = new WeakSet();
const notExtensible = new WeakSet();

const weakAdd = WeakSet.prototype.add;

function objectFreeze(obj: any) {
  weakAdd.call(frozen, obj);
  return obj;
}

function objectIsFrozen(obj: any) {
  //TODO: this is still visible to the program,
  // another checks must be added into setters
  return frozen.has(obj);
}

function objectSeal(obj: any) {
  weakAdd.call(sealed, obj);
  return obj;
}

function objectIsSealed(obj: any) {
  return sealed.has(obj);
}

function objectPreventExtensions(obj: any) {
  weakAdd.call(notExtensible, obj);
  return obj;
}

function objectIsExtensible(obj: any) {
  return !notExtensible.has(obj);
}

function objectSetPrototypeOf(obj: any, prototype: any) {
  if (journal.enabled && (context.call === objectSetPrototypeOf || ALWAYS)) {
    const cur = Object.getPrototypeOf(obj);
    if (cur !== prototype) record(objectSetPrototypeOf.bind(Object, obj, cur));
  }
  return objectSaved.setPrototypeOf(obj, prototype);
}

S.regOpaqueObject(objectSetPrototypeOf, "@effectful/debugger/obj#setp");

/** stores `obj` restoring operation into trace, returns false it is already stored */
export function takeObjectSnapshot(obj: any) {
  if (!journal.enabled) return;
  const now = journal.now;
  if (!now) return;
  const snapshots = now.objectSnapshots || (now.objectSnapshots = new Set());
  if (!snapshots.has(obj)) {
    setSaved.add.call(snapshots, obj);
    record(
      new RestoreObjectSnapshot(obj, Object.getOwnPropertyDescriptors(obj))
    );
  }
}

export function wrapMutableMethod(method: (this: any, ...args: any[]) => any) {
  return function impl(this: any) {
    if (context.call === impl || ALWAYS) takeObjectSnapshot(this);
    return method.apply(this, <any>arguments);
  };
}

class RestoreObjectSnapshot implements Operation {
  self: any;
  saved: { [name: string]: PropertyDescriptor };
  constructor(self: any, saved: { [name: string]: PropertyDescriptor }) {
    this.self = self;
    this.saved = saved;
  }
  call() {
    const { self, saved } = this;
    const cur = Object.getOwnPropertyDescriptors(self);
    record(new RestoreObjectSnapshot(self, cur));
    for (const i of [].concat(
      <any>Object.getOwnPropertyNames(saved),
      <any>Object.getOwnPropertySymbols(saved)
    )) {
      const descr = cur[<any>i];
      if (descr && !descr.configurable) {
        if (descr.writable) {
          const savedDescr = saved[<any>i];
          // e.g. length of Array
          if ("value" in savedDescr) self[<any>i] = savedDescr.value;
        }
      } else objectSaved.defineProperty(self, i, saved[<any>i]);
    }
    for (const i of Object.getOwnPropertyNames(cur))
      if (!(i in saved)) delete self[i];
    for (const i of Object.getOwnPropertySymbols(cur))
      if (!(<any>i in saved)) delete self[<any>i];
  }
}

S.regConstructor(RestoreObjectSnapshot, {
  name: "@effectful/debugger/obj#snapshot",
  create() {
    return <any>Object.create(RestoreObjectSnapshot.prototype);
  },
  readContent(ctx, json, value) {
    value.self = ctx.step((<any>json).s);
    (<any>value).prev = ctx.step((<any>json).P);
    S.ObjectPropertiesDescriptor.readContent(
      ctx,
      (<any>json).f,
      (value.saved = {})
    );
  },
  write(ctx, value) {
    const res: any = {};
    res.s = ctx.step(value.self, res, "s");
    res.P = ctx.step((<any>value).prev, res, "P");
    res.f = S.ObjectPropertiesDescriptor.write(ctx, value.saved);
    return res;
  },
  props: false
});

function objectDefineProperty(
  obj: any,
  name: string,
  descr: PropertyDescriptor
) {
  if (context.call === objectDefineProperty || ALWAYS) takeObjectSnapshot(obj);
  // TODO: this change of configurable value makes debugger visible to the program
  // however this can be hidden by patching getOwnProperty etc
  try {
    const curDescr = Object.getOwnPropertyDescriptor(obj, name);
    if (!curDescr || curDescr.configurable) {
      objectSaved.defineProperty(
        obj,
        name,
        Object.assign({}, descr, { configurable: true })
      );
    } else if (curDescr.writable && "value" in descr) {
      obj[name] = descr.value;
    }
  } catch (e) {
    if (config.verbose)
      console.log("error while defining property", name, descr, e);
    throw e;
  }
}

S.regOpaqueObject(objectDefineProperty, "@effectful/debugger/obj#def");

function objectDefineProperties(
  obj: any,
  descrs: { [name: string]: PropertyDescriptor }
) {
  if (context.call === objectDefineProperties || ALWAYS)
    takeObjectSnapshot(obj);
  return objectSaved.defineProperties(obj, descrs);
}

function objectAssign(tgt: any) {
  if (context.call === objectAssign || ALWAYS) takeObjectSnapshot(tgt);
  return objectSaved.assign.apply(Object, <any>arguments);
}

if (config.timeTravel && config.patchRT) {
  (<any>Object).freeze = objectFreeze;
  (<any>Object).isFrozen = objectIsFrozen;
  (<any>Object).seal = objectSeal;
  (<any>Object).isSealed = objectIsSealed;
  (<any>Object).preventExtensions = objectPreventExtensions;

  (<any>Object).isExtensible = objectIsExtensible;
  (<any>Object).setPrototypeOf = objectSetPrototypeOf;
  (<any>Object).defineProperty = objectDefineProperty;
  (<any>Object).defineProperties = objectDefineProperties;
  (<any>Object).assign = objectAssign;
}

// TODO: Reflect

const Ap = Array.prototype;
const TAp = Object.getPrototypeOf(Int8Array.prototype);

/**
 * a field name for setter override - a function taking object, field name, and a new value
 * it should return the assigned value
 */
export const SetSymbol = Symbol("@effectful/debugger/set");

/**
 * a field name for delete operator override - a function taking object and field name
 * it should return true if delete operator is successful
 */
export const DeleteSymbol = Symbol("@effectful/debugger/delete");

export const arraySaved = saved.Array;

export const typedArraySaved = {
  sort: TAp.sort,
  set: TAp.set
};

// TODO: taking the full snapshot can be avoided for number indexes
if (config.timeTravel && config.patchRT) {
  Ap.push = wrapMutableMethod(Ap.push);
  Ap.pop = wrapMutableMethod(Ap.pop);
  Ap.shift = wrapMutableMethod(Ap.shift);
  Ap.unshift = wrapMutableMethod(Ap.unshift);
  Ap.sort = wrapMutableMethod(Ap.sort);
  Ap.reverse = wrapMutableMethod(Ap.reverse);
  Ap.splice = wrapMutableMethod(Ap.splice);
  TAp.set = wrapMutableMethod(TAp.set);
  TAp.sort = wrapMutableMethod(TAp.sort);
}

const WMp = WeakMap.prototype;

export const weakMapSaved = {
  set: WMp.set,
  delete: WMp.delete
};

function weakMapSet<K extends object, V>(this: WeakMap<K, V>, k: K, v: V) {
  if (journal.enabled && (context.call === weakMapSet || ALWAYS)) {
    if (this.has(k)) {
      const old = this.get(k);
      if (old !== v) record(weakMapSet.bind(this, k, this.get(k)));
    } else record(weakMapDelete.bind(this, k));
  }
  return weakMapSaved.set.call(this, k, v);
}

S.regOpaqueObject(weakMapSet, "@effectful/debugger/wmap#set");

function weakMapDelete<K extends object, V>(this: WeakMap<K, V>, k: K) {
  if (
    journal.enabled &&
    (context.call === weakMapDelete || ALWAYS) &&
    this.has(k)
  )
    record(weakMapSet.bind(this, k, this.get(k)));
  return weakMapSaved.delete.call(this, k);
}

S.regOpaqueObject(weakMapDelete, "@effectful/debugger/wmap#delete");

const Mp = Map.prototype;

export const mapSaved = {
  set: Mp.set,
  delete: Mp.delete,
  clear: Mp.clear
};

function restoreMapSnashot<K, V>(this: Map<K, V>, snapshot: [K, V][]) {
  record(restoreMapSnashot.bind(this, Array.from(this)));
  mapSaved.clear.call(this);
  for (const i of snapshot) mapSaved.set.apply(this, i);
}

S.regOpaqueObject(restoreMapSnashot, "@effectful/debugger/map#restore");

function takeMapSnapshot<K, V>(map: Map<K, V>) {
  if (!journal.enabled) return;
  const now = journal.now;
  if (!now) return;
  const snapshots = now.dataSnapshots || (now.dataSnapshots = new Set());
  if (!snapshots.has(map)) {
    setSaved.add.call(snapshots, map);
    record(restoreMapSnashot.bind(map, Array.from(map)));
  }
}

function mapSet<K, V>(this: Map<K, V>, k: K, v: V) {
  takeMapSnapshot(this);
  return mapSaved.set.call(this, k, v);
}

function mapDelete<K, V>(this: Map<K, V>, k: K) {
  takeMapSnapshot(this);
  return mapSaved.delete.call(this, k);
}

function mapClear<K, V>(this: Map<K, V>) {
  takeMapSnapshot(this);
  return mapSaved.clear.call(this);
}

if (config.timeTravel && config.patchRT) {
  Mp.set = mapSet;
  Mp.delete = mapDelete;
  Mp.clear = mapClear;
}

const WSp = WeakSet.prototype;

export const weakSetSaved = {
  add: WSp.add,
  delete: WSp.delete
};

function weakSetAdd<T extends Object>(this: WeakSet<T>, v: T) {
  if (
    journal.enabled &&
    (context.call === weakSetAdd || ALWAYS) &&
    !this.has(v)
  )
    record(weakSetDelete.bind(this, v));
  return weakSetSaved.add.call(this, v);
}

S.regOpaqueObject(weakSetAdd, "@effectful/debugger/wset#add");

function weakSetDelete<T extends object>(this: WeakSet<T>, v: T) {
  if (
    journal.enabled &&
    (context.call === weakSetDelete || ALWAYS) &&
    this.has(v)
  )
    record(weakSetAdd.bind(this, v));
  return weakSetSaved.delete.call(this, v);
}

S.regOpaqueObject(weakSetDelete, "@effectful/debugger/wset#delete");

const Sp = Set.prototype;

export const setSaved = {
  add: Sp.add,
  delete: Sp.delete,
  clear: Sp.clear
};

function restoreSetSnashot<T>(this: Set<T>, snapshot: T[]) {
  record(restoreSetSnashot.bind(this, Array.from(this)));
  takeSetSnapshot(this);
  setSaved.clear.call(this);
  for (const i of snapshot) setSaved.add.call(this, i);
}

S.regOpaqueObject(restoreSetSnashot, "@effectful/debugger/set#restore");

function takeSetSnapshot<T>(set: Set<T>) {
  if (!journal.enabled) return;
  const now = journal.now;
  if (!now) return;
  const snapshots = now.dataSnapshots || (now.dataSnapshots = new Set());
  if (!snapshots.has(set)) {
    setSaved.add.call(snapshots, set);
    record(restoreSetSnashot.bind(set, Array.from(set)));
  }
}

function setAdd<T>(this: Set<T>, v: T) {
  if (context.call === setAdd || ALWAYS) takeSetSnapshot(this);
  return setSaved.add.call(this, v);
}

function setDelete<T>(this: Set<T>, v: T) {
  if (context.call === setDelete || ALWAYS) takeSetSnapshot(this);
  return setSaved.delete.call(this, v);
}

function setClear<T>(this: Set<T>) {
  if (context.call === setClear || ALWAYS) takeSetSnapshot(this);
  return setSaved.clear.call(this);
}

if (config.timeTravel && config.patchRT) {
  Sp.add = setAdd;
  Sp.delete = setDelete;
  Sp.clear = setClear;
  WSp.add = weakSetAdd;
  WSp.delete = weakSetDelete;
}

export function defineProperty(
  this: any,
  name: any,
  descr: PropertyDescriptor | undefined
) {
  const cur = Object.getOwnPropertyDescriptor(this, name);
  if (journal.enabled && (context.call === defineProperty || ALWAYS))
    record(defineProperty.bind(this, name, cur));
  try {
    if (cur && !cur.configurable) {
      if (descr && cur.writable && descr.value) this[name] = descr.value;
      return;
    }
    if (descr) objectSaved.defineProperty(this, name, descr);
    else delete this[name];
  } catch (e) {
    if (config.verbose)
      console.log("error while defining property", name, descr, e);
    throw e;
  }
}

S.regOpaqueObject(defineProperty, "@effectful/debugger/obj#setn");

/** records current property value but don't try to keep insertion order */
export function recordProp(target: any, name: any) {
  record(
    defineProperty.bind(
      target,
      name,
      Object.getOwnPropertyDescriptor(target, name)
    )
  );
}

/**
 * Same as `set` but simpler:
 *   - don't use property descriptors
 *   - don't delete
 */
export function simpleSet(target: any, name: any, value: any) {
  if (journal.enabled) record(simpleSet.bind(null, target, name, target[name]));
  target[name] = value;
}

Object.defineProperty(global, SetSymbol, { value: simpleSet });

/**
 * a setter implementation which doesn't respect insertion order,
 * but doesn't take the whole object snapshot
 */
export function noOrderSet(obj: any, name: any, value: any): any {
  if (journal.enabled) recordProp(obj, name);
  return (obj[name] = value);
}

/**
 * a deleter implementation which doesn't respect insertion order
 */
export function noOrderDelete(obj: any, name: any): boolean {
  if (journal.enabled) recordProp(obj, name);
  return delete obj[name];
}
