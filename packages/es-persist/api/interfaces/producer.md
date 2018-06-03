[@effectful/es-persist](../README.md) > [Producer](../interfaces/producer.md)

# Interface: Producer

Async Iterator builder

## Type parameters
#### T 
#### I 
#### R 
#### E 
## Hierarchy

↳  [AsyncGenerator](asyncgenerator.md)<`T`>

**↳ Producer**

## Indexable

\[name: `string`\]:&nbsp;`any`
local variables and current control position

## Index

### Properties

* [__computed](producer.md#__computed)

### Methods

* [next](producer.md#next)
* [return](producer.md#return)
* [run](producer.md#run)
* [send](producer.md#send)
* [stop](producer.md#stop)
* [throw](producer.md#throw)

---

## Properties

<a id="__computed"></a>

###  __computed

**● __computed**: *[Context](context.md)*

*Inherited from [AsyncGenerator](asyncgenerator.md).[__computed](asyncgenerator.md#__computed)*

*Defined in types.ts:109*

context object for this function

___

## Methods

<a id="next"></a>

###  next

▸ **next**(value: *`I`*): [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

*Inherited from [AsyncGenerator](asyncgenerator.md).[next](asyncgenerator.md#next)*

*Defined in types.ts:103*

ECMAScript compatible `next` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `I` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

___
<a id="return"></a>

###  return

▸ **return**(result: *`R`*): [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

*Inherited from [AsyncGenerator](asyncgenerator.md).[return](asyncgenerator.md#return)*

*Defined in types.ts:107*

ECMAScript compatible `return` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| result | `R` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

___
<a id="run"></a>

###  run

▸ **run**(): `any`

*Inherited from [Job](job.md).[run](job.md#run)*

*Defined in types.ts:73*

Called by the scheduler

**Returns:** `any`

___
<a id="send"></a>

###  send

▸ **send**(value: *`T`*): `any`

*Defined in types.ts:207*

Yields `{value, done false}` as a result of next/current Iterator method (next/return/throw)

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `any`

___
<a id="stop"></a>

###  stop

▸ **stop**(value: *`any`*): `any`

*Defined in types.ts:209*

yields `{value,done:true}` as a result of next/current Iterator method

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `any`

___
<a id="throw"></a>

###  throw

▸ **throw**(reason: *`E`*): [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

*Inherited from [AsyncGenerator](asyncgenerator.md).[throw](asyncgenerator.md#throw)*

*Defined in types.ts:105*

ECMAScript compatible `throw` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| reason | `E` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`T`, `R`>>

___

