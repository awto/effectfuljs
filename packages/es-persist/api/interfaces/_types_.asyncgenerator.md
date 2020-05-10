[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [AsyncGenerator](_types_.asyncgenerator.md)

# Interface: AsyncGenerator <**O, I, R, E, O, I, R, E**>

Defines async generator function execution state

## Type parameters

▪ **O**

type of `yield` expressions argument

▪ **I**

type of `yield` expressions result

▪ **R**

type of `return` statement argument

▪ **E**

type of `throw` statement argument

▪ **O**

▪ **I**

▪ **R**

▪ **E**

## Hierarchy

* [AsyncIterator](_types_.asynciterator.md)‹O, I, R›

* [Job](_types_.job.md)

  ↳ **AsyncGenerator**

## Indexable

* \[ **name**: *string*\]: any

Local variables and current control position

## Index

### Properties

* [[contextSymbol]](_types_.asyncgenerator.md#[contextsymbol])

### Methods

* [next](_types_.asyncgenerator.md#next)
* [return](_types_.asyncgenerator.md#return)
* [run](_types_.asyncgenerator.md#run)
* [throw](_types_.asyncgenerator.md#throw)

## Properties

###  [contextSymbol]

• **[contextSymbol]**: *[Context](_types_.context.md)*

Defined in types.ts:130

Context object for this thread

## Methods

###  next

▸ **next**(`value`: I): *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

*Inherited from [AsyncIterator](_types_.asynciterator.md).[next](_types_.asynciterator.md#next)*

Defined in types.ts:106

ECMAScript compatible `next` method

**Parameters:**

Name | Type |
------ | ------ |
`value` | I |

**Returns:** *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

___

###  return

▸ **return**(`result`: R): *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

Defined in types.ts:123

ECMAScript compatible `return` method

**Parameters:**

Name | Type |
------ | ------ |
`result` | R |

**Returns:** *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

___

###  run

▸ **run**(): *any*

*Inherited from [Job](_types_.job.md).[run](_types_.job.md#run)*

Defined in types.ts:81

Called by the scheduler

**Returns:** *any*

___

###  throw

▸ **throw**(`reason`: E): *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

Defined in types.ts:121

ECMAScript compatible `throw` method

**Parameters:**

Name | Type |
------ | ------ |
`reason` | E |

**Returns:** *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*
