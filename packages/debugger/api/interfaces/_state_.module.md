[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [Module](_state_.module.md)

# Interface: Module

module's description

## Hierarchy

* **Module**

## Index

### Properties

* [api](_state_.module.md#api)
* [cjs](_state_.module.md#cjs)
* [closSyms](_state_.module.md#clossyms)
* [evalContext](_state_.module.md#optional-evalcontext)
* [exports](_state_.module.md#exports)
* [fullPath](_state_.module.md#optional-fullpath)
* [functions](_state_.module.md#functions)
* [id](_state_.module.md#optional-id)
* [lines](_state_.module.md#optional-lines)
* [name](_state_.module.md#name)
* [params](_state_.module.md#params)
* [safePrefix](_state_.module.md#safeprefix)
* [topLevel](_state_.module.md#toplevel)
* [version](_state_.module.md#version)

## Properties

###  api

• **api**: *any*

Defined in debugger/src/state.ts:147

___

###  cjs

• **cjs**: *any*

Defined in debugger/src/state.ts:141

`module` object from CommonJS

___

###  closSyms

• **closSyms**: *object*

Defined in debugger/src/state.ts:148

#### Type declaration:

* \[ **name**: *string*\]: any

___

### `Optional` evalContext

• **evalContext**? : *undefined | object*

Defined in debugger/src/state.ts:144

parent's variables for eval

___

###  exports

• **exports**: *any*

Defined in debugger/src/state.ts:151

___

### `Optional` fullPath

• **fullPath**? : *undefined | string*

Defined in debugger/src/state.ts:134

unique id for loaded modules

___

###  functions

• **functions**: *object*

Defined in debugger/src/state.ts:137

#### Type declaration:

* \[ **name**: *string*\]: [FunctionDescr](../modules/_state_.md#functiondescr)

___

### `Optional` id

• **id**? : *number | string*

Defined in debugger/src/state.ts:136

unique id (a number for generated modules)

___

### `Optional` lines

• **lines**? : *[Brk](_state_.brk.md)[][]*

Defined in debugger/src/state.ts:150

___

###  name

• **name**: *string*

Defined in debugger/src/state.ts:132

___

###  params

• **params**: *null | object*

Defined in debugger/src/state.ts:149

___

###  safePrefix

• **safePrefix**: *string*

Defined in debugger/src/state.ts:146

string which is safe to use as a prefix to avoid clashes with other names

___

###  topLevel

• **topLevel**: *[FunctionDescr](../modules/_state_.md#functiondescr)*

Defined in debugger/src/state.ts:139

___

###  version

• **version**: *number*

Defined in debugger/src/state.ts:142
