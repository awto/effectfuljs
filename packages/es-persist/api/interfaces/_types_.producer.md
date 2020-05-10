[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Producer](_types_.producer.md)

# Interface: Producer <**T, R**>

Async Iterator builder

## Type parameters

▪ **T**

▪ **R**

## Hierarchy

* [AsyncIterator](_types_.asynciterator.md)‹T, T›

  ↳ **Producer**

## Index

### Methods

* [next](_types_.producer.md#next)
* [send](_types_.producer.md#send)
* [stop](_types_.producer.md#stop)

## Methods

###  next

▸ **next**(`value`: T): *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹T, R››*

*Inherited from [AsyncIterator](_types_.asynciterator.md).[next](_types_.asynciterator.md#next)*

Defined in types.ts:106

ECMAScript compatible `next` method

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹T, R››*

___

###  send

▸ **send**(`value`: T): *any*

Defined in types.ts:226

Yields `{value, done false}` as a result of next/current Iterator
method (next/return/throw)

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *any*

___

###  stop

▸ **stop**(`value`: any): *any*

Defined in types.ts:228

Yields `{value,done:true}` as a result of next/current Iterator method

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*
