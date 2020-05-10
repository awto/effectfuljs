[@effectful/cc](../README.md) › ["main"](../modules/_main_.md) › [Context](_main_.context.md)

# Class: Context

EffectfulJS abstract interface implementation

## Hierarchy

* **Context**

## Index

### Methods

* [chain](_main_.context.md#chain)
* [jump](_main_.context.md#jump)
* [jumpR](_main_.context.md#jumpr)
* [pure](_main_.context.md#pure)
* [scope](_main_.context.md#scope)

## Methods

###  chain

▸ **chain**<**A**, **B**>(`v`: [CCV](../modules/_main_.md#ccv)‹A›, `f`: [Step](../modules/_main_.md#step)‹A, B›): *[CC](../interfaces/_main_.cc.md)‹B›*

Defined in main.ts:37

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

Name | Type |
------ | ------ |
`v` | [CCV](../modules/_main_.md#ccv)‹A› |
`f` | [Step](../modules/_main_.md#step)‹A, B› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹B›*

___

###  jump

▸ **jump**<**A**, **B**>(`v`: A, `f`: [Step](../modules/_main_.md#step)‹A, B›): *[CCV](../modules/_main_.md#ccv)‹B›*

Defined in main.ts:40

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |
`f` | [Step](../modules/_main_.md#step)‹A, B› |

**Returns:** *[CCV](../modules/_main_.md#ccv)‹B›*

___

###  jumpR

▸ **jumpR**<**A**, **B**>(`v`: A, `f`: [Step](../modules/_main_.md#step)‹A, B›): *[CC](../interfaces/_main_.cc.md)‹B›*

Defined in main.ts:43

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |
`f` | [Step](../modules/_main_.md#step)‹A, B› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹B›*

___

###  pure

▸ **pure**<**A**>(`v`: A): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:46

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  scope

▸ **scope**<**A**>(`f`: function): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:49

**Type parameters:**

▪ **A**

**Parameters:**

▪ **f**: *function*

▸ (`t`: [Context](_main_.context.md)): *[CC](../interfaces/_main_.cc.md)‹A›*

**Parameters:**

Name | Type |
------ | ------ |
`t` | [Context](_main_.context.md) |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*
