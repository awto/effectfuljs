[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Continuation](_types_.continuation.md)

# Interface: Continuation <**T**>

Callbacks for specifying what to do next after async action is settled.

## Type parameters

▪ **T**

## Hierarchy

* **Continuation**

  ↳ [Async](_types_.async.md)

## Index

### Methods

* [reject](_types_.continuation.md#reject)
* [resume](_types_.continuation.md#resume)

## Methods

###  reject

▸ **reject**(`reason`: any): *any*

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

Defined in types.ts:67

Called if the async action has been successful

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | result of the async action  |

**Returns:** *any*
