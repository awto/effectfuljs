[@effectful/debugger](../README.md) › ["persist"](_persist_.md)

# Module: "persist"

## Index

### Variables

* [BindDescriptor](_persist_.md#const-binddescriptor)
* [ModuleDescriptor](_persist_.md#const-moduledescriptor)
* [boundArgsSymbol](_persist_.md#boundargssymbol)
* [boundFunSymbol](_persist_.md#boundfunsymbol)
* [boundThisSymbol](_persist_.md#boundthissymbol)
* [descriptorSymbol](_persist_.md#descriptorsymbol)
* [extra](_persist_.md#const-extra)
* [regAutoOpaqueConstr](_persist_.md#const-regautoopaqueconstr)
* [regConstructor](_persist_.md#const-regconstructor)
* [regDescriptor](_persist_.md#const-regdescriptor)
* [regOpaqueObject](_persist_.md#const-regopaqueobject)
* [regOpaqueRec](_persist_.md#const-regopaquerec)
* [savedCall](_persist_.md#const-savedcall)

### Functions

* [makeBind](_persist_.md#makebind)
* [nop](_persist_.md#nop)
* [regFun](_persist_.md#regfun)
* [regModule](_persist_.md#regmodule)

### Object literals

* [noProps](_persist_.md#const-noprops)

## Variables

### `Const` BindDescriptor

• **BindDescriptor**: *void | WriteDescriptor‹function› & ReadDescriptor‹function› & DescriptorOpts‹function›* = regDescriptor({
  name: "#b",
  create() {
    return makeBind();
  },
  write() {
    return {};
  },
  overrideProps: {
    arguments: false,
    caller: false,
    length: false,
    name: false,
    prototype: false
  }
})

Defined in debugger/src/persist.ts:102

___

### `Const` ModuleDescriptor

• **ModuleDescriptor**: *WriteDescriptor‹any› & ReadDescriptor‹any› & DescriptorOpts‹any›* = S.regDescriptor<any>({
  name: "@effectful/debugger/module",
  create(_ctx, json: any) {
    return context.modules[json.id] || {};
  },
  readContent(ctx, json: any, module: any) {
    if (module.cjs && json.exports) {
      module.cjs.exports = ctx.step(json.exports);
    }
  },
  write(ctx, module: any) {
    const res: any = { id: module.fullPath || module.id };
    if (module.cjs) res.exports = ctx.step(module.cjs.exports, res, "exports");
    return res;
  },
  props: false
})

Defined in debugger/src/persist.ts:47

___

###  boundArgsSymbol

• **boundArgsSymbol**: *symbol*

Defined in debugger/src/persist.ts:23

___

###  boundFunSymbol

• **boundFunSymbol**: *symbol*

Defined in debugger/src/persist.ts:21

___

###  boundThisSymbol

• **boundThisSymbol**: *symbol*

Defined in debugger/src/persist.ts:22

___

###  descriptorSymbol

• **descriptorSymbol**: *symbol*

Defined in debugger/src/persist.ts:24

___

### `Const` extra

• **extra**: *Set‹any›* = new Set()

Defined in debugger/src/persist.ts:152

___

### `Const` regAutoOpaqueConstr

• **regAutoOpaqueConstr**: *[nop](_persist_.md#nop) | regAutoOpaqueConstr* = config.persistState
  ? S.regAutoOpaqueConstr
  : nop

Defined in debugger/src/persist.ts:14

___

### `Const` regConstructor

• **regConstructor**: *[nop](_persist_.md#nop) | regConstructor* = config.persistState ? S.regConstructor : nop

Defined in debugger/src/persist.ts:33

___

### `Const` regDescriptor

• **regDescriptor**: *[nop](_persist_.md#nop) | regDescriptor* = config.persistState ? S.regDescriptor : nop

Defined in debugger/src/persist.ts:32

___

### `Const` regOpaqueObject

• **regOpaqueObject**: *[nop](_persist_.md#nop) | (Anonymous function)* = config.persistState
  ? function (obj: any, name: string) {
    S.regOpaqueObject(obj, name, noProps);
  }
  : nop

Defined in debugger/src/persist.ts:27

___

### `Const` regOpaqueRec

• **regOpaqueRec**: *regOpaqueRec | [nop](_persist_.md#nop)* = config.persistState ? S.regOpaqueRec : nop

Defined in debugger/src/persist.ts:13

___

### `Const` savedCall

• **savedCall**: *call* = saved.FunctionMethods.call

Defined in debugger/src/persist.ts:119

## Functions

###  makeBind

▸ **makeBind**(): *function*

Defined in debugger/src/persist.ts:121

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  nop

▸ **nop**(): *void*

Defined in debugger/src/persist.ts:11

**Returns:** *void*

___

###  regFun

▸ **regFun**(`meta`: [FunctionDescr](_state_.md#functiondescr)): *void*

Defined in debugger/src/persist.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`meta` | [FunctionDescr](_state_.md#functiondescr) |

**Returns:** *void*

___

###  regModule

▸ **regModule**(`exp`: any, `name`: string): *void*

Defined in debugger/src/persist.ts:36

`Serialization.regOpaqueDeep` for module exports

**Parameters:**

Name | Type |
------ | ------ |
`exp` | any |
`name` | string |

**Returns:** *void*

## Object literals

### `Const` noProps

### ▪ **noProps**: *object*

Defined in debugger/src/persist.ts:18

###  props

• **props**: *boolean* = false

Defined in debugger/src/persist.ts:18

###  propsSnapshot

• **propsSnapshot**: *boolean* = false

Defined in debugger/src/persist.ts:18
