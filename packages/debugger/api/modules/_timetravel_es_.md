[@effectful/debugger](../README.md) › ["timeTravel/es"](_timetravel_es_.md)

# Module: "timeTravel/es"

## Index

### Classes

* [ArrayIterator](../classes/_timetravel_es_.arrayiterator.md)
* [MapEntriesIterator](../classes/_timetravel_es_.mapentriesiterator.md)
* [MapKeysIterator](../classes/_timetravel_es_.mapkeysiterator.md)
* [MapValuesIterator](../classes/_timetravel_es_.mapvaluesiterator.md)

### Interfaces

* [MapEntry](../interfaces/_timetravel_es_.mapentry.md)

### Type aliases

* [SavedMap](_timetravel_es_.md#savedmap)
* [SetEntry](_timetravel_es_.md#setentry)

### Variables

* [Ap](_timetravel_es_.md#const-ap)
* [ManagedMap](_timetravel_es_.md#const-managedmap)
* [ManagedSet](_timetravel_es_.md#const-managedset)
* [SavedMap](_timetravel_es_.md#const-savedmap)
* [record](_timetravel_es_.md#const-record)
* [record2](_timetravel_es_.md#const-record2)
* [record3](_timetravel_es_.md#const-record3)

### Functions

* [arrayIterator](_timetravel_es_.md#arrayiterator)
* [mapDel](_timetravel_es_.md#mapdel)
* [mapDelOp](_timetravel_es_.md#mapdelop)
* [mapRestoreOp](_timetravel_es_.md#maprestoreop)
* [resetEntryValueOp](_timetravel_es_.md#resetentryvalueop)
* [restoreEntryOp](_timetravel_es_.md#restoreentryop)

## Type aliases

###  SavedMap

Ƭ **SavedMap**: *[Map](_engine_.md#const-map)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:91

___

###  SetEntry

Ƭ **SetEntry**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹T, T›*

Defined in debugger/src/timeTravel/es.ts:251

## Variables

### `Const` Ap

• **Ap**: *any[]* = Array.prototype

Defined in debugger/src/timeTravel/es.ts:15

___

### `Const` ManagedMap

• **ManagedMap**: *[Map](_engine_.md#const-map)* = class Map<K, V> {
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
}

Defined in debugger/src/timeTravel/es.ts:153

___

### `Const` ManagedSet

• **ManagedSet**: *Set* = class Set<T> {
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
}

Defined in debugger/src/timeTravel/es.ts:253

___

### `Const` SavedMap

• **SavedMap**: *MapConstructor* = Map

Defined in debugger/src/timeTravel/es.ts:14

___

### `Const` record

• **record**: *function* = config.timeTravel ? TTCore.record : function () { }

Defined in debugger/src/timeTravel/es.ts:10

#### Type declaration:

▸ <**T**>(`f`: T): *void*

**Type parameters:**

▪ **T**: *[Callable](../interfaces/_timetravel_core_.callable.md)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | T |

___

### `Const` record2

• **record2**: *[record2](_timetravel_binds_.md#record2)* = config.timeTravel ? Binds.record2 : function () { }

Defined in debugger/src/timeTravel/es.ts:11

___

### `Const` record3

• **record3**: *[record3](_timetravel_binds_.md#record3)* = config.timeTravel ? Binds.record3 : function () { }

Defined in debugger/src/timeTravel/es.ts:12

## Functions

###  arrayIterator

▸ **arrayIterator**(`this`: any[]): *Iterator‹any›*

Defined in debugger/src/timeTravel/es.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`this` | any[] |

**Returns:** *Iterator‹any›*

___

###  mapDel

▸ **mapDel**<**K**, **V**>(`inner`: [Map](_engine_.md#const-map)‹K, [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V››, `entry`: [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›, `enabled`: boolean): *void*

Defined in debugger/src/timeTravel/es.ts:79

**Type parameters:**

▪ **K**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`inner` | [Map](_engine_.md#const-map)‹K, [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›› |
`entry` | [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V› |
`enabled` | boolean |

**Returns:** *void*

___

###  mapDelOp

▸ **mapDelOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/es.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  mapRestoreOp

▸ **mapRestoreOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/es.ts:240

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  resetEntryValueOp

▸ **resetEntryValueOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/es.ts:46

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  restoreEntryOp

▸ **restoreEntryOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/es.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*
