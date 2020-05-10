[@effectful/debugger](../README.md) › ["async"](_async_.md)

# Module: "async"

## Index

### Interfaces

* [AsyncFrame](../interfaces/_async_.asyncframe.md)

### Variables

* [AsyncFunctionPrototype](_async_.md#let-asyncfunctionprototype)
* [context](_async_.md#context)
* [token](_async_.md#token)

### Functions

* [awt](_async_.md#awt)
* [awtOnReject](_async_.md#awtonreject)
* [awtOnResolve](_async_.md#awtonresolve)
* [frameA](_async_.md#framea)
* [retA](_async_.md#reta)
* [scopeInit](_async_.md#scopeinit)
* [unhandledA](_async_.md#unhandleda)

## Variables

### `Let` AsyncFunctionPrototype

• **AsyncFunctionPrototype**: *any*

Defined in debugger/src/async.ts:20

___

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/async.ts:12

___

###  token

• **token**: *object*

Defined in debugger/src/async.ts:12

#### Type declaration:

* **_effectToken**: *boolean* = true

## Functions

###  awt

▸ **awt**(`asyncValue`: any): *any*

Defined in debugger/src/async.ts:89

**Parameters:**

Name | Type |
------ | ------ |
`asyncValue` | any |

**Returns:** *any*

___

###  awtOnReject

▸ **awtOnReject**(`this`: [AsyncFrame](../interfaces/_async_.asyncframe.md), `error`: any): *any*

Defined in debugger/src/async.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`this` | [AsyncFrame](../interfaces/_async_.asyncframe.md) |
`error` | any |

**Returns:** *any*

___

###  awtOnResolve

▸ **awtOnResolve**(`this`: [Frame](../interfaces/_state_.frame.md), `value`: any): *any*

Defined in debugger/src/async.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Frame](../interfaces/_state_.frame.md) |
`value` | any |

**Returns:** *any*

___

###  frameA

▸ **frameA**(`proto`: any, `newTarget`: any): *[AsyncFrame](../interfaces/_async_.asyncframe.md)*

Defined in debugger/src/async.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`proto` | any |
`newTarget` | any |

**Returns:** *[AsyncFrame](../interfaces/_async_.asyncframe.md)*

___

###  retA

▸ **retA**(`value`: any): *any*

Defined in debugger/src/async.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  scopeInit

▸ **scopeInit**(`this`: [AsyncFrame](../interfaces/_async_.asyncframe.md), `rs`: function, `rj`: function): *void*

Defined in debugger/src/async.ts:32

**Parameters:**

▪ **this**: *[AsyncFrame](../interfaces/_async_.asyncframe.md)*

▪ **rs**: *function*

▸ (`value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

▪ **rj**: *function*

▸ (`value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  unhandledA

▸ **unhandledA**(`reason`: any): *any*

Defined in debugger/src/async.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *any*
