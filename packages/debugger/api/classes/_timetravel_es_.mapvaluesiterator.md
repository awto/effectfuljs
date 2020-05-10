[@effectful/debugger](../README.md) › ["timeTravel/es"](../modules/_timetravel_es_.md) › [MapValuesIterator](_timetravel_es_.mapvaluesiterator.md)

# Class: MapValuesIterator <**K, V**>

## Type parameters

▪ **K**

▪ **V**

## Hierarchy

* **MapValuesIterator**

## Implements

* Iterator‹V›
* Iterable‹V›

## Index

### Constructors

* [constructor](_timetravel_es_.mapvaluesiterator.md#constructor)

### Properties

* [cur](_timetravel_es_.mapvaluesiterator.md#cur)
* [list](_timetravel_es_.mapvaluesiterator.md#list)

### Methods

* [[Symbol.iterator]](_timetravel_es_.mapvaluesiterator.md#[symbol.iterator])
* [next](_timetravel_es_.mapvaluesiterator.md#next)

## Constructors

###  constructor

\+ **new MapValuesIterator**(`list`: [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›): *[MapValuesIterator](_timetravel_es_.mapvaluesiterator.md)*

Defined in debugger/src/timeTravel/es.ts:115

**Parameters:**

Name | Type |
------ | ------ |
`list` | [MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V› |

**Returns:** *[MapValuesIterator](_timetravel_es_.mapvaluesiterator.md)*

## Properties

###  cur

• **cur**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:115

___

###  list

• **list**: *[MapEntry](../interfaces/_timetravel_es_.mapentry.md)‹K, V›*

Defined in debugger/src/timeTravel/es.ts:114

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *this*

Defined in debugger/src/timeTravel/es.ts:120

**Returns:** *this*

___

###  next

▸ **next**(): *IteratorResult‹V›*

Defined in debugger/src/timeTravel/es.ts:123

**Returns:** *IteratorResult‹V›*
