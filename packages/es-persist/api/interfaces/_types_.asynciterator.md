[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [AsyncIterator](_types_.asynciterator.md)

# Interface: AsyncIterator <**O, I, R**>

ECMAScript compatible AsyncIterator result

## Type parameters

▪ **O**

▪ **I**

▪ **R**

## Hierarchy

* **AsyncIterator**

  ↳ [AsyncGenerator](_types_.asyncgenerator.md)

  ↳ [Producer](_types_.producer.md)

## Index

### Methods

* [next](_types_.asynciterator.md#next)

## Methods

###  next

▸ **next**(`value`: I): *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*

Defined in types.ts:106

ECMAScript compatible `next` method

**Parameters:**

Name | Type |
------ | ------ |
`value` | I |

**Returns:** *[Continuation](_types_.continuation.md)‹[Result](../modules/_types_.md#result)‹O, R››*
