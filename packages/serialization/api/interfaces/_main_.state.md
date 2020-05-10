[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [State](_main_.state.md)

# Interface: State

## Hierarchy

* **State**

## Index

### Properties

* [byName](_main_.state.md#byname)
* [byObject](_main_.state.md#byobject)
* [byValue](_main_.state.md#byvalue)
* [symbol](_main_.state.md#symbol)

## Properties

###  byName

• **byName**: *Map‹string, [Descriptor](../modules/_main_.md#descriptor)›*

Defined in src/main.ts:56

descriptors registered by type's name

___

###  byObject

• **byObject**: *WeakMap‹any, [Descriptor](../modules/_main_.md#descriptor)›*

Defined in src/main.ts:60

descriptors registered by some value

___

###  byValue

• **byValue**: *Map‹any, [Descriptor](../modules/_main_.md#descriptor)›*

Defined in src/main.ts:58

descriptors registered by some primitive value

___

###  symbol

• **symbol**: *symbol*

Defined in src/main.ts:54

name for a property storing descriptor
