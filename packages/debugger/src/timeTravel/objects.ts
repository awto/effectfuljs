import * as State from "../state";
import * as Core from "./core";
import config from "../config";
import { regDescriptor } from "@effectful/serialization";
import {
  regOpaqueObject,
  opaqueWeakMap,
  opaqueWeakSet,
  setObjectDescriptor
} from "../persist";
import * as Binds from "./binds";
import { ForInIterator, patchNative as patch } from "../state";
import * as Instr from "../instr/rt";
import * as Engine from "../engine";

const { record } = Core;
const { journal, context, native, token } = State;
const { record1, record2, record3, record4 } = Binds;
const nativeCall = native.FunctionMethods.call;
const nativeApply = native.Reflect.apply;

function isInt(str: string): boolean {
  return String(Math.ceil(Math.abs(<any>str))) === str;
}

/** object's keys insertion order list */
export interface KeysOrder {
  name: string;
  next: KeysOrder;
  prev: KeysOrder;
  enumerable: boolean;
}

export const objectKeysDict = new WeakMap<any, KeysDescr>();

opaqueWeakMap(objectKeysDict, "@effectful/debugger/keys");

/** object's keys orders description */
export interface KeysDescr {
  strKeys: KeysOrder;
  strMap: { [name: string]: KeysOrder };
  symKeys: KeysOrder;
  symMap: { [name: string]: KeysOrder };
}

export enum ProxyTrapFlags {
  Set = 1 << 0,
  SetPrototypeOf = 1 << 1,
  DefineProperty = 1 << 2,
  OwnKeys = 1 << 3,
  Delete = 1 << 4,
  IsExtensible = 1 << 5,
  PreventExtension = 1 << 6
}

function proxyTrapFlags(v: ProxyHandler<any>): number {
  return (
    (v.set ? ProxyTrapFlags.Set : 0) |
    (v.setPrototypeOf ? ProxyTrapFlags.SetPrototypeOf : 0) |
    (v.defineProperty ? ProxyTrapFlags.DefineProperty : 0) |
    (v.ownKeys ? ProxyTrapFlags.OwnKeys : 0) |
    (v.deleteProperty ? ProxyTrapFlags.Delete : 0) |
    (v.isExtensible ? ProxyTrapFlags.IsExtensible : 0) |
    (v.preventExtensions ? ProxyTrapFlags.PreventExtension : 0)
  );
}

interface ProxyData {
  obj: any;
  flags: number;
  target: any;
  traps: ProxyHandler<any>;
  proxy: any;
  revoked?: boolean;
}

interface DataBreakpointInfo {
  hits: number;
  hitCondition?: (top: State.Frame) => number;
  condition?: (top: State.Frame) => boolean;
}

const proxies: WeakMap<any, ProxyData> | null = config.implicitCalls
  ? new WeakMap()
  : null;

interface DataBreakpointsDict {
  [name: string]: DataBreakpointInfo;
}

let dataBreakpoints: WeakMap<any, DataBreakpointsDict> | null = null;

export { proxies, dataBreakpoints };

export function resetDataBreakpoints() {
  dataBreakpoints = null;
}

function checkDataBreakpointActive(bp?: DataBreakpointInfo) {
  const top = <State.Frame>context.top;
  if (
    !bp ||
    (bp.condition && !bp.condition(top)) ||
    (bp.hitCondition && bp.hitCondition(top) !== bp.hits++)
  )
    return false;
  context.stopNext = "data breakpoint";
  return true;
}

function checkDataBreakpointFromTo(
  arr: any[],
  from: number,
  lengthChanged: boolean,
  to: number = arr.length
) {
  const dict = dataBreakpoints?.get(arr);
  if (!dict) return;
  if (lengthChanged && checkDataBreakpointActive(dict["length"])) return;
  for (let i = from; i < to; ++i)
    if (checkDataBreakpointActive(dict[i])) return;
}

function checkDataBreakpoint(target: any, prop: any) {
  if (!dataBreakpoints) return;
  const dict = dataBreakpoints.get(target);
  if (!dict) return;
  checkDataBreakpointActive(dict[prop]);
}

export function setDataBreakpoint(
  target: any,
  prop: any,
  condition?: (f: State.Frame) => boolean,
  hitCondition?: (f: State.Frame) => number
): boolean {
  if (!proxies) return false;
  if (!dataBreakpoints) dataBreakpoints = new WeakMap();
  let bps = dataBreakpoints.get(target);
  if (!bps) {
    bps = {};
    weakMapSet.call(dataBreakpoints, target, bps);
  }
  const bp: DataBreakpointInfo = {
    hits: 0,
    condition,
    hitCondition
  };
  bps[prop] = bp;
  return true;
}

if (proxies) opaqueWeakMap(proxies, "@effectful/debugger/proxies");

const weakMapSet = native.WeakMap.set;

const NativeSet = Set;

export const nativeObject = native.Object;

export const DisableKeysHistorySymbol = Symbol.for("@effectful/no-keys");

function getObjKeys(obj: any): KeysDescr | false | undefined {
  if (!obj) return void 0;
  const disabled = obj[DisableKeysHistorySymbol];
  if (disabled) return false;
  return objectKeysDict.get(obj);
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
  for (const i of nativeObject.getOwnPropertyNames(obj)) {
    if (isInt(i)) continue;
    const { next } = strKeys;
    strMap[i] = strKeys.next = next.prev = {
      name: i,
      enumerable:
        (<any>nativeObject.getOwnPropertyDescriptor(obj, i)).enumerable ===
        true,
      next,
      prev: strKeys
    };
  }
  for (const i of nativeObject.getOwnPropertySymbols(obj)) {
    const { next } = symKeys;
    symMap[<any>i] = symKeys.next = next.prev = {
      name: <any>i,
      enumerable:
        (<any>nativeObject.getOwnPropertyDescriptor(obj, i)).enumerable ===
        true,
      next,
      prev: symKeys
    };
  }
  weakMapSet.nativeCall(
    objectKeysDict,
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

const nativeReflect = native.Reflect;
const nativeReflectSet = nativeReflect.set;

function setImpl(target: any, name: string, value: any, receiver: any) {
  if (journal.enabled) {
    if (Array.isArray(target)) return arraySet(target, name, value);
    let descr: PropertyDescriptor | undefined = void 0;
    let descrObj: any;
    descrObj = target;
    while (descrObj && descrObj !== Object.prototype) {
      if (proxies) {
        const unwrapped = proxies.get(descrObj);
        if (unwrapped) {
          if (unwrapped.flags & ProxyTrapFlags.Set) {
            context.call = set;
            return nativeReflectSet(target, name, value);
          }
          descrObj = unwrapped.obj;
        }
      }
      descr = Object.getOwnPropertyDescriptor(descrObj, name);
      if (descr) break;
      descrObj = Object.getPrototypeOf(descrObj);
    }
    if (dataBreakpoints) checkDataBreakpoint(descrObj, name);
    if (descr && (descr.set || !descr.writable)) {
      context.call = set;
      return nativeReflectSet(target, name, value, receiver);
    }
    const isIntIndex = typeof name !== "symbol" && isInt(String(<any>name));
    if (descrObj === target) {
      record3(propSetOp, target, name, target[name]);
    } else {
      record2(propDelOp, target, name);
      if (!isIntIndex) addNotIntKey(target, name, true, !context.enabled);
    }
  }
  context.call = set;
  return nativeReflectSet(target, name, value, receiver);
}

export const set: (
  obj: any,
  name: string /* | symbol | number */,
  value: any
) => any = config.timeTravel
  ? function set(obj: any, name: string, value: any) {
      setImpl(obj, name, value, obj);
      return value;
    }
  : function set(obj: any, name: string, value: any) {
      context.call = set;
      return (obj[name] = value);
    };

function continueMCall(args: [any, ...any[]], prop: string, func: any) {
  if (!func) throw new TypeError(`${prop} isn't a function`);
  return nativeApply(nativeCall, (context.call = func), args);
}

const mcallContClosure = <State.ProtoFrame>State.closures.get(Instr.mcallCont);

export const mcall: (
  prop: string,
  ...args: [any, ...any[]]
) => void = config.implicitCalls
  ? function mcall(prop: string, ...args: [any, ...any[]]) {
      let func: any = null;
      const top = <State.Frame>context.top;
      try {
        context.call = get;
        func = args[0][prop];
      } catch (e) {
        if (e === token) {
          const frame = Engine.makeFrame(
            Instr.mcallCont,
            mcallContClosure.meta,
            mcallContClosure.parent,
            (<any>mcallContClosure.parent).$,
            void 0
          );
          let after = <State.Frame>context.top;
          while (after.next !== top) after = <State.Frame>after.next;
          frame.goto = 1;
          after.next = frame;
          frame.caller = frame.next = top;
          frame.$ = [null, continueMCall, prop, args, void 0, void 0];
        }
        throw e;
      }
      if (!func) throw new TypeError(`${prop} isn't a function`);
      return nativeApply(nativeCall, (context.call = func), args);
    }
  : function mcall(prop: string, ...args: [any, ...any[]]) {
      const func = args[0][prop];
      if (!func) throw new TypeError(`${prop} isn't a function`);
      return nativeApply(nativeCall, (context.call = func), args);
    };

export function get(value: any, property: string): any {
  context.call = get;
  return value[property];
}

export function has(property: string, value: any): any {
  context.call = has;
  return property in value;
}

function objectGetOwnPropertyNames(obj: any): string[] {
  const unwrapped = proxies?.get(obj);
  if (unwrapped) {
    if (unwrapped.flags & ProxyTrapFlags.OwnKeys) {
      context.call = Instr.getOwnPropertyNames;
      return Instr.getOwnPropertyNames(obj);
    }
    obj = unwrapped.obj;
  }
  let descr = getObjKeys(obj);
  if (!descr) return nativeObject.getOwnPropertyNames(obj);
  const res = nativeObject.getOwnPropertyNames(obj).filter(isInt);
  const keys = descr.strKeys;
  for (let i = keys.prev; i !== keys; i = i.prev) res.push(i.name);
  return res;
}

function objectGetOwnPropertySymbols(obj: any): symbol[] {
  if (context.call === objectGetOwnPropertySymbols) context.call = objectKeys;
  const unwrapped = proxies?.get(obj);
  if (unwrapped) {
    if (unwrapped.flags & ProxyTrapFlags.OwnKeys) {
      context.call = Instr.getOwnPropertySymbols;
      return Instr.getOwnPropertySymbols(obj);
    }
    obj = unwrapped.obj;
  }
  let descr = getObjKeys(obj);
  if (!descr) return nativeObject.getOwnPropertySymbols(obj);
  const res: symbol[] = [];
  const keys = descr.symKeys;
  for (let i = keys.prev; i !== keys; i = i.prev) res.push(<any>i.name);
  return res;
}

function objectGetOwnPropertyDescriptor(
  obj: object,
  name: string | symbol | number
): PropertyDescriptor | undefined {
  const unwrapped = proxies?.get(obj);
  if (unwrapped && wrappers) {
    if (context.call === objectGetOwnPropertyDescriptor)
      context.call = Instr.objectGetOwnPropertyDescriptor;
    return Instr.objectGetOwnPropertyDescriptor(wrappers, obj, name);
  }
  const res = nativeObject.getOwnPropertyDescriptor(obj, name);
  if (wrappers && res) {
    let { set, get } = res;
    if (set && (set = wrappers.get(set))) res.set = set;
    if (get && (get = wrappers.get(get))) res.get = get;
  }
  return res;
}

const objectGetOwnPropertyDescriptors = config.implicitCalls
  ? Instr.objectGetOwnPropertyDescriptors
  : function objectGetOwnPropertyDescriptors(
      obj: any
    ): { [name: string]: PropertyDescriptor } {
      let descr = getObjKeys(obj);
      if (!descr) return nativeObject.getOwnPropertyDescriptors(obj);
      const res: { [name: string]: PropertyDescriptor } = {};
      const descrs = nativeObject.getOwnPropertyDescriptors(obj);
      for (const i of native.Reflect.ownKeys(descrs)) {
        if (!isInt(<any>i)) break;
        res[<any>i] = descrs[<any>i];
      }
      const { strKeys, symKeys } = descr;
      for (let i = strKeys.prev; i !== strKeys; i = i.prev)
        res[i.name] = descrs[i.name];
      for (let i = symKeys.prev; i !== symKeys; i = i.prev)
        res[i.name] = descrs[i.name];
      return res;
    };

function objectGetKeysImpl(obj: any): string[] {
  const descr = getObjKeys(obj);
  if (!descr) return nativeObject.keys(obj);
  const keys = nativeObject.keys(obj);
  const len = keys.length;
  let pos = 0;
  for (let i = 0; i < len; ++i, ++pos) if (!isInt(keys[i])) break;
  const { strKeys } = descr;
  for (let i = strKeys.prev; i !== strKeys; i = i.prev)
    if (i.enumerable && i.name in obj) keys[pos++] = i.name;
  return keys;
}

function objectKeys(obj: any): string[] {
  const unwrap = proxies?.get(obj);
  if (unwrap) {
    if (unwrap.flags & ProxyTrapFlags.OwnKeys) {
      if (context.call === objectKeys) context.call = Instr.objectKeys;
      return Instr.objectKeys(obj);
    }
    obj = unwrap.obj;
  }
  return objectGetKeysImpl(obj);
}

export function forInIterator(obj: any): Iterable<string> {
  const seen = new NativeSet();
  const keys: string[] = [];
  _forInIterator(obj);
  return new ForInIterator(obj, keys);

  function _forInIterator(obj: any) {
    const descr = getObjKeys(obj);
    // tslint:disable-next-line:forin
    for (const i in obj) {
      if (
        descr &&
        (!isInt(i) || !Object.prototype.hasOwnProperty.nativeCall(obj, i))
      )
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
    const proto = nativeObject.getPrototypeOf(obj);
    if (proto) _forInIterator(proto);
  }
}

export function objectEntries(obj: any): [string, any][] {
  const ks = objectGetKeysImpl(obj);
  const len = ks.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) {
    const key = ks[i];
    res[i] = [key, obj[key]];
  }
  return res;
}

export function objectValues(obj: any): any[] {
  const ks = objectGetKeysImpl(obj);
  const len = ks.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) {
    const key = ks[i];
    res[i] = obj[key];
  }
  return res;
}

function forceConfigurable(props: {
  [name: string]: PropertyDescriptor;
}): { [name: string]: PropertyDescriptor } {
  const res: { [name: string]: PropertyDescriptor } = {};
  for (const i of nativeReflect.ownKeys(props)) {
    let p = props[<any>i];
    if (!p.configurable) p = nativeObject.assign({}, p, { configurable: true });
    res[<any>i] = p;
  }
  return res;
}

function objectCreate(
  obj: any,
  props?: { [name: string]: PropertyDescriptor }
) {
  if (props) props = forceConfigurable(props);
  return nativeObject.create(obj, <any>props);
}

/** API call replacing `delete` */
export const del: (
  obj: any,
  name: string /* | symbol | number */
) => any = config.timeTravel
  ? function del(obj: any, name: string) {
      if (dataBreakpoints) checkDataBreakpoint(obj, name);
      if (journal.enabled) {
        const unwrapped = proxies?.get(obj);
        if (unwrapped) {
          if (unwrapped.flags & ProxyTrapFlags.Delete) {
            context.call = del;
            return delete obj[name];
          }
          obj = unwrapped.obj;
        }
        const cur = defaultGetOwnPropertyDescriptor(obj, name);
        if (cur) {
          delKey(obj, name, false);
          record3(objectDefinePropertyOp, obj, name, cur);
        }
      }
      context.call = del;
      return delete obj[name];
    }
  : function del(obj: any, name: string) {
      context.call = del;
      return delete obj[name];
    };

function propSetOp(this: any) {
  const { a: target, b: name, c: value } = this;
  if (dataBreakpoints) checkDataBreakpoint(target, name);
  if (Object.prototype.hasOwnProperty.nativeCall(target, name)) {
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
  if (dataBreakpoints) checkDataBreakpoint(obj, name);
  if (Object.prototype.hasOwnProperty.nativeCall(obj, name)) {
    this.call = propSetOp;
    this.c = obj[name];
    record(this);
  }
  delete obj[name];
}

regOpaqueObject(propDelOp, "#pdel");

function delOp(this: any) {
  const { a: obj, b: name } = this;
  if (dataBreakpoints) checkDataBreakpoint(obj, name);
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
export const frozen = new WeakSet();
export const sealed = new WeakSet();
export const notExtensible = new WeakSet();

opaqueWeakSet(frozen, "@effectful/debugger/frozen");
opaqueWeakSet(sealed, "@effectful/debugger/sealed");
opaqueWeakSet(notExtensible, "@effectful/debugger/notExtensible");

const weakAdd = WeakSet.prototype.add;

function objectFreeze(obj: any) {
  weakAdd.nativeCall(frozen, obj);
  return obj;
}

function objectIsFrozen(obj: any) {
  // TODO: this is still visible to the program,
  // another checks must be added into setters
  return frozen.has(obj);
}

function objectSeal(obj: any) {
  weakAdd.nativeCall(sealed, obj);
  return obj;
}

function objectIsSealed(obj: any) {
  return sealed.has(obj);
}

let extWarned = false;

function objectPreventExtensions(obj: any) {
  const unwrap = proxies?.get(obj);
  if (unwrap) {
    if (unwrap.flags & ProxyTrapFlags.PreventExtension)
      return nativeObject.preventExtensions(obj);
    return;
  }
  // weakAdd.call(notExtensible, obj);
  if (!extWarned) {
    extWarned = true;
    // tslint:disable-next-line:no-console
    console.warn(
      "DEBUGGER: Object.preventExtensions is ignored (not implemented yet)"
    );
  }
  weakAdd.nativeCall(notExtensible, obj);
  return obj;
}

function objectIsExtensible(obj: any) {
  const unwrap = proxies?.get(obj);
  if (unwrap) {
    if (unwrap.flags & ProxyTrapFlags.IsExtensible)
      return nativeObject.isExtensible(obj);
    obj = unwrap.obj;
  }
  return !notExtensible.has(obj);
}

function objectSetPrototypeOfOp(this: any) {
  const { a: obj, b: proto } = this;
  if (dataBreakpoints) checkDataBreakpoint(obj, "__proto__");
  this.b = nativeObject.getPrototypeOf(obj);
  record(this);
  nativeObject.setPrototypeOf(obj, proto);
}

regOpaqueObject(objectSetPrototypeOfOp, "#setp");

function objectSetPrototypeOf(obj: any, prototype: any) {
  if (dataBreakpoints) checkDataBreakpoint(obj, "__proto__");
  if (journal.enabled && context.call === objectSetPrototypeOf) {
    const unwrapped = proxies?.get(obj);
    if (unwrapped) {
      if (unwrapped.flags & ProxyTrapFlags.SetPrototypeOf) {
        return nativeObject.setPrototypeOf(obj, prototype);
      }
    }
    const cur = nativeObject.getPrototypeOf(obj);
    if (cur !== prototype) record2(objectSetPrototypeOfOp, obj, cur);
  }
  return nativeObject.setPrototypeOf(obj, prototype);
}

const defaultGetOwnPropertyDescriptor = nativeObject.getOwnPropertyDescriptor;

function objectDefinePropertyNoRec(
  obj: any,
  name: string,
  descr: PropertyDescriptor,
  cur: PropertyDescriptor | undefined
) {
  if (!descr.configurable)
    descr = nativeObject.assign({}, descr, { configurable: true });
  try {
    if (!cur || cur.configurable)
      return nativeReflect.defineProperty(obj, name, descr);
    if (cur.writable && "value" in descr) {
      obj[name] = descr.value;
      return true;
    }
  } catch (e) {
    if (config.verbose)
      // tslint:disable-next-line:no-console
      console.log("error while defining property", name, descr, e);
    throw e;
  }
  return false;
}

function objectDefinePropertyImpl(
  obj: any,
  name: string,
  descr: PropertyDescriptor,
  enabled: boolean
): boolean {
  const cur = defaultGetOwnPropertyDescriptor(obj, name);
  if (enabled) {
    if (cur) record3(objectDefinePropertyOp, obj, name, cur);
    else {
      record2(delOp, obj, name);
    }
  }
  return objectDefinePropertyNoRec(obj, name, descr, cur);
}

const wrappers: WeakMap<any, any> | null = config.implicitCalls
  ? new WeakMap()
  : null;

export { wrappers };

if (wrappers) opaqueWeakMap(wrappers, "@effectful/debugger/wrappers");

/** `Reflect.defineProperty` wrapper  */
function reflectDefineProperty(
  obj: any,
  name: string,
  descr: PropertyDescriptor
): boolean {
  if (dataBreakpoints) checkDataBreakpoint(obj, name);
  const unwrapped = proxies?.get(obj);
  if (unwrapped) {
    if (unwrapped.flags & ProxyTrapFlags.DefineProperty)
      return nativeReflect.defineProperty(obj, name, descr);
    obj = unwrapped.obj;
  }
  const enabled = journal.enabled && context.call === reflectDefineProperty;
  addKey(obj, name, descr.enumerable === true, !enabled);
  if (wrappers) {
    if (descr.set) {
      const set = setterWrap.bind(State.undef, descr.set);
      wrappers.set(set, descr.set);
      descr.set = set;
    }
    if (descr.get) {
      const get = getterWrap.bind(State.undef, descr.get);
      wrappers.set(get, descr.get);
      descr.get = get;
    }
  }
  return objectDefinePropertyImpl(obj, name, descr, enabled);
}

function setterWrap(this: any, method: any, value: any) {
  if (context.enabled && context.call === set) context.call = method;
  return method.call(this, value);
}

regOpaqueObject(setterWrap, "@effectful/debugger/setter");

function getterWrap(this: any, method: any) {
  if (context.enabled && context.call === get) context.call = method;
  return method.call(this);
}

regOpaqueObject(getterWrap, "@effectful/debugger/getter");

/** `Reflect.defineProperty` wrapper  */
function objectDefineProperty(
  obj: any,
  name: string,
  descr: PropertyDescriptor
): PropertyDescriptor {
  if (context.call === objectDefineProperty)
    context.call = reflectDefineProperty;
  reflectDefineProperty(obj, name, descr);
  return descr;
}

function objectDefinePropertyOp(this: any) {
  const { a: obj, b: name, c: descr } = this;
  if (dataBreakpoints) checkDataBreakpoint(obj, name);
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

const objectDefineProperties = config.implicitCalls
  ? Instr.objectDefineProperties
  : function defineProperties(
      obj: any,
      descrs: { [name: string]: PropertyDescriptor }
    ) {
      descrs = forceConfigurable(descrs);
      if (context.call !== objectDefineProperties)
        return nativeObject.defineProperties(obj, descrs);
      context.call = objectDefineProperty;
      for (const i of nativeReflect.ownKeys(obj))
        (context.call = objectDefineProperty)(obj, <any>i, descrs[<any>i]);
      return obj;
    };

export function objectAssign(dest: any, ...args: any[]) {
  if (context.call !== objectAssign) return nativeObject.assign(dest, ...args);
  for (const value of args) {
    if (!value) continue;
    for (const name of nativeReflect.ownKeys(value)) {
      const descr = <any>(
        (context.call = Object.getOwnPropertyDescriptor)(value, name)
      );
      if (descr.enumerable)
        set(dest, <any>name, descr.get ? descr.get.call(value) : descr.value);
    }
  }
  return dest;
}

/** records current property value but don't try to keep insertion order */
export function recordProp(target: any, name: any) {
  const cur = defaultGetOwnPropertyDescriptor(target, name);
  if (cur) record3(objectDefinePropertyOp, target, name, cur);
  else record2(delOp, target, name);
}

function simpleSetOp(this: any) {
  const { a: target, b: name, c: value } = this;
  if (dataBreakpoints) checkDataBreakpoint(target, name);
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
  if (dataBreakpoints) checkDataBreakpoint(target, name);
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

const trapsWrapper: ProxyHandler<any> = {
  apply(this: ProxyData, target: any, self: any, args: any[]) {
    const method = this.traps.apply;
    if (method) {
      if (context.enabled && context.call === this.proxy) context.call = method;
      return method.nativeCall(this.traps, target, self, args);
    }
    if (context.enabled && context.call === this.proxy) context.call = target;
    return nativeReflect.apply(target, self, args);
  },
  construct(this: ProxyData, target: any, args: any[], newTarget?: any) {
    const method = this.traps.construct;
    if (method) {
      if (context.enabled && context.call === this.proxy) context.call = method;
      return method.nativeCall(this.traps, target, args, newTarget);
    }
    if (context.enabled && context.call === this.proxy) context.call = target;
    return nativeReflect.construct(target, args, newTarget);
  }
};

wrapProxyTrapMethod("set", set);
wrapProxyTrapMethod("get", get);
wrapProxyTrapMethod("has", has);
wrapProxyTrapMethod("deleteProperty", del);
wrapProxyTrapMethod("defineProperty", reflectDefineProperty);
wrapProxyTrapMethod(
  "getOwnPropertyDescriptor",
  Object.getOwnPropertyDescriptor
);
wrapProxyTrapMethod("deleteProperty", del);
wrapProxyTrapMethod("isExtensible", objectIsExtensible);
wrapProxyTrapMethod("preventExtensions", objectPreventExtensions);
wrapProxyTrapMethod("ownKeys", objectKeys);
wrapProxyTrapMethod("setPrototypeOf", objectSetPrototypeOf);
wrapProxyTrapMethod("getPrototypeOf", Object.getPrototypeOf);

regOpaqueObject(wrapProxy, "@effectful/debugger/proxyWrap");
regOpaqueObject(trapsWrapper.apply, "@effectful/debugger/trap#apply");
regOpaqueObject(trapsWrapper.construct, "@effectful/debugger/trap#construct");
regOpaqueObject(trapsWrapper, "@effectful/debugger/traps");

function wrapProxyTrapMethod(name: string, defaultImpl: any) {
  regOpaqueObject(
    ((<any>trapsWrapper)[name] = function(this: ProxyData, ...args: any[]) {
      const method = (<any>this.traps)[name];
      if (!method)
        return nativeApply((<any>nativeReflect)[name], nativeReflect, args);
      if (context.enabled && context.call === defaultImpl)
        context.call = method;
      return nativeApply(method, this.traps, args);
    }),
    `@effectful/debugger/trap#${name}`
  );
}

function wrapProxy<T extends object>(
  data: ProxyData,
  proxy: T,
  target: T,
  traps: ProxyHandler<T>
) {
  let obj = target;
  const unwrapped = (<any>proxies).get(obj);
  let flags = proxyTrapFlags(traps);
  if (unwrapped) {
    obj = unwrapped.obj;
    flags |= unwrapped.flags;
  }
  data.obj = obj;
  data.flags = flags;
  data.target = target;
  data.traps = traps;
  data.proxy = proxy;
  setObjectDescriptor(proxy, ProxyDescriptor);
  (<any>proxies).set(proxy, data);
}

function wrapRevoke(
  this: any,
  descr: { revoked: boolean },
  func: (this: any) => any
) {
  descr.revoked = false;
  return func.nativeCall(this);
}

regOpaqueObject(wrapRevoke, "@effectful/debugger/proxy#revoke");

export class PatchedProxy<T extends object> {
  constructor(obj: T, traps: ProxyHandler<T>) {
    const wtraps = Object.create(trapsWrapper);
    const proxy = new native.Proxy(obj, wtraps);
    wrapProxy(wtraps, proxy, obj, traps);
    return proxy;
  }
  static revocable<T extends object>(
    obj: T,
    traps: ProxyHandler<T>
  ): { proxy: T; revoke: () => void } {
    const wtraps = Object.create(trapsWrapper);
    const res = native.Proxy.revocable(obj, wtraps);
    wrapProxy(wtraps, res.proxy, obj, traps);
    wtraps.revoked = false;
    res.revoke = wrapRevoke.bind(res, wtraps, res.revoke);
    return res;
  }
}

export const ProxyDescriptor = regDescriptor<any>({
  name: "#Proxy",
  props: false,
  create(ctx, json) {
    const target = ctx.createStep((<any>json).t);
    const traps = ctx.createStep((<any>json).h);
    const revoked = (<any>json).r;
    if (revoked != null) {
      const proxy = PatchedProxy.revocable(target, traps);
      if (revoked) proxy.revoke();
      return proxy;
    }
    return new PatchedProxy(target, traps);
  },
  write(ctx, value) {
    const json: any = {};
    const unwrapped = proxies?.get(value);
    if (!unwrapped)
      throw new TypeError("trying to write an unregistered proxy");
    json.t = ctx.step(unwrapped.target, json, "t");
    json.h = ctx.step(unwrapped.traps, json, "h");
    if (unwrapped.revoked != null) json.r = unwrapped.revoked;
    return json;
  }
});

export { isInt, addKey };

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
  patch(Object, "getOwnPropertyDescriptors", objectGetOwnPropertyDescriptors);
  patch(Object, "getOwnPropertyDescriptor", objectGetOwnPropertyDescriptor);
  patch(Object, "getOwnPropertyNames", objectGetOwnPropertyNames);
  patch(Object, "getOwnPropertySymbols", objectGetOwnPropertySymbols);
  patch(Object, "keys", objectKeys);
  patch(Object, "create", objectCreate);
}

const TAp = Object.getPrototypeOf(Int8Array.prototype);

export const nativeArray = native.Array;

export const nativeTypedArray = {
  sort: TAp.sort,
  set: TAp.set,
  fill: TAp.fill,
  reverse: TAp.reverse
};

function spliceOp(this: any) {
  let { a: arr, b: start, c: del, d: ins } = this;
  const insNum = (this.c = ins.length);
  nativeArray.unshift.nativeCall(ins, start, del);
  const res = nativeApply(nativeArray.splice, arr, ins);
  this.d = Array.from(res);
  if (dataBreakpoints) {
    const diff = insNum - del;
    const len = arr.length;
    checkDataBreakpointFromTo(
      arr,
      start,
      diff !== 0,
      diff === 0 ? start + del : diff < 0 ? len : len + diff
    );
  }
  record(this);
}

regOpaqueObject(spliceOp, "#splice");

function spliceImpl(arr: any[], start: number, del: number, ins: any[]) {
  const nextDel = ins.length;
  if (start < 0) start = arr.length + start;
  if (del == null) del = arr.length - start;
  nativeArray.unshift.nativeCall(ins, start, del);
  const res = nativeApply(nativeArray.splice, arr, ins);
  record4(spliceOp, arr, start, nextDel, Array.from(res));
  return res;
}

function arraySet(arr: any[], name: string, value: any) {
  if (dataBreakpoints) checkDataBreakpoint(arr, name);
  const unwrapped = proxies?.get(arr);
  if (unwrapped) {
    if (unwrapped.flags & ProxyTrapFlags.Set) {
      context.call = set;
      return nativeReflect.set(arr, name, value);
    }
    arr = unwrapped.obj;
  }
  if (name === "length") {
    const len = arr.length;
    if (len === value) return len;
    const ins: any[] = [];
    let start;
    let del;
    let end;
    if (len < value) {
      del = 0;
      start = len;
      ins.length = value - len;
      end = value;
    } else {
      del = len - value;
      start = value;
      end = len;
    }
    if (dataBreakpoints) checkDataBreakpointFromTo(arr, start, true, end);
    spliceImpl(arr, start, del, ins);
    return value;
  }
  if (typeof name !== "symbol" && isInt(String(<any>name))) {
    const index = +name;
    const len = arr.length;
    const diff = index - len;
    if (diff >= 0) {
      if (dataBreakpoints) checkDataBreakpoint(arr, "length");
      if (diff === 0) {
        record1(arrayPopOp, arr);
        arr[index] = value;
        return value;
      }
      const ins = [];
      ins[diff] = value;
      spliceImpl(arr, len, 0, ins);
      if (dataBreakpoints) checkDataBreakpointFromTo(arr, len, true);
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

function arrayPopOp(this: any) {
  this.b = nativeArray.pop.nativeCall(this.a);
  if (dataBreakpoints) {
    const len = this.a.length;
    checkDataBreakpointFromTo(this.a, len, true, len + 1);
  }
  this.call = arrayPush1Op;
  record(this);
}

regOpaqueObject(arrayPopOp, "#arr$pop");

export function arrayPop(this: any[]): any {
  if (this.length) {
    const res = nativeArray.pop.nativeCall(this);
    if (dataBreakpoints) {
      const len = this.length;
      checkDataBreakpointFromTo(this, len, true, len + 1);
    }
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
  const len = arr.length;
  arr[len] = value;
  if (dataBreakpoints) checkDataBreakpointFromTo(arr, len, true, len + 1);
}

regOpaqueObject(arrayPush1Op, "#arr$push1");

export function arrayPush(this: any[]): number {
  const fromLen = this.length;
  const argLen = arguments.length;
  const res = nativeApply(nativeArray.push, this, arguments);
  if (dataBreakpoints) checkDataBreakpointFromTo(this, fromLen, argLen !== 0);
  if (journal.enabled && context.call === arrayPush) {
    context.call = null;
    if (argLen === 1) record1(arrayPopOp, this);
    else record4(spliceOp, this, fromLen, argLen, []);
  }
  return res;
}

regOpaqueObject(arrayPush, "#arr$push");

function arrayShiftOp(this: any) {
  if (dataBreakpoints) checkDataBreakpointFromTo(this.a, 0, true);
  const res = nativeArray.shift.nativeCall(this.a);
  this.b = res;
  this.call = arrayUnshift1Op;
  record(this);
}

regOpaqueObject(arrayShiftOp, "#arr$shift");

export function arrayShift(this: any[]): any {
  const len = this.length;
  if (len) {
    if (dataBreakpoints) checkDataBreakpointFromTo(this, 0, true, len);
    const res = nativeArray.shift.nativeCall(this);
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
  (<any>nativeArray.unshift).nativeCall(arr, value);
  this.call = arrayShiftOp;
  this.b = null;
  if (dataBreakpoints) checkDataBreakpointFromTo(arr, 0, true);
  record(this);
}

regOpaqueObject(arrayUnshift1Op, "#arr$unshift");

export function arrayUnshift(this: any[]): number {
  if (journal.enabled && context.call === arrayUnshift) {
    context.call = null;
    const alen = arguments.length;
    if (alen === 1) record1(arrayShiftOp, this);
    else record4(spliceOp, this, 0, alen, []);
  }
  const res = nativeApply(nativeArray.unshift, this, arguments);
  if (dataBreakpoints) checkDataBreakpointFromTo(this, 0, true);
  return res;
}

function arrayReverseOp(this: any) {
  record(this);
  if (dataBreakpoints) checkDataBreakpointFromTo(this.a, 0, false);
  nativeArray.reverse.nativeCall(this.a);
}

export function arrayReverse(this: any[]): any[] {
  if (journal.enabled && context.call === arrayReverse) {
    context.call = null;
    record1(arrayReverseOp, this);
  }
  if (dataBreakpoints) checkDataBreakpointFromTo(this, 0, false);
  return nativeArray.reverse.nativeCall(this);
}

regOpaqueObject(arrayReverseOp, "#arr$reverse");

export function arraySort(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === arraySort) {
    context.call = null;
    record4(spliceOp, this, 0, this.length, Array.from(this));
  }
  if (dataBreakpoints) checkDataBreakpointFromTo(this, 0, false);
  return nativeArray.sort.nativeCall(this, pred);
}

export function arraySplice(
  this: any[],
  from: number,
  del: number,
  ...ins: any[]
) {
  if (dataBreakpoints) {
    const diff = ins.length - (del || 0);
    const changed = diff !== 0;
    const start = from < 0 ? this.length + from : from;
    checkDataBreakpointFromTo(
      this,
      start,
      changed,
      changed
        ? diff < 0
          ? this.length
          : this.length + diff
        : start + (del || 0)
    );
  }
  if (journal.enabled && context.call === arraySplice) {
    context.call = null;
    return spliceImpl(this, from, del, ins);
  }
  return nativeApply(nativeArray.splice, this, arguments);
}

function typedArraySetOp(this: any) {
  const { a: arr, b: value, c: offset } = this;
  this.b = arr.slice(offset, offset + value.length);
  record(this);
  nativeTypedArray.set.call(arr, value, offset);
}

regOpaqueObject(typedArraySetOp, "#tarr$set");

export function typedArraySort(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === typedArraySort) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(0), 0);
  }
  return nativeTypedArray.sort.call(this, pred);
}

export function typedArrayReverse(this: any[], pred: any): any[] {
  if (journal.enabled && context.call === typedArrayReverse) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(0), 0);
  }
  return nativeTypedArray.reverse.call(this, pred);
}

export function typedArraySet(this: any, value: any, offset: number = 0) {
  if (journal.enabled && context.call === typedArraySet) {
    context.call = null;
    record3(
      typedArraySetOp,
      this,
      this.slice(offset, value.length + offset),
      offset
    );
  }
  return nativeTypedArray.set.call(this, value, offset);
}

export function typedArrayFill(
  this: any,
  value: any,
  offset: number = 0,
  end: number = this.length
) {
  if (journal.enabled && context.call === typedArrayFill) {
    context.call = null;
    record3(typedArraySetOp, this, this.slice(offset, end), offset);
  }
  return nativeTypedArray.fill.call(this, value, offset);
}

function reflectApply(target: any, self: any, args: any[]) {
  if (context.call === reflectApply) context.call = target;
  return nativeReflect.apply(target, self, args);
}

function reflectConstruct(target: any, args: any[], newTarget: any) {
  if (context.call === reflectConstruct) context.call = target;
  return arguments.length < 3
    ? nativeReflect.construct(target, args)
    : nativeReflect.construct(target, args, newTarget);
}

function reflectGetOwnPropertyDescriptor(obj: any, prop: string) {
  if (context.call === reflectGetOwnPropertyDescriptor)
    context.call = Object.getOwnPropertyDescriptor;
  return nativeReflect.getOwnPropertyDescriptor(obj, prop);
}

function reflectGetPrototypeOf(obj: any) {
  if (context.call === reflectGetPrototypeOf)
    context.call = Object.getPrototypeOf;
  return nativeReflect.getPrototypeOf(obj);
}

function reflectSetPrototypeOf(obj: any, prop: string | number | symbol) {
  if (context.call === reflectSetPrototypeOf)
    context.call = Object.setPrototypeOf;
  return nativeReflect.setPrototypeOf(obj, prop);
}

function reflectHas(obj: any, prop: string | number | symbol) {
  if (context.call === reflectHas) context.call = has;
  return nativeReflect.has(obj, prop);
}

function reflectGet(obj: any, prop: string | number | symbol, receiver?: any) {
  if (context.call === reflectGet) context.call = get;
  return arguments.length < 3
    ? nativeReflect.get(obj, prop)
    : nativeReflect.get(obj, prop, receiver);
}

function reflectPreventExtension(obj: any) {
  if (context.call === reflectPreventExtension)
    context.call = objectPreventExtensions;
  switch (typeof obj) {
    case "function":
    case "object":
      return objectPreventExtensions(obj);
    default:
      throw new TypeError(`${obj} is not an object`);
  }
}

function reflectOwnKeys(value: any) {
  const unwrap = proxies?.get(value);
  if (unwrap) {
    if (unwrap.flags & ProxyTrapFlags.OwnKeys) {
      context.call = objectKeys;
      return <any>nativeReflect.ownKeys(value);
    }
    value = unwrap.obj;
  }
  let descr = getObjKeys(value);
  if (!descr) return nativeReflect.ownKeys(value);
  const res = nativeObject.getOwnPropertyNames(value).filter(isInt);
  const keys = descr.strKeys;
  for (let i = keys.prev; i !== keys; i = i.prev) res.push(i.name);
  const symKeys = descr.symKeys;
  for (let i = symKeys.prev; i !== symKeys; i = i.prev) res.push(i.name);
  return res;
}

function reflectSet(target: any, name: string, value: any, receiver?: any) {
  if (arguments.length < 4) receiver = target;
  return setImpl(target, name, value, receiver);
}

regOpaqueObject(reflectSet, "@effectful/debugger/reflectSet");

if (config.timeTravel && config.patchRT) {
  patch(Reflect, "apply", reflectApply);
  patch(Reflect, "construct", reflectConstruct);
  patch(Reflect, "defineProperty", reflectDefineProperty);
  patch(Reflect, "set", reflectSet);
  patch(Reflect, "deleteProperty", del);
  patch(Reflect, "getOwnPropertyDescriptor", reflectGetOwnPropertyDescriptor);
  patch(Reflect, "getPrototypeOf", reflectGetPrototypeOf);
  patch(Reflect, "setPrototypeOf", reflectSetPrototypeOf);
  patch(Reflect, "has", reflectHas);
  patch(Reflect, "get", reflectGet);
  patch(Reflect, "isExtensible", objectIsExtensible);
  patch(Reflect, "preventExtension", reflectPreventExtension);
  patch(Reflect, "ownKeys", reflectOwnKeys);
}

export function patchWithPolifil(
  proto: any,
  name: string,
  defaultImpl: (this: any, ...vals: any[]) => any,
  polyfillImpl: (this: any, ...vals: any[]) => any
) {
  function impl(this: any) {
    const method: any = proxies?.has(this) ? polyfillImpl : defaultImpl;
    if (context.call === impl) context.call = method;
    return nativeApply(method, this, arguments);
  }
  regOpaqueObject(
    impl,
    `@effectful/debugger/${proto.constructor.name}#${name}`
  );
  patch(proto, name, impl);
}

export function patchWithCopy(proto: any, name: string) {
  const orig = proto[name];
  return patchWithPolifil(
    proto,
    name,
    orig,
    Instr.useArrCopy(proto.slice, orig, arraySet)
  );
}
