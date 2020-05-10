[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [WriteContext](_main_.writecontext.md)

# Class: WriteContext

An object passed to Descriptor's `write` method to support recursive
invocation for nested values

## Hierarchy

* **WriteContext**

## Index

### Constructors

* [constructor](_main_.writecontext.md#constructor)

### Properties

* [jobs](_main_.writecontext.md#optional-jobs)
* [knownSyms](_main_.writecontext.md#optional-knownsyms)
* [opts](_main_.writecontext.md#opts)
* [sharedRefs](_main_.writecontext.md#sharedrefs)
* [sharedRefsMap](_main_.writecontext.md#sharedrefsmap)
* [symsByName](_main_.writecontext.md#optional-symsbyname)

### Methods

* [step](_main_.writecontext.md#step)

## Constructors

###  constructor

\+ **new WriteContext**(`opts`: [WriteOptions](../interfaces/_main_.writeoptions.md)): *[WriteContext](_main_.writecontext.md)*

Defined in src/main.ts:533

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [WriteOptions](../interfaces/_main_.writeoptions.md) |

**Returns:** *[WriteContext](_main_.writecontext.md)*

## Properties

### `Optional` jobs

• **jobs**? : *[SharedRefInfo](../interfaces/_main_.sharedrefinfo.md)*

Defined in src/main.ts:533

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](../interfaces/_main_.symboldescr.md)›*

Defined in src/main.ts:532

___

###  opts

• **opts**: *[WriteOptions](../interfaces/_main_.writeoptions.md)*

Defined in src/main.ts:530

___

###  sharedRefs

• **sharedRefs**: *[SharedRefInfo](../interfaces/_main_.sharedrefinfo.md)[]*

Defined in src/main.ts:529

___

###  sharedRefsMap

• **sharedRefsMap**: *Map‹any, [SharedRefInfo](../interfaces/_main_.sharedrefinfo.md)›*

Defined in src/main.ts:528

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](../interfaces/_main_.symboldescr.md)[]›*

Defined in src/main.ts:531

## Methods

###  step

▸ **step**(`value`: any, `parent`: [JSONArray](../interfaces/_main_.jsonarray.md) | [JSONObject](../interfaces/_main_.jsonobject.md), `key`: number | string): *[JSONValue](../modules/_main_.md#jsonvalue)*

Defined in src/main.ts:551

Invokes write recursively for nested values

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | value to write |
`parent` | [JSONArray](../interfaces/_main_.jsonarray.md) &#124; [JSONObject](../interfaces/_main_.jsonobject.md) | container for the value output |
`key` | number &#124; string | either name of a field if parent is an object               or number index if it is an array  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)*
