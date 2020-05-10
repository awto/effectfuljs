[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [ReadContext](_main_.readcontext.md)

# Class: ReadContext

An object passed to Descriptor's `read` method to support recursive invocation
for nested values

## Hierarchy

* **ReadContext**

## Index

### Constructors

* [constructor](_main_.readcontext.md#constructor)

### Properties

* [knownSyms](_main_.readcontext.md#knownsyms)
* [opts](_main_.readcontext.md#opts)
* [sharedDescriptors](_main_.readcontext.md#shareddescriptors)
* [sharedJsons](_main_.readcontext.md#sharedjsons)
* [sharedVals](_main_.readcontext.md#sharedvals)
* [symsByName](_main_.readcontext.md#optional-symsbyname)

### Methods

* [step](_main_.readcontext.md#step)

## Constructors

###  constructor

\+ **new ReadContext**(`opts`: [ReadOptions](../interfaces/_main_.readoptions.md), `sharedJsons`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[ReadContext](_main_.readcontext.md)*

Defined in src/main.ts:599

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ReadOptions](../interfaces/_main_.readoptions.md) |
`sharedJsons` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

**Returns:** *[ReadContext](_main_.readcontext.md)*

## Properties

###  knownSyms

• **knownSyms**: *Map‹symbol, [SymbolDescr](../interfaces/_main_.symboldescr.md)›*

Defined in src/main.ts:595

___

###  opts

• **opts**: *[ReadOptions](../interfaces/_main_.readoptions.md)*

Defined in src/main.ts:599

___

###  sharedDescriptors

• **sharedDescriptors**: *[Descriptor](../modules/_main_.md#descriptor)[]*

Defined in src/main.ts:598

___

###  sharedJsons

• **sharedJsons**: *[JSONValue](../modules/_main_.md#jsonvalue)[]*

Defined in src/main.ts:596

___

###  sharedVals

• **sharedVals**: *any[]*

Defined in src/main.ts:597

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](../interfaces/_main_.symboldescr.md)[]›*

Defined in src/main.ts:594

## Methods

###  step

▸ **step**(`json`: [JSONValue](../modules/_main_.md#jsonvalue)): *any*

Defined in src/main.ts:613

Invokes read recursively for nested values

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`json` | [JSONValue](../modules/_main_.md#jsonvalue) | value to read  |

**Returns:** *any*
