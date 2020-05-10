[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [Journal](_state_.journal.md)

# Interface: Journal

## Hierarchy

* **Journal**

## Index

### Properties

* [enabled](_state_.journal.md#enabled)
* [future](_state_.journal.md#future)
* [now](_state_.journal.md#now)
* [past](_state_.journal.md#past)

## Properties

###  enabled

• **enabled**: *boolean*

Defined in debugger/src/state.ts:87

the data is collected now

___

###  future

• **future**: *[Record](_state_.record.md) | null*

Defined in debugger/src/state.ts:85

a list of changes to redo

___

###  now

• **now**: *[Record](_state_.record.md) | null*

Defined in debugger/src/state.ts:81

current checkpoint

___

###  past

• **past**: *[Record](_state_.record.md) | null*

Defined in debugger/src/state.ts:83

a list of changes to undo
