[@effectful/debugger](../README.md) › ["async"](../modules/_async_.md) › [AsyncFrame](_async_.asyncframe.md)

# Interface: AsyncFrame

## Hierarchy

  ↳ [Frame](_state_.frame.md)

  ↳ **AsyncFrame**

## Index

### Properties

* [$](_async_.asyncframe.md#)
* [$g](_async_.asyncframe.md#g)
* [args](_async_.asyncframe.md#args)
* [awaiting](_async_.asyncframe.md#optional-awaiting)
* [brk](_async_.asyncframe.md#brk)
* [caller](_async_.asyncframe.md#caller)
* [done](_async_.asyncframe.md#done)
* [error](_async_.asyncframe.md#optional-error)
* [func](_async_.asyncframe.md#func)
* [goto](_async_.asyncframe.md#goto)
* [meta](_async_.asyncframe.md#meta)
* [newTarget](_async_.asyncframe.md#newtarget)
* [next](_async_.asyncframe.md#next)
* [onReject](_async_.asyncframe.md#onreject)
* [onResolve](_async_.asyncframe.md#onresolve)
* [parent](_async_.asyncframe.md#parent)
* [promise](_async_.asyncframe.md#promise)
* [restoreDebug](_async_.asyncframe.md#restoredebug)
* [result](_async_.asyncframe.md#optional-result)
* [running](_async_.asyncframe.md#running)
* [self](_async_.asyncframe.md#self)
* [state](_async_.asyncframe.md#state)
* [timestamp](_async_.asyncframe.md#timestamp)

## Properties

###  $

• **$**: *any[]*

*Inherited from [Env](_state_.env.md).[$](_state_.env.md#)*

Defined in debugger/src/state.ts:9

local variables

___

###  $g

• **$g**: *any*

*Inherited from [Frame](_state_.frame.md).[$g](_state_.frame.md#g)*

Defined in debugger/src/state.ts:65

global env object (searched by name)

___

###  args

• **args**: *object | undefined*

*Inherited from [Frame](_state_.frame.md).[args](_state_.frame.md#args)*

Defined in debugger/src/state.ts:33

captured `arguments`

___

### `Optional` awaiting

• **awaiting**? : *any*

*Inherited from [Frame](_state_.frame.md).[awaiting](_state_.frame.md#optional-awaiting)*

Defined in debugger/src/state.ts:60

if the frame is suspended this may provide some
information what exactly it is awaiting

___

###  brk

• **brk**: *[Brk](_state_.brk.md) | null*

*Inherited from [Frame](_state_.frame.md).[brk](_state_.frame.md#brk)*

Defined in debugger/src/state.ts:37

location's desciption

___

###  caller

• **caller**: *[Frame](_state_.frame.md) | null*

*Inherited from [Frame](_state_.frame.md).[caller](_state_.frame.md#caller)*

Defined in debugger/src/state.ts:45

like `next` but keeps real caller for coroutines

___

###  done

• **done**: *boolean*

*Inherited from [Frame](_state_.frame.md).[done](_state_.frame.md#done)*

Defined in debugger/src/state.ts:63

___

### `Optional` error

• **error**? : *any*

*Inherited from [Frame](_state_.frame.md).[error](_state_.frame.md#optional-error)*

Defined in debugger/src/state.ts:41

current exception value

___

###  func

• **func**: *function*

*Inherited from [ProtoFrame](_state_.protoframe.md).[func](_state_.protoframe.md#func)*

Defined in debugger/src/state.ts:20

a constructed function's value

#### Type declaration:

▸ (): *any*

___

###  goto

• **goto**: *number*

*Inherited from [Frame](_state_.frame.md).[goto](_state_.frame.md#goto)*

Defined in debugger/src/state.ts:29

next iteration state

___

###  meta

• **meta**: *[FunctionDescr](../modules/_state_.md#functiondescr)*

*Inherited from [ProtoFrame](_state_.protoframe.md).[meta](_state_.protoframe.md#meta)*

Defined in debugger/src/state.ts:18

meta-data

___

###  newTarget

• **newTarget**: *boolean*

*Inherited from [Frame](_state_.frame.md).[newTarget](_state_.frame.md#newtarget)*

Defined in debugger/src/state.ts:35

if called as `new` expression

___

###  next

• **next**: *[Frame](_state_.frame.md) | null*

*Inherited from [Frame](_state_.frame.md).[next](_state_.frame.md#next)*

Defined in debugger/src/state.ts:43

next function in the stack

___

###  onReject

• **onReject**: *function*

*Overrides [Frame](_state_.frame.md).[onReject](_state_.frame.md#onreject)*

Defined in debugger/src/async.ts:16

#### Type declaration:

▸ (`arg`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | any |

___

###  onResolve

• **onResolve**: *function*

*Overrides [Frame](_state_.frame.md).[onResolve](_state_.frame.md#onresolve)*

Defined in debugger/src/async.ts:15

#### Type declaration:

▸ (`arg`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | any |

___

###  parent

• **parent**: *[Frame](_state_.frame.md) | null*

*Inherited from [ProtoFrame](_state_.protoframe.md).[parent](_state_.protoframe.md#parent)*

Defined in debugger/src/state.ts:21

___

###  promise

• **promise**: *Promise‹any›*

*Overrides [Frame](_state_.frame.md).[promise](_state_.frame.md#promise)*

Defined in debugger/src/async.ts:17

___

###  restoreDebug

• **restoreDebug**: *boolean*

*Inherited from [Frame](_state_.frame.md).[restoreDebug](_state_.frame.md#restoredebug)*

Defined in debugger/src/state.ts:47

set `context.debug = true` on exit

___

### `Optional` result

• **result**? : *any*

*Inherited from [Frame](_state_.frame.md).[result](_state_.frame.md#optional-result)*

Defined in debugger/src/state.ts:39

current return value

___

###  running

• **running**: *boolean*

*Inherited from [Frame](_state_.frame.md).[running](_state_.frame.md#running)*

Defined in debugger/src/state.ts:62

the control flow is currently within generator's

___

###  self

• **self**: *object | undefined*

*Inherited from [Frame](_state_.frame.md).[self](_state_.frame.md#self)*

Defined in debugger/src/state.ts:31

captured `this`

___

###  state

• **state**: *number*

*Inherited from [Frame](_state_.frame.md).[state](_state_.frame.md#state)*

Defined in debugger/src/state.ts:27

current state

___

###  timestamp

• **timestamp**: *[Record](_state_.record.md) | null*

*Inherited from [Frame](_state_.frame.md).[timestamp](_state_.frame.md#timestamp)*

Defined in debugger/src/state.ts:55

when this frame was last updated
