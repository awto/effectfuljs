import config from "../config";
import {
  journal,
  Record,
  saved,
  context,
  ForInIterator,
  patchNative as patch,
  KeysDescr,
  KeysOrder,
  objectKeys
} from "../state";
import { record1, record2, record3, record4 } from "./binds";
import { regOpaqueObject } from "../persist";
const weakMapSet = saved.WeakMap.set;

const SavedSet = Set;

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

function isInt(str: string): boolean {
  return String(Math.ceil(Math.abs(<any>str))) === str;
}

export const DisableKeysHistorySymbol = Symbol.for("@effectful/no-keys");

function getObjKeys(obj: any): KeysDescr | false | undefined {
  if (!obj) return void 0;
  if (obj[DisableKeysHistorySymbol]) return false;
  return objectKeys.get(obj);
}

function getOrCreateObjKeys(
  obj: any,
  optional: boolean
): KeysDescr | undefined | false {
  let descr = getObjKeys(obj);
  if (descr != null || optional) return descr;
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
  weakMapSet.call(
    objectKeys,
    obj,
    (descr = {
      strKeys,
      strMap,
      symKeys,
      symMap
    })
  );
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

function getObjectKeys(obj: any): string[] {
  const descr = getObjKeys(obj);
  if (!descr) return objectSaved.keys(obj);
  const keys = objectSaved.keys(obj);
  const len = keys.length;
  let pos = 0;
  for (let i = 0; i < len; ++i, ++pos) if (!isInt(keys[i])) break;
  const { strKeys } = descr;
  for (let i = strKeys.prev; i !== strKeys; i = i.prev)
    if (i.enumerable) keys[pos++] = i.name;
  return keys;
}

export function forInIterator(obj: any): Iterable<string> {
  const seen = new SavedSet();
  const keys: string[] = [];
  _forInIterator(obj);
  return new ForInIterator(obj, keys);

  function _forInIterator(obj: any) {
    const descr = getObjKeys(obj);
    // tslint:disable-next-line:forin
    for (const i in obj) {
      if (descr && (!isInt(i) || !Object.prototype.hasOwnProperty.call(obj, i)))
        break;
      if (!seen.has(i)) {
        seen.add(i);
        keys.push(i);
      }
    }
    if (!descr) return;
    const { strKeys } = <any>descr;
    for (let i = strKeys.prev; i !== strKeys; i = i.prev)
      if (i.enumerable) {
        if (!seen.has(i.name)) {
          seen.add(i.name);
          keys.push(i.name);
        }
      }
    const proto = objectSaved.getPrototypeOf(obj);
    if (proto) _forInIterator(proto);
  }
}

function objectEntries(obj: any): string[] {
  const ks = getObjectKeys(obj);
  const len = ks.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) {
    const key = ks[i];
    res[i] = [key, obj[key]];
  }
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
          let descr: PropertyDescriptor | undefined = void 0;
          let descrObj: any;
          if (name in obj) {
            descrObj = obj;
            while (descrObj && descrObj !== Object.prototype) {
              descr = Object.getOwnPropertyDescriptor(descrObj, name);
              if (descr) break;
              descrObj = Object.getPrototypeOf(descrObj);
            }
            if (descr && (descr.set || !descr.writable))
              return (obj[name] = value);
          }
          const isIntIndex =
            typeof name !== "symbol" && isInt(String(<any>name));
          if (descrObj === obj) {
            record3(propSetOp, obj, name, obj[name]);
          } else {
            record2(propDelOp, obj, name);
            if (!isIntIndex) addNotIntKey(obj, name, true, false);
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
  // TODO: this is still visible to the program,
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
    context.call = null;
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
      // tslint:disable-next-line:no-console
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
    else {
      record2(delOp, obj, name);
    }
  }
  return objectDefinePropertyNoRec(obj, name, descr, cur);
}

/** `Object.defineProperty` wrapper  */
function objectDefineProperty(
  obj: any,
  name: string,
  descr: PropertyDescriptor
) {
  // TODO: track this in runtime
  const enabled = journal.enabled && context.call === objectDefineProperty;
  context.call = null;
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
      (context.call = Object.defineProperty)(
        dest,
        name,
        <any>Object.getOwnPropertyDescriptor(value, name)
      );
    for (const name of Object.getOwnPropertySymbols(value))
      (context.call = Object.defineProperty)(
        dest,
        name,
        <any>Object.getOwnPropertyDescriptor(value, name)
      );
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
  else {
    record2(delOp, arr, name);
  }
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
    if (journal.enabled && context.call === arrayPop) {
      context.call = null;
      record2(arrayPush1Op, this, res);
    }
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
    context.call = null;
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
    if (journal.enabled && context.call === arrayShift) {
      context.call = null;
      record2(arrayUnshift1Op, this, res);
    }
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
    context.call = null;
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
  if (journal.enabled && context.call === arrayReverse) {
    context.call = null;
    record1(arrayReverseOp, this);
  }
  return arraySaved.reverse.call(this);
}

regOpaqueObject(arrayReverseOp, "#arr$reverse");

function arraySort(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === arraySort) {
    context.call = null;
    record4(spliceOp, this, 0, this.length, Array.from(this));
  }
  return arraySaved.sort.call(this, pred);
}

function arraySplice(this: any[], from: number, del: number, ...ins: any[]) {
  if (journal.enabled && context.call === arraySplice) {
    context.call = null;
    return spliceImpl(this, from, del, ins);
  }
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
  if (journal.enabled && context.call === typedArraySort) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(0), 0);
  }
  return typedArraySaved.sort.call(this, pred);
}

function typedArrayReverse(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === typedArrayReverse) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(0), 0);
  }
  return typedArraySaved.reverse.call(this, pred);
}

function typedArraySet(this: any, value: any, offset: number = 0) {
  if (journal.enabled && context.call === typedArraySet) {
    context.call = null;
    record3(
      typedArraySetOp,
      this,
      this.slice(offset, value.length + offset),
      offset
    );
  }
  return typedArraySaved.set.call(this, value, offset);
}

function typedArrayFill(
  this: any,
  value: any,
  offset: number = 0,
  end: number = this.length
) {
  if (journal.enabled && context.call === typedArrayFill) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(offset, end), offset);
  }
  return typedArraySaved.fill.call(this, value, offset);
}

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

if ((config.timeTravel || config.persistState) && config.patchRT) {
  patch(Object, "seal", objectSeal);
  patch(Object, "isSealed", objectIsSealed);
  patch(Object, "preventExtensions", objectPreventExtensions);
  patch(Object, "isExtensible", objectIsExtensible);
  patch(Object, "freeze", objectFreeze);
  patch(Object, "isFrozen", objectIsFrozen);
}

if (config.timeTravel && config.patchRT) {
  patch(Object, "setPrototypeOf", objectSetPrototypeOf);
  patch(Object, "defineProperty", objectDefineProperty);
  patch(Object, "defineProperties", objectDefineProperties);
  patch(Object, "assign", objectAssign);
  patch(Object, "getOwnPropertyDescriptors", objectGetOwnPropertyDescriptors);
  patch(Object, "getOwnPropertyNames", objectGetOwnPropertyNames);
  patch(Object, "getOwnPropertySymbols", objectGetOwnPropertySymbols);
  patch(Object, "keys", getObjectKeys);
  patch(Object, "entries", objectEntries);
  patch(Object, "create", objectCreate);
  patch(Ap, "push", arrayPush);
  patch(Ap, "pop", arrayPop);
  patch(Ap, "shift", arrayShift);
  patch(Ap, "unshift", arrayUnshift);
  patch(Ap, "sort", arraySort);
  patch(Ap, "reverse", arrayReverse);
  patch(Ap, "splice", arraySplice);
  patch(TAp, "set", typedArraySet);
  patch(TAp, "sort", typedArraySort);
  patch(TAp, "reverse", typedArrayReverse);
  patch(TAp, "fill", typedArrayFill);
}

// TODO: Reflect
