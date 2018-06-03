[@effectful/es-persist](../README.md) > [Async](../interfaces/async.md)

# Interface: Async

Defines async function execution state

## Type parameters
#### T 

result type

## Hierarchy

 [Continuation](continuation.md)<`T`>

 [Job](job.md)

**↳ Async**

## Indexable

\[name: `string`\]:&nbsp;`any`
local variables and current control position

## Index

### Properties

* [__computed](async.md#__computed)

### Methods

* [reject](async.md#reject)
* [resume](async.md#resume)
* [run](async.md#run)

---

## Properties

<a id="__computed"></a>

###  __computed

**● __computed**: *[Context](context.md)*

*Defined in types.ts:85*

context object for this function

___

## Methods

<a id="reject"></a>

###  reject

▸ **reject**(reason: *`any`*): `any`

*Inherited from [Continuation](continuation.md).[reject](continuation.md#reject)*

*Defined in types.ts:65*

Called if the async action has thrown an exception (rejected)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `any` |  the thrown exception object |

**Returns:** `any`

___
<a id="resume"></a>

###  resume

▸ **resume**(value: *`T`*): `any`

*Inherited from [Continuation](continuation.md).[resume](continuation.md#resume)*

*Defined in types.ts:59*

Called if the async action has been successful

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  result of the async action |

**Returns:** `any`

___
<a id="run"></a>

###  run

▸ **run**(): `any`

*Inherited from [Job](job.md).[run](job.md#run)*

*Defined in types.ts:73*

Called by the scheduler

**Returns:** `any`

___

