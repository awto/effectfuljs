[@effectful/es-persist](../README.md) › ["types"](../modules/_types_.md) › [Thenable](_types_.thenable.md)

# Interface: Thenable <**T**>

Simplified Promise-like interface

## Type parameters

▪ **T**

## Hierarchy

* **Thenable**

  ↳ [AsyncValue](_types_.asyncvalue.md)

## Index

### Methods

* [then](_types_.thenable.md#then)

## Methods

###  then

▸ **then**<**U**>(`resolve?`: function, `reject?`: function): *[Thenable](_types_.thenable.md)‹U›*

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
