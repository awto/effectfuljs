[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [ReadDescriptor](_main_.readdescriptor.md)

# Interface: ReadDescriptor <**T**>

Describes how to read values of a type

## Type parameters

▪ **T**

## Hierarchy

* **ReadDescriptor**

## Index

### Properties

* [create](_main_.readdescriptor.md#create)
* [read](_main_.readdescriptor.md#read)
* [readContent](_main_.readdescriptor.md#readcontent)
* [reset](_main_.readdescriptor.md#reset)

## Properties

###  create

• **create**: *function*

Defined in src/main.ts:229

The first part of `read`, just creates a corresponding value without traversing into children.
This is needed to avoid infinite loops on recursive values.

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`returns`** - resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](../modules/_main_.md#jsonvalue)): *T*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](../modules/_main_.md#jsonvalue) |

___

###  read

• **read**: *function*

Defined in src/main.ts:221

Reads value from `json` value

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`returns`** - resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](../modules/_main_.md#jsonvalue)): *T*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](../modules/_main_.md#jsonvalue) |

___

###  readContent

• **readContent**: *function*

Defined in src/main.ts:244

The second part of `read`, creates children and sets them into `value`.
This is needed to avoid infinite loops on recursive values.

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`param`** resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](../classes/_main_.readcontext.md), `json`: [JSONValue](../modules/_main_.md#jsonvalue), `value`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`json` | [JSONValue](../modules/_main_.md#jsonvalue) |
`value` | T |

___

###  reset

• **reset**: *function*

Defined in src/main.ts:236

Like `create` but for values which are already built, and only must be reset to some initial sate

**`param`** recursive reads handling for sub-values

**`param`** input JSON

**`param`** resulting JS value

#### Type declaration:

▸ (`ctx`: [ReadContext](../classes/_main_.readcontext.md), `value`: T, `json`: [JSONValue](../modules/_main_.md#jsonvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [ReadContext](../classes/_main_.readcontext.md) |
`value` | T |
`json` | [JSONValue](../modules/_main_.md#jsonvalue) |
