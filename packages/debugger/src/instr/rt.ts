/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */

import * as Engine from "../engine";
import * as Persist from "../persist";
import * as State from "../state";

const Ap = Array.prototype;
const Tp = Object.getPrototypeOf(Int8Array.prototype);

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
  for (const i of this) res[x++] = callback.call(self, i, x, this);
  return res;
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

export const arraySort = Engine.liftSync(Ap.sort);
export const typedArraySort = Engine.liftSync(Tp.sort);

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

export function mapForEach<K, V, This>(
  this: Map<K, V>,
  callback: (this: This | undefined, k: K, v: V, cont: Map<K, V>) => void,
  self?: This
): void {
  for (const [k, v] of this) callback.call(self, k, v, this);
}

/**
 * wraps a top module's export, returns a function which on each call
 * returns `exports` object, but the value is memoized on its first call
 */
export function wrapExport(top: any, descr: any): any {
  "nodebug";
  let mod: any;
  const res: any = function exportsThunk() {
    if (!mod) {
      mod = {};
      top(mod, (mod.exports = {}));
    }
    return mod.exports;
  };
  res[State.thunkSymbol] = true;
  res[State.moduleSymbol] = descr;
  return res;
}

export function unwrapImport(value: any, name: string): any {
  if (!value) return value;
  if (value[State.thunkSymbol]) {
    value = value();
    if (!value) return value;
  }
  Persist.regModule(value, name);
  return value;
}

function reify<T>(v: T): T {
  return v;
}

export function chainM<A, B>(arg: A, func: (a: A) => B): B {
  return func(reify(arg));
}
