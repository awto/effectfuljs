[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [ForInIterator](_state_.foriniterator.md)

# Class: ForInIterator

## Hierarchy

* **ForInIterator**

## Implements

* Iterable‹string›
* Iterator‹string›

## Index

### Constructors

* [constructor](_state_.foriniterator.md#constructor)

### Properties

* [fields](_state_.foriniterator.md#fields)
* [obj](_state_.foriniterator.md#obj)
* [pos](_state_.foriniterator.md#pos)

### Methods

* [[Symbol.iterator]](_state_.foriniterator.md#[symbol.iterator])
* [next](_state_.foriniterator.md#next)

## Constructors

###  constructor

\+ **new ForInIterator**(`obj`: any, `fields`: string[]): *[ForInIterator](_state_.foriniterator.md)*

Defined in debugger/src/state.ts:469

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |
`fields` | string[] |

**Returns:** *[ForInIterator](_state_.foriniterator.md)*

## Properties

###  fields

• **fields**: *string[]*

Defined in debugger/src/state.ts:467

___

###  obj

• **obj**: *any*

Defined in debugger/src/state.ts:469

___

###  pos

• **pos**: *number*

Defined in debugger/src/state.ts:468

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *this*

Defined in debugger/src/state.ts:475

**Returns:** *this*

___

###  next

▸ **next**(): *IteratorResult‹string›*

Defined in debugger/src/state.ts:478

**Returns:** *IteratorResult‹string›*
