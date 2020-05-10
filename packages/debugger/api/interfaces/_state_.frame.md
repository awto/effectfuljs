[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [Frame](_state_.frame.md)

# Interface: Frame

function's call desciption

## Hierarchy

  ↳ [ProtoFrame](_state_.protoframe.md)

* [Env](_state_.env.md)

  ↳ **Frame**

  ↳ [GeneratorFrame](_state_.generatorframe.md)

  ↳ [AsyncGeneratorFrame](_state_.asyncgeneratorframe.md)

  ↳ [AsyncFrame](_async_.asyncframe.md)

## Index

### Properties

* [$](_state_.frame.md#)
* [$g](_state_.frame.md#g)
* [args](_state_.frame.md#args)
* [awaiting](_state_.frame.md#optional-awaiting)
* [brk](_state_.frame.md#brk)
* [caller](_state_.frame.md#caller)
* [done](_state_.frame.md#done)
* [error](_state_.frame.md#optional-error)
* [func](_state_.frame.md#func)
* [goto](_state_.frame.md#goto)
* [meta](_state_.frame.md#meta)
* [newTarget](_state_.frame.md#newtarget)
* [next](_state_.frame.md#next)
* [onReject](_state_.frame.md#onreject)
* [onResolve](_state_.frame.md#onresolve)
* [parent](_state_.frame.md#parent)
* [promise](_state_.frame.md#promise)
* [restoreDebug](_state_.frame.md#restoredebug)
* [result](_state_.frame.md#optional-result)
* [running](_state_.frame.md#running)
* [self](_state_.frame.md#self)
* [state](_state_.frame.md#state)
* [timestamp](_state_.frame.md#timestamp)

## Properties

###  $

• **$**: *any[]*

*Inherited from [Env](_state_.env.md).[$](_state_.env.md#)*

*Overrides [Env](_state_.env.md).[$](_state_.env.md#)*

Defined in debugger/src/state.ts:9

local variables

___

###  $g

• **$g**: *any*

Defined in debugger/src/state.ts:65

global env object (searched by name)

___

###  args

• **args**: *object | undefined*

Defined in debugger/src/state.ts:33

captured `arguments`

___

### `Optional` awaiting

• **awaiting**? : *any*

Defined in debugger/src/state.ts:60

if the frame is suspended this may provide some
information what exactly it is awaiting

___

###  brk

• **brk**: *[Brk](_state_.brk.md) | null*

Defined in debugger/src/state.ts:37

location's desciption

___

###  caller

• **caller**: *[Frame](_state_.frame.md) | null*

Defined in debugger/src/state.ts:45

like `next` but keeps real caller for coroutines

___

###  done

• **done**: *boolean*

Defined in debugger/src/state.ts:63

___

### `Optional` error

• **error**? : *any*

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

Defined in debugger/src/state.ts:35

if called as `new` expression

___

###  next

• **next**: *[Frame](_state_.frame.md) | null*

Defined in debugger/src/state.ts:43

next function in the stack

___

###  onReject

• **onReject**: *function | null*

Defined in debugger/src/state.ts:51

called if function exits with some exception

___

###  onResolve

• **onResolve**: *function | null*

Defined in debugger/src/state.ts:49

called if function exits with some resulting value

___

###  parent

• **parent**: *[Frame](_state_.frame.md) | null*

*Inherited from [ProtoFrame](_state_.protoframe.md).[parent](_state_.protoframe.md#parent)*

Defined in debugger/src/state.ts:21

___

###  promise

• **promise**: *Promise‹any› | null*

Defined in debugger/src/state.ts:53

the promise to settle on `onResolve`/`onReject`

___

###  restoreDebug

• **restoreDebug**: *boolean*

Defined in debugger/src/state.ts:47

set `context.debug = true` on exit

___

### `Optional` result

• **result**? : *any*

Defined in debugger/src/state.ts:39

current return value

___

###  running

• **running**: *boolean*

Defined in debugger/src/state.ts:62

the control flow is currently within generator's

___

###  self

• **self**: *object | undefined*

Defined in debugger/src/state.ts:31

captured `this`

___

###  state

• **state**: *number*

Defined in debugger/src/state.ts:27

current state

___

###  timestamp

• **timestamp**: *[Record](_state_.record.md) | null*

Defined in debugger/src/state.ts:55

when this frame was last updated
