[@effectful/cc](../README.md) > [Context](../classes/context.md)

# Class: Context

EffectfulJS abstract interface implementation

## Hierarchy

**Context**

## Index

### Methods

* [chain](context.md#chain)
* [jump](context.md#jump)
* [jumpR](context.md#jumpr)
* [pure](context.md#pure)
* [scope](context.md#scope)

---

## Methods

<a id="chain"></a>

###  chain

▸ **chain**A,B(v: *[CCV](../#ccv)<`A`>*, f: *[Step](../#step)<`A`, `B`>*): [CC](../interfaces/cc.md)<`B`>

*Defined in main.ts:37*

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type |
| ------ | ------ |
| v | [CCV](../#ccv)<`A`> | 
| f | [Step](../#step)<`A`, `B`> | 

**Returns:** [CC](../interfaces/cc.md)<`B`>

___
<a id="jump"></a>

###  jump

▸ **jump**A,B(v: *`A`*, f: *[Step](../#step)<`A`, `B`>*): [CCV](../#ccv)<`B`>

*Defined in main.ts:40*

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type |
| ------ | ------ |
| v | `A` | 
| f | [Step](../#step)<`A`, `B`> | 

**Returns:** [CCV](../#ccv)<`B`>

___
<a id="jumpr"></a>

###  jumpR

▸ **jumpR**A,B(v: *`A`*, f: *[Step](../#step)<`A`, `B`>*): [CC](../interfaces/cc.md)<`B`>

*Defined in main.ts:43*

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type |
| ------ | ------ |
| v | `A` | 
| f | [Step](../#step)<`A`, `B`> | 

**Returns:** [CC](../interfaces/cc.md)<`B`>

___
<a id="pure"></a>

###  pure

▸ **pure**A(v: *`A`*): [CC](../interfaces/cc.md)<`A`>

*Defined in main.ts:46*

**Type parameters:**

#### A 
**Parameters:**

| Param | Type |
| ------ | ------ |
| v | `A` | 

**Returns:** [CC](../interfaces/cc.md)<`A`>

___
<a id="scope"></a>

###  scope

▸ **scope**A(f: *`function`*): [CC](../interfaces/cc.md)<`A`>

*Defined in main.ts:49*

**Type parameters:**

#### A 
**Parameters:**

| Param | Type |
| ------ | ------ |
| f | `function` | 

**Returns:** [CC](../interfaces/cc.md)<`A`>

___

