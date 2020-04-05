/** ECMAScript containers patches */
import config from "../config";
import * as TTCore from "./core";
import { regOpaqueObject, regConstructor } from "../persist";
import * as Binds from "./binds";
import { journal, context } from "../state";
import * as S from "@effectful/serialization";
import { Core } from "./main";

const record = config.timeTravel ? TTCore.record : function() {};
const record2 = config.timeTravel ? Binds.record2 : function() {};
const record3 = config.timeTravel ? Binds.record3 : function() {};

const SavedMap = Map;
const Ap = Array.prototype;

class ArrayIterator implements Iterator<any> {
  arr: any[];
  pos: number;
  constructor(arr: any[]) {
    this.arr = arr;
    this.pos = 0;
  }
  next(): IteratorResult<any> {
    const { arr, pos } = this;
    return pos >= arr.length
      ? { done: true, value: void 0 }
      : { done: false, value: ((this.pos = pos + 1), arr[pos]) };
  }
}

function arrayIterator(this: any[]): Iterator<any> {
  return new ArrayIterator(this);
}

regConstructor(ArrayIterator, { name: "#ArrayIterator" });
regOpaqueObject(arrayIterator, "#arrayIterator");

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

class MapKeysIterator<K, V> implements Iterator<K>, Iterable<K> {
  list: MapEntry<K, V>;
  cur: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.cur = list.prev;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<K> {
    const { cur, list } = this;
    if (list === cur) return { done: true, value: void 0 };
    this.cur = cur.prev;
    return { done: false, value: cur.k };
  }
}

regConstructor(MapKeysIterator, { name: "#MapKeysIterator" });

class MapValuesIterator<K, V> implements Iterator<V>, Iterable<V> {
  list: MapEntry<K, V>;
  cur: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.cur = list.prev;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<V> {
    const { cur, list } = this;
    if (list === cur) return { done: true, value: void 0 };
    this.cur = cur.prev;
    return { done: false, value: cur.v };
  }
}

regConstructor(MapKeysIterator, { name: "#MapValuesIterator" });

class MapEntriesIterator<K, V> implements Iterator<[K, V]>, Iterable<[K, V]> {
  list: MapEntry<K, V>;
  cur: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.cur = list.prev;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<[K, V]> {
    const { cur, list } = this;
    if (list === cur) return { done: true, value: void 0 };
    this.cur = cur.prev;
    return { done: false, value: [cur.k, cur.v] };
  }
}

regConstructor(MapKeysIterator, { name: "#MapEntriesIterator" });

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
  keys(): Iterable<K> {
    return new MapKeysIterator<K, V>(this.list);
  }
  values(): Iterable<V> {
    return new MapValuesIterator<K, V>(this.list);
  }
  has(k: K): boolean {
    return this.inner.has(k);
  }
  entries(): Iterable<[K, V]> {
    return new MapEntriesIterator<K, V>(this.list);
  }
  [Symbol.iterator](): Iterator<[K, V]> {
    return new MapEntriesIterator<K, V>(this.list);
  }
  forEach<This>(
    callback: (this: This | undefined, v: V, k: K, cont: Map<K, V>) => void,
    self?: This
  ): void {
    for (const [k, v] of this) callback.call(self, v, k, this);
  }
};

regConstructor(ManagedMap, { name: "#MMap" });

function mapRestoreOp(this: any) {
  const { a: map, b: inner, c: list } = this;
  this.b = map.inner;
  this.c = map.list;
  record(this);
  map.inner = inner;
  map.list = list;
}

regOpaqueObject(mapRestoreOp, "#map$restore");

type SetEntry<T> = MapEntry<T, T>;

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
  keys(): Iterable<T> {
    return new MapKeysIterator<T, T>(this.list);
  }
  entries(): Iterable<[T, T]> {
    return new MapEntriesIterator<T, T>(this.list);
  }
  add(k: T): Set<T> {
    const { inner } = this;
    let entry = inner.get(k);
    if (!entry) {
      const { list } = this;
      entry = { k, v: k, prev: list, next: list.next };
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
    return new MapKeysIterator<T, T>(this.list);
  }
  forEach<This>(
    callback: (this: This | undefined, k: T, v: T, cont: Set<T>) => void,
    self?: This
  ): void {
    for (const i of this) callback.call(self, i, i, this);
  }
};

(<any>ManagedSet.prototype).values = ManagedSet.prototype.keys;

regConstructor(ManagedSet, { name: "#MSet" });

if (config.timeTravel) {
  S.WeakMapWorkaround.prototype.set = function set(key: any, value: any) {
    switch (typeof key) {
      case "function":
      case "object":
        context.call = context.call === set ? Object.defineProperty : null;
        Object.defineProperty(key, this.prop, {
          configurable: true,
          value
        });
        break;
      default:
        throw TypeError("Invalid value used in weak map");
    }
    return this;
  };

  S.WeakSetWorkaround.prototype.delete = S.WeakMapWorkaround.prototype.delete = function del(
    key: any
  ) {
    if (!this.has(key)) return false;
    if (context.call === del) Core.del(key, <any>this.prop);
    else delete key[this.prop];
    return true;
  };

  S.WeakSetWorkaround.prototype.add = function add(value: any) {
    switch (typeof value) {
      case "function":
      case "object":
        context.call = context.call === add ? Object.defineProperty : null;
        Object.defineProperty(value, this.prop, {
          configurable: true,
          value: true
        });
        break;
      default:
        throw TypeError("Invalid value used in weak set");
    }
    return this;
  };
}

if ((config.timeTravel || config.persistState) && config.patchRT) {
  (<any>Ap)[Symbol.iterator] = arrayIterator;
  (<any>global).Map = ManagedMap;
  (<any>global).Set = ManagedSet;
}

if (config.timeTravel && config.patchRT) {
  (<any>global).Map = ManagedMap;
  (<any>global).Set = ManagedSet;
  (<any>global).WeakMap = S.WeakMapWorkaround;
  (<any>global).WeakSet = S.WeakSetWorkaround;
}
