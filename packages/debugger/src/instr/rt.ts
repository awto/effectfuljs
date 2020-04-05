/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */

import { ManagedSet, ManagedMap } from "../timeTravel/es";
import { thunkSymbol } from "../state";

type Callback<This, T, R> = (
  this: This | undefined,
  elem: T,
  index: number,
  arr: T[]
) => R;

export function map<T, U, This = undefined>(
  this: T[],
  callback: Callback<This, T, U>,
  self?: This
): U[] {
  const res = new Array<U>(this.length);
  let x = 0;
  for (const i of this) {
    let cur = x++;
    res[cur] = callback.call(self, i, cur, this);
  }
  return res;
}

export function arrayFrom<T, U = T, This = undefined>(
  iter: Iterable<T>,
  mapFn?: Callback<This, T, U>,
  self?: This
) {
  if (mapFn) {
    const arr: U[] = [];
    let x = 0;
    for (const i of iter) arr.push(mapFn.call(self, i, x++, <any>arr));
    return arr;
  }
  const arr: T[] = [];
  for (const i of iter) arr.push(i);
  return arr;
}

export function filter<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): T[] {
  const res: T[] = [];
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) res.push(i);
  return res;
}

export function find<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): T | undefined {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return i;
}

export function findIndex<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): number {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return x;
  return -1;
}

export function flatMap<T, U, This = undefined>(
  this: T[],
  callback: Callback<This, T, U | ReadonlyArray<U>>,
  self?: This
): U[] {
  return (<any>map).call(this, callback, self).flat();
}

export function forEach<T, This = undefined>(
  this: T[],
  callback: Callback<This, T, void>,
  self?: This
): void {
  let x = 0;
  for (const i of this) callback.call(self, i, x++, this);
}

export function reduce<T>(
  this: T[],
  callback: (prev: T, cur: T, index: number, arr: T[]) => T,
  initial?: T
) {
  let x = 0;
  let acc = <T>initial;
  const len = this.length;
  if (arguments.length !== 2) {
    if (len === 0)
      throw new TypeError("Reduce of empty array with no initial value");
    x = 1;
    acc = this[0];
  }
  for (; x < len; ++x) acc = callback(acc, this[x], x, this);
  return acc;
}

export function reduceRight<T>(
  this: T[],
  callback: (prev: T, cur: T, index: number, arr: T[]) => T,
  initial?: T
) {
  let acc = <T>initial;
  const len = this.length;
  let x = len - 1;
  if (arguments.length !== 2) {
    if (len === 0)
      throw new TypeError("Reduce of empty array with no initial value");
    acc = this[x--];
  }
  for (; x >= 0; --x) acc = callback(acc, this[x], x, this);
  return acc;
}

export function some<T, This>(
  this: T[],
  callback: Callback<This, T, boolean>,
  self?: This
): boolean {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return true;
  return false;
}

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

(<any>ManagedSet.prototype).forEach = setForEach;

export function mapForEach<K, V, This>(
  this: Map<K, V>,
  callback: (this: This | undefined, v: V, k: K, cont: Map<K, V>) => void,
  self?: This
): void {
  for (const [k, v] of this) callback.call(self, v, k, this);
}

(<any>ManagedMap.prototype).forEach = mapForEach;

/**
 * wraps a top module's export, returns a function which on each call
 * returns `exports` object, but the value is memoized on its first call
 */
export function wrapExport(top: any, mod: any): any {
  let loaded = false;
  const res: any = function exportsThunk() {
    if (!loaded) {
      mod.exports = {};
      loaded = true;
      top();
    }
    return mod.exports;
  };
  mod.exports = res;
  res[thunkSymbol] = true;
  return res;
}

export function persistModule(
  topLevel: (cjsModule: any, exports: any) => void,
  name: string,
  cjsModule: any,
  exports: any
): any {
  topLevel(cjsModule, exports);
  exports = cjsModule.exports;
  return exports;
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
