[@effectful/cc](../README.md) › ["main"](../modules/_main_.md) › [Chain](_main_.chain.md)

# Class: Chain <**A, B**>

## Type parameters

▪ **A**

▪ **B**

## Hierarchy

* **Chain**

## Implements

* [CC](../interfaces/_main_.cc.md)‹B›

## Index

### Constructors

* [constructor](_main_.chain.md#constructor)

### Methods

* [[stepSymbol]](_main_.chain.md#[stepsymbol])

## Constructors

###  constructor

\+ **new Chain**(`a`: [CCV](../modules/_main_.md#ccv)‹A›, `f`: [Step](../modules/_main_.md#step)‹A, B›, `x?`: [Context](_main_.context.md)): *[Chain](_main_.chain.md)*

Defined in main.ts:88

**Parameters:**

Name | Type |
------ | ------ |
`a` | [CCV](../modules/_main_.md#ccv)‹A› |
`f` | [Step](../modules/_main_.md#step)‹A, B› |
`x?` | [Context](_main_.context.md) |

**Returns:** *[Chain](_main_.chain.md)*

## Methods

###  [stepSymbol]

▸ **[stepSymbol]**(`k`: [Seq](../modules/_main_.md#seq)‹B, any›): *[CCV](../modules/_main_.md#ccv)‹any›*

*Implementation of [CC](../interfaces/_main_.cc.md)*

Defined in main.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`k` | [Seq](../modules/_main_.md#seq)‹B, any› |

**Returns:** *[CCV](../modules/_main_.md#ccv)‹any›*
