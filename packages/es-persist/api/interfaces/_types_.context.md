[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Context](_types_.context.md)

# Interface: Context

Stores currently running async and async generator functions, along with
scheduled jobs.

## Hierarchy

* **Context**

## Index

### Properties

* [runnint](_types_.context.md#optional-runnint)
* [scheduler](_types_.context.md#scheduler)

### Methods

* [reg](_types_.context.md#reg)
* [unreg](_types_.context.md#unreg)

## Properties

### `Optional` runnint

• **runnint**? : *Set‹[Async](_types_.async.md) | [AsyncGenerator](_types_.asyncgenerator.md)›*

Defined in types.ts:42

Stores currently running an async generator and async functions. The
default implementation provides it, but it isn't necessary for overrides

___

###  scheduler

• **scheduler**: *[Scheduler](_types_.scheduler.md)*

Defined in types.ts:44

All the jobs from `threads` to be scheduled using this scheduler

## Methods

###  reg

▸ **reg**(`thread`: [Async](_types_.async.md) | [AsyncGenerator](_types_.asyncgenerator.md)): *any*

Defined in types.ts:35

Called when either async function or async generators started

**Parameters:**

Name | Type |
------ | ------ |
`thread` | [Async](_types_.async.md) &#124; [AsyncGenerator](_types_.asyncgenerator.md) |

**Returns:** *any*

___

###  unreg

▸ **unreg**(`thread`: [Async](_types_.async.md) | [AsyncGenerator](_types_.asyncgenerator.md)): *any*

Defined in types.ts:37

Called when either async function or async generators exited

**Parameters:**

Name | Type |
------ | ------ |
`thread` | [Async](_types_.async.md) &#124; [AsyncGenerator](_types_.asyncgenerator.md) |

**Returns:** *any*
