[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [Brk](_state_.brk.md)

# Interface: Brk

breakpoint description

## Hierarchy

* **Brk**

## Index

### Properties

* [breakpoint](_state_.brk.md#breakpoint)
* [column](_state_.brk.md#column)
* [endColumn](_state_.brk.md#endcolumn)
* [endLine](_state_.brk.md#endline)
* [flags](_state_.brk.md#flags)
* [id](_state_.brk.md#id)
* [line](_state_.brk.md#line)
* [location](_state_.brk.md#location)
* [logPoint](_state_.brk.md#logpoint)
* [meta](_state_.brk.md#meta)
* [scope](_state_.brk.md#scope)
* [scopeDepth](_state_.brk.md#scopedepth)

## Properties

###  breakpoint

• **breakpoint**: *object | null*

Defined in debugger/src/state.ts:113

___

###  column

• **column**: *number*

Defined in debugger/src/state.ts:105

___

###  endColumn

• **endColumn**: *number*

Defined in debugger/src/state.ts:107

___

###  endLine

• **endLine**: *number*

Defined in debugger/src/state.ts:106

___

###  flags

• **flags**: *[BrkFlag](../enums/_state_.brkflag.md)*

Defined in debugger/src/state.ts:100

debugger's specific type of the breakpoint

___

###  id

• **id**: *number*

Defined in debugger/src/state.ts:102

unique identifier within the function

___

###  line

• **line**: *number*

Defined in debugger/src/state.ts:104

___

###  location

• **location**: *string*

Defined in debugger/src/state.ts:110

textual representation of the location

___

###  logPoint

• **logPoint**: *function | null*

Defined in debugger/src/state.ts:112

___

###  meta

• **meta**: *[FunctionDescr](../modules/_state_.md#functiondescr)*

Defined in debugger/src/state.ts:103

___

###  scope

• **scope**: *[ScopeInfo](_state_.scopeinfo.md)*

Defined in debugger/src/state.ts:108

___

###  scopeDepth

• **scopeDepth**: *number*

Defined in debugger/src/state.ts:111
