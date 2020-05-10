[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [GeneratorFrame](_state_.generatorframe.md)

# Interface: GeneratorFrame

## Hierarchy

  ↳ [Frame](_state_.frame.md)

  ↳ **GeneratorFrame**

## Index

### Properties

* [$](_state_.generatorframe.md#)
* [$g](_state_.generatorframe.md#g)
* [args](_state_.generatorframe.md#args)
* [awaiting](_state_.generatorframe.md#optional-awaiting)
* [brk](_state_.generatorframe.md#brk)
* [caller](_state_.generatorframe.md#caller)
* [done](_state_.generatorframe.md#done)
* [error](_state_.generatorframe.md#optional-error)
* [func](_state_.generatorframe.md#func)
* [goto](_state_.generatorframe.md#goto)
* [iter](_state_.generatorframe.md#iter)
* [meta](_state_.generatorframe.md#meta)
* [newTarget](_state_.generatorframe.md#newtarget)
* [next](_state_.generatorframe.md#next)
* [onReject](_state_.generatorframe.md#onreject)
* [onResolve](_state_.generatorframe.md#onresolve)
* [parent](_state_.generatorframe.md#parent)
* [promise](_state_.generatorframe.md#promise)
* [restoreDebug](_state_.generatorframe.md#restoredebug)
* [result](_state_.generatorframe.md#optional-result)
* [running](_state_.generatorframe.md#running)
* [self](_state_.generatorframe.md#self)
* [sent](_state_.generatorframe.md#sent)
* [state](_state_.generatorframe.md#state)
* [timestamp](_state_.generatorframe.md#timestamp)

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

###  iter

• **iter**: *Iterable‹any›*

Defined in debugger/src/state.ts:504

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

• **onReject**: *function | null*

*Inherited from [Frame](_state_.frame.md).[onReject](_state_.frame.md#onreject)*

Defined in debugger/src/state.ts:51

called if function exits with some exception

___

###  onResolve

• **onResolve**: *function | null*

*Inherited from [Frame](_state_.frame.md).[onResolve](_state_.frame.md#onresolve)*

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

*Inherited from [Frame](_state_.frame.md).[promise](_state_.frame.md#promise)*

Defined in debugger/src/state.ts:53

the promise to settle on `onResolve`/`onReject`

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

###  sent

• **sent**: *any*

Defined in debugger/src/state.ts:503

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
