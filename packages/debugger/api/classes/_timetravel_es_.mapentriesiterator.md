[@effectful/debugger](../README.md) › ["timeTravel/es"](../modules/_timetravel_es_.md) › [MapEntriesIterator](_timetravel_es_.mapentriesiterator.md)

# Class: MapEntriesIterator <**K, V**>

## Type parameters

▪ **K**

▪ **V**

## Hierarchy

* **MapEntriesIterator**

## Implements

* Iterator‹[K, V]›
* Iterable‹[K, V]›

## Index

### Constructors

* [constructor](_timetravel_es_.mapentriesiterator.md#constructor)

### Properties

* [cur](_timetravel_es_.mapentriesiterator.md#cur)
* [list](_timetravel_es_.mapentriesiterator.md#list)

### Methods

* [[Symbol.iterator]](_timetravel_es_.mapentriesiterator.md#[symbol.iterator])
* [next](_timetravel_es_.mapentriesiterator.md#next)

## Constructors

###  constructor

\+ **new MapEntriesIterator**(`list`: [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›): *[MapEntriesIterator](_timetravel_es_.mapentriesiterator.md)*

Defined in debugger/src/timeTravel/es.ts:135

**Parameters:**

Name | Type |
------ | ------ |
`list` | [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V› |

**Returns:** *[MapEntriesIterator](_timetravel_es_.mapentriesiterator.md)*

## Properties

###  cur

• **cur**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:135

___

###  list

• **list**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:134

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *this*

Defined in debugger/src/timeTravel/es.ts:140

**Returns:** *this*

___

###  next

▸ **next**(): *IteratorResult‹[K, V]›*

Defined in debugger/src/timeTravel/es.ts:143

**Returns:** *IteratorResult‹[K, V]›*
