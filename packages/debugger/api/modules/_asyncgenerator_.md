[@effectful/debugger](../README.md) › ["asyncGenerator"](_asyncgenerator_.md)

# Module: "asyncGenerator"

## Index

### Classes

* [AsyncGenerator](../classes/_asyncgenerator_.asyncgenerator.md)
* [AsyncIterableThis](../classes/_asyncgenerator_.asynciterablethis.md)

### Variables

* [context](_asyncgenerator_.md#context)
* [defineProperty](_asyncgenerator_.md#defineproperty)

### Functions

* [asyncGeneratorMethod](_asyncgenerator_.md#asyncgeneratormethod)
* [dequeue](_asyncgenerator_.md#dequeue)
* [enqueue](_asyncgenerator_.md#enqueue)
* [frameAG](_asyncgenerator_.md#frameag)
* [nextReturnStep](_asyncgenerator_.md#nextreturnstep)
* [nextStep](_asyncgenerator_.md#nextstep)
* [nextThrowStep](_asyncgenerator_.md#nextthrowstep)
* [retAG](_asyncgenerator_.md#retag)
* [runQueue](_asyncgenerator_.md#runqueue)
* [unhandledAG](_asyncgenerator_.md#unhandledag)
* [yldAG](_asyncgenerator_.md#yldag)

## Variables

###  context

• **context**: *[State](../interfaces/_state_.state.md)*

Defined in debugger/src/asyncGenerator.ts:13

___

###  defineProperty

• **defineProperty**: *defineProperty*

Defined in debugger/src/asyncGenerator.ts:14

## Functions

###  asyncGeneratorMethod

▸ **asyncGeneratorMethod**(`step`: function): *function*

Defined in debugger/src/asyncGenerator.ts:59

**Parameters:**

▪ **step**: *function*

▸ (`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

**Returns:** *function*

▸ (`this`: object, `value`: any): *Promise‹[Item](_state_.md#item)›*

**Parameters:**

▪ **this**: *object*

Name | Type |
------ | ------ |
`_frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |

▪ **value**: *any*

___

###  dequeue

▸ **dequeue**(`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)): *void*

Defined in debugger/src/asyncGenerator.ts:109

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |

**Returns:** *void*

___

###  enqueue

▸ **enqueue**(`this`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `step`: function, `value`: any, `rs`: function, `rj`: function): *void*

Defined in debugger/src/asyncGenerator.ts:49

**Parameters:**

▪ **this**: *[AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)*

▪ **step**: *function*

▸ (`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

▪ **value**: *any*

▪ **rs**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

▪ **rj**: *function*

▸ (`reason`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *void*

___

###  frameAG

▸ **frameAG**(`closure`: any, `newTarget`: any): *[AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)*

Defined in debugger/src/asyncGenerator.ts:114

**Parameters:**

Name | Type |
------ | ------ |
`closure` | any |
`newTarget` | any |

**Returns:** *[AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)*

___

###  nextReturnStep

▸ **nextReturnStep**(`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

Defined in debugger/src/asyncGenerator.ts:102

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

**Returns:** *Promise‹[Item](_state_.md#item)›*

___

###  nextStep

▸ **nextStep**(`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

Defined in debugger/src/asyncGenerator.ts:88

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

**Returns:** *Promise‹[Item](_state_.md#item)›*

___

###  nextThrowStep

▸ **nextThrowStep**(`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

Defined in debugger/src/asyncGenerator.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

**Returns:** *Promise‹[Item](_state_.md#item)›*

___

###  retAG

▸ **retAG**(`value`: any): *any*

Defined in debugger/src/asyncGenerator.ts:135

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

###  runQueue

▸ **runQueue**(`this`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `step`: function, `value`: any, `rs`: function, `rj`: function): *void*

Defined in debugger/src/asyncGenerator.ts:34

**Parameters:**

▪ **this**: *[AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md)*

▪ **step**: *function*

▸ (`frame`: [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md), `value`: any): *Promise‹[Item](_state_.md#item)›*

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [AsyncGeneratorFrame](../interfaces/_state_.asyncgeneratorframe.md) |
`value` | any |

▪ **value**: *any*

▪ **rs**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

▪ **rj**: *function*

▸ (`reason`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *void*

___

###  unhandledAG

▸ **unhandledAG**(`reason`: any): *any*

Defined in debugger/src/asyncGenerator.ts:151

**Parameters:**

Name | Type |
------ | ------ |
`reason` | any |

**Returns:** *any*

___

###  yldAG

▸ **yldAG**(`value`: any): *any*

Defined in debugger/src/asyncGenerator.ts:124

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*
