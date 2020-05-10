[@effectful/debugger](../README.md) › ["timeTravel/dom"](_timetravel_dom_.md)

# Module: "timeTravel/dom"

## Index

### Classes

* [DomSnapshot](../classes/_timetravel_dom_.domsnapshot.md)

### Interfaces

* [ElementExt](../interfaces/_timetravel_dom_.elementext.md)
* [ObserverData](../interfaces/_timetravel_dom_.observerdata.md)

### Variables

* [domObserverSymbol](_timetravel_dom_.md#const-domobserversymbol)
* [journal](_timetravel_dom_.md#const-journal)
* [observing](_timetravel_dom_.md#let-observing)

### Functions

* [flush](_timetravel_dom_.md#flush)
* [flushData](_timetravel_dom_.md#flushdata)
* [record](_timetravel_dom_.md#record)
* [restoreDom](_timetravel_dom_.md#restoredom)
* [track](_timetravel_dom_.md#track)
* [untrack](_timetravel_dom_.md#untrack)

## Variables

### `Const` domObserverSymbol

• **domObserverSymbol**: *unique symbol* = Symbol("@effectful/debugger/dom")

Defined in debugger/src/timeTravel/dom.ts:11

___

### `Const` journal

• **journal**: *[Journal](../interfaces/_state_.journal.md)* = State.journal

Defined in debugger/src/timeTravel/dom.ts:9

___

### `Let` observing

• **observing**: *[Set](_vscode_handlers_.md#const-set)‹[ElementExt](../interfaces/_timetravel_dom_.elementext.md)›* = new Set<ElementExt>()

Defined in debugger/src/timeTravel/dom.ts:14

currently observed elements

## Functions

###  flush

▸ **flush**(): *void*

Defined in debugger/src/timeTravel/dom.ts:122

**Returns:** *void*

___

###  flushData

▸ **flushData**(`data`: [ObserverData](../interfaces/_timetravel_dom_.observerdata.md)): *void*

Defined in debugger/src/timeTravel/dom.ts:115

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ObserverData](../interfaces/_timetravel_dom_.observerdata.md) |

**Returns:** *void*

___

###  record

▸ **record**(`changes`: MutationRecord[]): *void*

Defined in debugger/src/timeTravel/dom.ts:110

**Parameters:**

Name | Type |
------ | ------ |
`changes` | MutationRecord[] |

**Returns:** *void*

___

###  restoreDom

▸ **restoreDom**(`this`: any): *void*

Defined in debugger/src/timeTravel/dom.ts:104

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  track

▸ **track**(`rootEl`: [Element](../interfaces/_timetravel_dom_.elementext.md#element)): *void*

Defined in debugger/src/timeTravel/dom.ts:132

This enables tracking DOM using MutationObserver.

**Parameters:**

Name | Type |
------ | ------ |
`rootEl` | [Element](../interfaces/_timetravel_dom_.elementext.md#element) |

**Returns:** *void*

___

###  untrack

▸ **untrack**(`rootEl`: [Element](../interfaces/_timetravel_dom_.elementext.md#element)): *void*

Defined in debugger/src/timeTravel/dom.ts:155

This disables tracking DOM using MutationObserver.

**Parameters:**

Name | Type |
------ | ------ |
`rootEl` | [Element](../interfaces/_timetravel_dom_.elementext.md#element) |

**Returns:** *void*
