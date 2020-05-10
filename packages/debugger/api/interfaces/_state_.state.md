[@effectful/debugger](../README.md) › ["state"](../modules/_state_.md) › [State](_state_.state.md)

# Interface: State

## Hierarchy

* **State**

## Index

### Properties

* [activeTop](_state_.state.md#activetop)
* [brk](_state_.state.md#brk)
* [brkOnAnyException](_state_.state.md#brkonanyexception)
* [brkOnUncaughtException](_state_.state.md#brkonuncaughtexception)
* [call](_state_.state.md#call)
* [debug](_state_.state.md#debug)
* [error](_state_.state.md#error)
* [exception](_state_.state.md#exception)
* [moduleId](_state_.state.md#moduleid)
* [modules](_state_.state.md#modules)
* [modulesById](_state_.state.md#modulesbyid)
* [needsBreak](_state_.state.md#needsbreak)
* [onLoad](_state_.state.md#optional-onload)
* [onNewSource](_state_.state.md#onnewsource)
* [onStop](_state_.state.md#onstop)
* [onThread](_state_.state.md#onthread)
* [queue](_state_.state.md#queue)
* [running](_state_.state.md#running)
* [suspended](_state_.state.md#suspended)
* [syncStack](_state_.state.md#syncstack)
* [terminated](_state_.state.md#terminated)
* [threadId](_state_.state.md#threadid)
* [top](_state_.state.md#top)
* [value](_state_.state.md#value)

## Properties

###  activeTop

• **activeTop**: *[Frame](_state_.frame.md) | null*

Defined in debugger/src/state.ts:285

`top` of currently debugging thread,
the value is saved here while some blackbox thread may run

___

###  brk

• **brk**: *[Brk](_state_.brk.md) | null*

Defined in debugger/src/state.ts:245

current breakpoint id

___

###  brkOnAnyException

• **brkOnAnyException**: *boolean*

Defined in debugger/src/state.ts:278

stop on any exceptions

___

###  brkOnUncaughtException

• **brkOnUncaughtException**: *boolean*

Defined in debugger/src/state.ts:280

stop on uncaught exceptions

___

###  call

• **call**: *any*

Defined in debugger/src/state.ts:272

reference of a function which is expected to be called

___

###  debug

• **debug**: *boolean*

Defined in debugger/src/state.ts:234

stopping on break points if `true`, otherwise ignoring them

___

###  error

• **error**: *boolean*

Defined in debugger/src/state.ts:260

in error state

___

###  exception

• **exception**: *any*

Defined in debugger/src/state.ts:262

currently propagating exception

___

###  moduleId

• **moduleId**: *string | null*

Defined in debugger/src/state.ts:274

module id which is expected to be required

___

###  modules

• **modules**: *object*

Defined in debugger/src/state.ts:247

loaded modules (by full path)

#### Type declaration:

* \[ **name**: *string*\]: [Module](_state_.module.md)

___

###  modulesById

• **modulesById**: *object*

Defined in debugger/src/state.ts:249

loaded modules (by CommonJs id)

#### Type declaration:

* \[ **name**: *string*\]: [Module](_state_.module.md)

___

###  needsBreak

• **needsBreak**: *function*

Defined in debugger/src/state.ts:270

queries if the engine should stop on this `brk`

#### Type declaration:

▸ (`brk`: [Brk](_state_.brk.md), `frame`: [Frame](_state_.frame.md), `param?`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`brk` | [Brk](_state_.brk.md) |
`frame` | [Frame](_state_.frame.md) |
`param?` | any |

___

### `Optional` onLoad

• **onLoad**? : *undefined | function*

Defined in debugger/src/state.ts:266

a callback called when some module's sources are changed

___

###  onNewSource

• **onNewSource**: *function*

Defined in debugger/src/state.ts:287

some new generated source can be debugged

#### Type declaration:

▸ (`id`: number, `code`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`code` | string |

___

###  onStop

• **onStop**: *function*

Defined in debugger/src/state.ts:289

stopping on a breakpoint

#### Type declaration:

▸ (): *void*

___

###  onThread

• **onThread**: *function*

Defined in debugger/src/state.ts:258

this is called if something a new thread is added into `queue`
or some thread was finished (so the caller can proceed with

#### Type declaration:

▸ (): *void*

___

###  queue

• **queue**: *[Job](_state_.job.md)[]*

Defined in debugger/src/state.ts:253

next functions to run

___

###  running

• **running**: *boolean*

Defined in debugger/src/state.ts:243

the engine now runs some code and expects a breakpoint
otherwise it is some new thread which isn't tracked by the debugger
and on next breakpoint it is suspended in `queue`, to run after
with `running: true` (if the breakpoints aren't ignored by `debug:false`)

___

###  suspended

• **suspended**: *[Set](../modules/_vscode_handlers_.md#const-set)‹[Frame](_state_.frame.md)›*

Defined in debugger/src/state.ts:276

currently suspended but not exited frames (e.g. on `await` expressions)

___

###  syncStack

• **syncStack**: *[Job](_state_.job.md)[]*

Defined in debugger/src/state.ts:251

saved context for synchronous functions

___

###  terminated

• **terminated**: *boolean*

Defined in debugger/src/state.ts:236

everything is done

___

###  threadId

• **threadId**: *number*

Defined in debugger/src/state.ts:292

unique number of this execution context

___

###  top

• **top**: *[Frame](_state_.frame.md) | null*

Defined in debugger/src/state.ts:268

current execution stack

___

###  value

• **value**: *any*

Defined in debugger/src/state.ts:264

a current value to be passed into the top of `stack` (or an exception if `error:true`)
