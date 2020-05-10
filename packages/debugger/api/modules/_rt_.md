[@effectful/debugger](../README.md) › ["rt"](_rt_.md)

# Module: "rt"

## Index

### Variables

* [Ap](_rt_.md#const-ap)
* [Mp](_rt_.md#const-mp)
* [Sp](_rt_.md#const-sp)
* [Tp](_rt_.md#const-tp)
* [context](_rt_.md#const-context)

### Functions

* [switchDefault](_rt_.md#switchdefault)

## Variables

### `Const` Ap

• **Ap**: *any[]* = Array.prototype

Defined in debugger/src/rt.ts:11

___

### `Const` Mp

• **Mp**: *[Map](_engine_.md#const-map)‹any, any›* = Map.prototype

Defined in debugger/src/rt.ts:14

___

### `Const` Sp

• **Sp**: *[Set](_vscode_handlers_.md#const-set)‹any›* = Set.prototype

Defined in debugger/src/rt.ts:13

___

### `Const` Tp

• **Tp**: *any* = Object.getPrototypeOf(Int8Array.prototype)

Defined in debugger/src/rt.ts:12

___

### `Const` context

• **context**: *[State](../interfaces/_state_.state.md)* = Engine.context

Defined in debugger/src/rt.ts:9

## Functions

###  switchDefault

▸ **switchDefault**(`proto`: any, `name`: string, `debugImpl`: function): *void*

Defined in debugger/src/rt.ts:16

**Parameters:**

▪ **proto**: *any*

▪ **name**: *string*

▪ **debugImpl**: *function*

▸ (`this`: any, ...`vals`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |
`...vals` | any[] |

**Returns:** *void*
