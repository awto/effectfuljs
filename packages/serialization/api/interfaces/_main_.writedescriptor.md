[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [WriteDescriptor](_main_.writedescriptor.md)

# Interface: WriteDescriptor <**T**>

Describes how write values of a type

## Type parameters

▪ **T**

## Hierarchy

* **WriteDescriptor**

## Index

### Properties

* [write](_main_.writedescriptor.md#write)

## Properties

###  write

• **write**: *function*

Defined in src/main.ts:328

Sets `value` into `parent` on `index` position

**`param`** recursive writes for sub-values

**`param`** container for the value output

**`param`** either name of a field if parent is an object
                or number index if it is an array

#### Type declaration:

▸ (`ctx`: [WriteContext](../classes/_main_.writecontext.md), `value`: T, `parent`: [JSONObject](_main_.jsonobject.md) | [JSONArray](_main_.jsonarray.md), `index`: number | string): *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [WriteContext](../classes/_main_.writecontext.md) |
`value` | T |
`parent` | [JSONObject](_main_.jsonobject.md) &#124; [JSONArray](_main_.jsonarray.md) |
`index` | number &#124; string |
