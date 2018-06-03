[@effectful/es-persist](../README.md) > [AsyncGenerator](../interfaces/asyncgenerator.md)

# Interface: AsyncGenerator

Defines async generator function execution state

## Type parameters
#### O 

type of `yield` expressions argument

#### I 

type of `yield` expressions result

#### R 

type of `return` statement argument

#### E 

type of `throw` statement argument

## Hierarchy

 [Job](job.md)

**↳ AsyncGenerator**

↳  [Producer](producer.md)

## Indexable

\[name: `string`\]:&nbsp;`any`
local variables and current control position

## Index

### Properties

* [__computed](asyncgenerator.md#__computed)

### Methods

* [next](asyncgenerator.md#next)
* [return](asyncgenerator.md#return)
* [run](asyncgenerator.md#run)
* [throw](asyncgenerator.md#throw)

---

## Properties

<a id="__computed"></a>

###  __computed

**● __computed**: *[Context](context.md)*

*Defined in types.ts:109*

context object for this function

___

## Methods

<a id="next"></a>

###  next

▸ **next**(value: *`I`*): [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

*Defined in types.ts:103*

ECMAScript compatible `next` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `I` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

___
<a id="return"></a>

###  return

▸ **return**(result: *`R`*): [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

*Defined in types.ts:107*

ECMAScript compatible `return` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| result | `R` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

___
<a id="run"></a>

###  run

▸ **run**(): `any`

*Inherited from [Job](job.md).[run](job.md#run)*

*Defined in types.ts:73*

Called by the scheduler

**Returns:** `any`

___
<a id="throw"></a>

###  throw

▸ **throw**(reason: *`E`*): [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

*Defined in types.ts:105*

ECMAScript compatible `throw` method

**Parameters:**

| Param | Type |
| ------ | ------ |
| reason | `E` |

**Returns:** [Continuation](continuation.md)<[Result](../#result)<`O`, `R`>>

___

