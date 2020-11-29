/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */

import { native, mergeModule, context } from "../state";
import { force } from "../engine";

type Callback<This, T, R> = (
  this: This | undefined,
  elem: T,
  index: number,
  arr: T[]
) => R;

export function every<T, This>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): boolean {
  let x = 0;
  for (const i of this) if (!callback.call(self, i, x++, this)) return false;
  return true;
}

export function setForEach<T, This>(
  this: Set<T>,
  callback: (this: This | undefined, k: T, v: T, cont: Set<T>) => void,
  self?: This
): void {
  for (const i of this) callback.call(self, i, i, this);
}

export function mapForEach<K, V, This>(
  this: Map<K, V>,
  callback: (this: This | undefined, v: V, k: K, cont: Map<K, V>) => void,
  self?: This
): void {
  for (const [k, v] of this) callback.call(self, v, k, this);
}

function reify<T>(v: T): T {
  return v;
}

export function chainM<A, B>(arg: A, func: (a: A) => B): B {
  return func(reify(arg));
}

export function iterErr(iter: any, reason: any) {
  if (iter.throw) return iter.throw(reason);
  if (iter.return) iter.return();
  throw reason;
}

export async function iterErrM(iter: any, reason: any) {
  if (iter.throw) return iter.throw(reason);
  if (iter.return) await iter.return();
  throw reason;
}

export function iterFin(iter: any, value: any) {
  if (iter.return) return iter.return(value);
  return { value, done: true };
}

export function wrapModule(mod: any, cjsModule: any): any {
  const topMeta = mod.topLevel.func(null);
  topMeta(cjsModule, cjsModule.exports);
  mod.exports = cjsModule.exports;
  if (mod.prevVersion) mergeModule(mod, mod.prevVersion);
  if (context.onAfterLoad) context.onAfterLoad(mod);
  return mod.exports;
}

export function objectDefineProperties(
  obj: any,
  descrs: { [name: string]: PropertyDescriptor }
) {
  const keys = Reflect.ownKeys(descrs);
  for (let i = 0, len = keys.length; i < len; ++i) {
    const prop = <any>keys[i];
    Object.defineProperty(obj, prop, descrs[prop]);
  }
  return obj;
}

export function objectGetOwnPropertyDescriptors(
  obj: any
): { [name: string]: PropertyDescriptor } {
  const ret: { [name: string]: PropertyDescriptor } = {};
  const keys = Reflect.ownKeys(obj);
  for (let i = 0, len = keys.length; i < len; ++i) {
    const prop = <any>keys[i];
    ret[prop] = <PropertyDescriptor>Object.getOwnPropertyDescriptor(obj, prop);
  }
  return ret;
}

declare function dummy(): any;

export function mcallCont(
  func: (args: any, prop: string, func: any) => any,
  prop: string,
  args: any
): any {
  return func(args, prop, dummy());
}

export function useArrCopy(
  copy: (this: any[]) => any[],
  transform: (this: any[], ...args: any[]) => any,
  set: (target: any, prop: any, value: any) => any
): (this: any[], ...args: any[]) => any {
  return function(this: any[]) {
    const tmp = copy.apply(this);
    const res = transform.apply(tmp, <any>arguments);
    for (let i = 0, len = res.length; i < len; ++i) set(this, i, res[i]);
    return this;
  };
}

export function getOwnPropertySymbols(obj: object): symbol[] {
  const full = Reflect.ownKeys(obj);
  const res: symbol[] = [];
  for (let i = 0, len = full.length; i < len; ++i) {
    const v = full[i];
    if (typeof v === "symbol") res.push(v);
  }
  return res;
}

export function getOwnPropertyNames(obj: object): string[] {
  const full = Reflect.ownKeys(obj);
  const res: string[] = [];
  for (let i = 0, len = full.length; i < len; ++i) {
    const v = full[i];
    if (typeof v !== "symbol") res.push(<any>v);
  }
  return res;
}

export function objectKeys(obj: object): string[] {
  const full = Reflect.ownKeys(obj);
  const res: string[] = [];
  for (let i = 0, len = full.length; i < len; ++i) {
    const v = full[i];
    if (typeof v === "symbol") continue;
    const descr = Object.getOwnPropertyDescriptor(obj, v);
    if ((<PropertyDescriptor>descr).enumerable) res.push(<any>v);
  }
  return res;
}

export function objectGetOwnPropertyDescriptor(
  wrappers: WeakMap<any, any>,
  obj: object,
  name: string | symbol | number
): PropertyDescriptor | undefined {
  const res = native.Object.getOwnPropertyDescriptor(obj, name);
  if (wrappers && res) {
    let { set, get } = res;
    if (set && (set = wrappers.get(set))) res.set = set;
    if (get && (get = wrappers.get(get))) res.get = get;
  }
  return res;
}

export async function dynImport(promise: Promise<any>): Promise<any> {
  return force(await promise);
}

export function runJobs<T>(jobs: Iterable<(job: T) => void>, arg: T) {
  for (const i of jobs) i(arg);
}

export function setTimeoutCallback(callback: (...args: any[]) => any, id: any) {
  if (!id.impl()._canceled)
    callback.apply(void 0, native.Array.slice.call(arguments, 2));
}
