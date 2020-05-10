[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [AsyncValue](_types_.asyncvalue.md)

# Interface: AsyncValue <**T**>

Implemented by values to be used in `await` expressions arguments in
transpiled code.  Unlike Promise, it takes continuation objects with two
settlement methods instead of two callbacks. It also returns nothing to save
some allocations.

It is also Thenable for compatibility with not-transpiled code.

`Promise` is extended to support this interface as well. However, using them
makes the program not serializable in some states. *

## Type parameters

▪ **T**

type of a `await` result

## Hierarchy

* [Thenable](_types_.thenable.md)‹T›

  ↳ **AsyncValue**

  ↳ [Async](_types_.async.md)

## Index

### Methods

* [[awaitSymbol]](_types_.asyncvalue.md#[awaitsymbol])
* [then](_types_.asyncvalue.md#then)

## Methods

###  [awaitSymbol]

▸ **[awaitSymbol]**(`cont`: [Continuation](_types_.continuation.md)‹T›): *any*

Defined in types.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`cont` | [Continuation](_types_.continuation.md)‹T› |

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
