import config from "../config";
import { Journal, Record, saved, context } from "../state";
import { record1, record2, record3, record4 } from "./binds";
import { regOpaqueObject, regConstructor } from "../persist";

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

const SavedMap = Map;
const SavedSet = Set;

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

export interface Callable {
  call(this: any, ...args: any): any;
}

/**
 * Registers a function(`f`) to be executed on replay in backward order,
 * if time traveling is enabled
 */
export const record: <T extends Callable>(f: T) => void = config.timeTravel
  ? function record(f: any) {
      if (!f) return;
      const { now } = journal;
      if (!now) return;
      (<any>f).prev = now.operations || null;
      now.operations = f;
    }
  : function() {};

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
  assign: Object.assign,
  entries: Object.entries,
  keys: Object.keys,
  getOwnPropertyNames: Object.getOwnPropertyNames,
  getOwnPropertySymbols: Object.getOwnPropertySymbols,
  getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors,
  getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
  getPrototypeOf: Object.getPrototypeOf,
  create: Object.create
};

interface KeysOrder {
  name: string;
  next: KeysOrder;
  prev: KeysOrder;
  enumerable: boolean;
}

interface KeysDescr {
  strKeys: KeysOrder;
  strMap: { [name: string]: KeysOrder };
  symKeys: KeysOrder;
  symMap: { [name: string]: KeysOrder };
}

const keysMapSymbol = Symbol.for("@effectful/debugger/keys");

function isInt(str: string): boolean {
  return String(Math.ceil(Math.abs(<any>str))) === str;
}

function getObjKeys(obj: any): KeysDescr | undefined {
  if (!obj) return undefined;
  const descr = Object.getOwnPropertyDescriptor(obj, keysMapSymbol);
  if (!descr) return undefined;
  return descr.value;
}

function getOrCreateObjKeys(
  obj: any,
  optional: boolean
): KeysDescr | undefined {
  let descr = getObjKeys(obj);
  if (descr || optional) return descr;
  let strKeys: KeysOrder = <any>{ name: null };
  strKeys.next = strKeys;
  strKeys.prev = strKeys;
  const strMap: { [name: string]: KeysOrder } = {};
  let symKeys: KeysOrder = <any>{ name: null };
  symKeys.next = symKeys;
  symKeys.prev = symKeys;
  const symMap: { [name: string]: KeysOrder } = {};
  for (const i of objectSaved.getOwnPropertyNames(obj)) {
    if (isInt(i)) continue;
    const { next } = strKeys;
    strMap[i] = strKeys.next = next.prev = {
      name: i,
      enumerable:
        (<any>objectSaved.getOwnPropertyDescriptor(obj, i)).enumerable === true,
      next,
      prev: strKeys
    };
  }
  for (const i of objectSaved.getOwnPropertySymbols(obj)) {
    const { next } = symKeys;
    symMap[<any>i] = symKeys.next = next.prev = {
      name: <any>i,
      enumerable:
        (<any>objectSaved.getOwnPropertyDescriptor(obj, i)).enumerable === true,
      next,
      prev: symKeys
    };
  }
  objectSaved.defineProperty(obj, keysMapSymbol, {
    configurable: true,
    value: descr = { strKeys, strMap, symKeys, symMap }
  });
  return descr;
}

function delKeyImpl(
  name: string,
  map: { [name: string]: KeysOrder },
  value: KeysOrder
) {
  delete map[name];
  const { prev, next } = value;
  prev.next = next;
  next.prev = prev;
  record4(insertKeyOp, name, map, prev, value);
}

function delKeyOp(this: any) {
  const { a: name, b: map, c: value } = this;
  delete map[name];
  const { prev, next } = value;
  prev.next = next;
  next.prev = prev;
  this.call = insertKeyOp;
  this.c = prev;
  this.d = value;
  record(this);
}

regOpaqueObject(delKeyOp, "#delk");

function delKey(obj: any, name: string, optional: boolean) {
  const ty = typeof name;
  if (ty !== "number") {
    if (ty === "string") {
      if (!isInt(name)) {
        const descr = getOrCreateObjKeys(obj, optional);
        if (descr) {
          const prev = descr.strMap[name];
          if (prev) delKeyImpl(name, descr.strMap, prev);
        }
      }
    } else {
      const descr = getOrCreateObjKeys(obj, optional);
      if (descr) {
        const prev = descr.symMap[name];
        if (prev) delKeyImpl(name, descr.symMap, prev);
      }
    }
  }
}

function insertKeyOp(this: any) {
  const { a: name, b: map, c: pos, d: cur } = this;
  this.c = cur;
  this.d = null;
  this.call = delKeyOp;
  record(this);
  const { next } = pos;
  cur.next = next;
  cur.prev = pos;
  map[name] = pos.next = next.prev = cur;
}

function insertKey(
  name: string,
  map: { [name: string]: KeysOrder },
  pos: KeysOrder,
  cur: KeysOrder
) {
  const { next } = pos;
  cur.next = next;
  cur.prev = pos;
  map[name] = pos.next = next.prev = cur;
  record4(delKeyOp, name, map, cur, null);
}

regOpaqueObject(insertKeyOp, "#insk");

function addKeyImpl(
  name: string,
  map: { [name: string]: KeysOrder },
  list: KeysOrder,
  value: KeysOrder
) {
  if (map[name]) return;
  insertKey(name, map, list, value);
}

regOpaqueObject(addKeyImpl, "#addk");

function addKey(
  obj: any,
  name: string,
  enumerable: boolean,
  optional: boolean
): boolean {
  const ty = typeof name;
  if (ty !== "number") {
    if (ty === "string") {
      if (!isInt(name)) {
        const descr = getOrCreateObjKeys(obj, optional);
        if (!descr) return false;
        addKeyImpl(name, descr.strMap, descr.strKeys, <any>{
          name,
          enumerable
        });
      }
    } else {
      const descr = getOrCreateObjKeys(obj, optional);
      if (!descr) return false;
      addKeyImpl(name, descr.symMap, descr.symKeys, <any>{
        name,
        enumerable
      });
    }
  }
  return true;
}

function addNotIntKey(
  obj: any,
  name: string,
  enumerable: boolean,
  optional: boolean
): boolean {
  if (typeof name === "symbol") {
    const descr = getOrCreateObjKeys(obj, optional);
    if (!descr) return false;
    addKeyImpl(name, descr.symMap, descr.symKeys, <any>{
      name,
      enumerable
    });
  } else {
    const descr = getOrCreateObjKeys(obj, optional);
    if (!descr) return false;
    addKeyImpl(name, descr.strMap, descr.strKeys, <any>{
      name,
      enumerable
    });
  }
  return true;
}

function objectGetOwnPropertyNames(obj: any): string[] {
  let descr = getObjKeys(obj);
  if (!descr) return objectSaved.getOwnPropertyNames(obj);
  const res = objectSaved.getOwnPropertyNames(obj).filter(isInt);
  const keys = descr.strKeys;
  for (let i = keys.prev; i !== keys; i = i.prev) res.push(i.name);
  return res;
}

function objectGetOwnPropertySymbols(obj: any): symbol[] {
  let descr = getObjKeys(obj);
  if (!descr) return objectSaved.getOwnPropertySymbols(obj);
  const res: symbol[] = [];
  const keys = descr.symKeys;
  for (let i = keys.prev; i !== keys; i = i.prev) res.push(<any>i.name);
  return res;
}

function objectGetOwnPropertyDescriptors(
  obj: any
): { [name: string]: PropertyDescriptor } {
  let descr = getObjKeys(obj);
  if (!descr) return objectSaved.getOwnPropertyDescriptors(obj);
  const res: { [name: string]: PropertyDescriptor } = {};
  const descrs = objectSaved.getOwnPropertyDescriptors(obj);
  for (const i of objectSaved.getOwnPropertyNames(descrs)) {
    if (!isInt(i)) break;
    res[i] = descrs[i];
  }
  const { strKeys, symKeys } = descr;
  for (let i = strKeys.prev; i !== strKeys; i = i.prev)
    res[i.name] = descrs[i.name];
  for (let i = symKeys.prev; i !== symKeys; i = i.prev)
    res[i.name] = descrs[i.name];
  return res;
}

function objectKeys(obj: any): string[] {
  const descr = getObjKeys(obj);
  if (!descr) return objectSaved.keys(obj);
  const keys = objectSaved.keys(obj);
  const len = keys.length;
  let pos = 0;
  for (let i = 0; i < len; ++i, ++pos) if (!isInt(keys[i])) break;
  const { strKeys } = descr;
  for (let i = strKeys.prev; i != strKeys; i = i.prev)
    if (i.enumerable) keys[pos++] = i.name;
  return keys;
}

export function forInIterator(obj: any): Iterable<string> {
  const seen = new SavedSet();
  return _forInIterator(obj);

  function* _forInIterator(obj: any): Iterable<string> {
    const descr = getObjKeys(obj);
    for (const i in obj) {
      if (descr && (!isInt(i) || !Object.prototype.hasOwnProperty.call(obj, i)))
        break;
      if (!seen.has(i)) {
        seen.add(i);
        yield i;
      }
    }
    if (!descr) return;
    const { strKeys } = <any>descr;
    for (let i = strKeys.prev; i != strKeys; i = i.prev)
      if (i.enumerable) {
        if (!seen.has(i.name)) {
          seen.add(i.name);
          yield i.name;
        }
      }
    const proto = objectSaved.getPrototypeOf(obj);
    if (proto) yield* _forInIterator(proto);
  }
}

function objectEntries(obj: any): string[] {
  const ks = objectKeys(obj);
  const len = ks.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) res[i] = obj[ks[i]];
  return res;
}

function forceConfigurable(props: {
  [name: string]: PropertyDescriptor;
}): { [name: string]: PropertyDescriptor } {
  const res: { [name: string]: PropertyDescriptor } = {};
  for (const i of Reflect.ownKeys(props)) {
    let p = props[<any>i];
    if (!p.configurable && !p.writable) p = objectSaved.assign({}, p);
    res[<any>i] = p;
  }
  return res;
}

function objectCreate(
  obj: any,
  props?: { [name: string]: PropertyDescriptor }
) {
  if (props) props = forceConfigurable(props);
  return objectSaved.create(obj, <any>props);
}

export const set: (
  obj: any,
  name: string /* | symbol | number */,
  value: any
) => any = config.timeTravel
  ? config.expNoAccessOverloading
    ? function set(obj: any, name: string, value: any) {
        if (journal.enabled) {
          if (Array.isArray(obj)) return arraySet(obj, name, value);
          // TODO: this is needed for typed array
          // but doesn't work well for other objects
          if (typeof name !== "symbol" && isInt(String(<any>name))) {
            const index = +name;
            if (Object.prototype.hasOwnProperty.call(obj, index))
              record3(propSetOp, obj, name, obj[index]);
            else record2(propDelOp, obj, name);
          } else {
            const cur = defaultGetOwnPropertyDescriptor(obj, name);
            if (cur) {
              if (cur.writable && !cur.set) {
                addNotIntKey(obj, name, true, false);
                record3(propSetOp, obj, name, cur.value);
              }
            } else if (name in obj) {
              // this may be some inherited setter call which we need to ignore
              for (let p = obj; (p = Object.getPrototypeOf(p)) != null; ) {
                const cur = defaultGetOwnPropertyDescriptor(p, name);
                if (cur) {
                  if (cur.writable && !cur.set) {
                    addNotIntKey(obj, name, true, false);
                    record2(propDelOp, obj, name);
                  }
                  break;
                }
              }
            } else {
              addNotIntKey(obj, name, true, false);
              record2(delOp, obj, name);
            }
          }
        }
        return (obj[name] = value);
      }
    : function set(obj: any, name: string, value: any) {
        if (journal.enabled) {
          const setter = obj[SetSymbol];
          if (setter) return setter(obj, name, value);
          addKey(obj, name, true, false);
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) record3(objectDefinePropertyOp, obj, name, cur);
          else record2(delOp, obj, name);
        }
        return (obj[name] = value);
      }
  : function set(obj: any, name: string, value: any) {
      return (obj[name] = value);
    };

/** API call replacing `delete` */
export const del: (
  obj: any,
  name: string /* | symbol | number */
) => any = config.timeTravel
  ? config.expNoAccessOverloading
    ? function del(obj: any, name: string) {
        if (journal.enabled) {
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) {
            delKey(obj, name, false);
            record3(objectDefinePropertyOp, obj, name, cur);
          }
        }
        return delete obj[name];
      }
    : function del(obj: any, name: string) {
        if (journal.enabled) {
          const deleter = obj[DeleteSymbol];
          if (deleter) return deleter(obj, name);
          const cur = defaultGetOwnPropertyDescriptor(obj, name);
          if (cur) {
            delKey(obj, name, false);
            record3(objectDefinePropertyOp, obj, name, cur);
          }
        }
        return delete obj[name];
      }
  : function del(obj: any, name: string) {
      return delete obj[name];
    };

function propSetOp(this: any) {
  const { a: target, b: name, c: value } = this;
  if (Object.prototype.hasOwnProperty.call(target, name)) {
    this.c = target[name];
  } else {
    this.call = propDelOp;
    this.c = null;
  }
  record(this);
  target[name] = value;
}

regOpaqueObject(propSetOp, "#pset");

function propDelOp(this: any) {
  const { a: obj, b: name } = this;
  if (Object.prototype.hasOwnProperty.call(obj, name)) {
    this.call = propSetOp;
    this.c = obj[name];
    record(this);
  }
  delete obj[name];
}

regOpaqueObject(propDelOp, "#pdel");

function delOp(this: any) {
  const { a: obj, b: name } = this;
  const cur = defaultGetOwnPropertyDescriptor(obj, name);
  if (cur) {
    this.call = objectDefinePropertyOp;
    this.c = cur;
    record(this);
  }
  delete obj[name];
}

regOpaqueObject(delOp, "#del");

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

function objectSetPrototypeOfOp(this: any) {
  const { a: obj, b: proto } = this;
  this.b = objectSaved.getPrototypeOf(obj);
  record(this);
  objectSaved.setPrototypeOf(obj, proto);
}

regOpaqueObject(objectSetPrototypeOfOp, "#setp");

function objectSetPrototypeOf(obj: any, prototype: any) {
  if (journal.enabled && context.call === objectSetPrototypeOf) {
    const cur = objectSaved.getPrototypeOf(obj);
    if (cur !== prototype) record2(objectSetPrototypeOfOp, obj, cur);
  }
  return objectSaved.setPrototypeOf(obj, prototype);
}

const defaultGetOwnPropertyDescriptor = objectSaved.getOwnPropertyDescriptor;

function objectDefinePropertyNoRec(
  obj: any,
  name: string,
  descr: PropertyDescriptor,
  cur: PropertyDescriptor | undefined
) {
  if (!descr.configurable && !descr.writable)
    descr = objectSaved.assign({}, descr, { configurable: true });
  try {
    if (!cur || cur.configurable) {
      objectSaved.defineProperty(obj, name, descr);
    } else if (cur.writable && "value" in descr) {
      obj[name] = descr.value;
    }
  } catch (e) {
    if (config.verbose)
      console.log("error while defining property", name, descr, e);
    throw e;
  }
  return obj;
}

function objectDefinePropertyImpl(
  obj: any,
  name: string,
  descr: PropertyDescriptor,
  enabled: boolean
) {
  const cur = defaultGetOwnPropertyDescriptor(obj, name);
  if (enabled) {
    if (cur) record3(objectDefinePropertyOp, obj, name, cur);
    else record2(delOp, obj, name);
  }
  return objectDefinePropertyNoRec(obj, name, descr, cur);
}

/** `Object.defineProperty` wrapper  */
function objectDefineProperty(
  obj: any,
  name: string,
  descr: PropertyDescriptor
) {
  //TODO: track this in runtime
  const enabled = journal.enabled && context.call === objectDefineProperty;
  addKey(obj, name, descr.enumerable === true, !enabled);
  return objectDefinePropertyImpl(obj, name, descr, enabled);
}

function objectDefinePropertyOp(this: any) {
  const { a: obj, b: name, c: descr } = this;
  const cur = defaultGetOwnPropertyDescriptor(obj, name);
  if (cur) {
    this.c = cur;
  } else {
    this.c = null;
    this.call = delOp;
  }
  record(this);
  objectDefinePropertyNoRec(obj, name, descr, cur);
}

regOpaqueObject(objectDefinePropertyOp, "#prop");

function objectDefineProperties(
  obj: any,
  descrs: { [name: string]: PropertyDescriptor }
) {
  descrs = forceConfigurable(descrs);
  if (context.call !== objectDefineProperties)
    return objectSaved.defineProperties(obj, descrs);
  context.call = objectDefineProperty;
  for (const i of objectSaved.getOwnPropertyNames(descrs))
    objectDefineProperty(obj, i, descrs[i]);
  for (const i of objectSaved.getOwnPropertySymbols(descrs))
    objectDefineProperty(obj, <any>i, descrs[<any>i]);
  return obj;
}

function objectAssign(dest: any, ...args: any[]) {
  if (context.call !== objectAssign) return objectSaved.assign(dest, ...args);
  for (const value of args) {
    if (!value) continue;
    for (const name of Object.getOwnPropertyNames(value))
      set(dest, name, value[name]);
    for (const name of Object.getOwnPropertySymbols(value))
      set(dest, <any>name, value[name]);
  }
  return dest;
}

const Ap = Array.prototype;
const TAp = Object.getPrototypeOf(Int8Array.prototype);

/**
 * a field name for setter override - a function taking object, field name, and a new value
 * it should return the assigned value
 */
export const SetSymbol = Symbol("@effectful/debugger/set");
export const DeleteSymbol = Symbol("@effectful/debugger/del");

export const arraySaved = saved.Array;

export const typedArraySaved = {
  sort: TAp.sort,
  set: TAp.set,
  fill: TAp.fill,
  reverse: TAp.reverse
};

function spliceOp(this: any) {
  let { a: arr, b: start, c: del, d: ins } = this;
  this.c = ins.length;
  arraySaved.unshift.call(ins, start, del);
  const res = arraySaved.splice.apply(arr, <any>ins);
  this.d = Array.from(res);
  record(this);
}

regOpaqueObject(spliceOp, "#splice");

function spliceImpl(arr: any[], start: number, del: number, ins: any[]) {
  const nextDel = ins.length;
  if (start < 0) start = arr.length + start;
  if (del == null) del = arr.length - start;
  arraySaved.unshift.call(ins, start, del);
  const res = arraySaved.splice.apply(arr, <any>ins);
  record4(spliceOp, arr, start, nextDel, Array.from(res));
  return res;
}

function arraySetLength(arr: any[], value: number) {
  const len = arr.length;
  const ins: any[] = [];
  let start;
  let del;
  if (len < value) {
    del = 0;
    start = len;
    ins.length = value - len;
  } else {
    del = len - value;
    start = value;
  }
  spliceImpl(arr, start, del, ins);
  return value;
}

function arraySet(arr: any[], name: string, value: any) {
  if (name === "length") return arraySetLength(arr, value);
  if (typeof name !== "symbol" && isInt(String(<any>name))) {
    const index = +name;
    const len = arr.length;
    const diff = index - len;
    if (diff === 0) {
      record1(arrayPopOp, arr);
      arr[index] = value;
      return value;
    }
    if (diff > 0) {
      const ins = [];
      ins[diff] = value;
      spliceImpl(arr, len, 0, ins);
      return value;
    }
    record3(simpleSetOp, arr, name, arr[index]);
    return (arr[index] = value);
  }
  addKey(arr, name, true, false);
  const cur = defaultGetOwnPropertyDescriptor(arr, name);
  if (cur) record3(objectDefinePropertyOp, arr, name, cur);
  else record2(delOp, arr, name);
  return (arr[<any>name] = value);
}

function typedArrayPropSet(arr: any[], name: string, value: any) {
  if (journal.enabled) {
    if (typeof name !== "symbol" && isInt(String(<any>name))) {
      const index = +name;
      record3(simpleSetOp, arr, name, arr[index]);
      return (arr[index] = value);
    }
    addKey(arr, name, true, false);
    const cur = defaultGetOwnPropertyDescriptor(arr, name);
    if (cur) record3(objectDefinePropertyOp, arr, name, cur);
    else record2(delOp, arr, name);
  }
  return (arr[<any>name] = value);
}

if (!config.expNoAccessOverloading) {
  objectSaved.defineProperty(Array.prototype, SetSymbol, {
    value: arraySet,
    configurable: true
  });

  objectSaved.defineProperty(TAp, SetSymbol, {
    value: typedArrayPropSet,
    configurable: true
  });
  Object.defineProperty(global, SetSymbol, { value: simpleSet });
}

function arrayPopOp(this: any) {
  this.b = arraySaved.pop.call(this.a);
  this.call = arrayPush1Op;
  record(this);
}

regOpaqueObject(arrayPopOp, "#arr$pop");

function arrayPop(this: any[]): any {
  if (this.length) {
    const res = arraySaved.pop.call(this);
    if (journal.enabled && context.call === arrayPop)
      record2(arrayPush1Op, this, res);
    return res;
  }
  return undefined;
}

function arrayPush1Op(this: any) {
  const { a: arr, b: value } = this;
  this.b = null;
  this.call = arrayPopOp;
  record(this);
  arr[arr.length] = value;
}

regOpaqueObject(arrayPush1Op, "#arr$push1");

function arrayPush(this: any[]): number {
  const res = arraySaved.push.apply(this, <any>arguments);
  if (journal.enabled && context.call === arrayPush) {
    const len = arguments.length;
    if (len === 1) record1(arrayPopOp, this);
    else record4(spliceOp, this, this.length - len, len, []);
  }
  return res;
}

regOpaqueObject(arrayPush, "#arr$push");

function arrayShiftOp(this: any) {
  const res = arraySaved.shift.call(this.a);
  this.b = res;
  this.call = arrayUnshift1Op;
  record(this);
}

regOpaqueObject(arrayShiftOp, "#arr$shift");

function arrayShift(this: any[]): any {
  if (this.length) {
    const res = arraySaved.shift.call(this);
    if (journal.enabled && context.call === arrayShift)
      record2(arrayUnshift1Op, this, res);
    return res;
  }
  return undefined;
}

function arrayUnshift1Op(this: any) {
  const { a: arr, b: value } = this;
  arraySaved.unshift.call(arr, value);
  this.call = arrayShiftOp;
  this.b = null;
  record(this);
}

regOpaqueObject(arrayUnshift1Op, "#arr$unshift");

function arrayUnshift(this: any[]): number {
  if (journal.enabled && context.call === arrayUnshift) {
    const alen = arguments.length;
    if (alen === 1) record1(arrayShiftOp, this);
    else record4(spliceOp, this, 0, alen, []);
  }
  return arraySaved.unshift.apply(this, <any>arguments);
}

function arrayReverseOp(this: any) {
  record(this);
  arraySaved.reverse.call(this.a);
}

function arrayReverse(this: any[]): any[] {
  if (journal.enabled && context.call === arrayReverse)
    record1(arrayReverseOp, this);
  return arraySaved.reverse.call(this);
}

regOpaqueObject(arrayReverseOp, "#arr$reverse");

function arraySort(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === arraySort)
    record4(spliceOp, this, 0, this.length, Array.from(this));
  return arraySaved.sort.call(this, pred);
}

function arraySplice(this: any[], from: number, del: number, ...ins: any[]) {
  if (journal.enabled && context.call === arraySplice)
    return spliceImpl(this, from, del, ins);
  return arraySaved.splice.apply(this, <any>arguments);
}

function typedArraySetOp(this: any) {
  const { a: arr, b: value, c: offset } = this;
  this.b = arr.slice(offset, offset + value.length);
  record(this);
  typedArraySaved.set.call(arr, value, offset);
}

regOpaqueObject(typedArraySetOp, "#tarr$set");

function typedArraySort(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === typedArraySort)
    record3(typedArraySetOp, this, this.slice(0), 0);
  return typedArraySaved.sort.call(this, pred);
}

function typedArrayReverse(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === typedArrayReverse)
    record3(typedArraySetOp, this, this.slice(0), 0);
  return typedArraySaved.reverse.call(this, pred);
}

function typedArraySet(this: any, value: any, offset: number = 0) {
  if (journal.enabled && context.call === typedArraySet)
    record3(
      typedArraySetOp,
      this,
      this.slice(offset, value.length + offset),
      offset
    );
  return typedArraySaved.set.call(this, value, offset);
}

function typedArrayFill(
  this: any,
  value: any,
  offset: number = 0,
  end: number = this.length
) {
  if (journal.enabled && context.call === typedArrayFill)
    record3(typedArraySetOp, this, this.slice(offset, end), offset);
  return typedArraySaved.fill.call(this, value, offset);
}

const WMp = WeakMap.prototype;

export const weakMapSaved = {
  set: WMp.set,
  delete: WMp.delete
};

function weakMapSetOp(this: any) {
  const { a: map, b: k, c: v } = this;
  this.call = weakMapDeleteOp;
  record(this);
  weakMapSaved.set.call(map, k, v);
}

regOpaqueObject(weakMapSetOp, "#set$wmap");

function weakMapSet<K extends object, V>(this: WeakMap<K, V>, k: K, v: V) {
  if (journal.enabled && context.call === weakMapSet) {
    if (this.has(k)) {
      const old = this.get(k);
      if (old !== v) record3(weakMapSetOp, this, k, this.get(k));
    } else record3(weakMapDeleteOp, this, k, v);
  }
  return weakMapSaved.set.call(this, k, v);
}

function weakMapDeleteOp(this: any) {
  const { a: map, b: k } = this;
  this.call = weakMapSetOp;
  record(this);
  weakMapSaved.delete.call(map, k);
}

regOpaqueObject(weakMapDeleteOp, "#del$wmap");

function weakMapDelete<K extends object, V>(this: WeakMap<K, V>, k: K) {
  if (journal.enabled && context.call === weakMapDelete && this.has(k))
    record3(weakMapSetOp, this, k, this.get(k));
  return weakMapSaved.delete.call(this, k);
}

interface MapEntry<K, V> {
  next: MapEntry<K, V>;
  prev: MapEntry<K, V>;
  k: K;
  v: V;
}

function resetEntryValueOp(this: any) {
  const { a: entry, b: old } = this;
  this.b = entry.v;
  record(this);
  entry.v = old;
}

regOpaqueObject(resetEntryValueOp, "#map$v");

function restoreEntryOp(this: any) {
  const { a: inner, b: entry } = this;
  this.call = mapDelOp;
  record(this);
  const { next, prev } = entry;
  prev.next = entry;
  next.prev = entry;
  inner.set(entry.k, entry);
}

regOpaqueObject(restoreEntryOp, "#map$p");

function mapDelOp(this: any) {
  const { a: inner, b: entry } = this;
  this.call = restoreEntryOp;
  record(this);
  inner.delete(entry.k);
  const { next, prev } = entry;
  next.prev = prev;
  prev.next = next;
}

regOpaqueObject(mapDelOp, "#map$d");

function mapDel<K, V>(inner: Map<K, MapEntry<K, V>>, entry: MapEntry<K, V>) {
  inner.delete(entry.k);
  const { next, prev } = entry;
  next.prev = prev;
  prev.next = next;
  record2(restoreEntryOp, inner, entry);
}

type SavedMap<K, V> = Map<K, V>;

export const ManagedMap = class Map<K, V> {
  inner: SavedMap<K, MapEntry<K, V>>;
  list: MapEntry<K, V>;
  constructor(iter?: Iterable<[K, V]>) {
    const s: MapEntry<K, V> = <any>{};
    s.next = s;
    s.prev = s;
    this.list = s;
    this.inner = new SavedMap();
    if (iter) {
      const enabled = journal.enabled;
      journal.enabled = false;
      try {
        for (const [k, v] of iter) this.set(k, v);
      } finally {
        journal.enabled = enabled;
      }
    }
  }
  get size() {
    return this.inner.size;
  }
  get(k: K): V | undefined {
    const res = this.inner.get(k);
    return res && res.v;
  }
  delete(k: K): boolean {
    const entry = this.inner.get(k);
    if (!entry) return false;
    mapDel(this.inner, entry);
    return true;
  }
  clear() {
    record3(mapRestoreOp, this, this.inner, this.list);
    const s: MapEntry<K, V> = <any>{};
    s.next = s;
    s.prev = s;
    this.list = s;
    this.inner = new SavedMap();
  }
  set(k: K, v: V): Map<K, V> {
    const { inner } = this;
    let entry = inner.get(k);
    if (entry) {
      record2(resetEntryValueOp, entry, entry.v);
      entry.v = v;
    } else {
      const { list } = this;
      entry = { k, v, prev: list, next: list.next };
      list.next = list.next.prev = entry;
      inner.set(k, entry);
      record2(mapDelOp, inner, entry);
    }
    return <any>this;
  }
  *keys(): Iterable<K> {
    const list = this.list;
    for (let i = list.prev; i !== list; i = i.prev) yield i.k;
  }
  *values(): Iterable<V> {
    const { list } = this;
    for (let i = list.prev; i !== list; i = i.prev) yield i.v;
  }
  has(k: K): boolean {
    return this.inner.has(k);
  }
  *entries(): Iterable<[K, V]> {
    const { list } = this;
    for (let i = list.prev; i !== list; i = i.prev) yield [i.k, i.v];
  }
  [Symbol.iterator](): Iterator<[K, V]> {
    return this.entries()[Symbol.iterator]();
  }
  forEach<This>(
    callback: (this: This | undefined, v: V, k: K, cont: Map<K, V>) => void,
    self?: This
  ): void {
    for (const [k, v] of this) callback.call(self, v, k, this);
  }
};

regConstructor(ManagedMap, { name: "#Map" });

function mapRestoreOp(this: any) {
  const { a: map, b: inner, c: list } = this;
  this.b = map.inner;
  this.c = map.list;
  record(this);
  map.inner = inner;
  map.list = list;
}

regOpaqueObject(mapRestoreOp, "#map$restore");

const WSp = WeakSet.prototype;

export const weakSetSaved = {
  add: WSp.add,
  delete: WSp.delete
};

function weakSetAddOp(this: any) {
  const { a: set, b: v } = this;
  this.call = weakSetDeleteOp;
  record(this);
  return weakSetSaved.add.call(set, v);
}

regOpaqueObject(weakSetAddOp, "#add$wset");

function weakSetAdd<T extends Object>(this: WeakSet<T>, v: T) {
  if (journal.enabled && context.call === weakSetAdd && !this.has(v))
    record2(weakSetDeleteOp, this, v);
  return weakSetSaved.add.call(this, v);
}

function weakSetDeleteOp(this: any) {
  const { a: set, b: v } = this;
  this.call = weakSetAddOp;
  record(this);
  weakSetSaved.delete.call(set, v);
}

regOpaqueObject(weakSetDeleteOp, "#del$wset");

function weakSetDelete<T extends object>(this: WeakSet<T>, v: T) {
  if (journal.enabled && context.call === weakSetDelete && this.has(v))
    record2(weakSetAddOp, this, v);
  return weakSetSaved.delete.call(this, v);
}

type SetEntry<T> = MapEntry<T, undefined>;

export const ManagedSet = class Set<T> {
  inner: SavedMap<T, SetEntry<T>>;
  list: SetEntry<T>;
  constructor(iter?: Iterable<T>) {
    const s: SetEntry<T> = <any>{};
    s.next = s;
    s.prev = s;
    this.list = s;
    this.inner = new SavedMap();
    if (iter) {
      const enabled = journal.enabled;
      journal.enabled = false;
      try {
        for (const i of iter) this.add(i);
      } finally {
        journal.enabled = enabled;
      }
    }
  }
  get size() {
    return this.inner.size;
  }
  delete(k: T): boolean {
    const entry = this.inner.get(k);
    if (!entry) return false;
    mapDel(this.inner, entry);
    return true;
  }
  clear() {
    record3(mapRestoreOp, this, this.inner, this.list);
    const s: SetEntry<T> = <any>{};
    s.next = s;
    s.prev = s;
    this.list = s;
    this.inner = new SavedMap();
  }
  *keys(): Iterable<T> {
    const { list } = this;
    for (let i = list.prev; i !== list; i = i.prev) yield i.k;
  }
  *entries(): Iterable<[T, T]> {
    const { list } = this;
    for (let i = list.prev; i !== list; i = i.prev) yield [i.k, i.k];
  }
  add(k: T): Set<T> {
    const { inner } = this;
    let entry = inner.get(k);
    if (!entry) {
      const { list } = this;
      entry = { k, v: undefined, prev: list, next: list.next };
      list.next = list.next.prev = entry;
      inner.set(k, entry);
      record2(mapDelOp, inner, entry);
    }
    return <any>this;
  }
  has(v: T): boolean {
    return this.inner.has(v);
  }
  [Symbol.iterator](): Iterator<T> {
    return this.keys()[Symbol.iterator]();
  }
  forEach<This>(
    callback: (this: This | undefined, k: T, v: T, cont: Set<T>) => void,
    self?: This
  ): void {
    for (const i of this) callback.call(self, i, i, this);
  }
};

(<any>ManagedSet.prototype).values = ManagedSet.prototype.keys;

regConstructor(ManagedSet, { name: "#Set" });

/** records current property value but don't try to keep insertion order */
export function recordProp(target: any, name: any) {
  const cur = defaultGetOwnPropertyDescriptor(target, name);
  if (cur) record3(objectDefinePropertyOp, target, name, cur);
  else record2(delOp, target, name);
}

function simpleSetOp(this: any) {
  const { a: target, b: name, c: value } = this;
  this.c = target[name];
  record(this);
  target[name] = value;
}

regOpaqueObject(simpleSetOp, "#set$obj");

/**
 * Same as `set` but simpler:
 *   - don't use property descriptors
 *   - don't delete
 */
export function simpleSet(target: any, name: any, value: any) {
  if (journal.enabled) record3(simpleSetOp, target, name, target[name]);
  return (target[name] = value);
}

export function simpleDel(target: any, name: any) {
  if (journal.enabled) record3(simpleSetOp, target, name, target[name]);
  target[name] = void 0;
  return true;
}

export const gset = simpleSet;
export const gdel = simpleDel;
export const lset = simpleSet;
export const ldel = simpleDel;

/** records the property value in a trace */
export function recp(target: any, name: any, value: any) {
  if (journal.enabled) record3(simpleSetOp, target, name, value);
}

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
  (<any>Object).getOwnPropertyDescriptors = objectGetOwnPropertyDescriptors;
  (<any>Object).getOwnPropertyNames = objectGetOwnPropertyNames;
  (<any>Object).getOwnPropertySymbols = objectGetOwnPropertySymbols;
  (<any>Object).keys = objectKeys;
  (<any>Object).entries = objectEntries;
  (<any>Object).create = objectCreate;
  (<any>global).Map = ManagedMap;
  (<any>global).Set = ManagedSet;
  /**/
  Ap.push = arrayPush;
  Ap.pop = arrayPop;
  Ap.shift = arrayShift;
  Ap.unshift = arrayUnshift;
  Ap.sort = arraySort;
  Ap.reverse = arrayReverse;
  Ap.splice = arraySplice;
  TAp.set = typedArraySet;
  TAp.sort = typedArraySort;
  TAp.reverse = typedArrayReverse;
  TAp.fill = typedArrayFill;
  WeakSet.prototype.add = weakSetAdd;
  WeakSet.prototype.delete = weakSetDelete;
  WeakMap.prototype.set = weakMapSet;
  WeakMap.prototype.delete = weakMapDelete;
}

// TODO: Reflect
