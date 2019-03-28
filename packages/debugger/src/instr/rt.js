/**
 * Not transpiled high-order functions won't work, because when it calls its callback
 * it returns an effectful value and not immediately starts its execution
 *
 * This file contains quick and dirty patches for the runtime's higher order functions
 *
 * TODO: transpile core-js instead
 */

import * as Kit from "../kit";
const config = Kit.config;

const Ap = Array.prototype;
const Tp = Object.getPrototypeOf(Int8Array.prototype);
const Sp = Set.prototype;
const Mp = Map.prototype;

export function map(callback, self) {
  const res = new Array(this.length);
  let x = 0;
  for (const i of this) res[x++] = callback.call(self, i, x, this);
  return res;
}

export function filter(callback, self) {
  const res = [];
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) res.push(i);
  return res;
}

export function find(callback, self) {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return i;
}

export function findIndex(callback, self) {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return x;
  return -1;
}

export function flatMap(callback, self) {
  return map.call(this, callback, self).flat();
}

export function forEach(callback, self) {
  let x = 0;
  for (const i of this) callback.call(self, i, x++, this);
}

export function reduce(callback, initial) {
  let x = 0;
  let acc = initial;
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

export function reduceRight(callback, initial) {
  let acc = initial;
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

const savedApSort = Array.prototype.sort;
export function arraySort(compare) {
  let wrappedCompare;
  if (compare) wrappedCompare = Kit.lift(compare);
  return savedApSort.call(this, wrappedCompare);
}

const savedTpSort = Tp.sort;
export function typedArraySort(compare) {
  let wrappedCompare;
  if (compare) wrappedCompare = Kit.lift(compare);
  return savedTpSort.call(this, wrappedCompare);
}

export function some(callback, self) {
  let x = 0;
  for (const i of this) if (callback.call(self, i, x++, this)) return true;
  return false;
}

export function every(callback, self) {
  let x = 0;
  for (const i of this) if (!callback.call(self, i, x++, this)) return false;
  return true;
}

export function iterForEach(callback, self) {
  for (const i of this) callback.call(self, i, this);
}

if (config.replaceRT) {
  Tp.map = Ap.map = map;
  Tp.filter = Ap.filter = filter;
  Tp.find = Ap.find = find;
  Tp.findIndex = Ap.findIndex = findIndex;
  Tp.flatMap = Ap.flatMap = flatMap;
  Tp.forEach = Ap.forEach = forEach;
  Sp.forEach = Mp.forEach = iterForEach;
  Tp.reduce = Ap.reduce = reduce;
  Tp.reduceRight = Ap.reduceRight = reduceRight;
  Ap.sort = arraySort;
  Tp.sort = typedArraySort;
  Tp.some = Ap.some = some;
  Tp.every = Ap.every = every;
}

/**
 * wraps a top module's export, returns a function which on each call
 * returns `exports` object, but the value is memoized on its first call
 */
export function exports(top) {
  "nodebug";
  let mod;
  const res = function exports() {
    if (!mod) {
      mod = {};
      top(mod, (mod.exports = {}));
    }
    return mod.exports;
  };
  res[Kit.thunkSymbol] = true;
  return res;
}
