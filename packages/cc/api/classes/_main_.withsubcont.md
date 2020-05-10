[@effectful/cc](../README.md) › ["main"](../modules/_main_.md) › [WithSubCont](_main_.withsubcont.md)

# Class: WithSubCont <**A, B**>

## Type parameters

▪ **A**

▪ **B**

## Hierarchy

* **WithSubCont**

## Implements

* [CC](../interfaces/_main_.cc.md)‹A›

## Index

### Constructors

* [constructor](_main_.withsubcont.md#constructor)

### Methods

* [[stepSymbol]](_main_.withsubcont.md#[stepsymbol])

## Constructors

###  constructor

\+ **new WithSubCont**(`p`: [Prompt](_main_.prompt.md)‹B›, `k`: function): *[WithSubCont](_main_.withsubcont.md)*

Defined in main.ts:106

**Parameters:**

▪ **p**: *[Prompt](_main_.prompt.md)‹B›*

▪ **k**: *function*

▸ (`sc`: [SubCont](../modules/_main_.md#subcont)‹A, B›): *[CCV](../modules/_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`sc` | [SubCont](../modules/_main_.md#subcont)‹A, B› |

**Returns:** *[WithSubCont](_main_.withsubcont.md)*

## Methods

###  [stepSymbol]

▸ **[stepSymbol]**(`k`: [Seq](../modules/_main_.md#seq)‹A, any›): *[CCV](../modules/_main_.md#ccv)‹any›*

*Implementation of [CC](../interfaces/_main_.cc.md)*

Defined in main.ts:111

**Parameters:**

Name | Type |
------ | ------ |
`k` | [Seq](../modules/_main_.md#seq)‹A, any› |

**Returns:** *[CCV](../modules/_main_.md#ccv)‹any›*
