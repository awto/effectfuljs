/** ECMAScript containers patches */
import config from "../config";
import * as TTCore from "./core";
import { regOpaqueObject, regConstructor } from "../persist";
import * as Binds from "./binds";
import { journal, context, patchNative as patch } from "../state";

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

function mapDel<K, V>(
  inner: Map<K, MapEntry<K, V>>,
  entry: MapEntry<K, V>,
  enabled: boolean
) {
  inner.delete(entry.k);
  const { next, prev } = entry;
  next.prev = prev;
  prev.next = next;
  if (enabled) record2(restoreEntryOp, inner, entry);
}

type SavedMap<K, V> = Map<K, V>;

class MapKeysIterator<K, V> implements Iterator<K>, Iterable<K> {
  list: MapEntry<K, V>;
  prev: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.prev = list;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<K> {
    const { prev } = this;
    const cur = prev.prev;
    if (cur === this.list) return { done: true, value: void 0 };
    this.prev = cur;
    return { done: false, value: cur.k };
  }
}

regConstructor(MapKeysIterator, { name: "#MapKeysIterator" });

class MapValuesIterator<K, V> implements Iterator<V>, Iterable<V> {
  list: MapEntry<K, V>;
  prev: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.prev = list;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<V> {
    const { prev } = this;
    const cur = prev.prev;
    if (cur === this.list) return { done: true, value: void 0 };
    this.prev = cur;
    return { done: false, value: cur.v };
  }
}

regConstructor(MapKeysIterator, { name: "#MapValuesIterator" });

class MapEntriesIterator<K, V> implements Iterator<[K, V]>, Iterable<[K, V]> {
  list: MapEntry<K, V>;
  prev: MapEntry<K, V>;
  constructor(list: MapEntry<K, V>) {
    this.list = list;
    this.prev = list;
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): IteratorResult<[K, V]> {
    const { prev } = this;
    const cur = prev.prev;
    if (cur === this.list) return { done: true, value: void 0 };
    this.prev = cur;
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
    mapDel(
      this.inner,
      entry,
      journal.enabled && context.call === ManagedMap.prototype.delete
    );
    return true;
  }
  clear() {
    if (journal.enabled && context.call === ManagedMap.prototype.clear)
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
      if (journal.enabled && context.call === ManagedMap.prototype.set)
        record2(resetEntryValueOp, entry, entry.v);
      entry.v = v;
    } else {
      const { list } = this;
      entry = { k, v, prev: list, next: list.next };
      list.next = list.next.prev = entry;
      inner.set(k, entry);
      if (journal.enabled && context.call === ManagedMap.prototype.set)
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
    mapDel(
      this.inner,
      entry,
      journal.enabled && context.call === ManagedSet.prototype.delete
    );
    return true;
  }
  clear() {
    if (journal.enabled && context.call === ManagedSet.prototype.clear)
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
      if (journal.enabled && context.call === ManagedSet.prototype.add)
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

regOpaqueObject(weakMapSetOp, "#set$wmap");

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

function weakSetAdd<T extends object>(this: WeakSet<T>, v: T) {
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

if (config.timeTravel && config.patchRT) {
  WMp.delete = weakMapDelete;
  WMp.set = weakMapSet;
  WSp.delete = weakSetDelete;
  WSp.add = weakSetAdd;
}

if ((config.timeTravel || config.persistState) && config.patchRT) {
  // patch(global, "WeakMap", S.WeakMapWorkaround);
  // patch(global, "WeakSet", S.WeakSetWorkaround);
  patch(Ap, Symbol.iterator, arrayIterator);
  patch(global, "Map", ManagedMap);
  patch(global, "Set", ManagedSet);
}
