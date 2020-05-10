[@effectful/debugger](../README.md) › ["timeTravel/dom"](../modules/_timetravel_dom_.md) › [DomSnapshot](_timetravel_dom_.domsnapshot.md)

# Class: DomSnapshot

## Hierarchy

* **DomSnapshot**

## Implements

* [Operation](../interfaces/_state_.operation.md)

## Index

### Constructors

* [constructor](_timetravel_dom_.domsnapshot.md#constructor)

### Properties

* [changes](_timetravel_dom_.domsnapshot.md#changes)

### Methods

* [call](_timetravel_dom_.domsnapshot.md#call)

## Constructors

###  constructor

\+ **new DomSnapshot**(`changes`: MutationRecord[]): *[DomSnapshot](_timetravel_dom_.domsnapshot.md)*

Defined in debugger/src/timeTravel/dom.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`changes` | MutationRecord[] |

**Returns:** *[DomSnapshot](_timetravel_dom_.domsnapshot.md)*

## Properties

###  changes

• **changes**: *MutationRecord[]*

Defined in debugger/src/timeTravel/dom.ts:55

## Methods

###  call

▸ **call**(): *void*

*Implementation of [Operation](../interfaces/_state_.operation.md)*

Defined in debugger/src/timeTravel/dom.ts:59

**Returns:** *void*
