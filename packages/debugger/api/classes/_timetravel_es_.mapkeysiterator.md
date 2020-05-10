[@effectful/debugger](../README.md) › ["timeTravel/es"](../modules/_timetravel_es_.md) › [MapKeysIterator](_timetravel_es_.mapkeysiterator.md)

# Class: MapKeysIterator <**K, V**>

## Type parameters

▪ **K**

▪ **V**

## Hierarchy

* **MapKeysIterator**

## Implements

* Iterator‹K›
* Iterable‹K›

## Index

### Constructors

* [constructor](_timetravel_es_.mapkeysiterator.md#constructor)

### Properties

* [cur](_timetravel_es_.mapkeysiterator.md#cur)
* [list](_timetravel_es_.mapkeysiterator.md#list)

### Methods

* [[Symbol.iterator]](_timetravel_es_.mapkeysiterator.md#[symbol.iterator])
* [next](_timetravel_es_.mapkeysiterator.md#next)

## Constructors

###  constructor

\+ **new MapKeysIterator**(`list`: [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›): *[MapKeysIterator](_timetravel_es_.mapkeysiterator.md)*

Defined in debugger/src/timeTravel/es.ts:95

**Parameters:**

Name | Type |
------ | ------ |
`list` | [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V› |

**Returns:** *[MapKeysIterator](_timetravel_es_.mapkeysiterator.md)*

## Properties

###  cur

• **cur**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:95

___

###  list

• **list**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:94

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *this*

Defined in debugger/src/timeTravel/es.ts:100

**Returns:** *this*

___

###  next

▸ **next**(): *IteratorResult‹K›*

Defined in debugger/src/timeTravel/es.ts:103

**Returns:** *IteratorResult‹K›*
