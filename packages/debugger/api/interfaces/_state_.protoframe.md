[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [ProtoFrame](_state_.protoframe.md)

# Interface: ProtoFrame

common prototype for call descriptions of each function

## Hierarchy

* [Env](_state_.env.md)

  ↳ **ProtoFrame**

  ↳ [Frame](_state_.frame.md)

## Index

### Properties

* [$](_state_.protoframe.md#)
* [func](_state_.protoframe.md#func)
* [meta](_state_.protoframe.md#meta)
* [parent](_state_.protoframe.md#parent)

## Properties

###  $

• **$**: *any[]*

*Inherited from [Env](_state_.env.md).[$](_state_.env.md#)*

Defined in debugger/src/state.ts:9

local variables

___

###  func

• **func**: *function*

Defined in debugger/src/state.ts:20

a constructed function's value

#### Type declaration:

▸ (): *any*

___

###  meta

• **meta**: *[FunctionDescr](../modules/_state_.md#functiondescr)*

Defined in debugger/src/state.ts:18

meta-data

___

###  parent

• **parent**: *[Frame](_state_.frame.md) | null*

Defined in debugger/src/state.ts:21
