[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Async](_types_.async.md)

# Interface: Async <**T, T**>

Defines async function execution state

## Type parameters

▪ **T**

result type

▪ **T**

## Hierarchy

* [Job](_types_.job.md)

* [Continuation](_types_.continuation.md)

  ↳ [AsyncValue](_types_.asyncvalue.md)‹T›

  ↳ **Async**

## Indexable

* \[ **name**: *string*\]: any

Local variables and current control position

## Index

### Properties

* [[contextSymbol]](_types_.async.md#[contextsymbol])

### Methods

* [[awaitSymbol]](_types_.async.md#[awaitsymbol])
* [reject](_types_.async.md#reject)
* [resume](_types_.async.md#resume)
* [run](_types_.async.md#run)
* [then](_types_.async.md#then)

## Properties

###  [contextSymbol]

• **[contextSymbol]**: *[Context](_types_.context.md)*

Defined in types.ts:93

Context object for this function

## Methods

###  [awaitSymbol]

▸ **[awaitSymbol]**(`cont`: [Continuation](_types_.continuation.md)‹T›): *any*

*Inherited from [AsyncValue](_types_.asyncvalue.md).[[awaitSymbol]](_types_.asyncvalue.md#[awaitsymbol])*

Defined in types.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`cont` | [Continuation](_types_.continuation.md)‹T› |

**Returns:** *any*

___

###  reject

▸ **reject**(`reason`: any): *any*

*Inherited from [Continuation](_types_.continuation.md).[reject](_types_.continuation.md#reject)*

Defined in types.ts:73

Called if the async action has thrown an exception (rejected)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`reason` | any | the thrown exception object  |

**Returns:** *any*

___

###  resume

▸ **resume**(`value`: T): *any*

*Inherited from [Continuation](_types_.continuation.md).[resume](_types_.continuation.md#resume)*

Defined in types.ts:67

Called if the async action has been successful

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | result of the async action  |

**Returns:** *any*

___

###  run

▸ **run**(): *any*

*Inherited from [Job](_types_.job.md).[run](_types_.job.md#run)*

Defined in types.ts:81

Called by the scheduler

**Returns:** *any*

___

###  then

▸ **then**<**U**>(`resolve?`: function, `reject?`: function): *[Thenable](_types_.thenable.md)‹U›*

*Inherited from [Thenable](_types_.thenable.md).[then](_types_.thenable.md#then)*

Defined in types.ts:7

**Type parameters:**

▪ **U**

**Parameters:**

▪`Optional`  **resolve**: *function*

▸ (`value`: T): *U | [Thenable](_types_.thenable.md)‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

▪`Optional`  **reject**: *function*

▸ (`reason`: any): *U | [Thenable](_types_.thenable.md)‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *[Thenable](_types_.thenable.md)‹U›*
