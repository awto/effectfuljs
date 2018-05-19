[@effectful/cc](../README.md) > [Chain](../classes/chain.md)

# Class: Chain

## Type parameters
#### A 
#### B 
## Hierarchy

**Chain**

## Implements

* [CC](../interfaces/cc.md)<`B`>

## Index

### Constructors

* [constructor](chain.md#constructor)

### Methods

* [__computed](chain.md#__computed)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Chain**(a: *[CCV](../#ccv)<`A`>*, f: *[Step](../#step)<`A`, `B`>*, x?: *[Context](context.md)*): [Chain](chain.md)

*Defined in main.ts:89*

**Parameters:**

| Param | Type |
| ------ | ------ |
| a | [CCV](../#ccv)<`A`> |
| f | [Step](../#step)<`A`, `B`> |
| `Optional` x | [Context](context.md) |

**Returns:** [Chain](chain.md)

___

## Methods

<a id="__computed"></a>

###  __computed

▸ **__computed**(k: *[Seq](../#seq)<`B`, `any`>*): [CCV](../#ccv)<`any`>

*Implementation of [CC](../interfaces/cc.md).[__computed](../interfaces/cc.md#__computed)*

*Defined in main.ts:95*

**Parameters:**

| Param | Type |
| ------ | ------ |
| k | [Seq](../#seq)<`B`, `any`> |

**Returns:** [CCV](../#ccv)<`any`>

___

