[@effectful/debugger](../README.md) › ["timeTravel/main"](_timetravel_main_.md)

# Module: "timeTravel/main"

## Index

### Variables

* [Flag](_timetravel_main_.md#const-flag)
* [checkpoint](_timetravel_main_.md#const-checkpoint)
* [context](_timetravel_main_.md#const-context)
* [flush](_timetravel_main_.md#const-flush)
* [journal](_timetravel_main_.md#const-journal)
* [record](_timetravel_main_.md#const-record)
* [redo](_timetravel_main_.md#const-redo)
* [reset](_timetravel_main_.md#const-reset)
* [typedArrayDisableTrace](_timetravel_main_.md#const-typedarraydisabletrace)
* [undo](_timetravel_main_.md#const-undo)

### Functions

* [checkpointImpl](_timetravel_main_.md#const-checkpointimpl)
* [recordContext](_timetravel_main_.md#recordcontext)
* [recordFrame](_timetravel_main_.md#recordframe)
* [resetContextOp](_timetravel_main_.md#resetcontextop)
* [restoreFrameFullOp](_timetravel_main_.md#restoreframefullop)
* [restoreFrameOp](_timetravel_main_.md#restoreframeop)
* [restoreGeneratorFrameOp](_timetravel_main_.md#restoregeneratorframeop)

## Variables

### `Const` Flag

• **Flag**: *[Flag](../enums/_state_.flag.md)* = State.Flag

Defined in debugger/src/timeTravel/main.ts:196

___

### `Const` checkpoint

• **checkpoint**: *function* = config.timeTravel
  ? config.mutationObserver
    ? function checkpoint() {
        flush();
        return checkpointImpl();
      }
    : checkpointImpl
  : function() {
      return null;
    }

Defined in debugger/src/timeTravel/main.ts:114

Returns an object which can be passed
to `undo` to restored the current state

#### Type declaration:

▸ (): *[Record](../interfaces/_state_.record.md) | null*

___

### `Const` context

• **context**: *[State](../interfaces/_state_.state.md)* = State.context

Defined in debugger/src/timeTravel/main.ts:9

___

### `Const` flush

• **flush**: *function* = config.timeTravel && config.mutationObserver ? DOM.flush : function() {}

Defined in debugger/src/timeTravel/main.ts:13

#### Type declaration:

▸ (): *void*

___

### `Const` journal

• **journal**: *[Journal](../interfaces/_state_.journal.md)* = State.journal

Defined in debugger/src/timeTravel/main.ts:8

___

### `Const` record

• **record**: *function* = config.timeTravel ? Core.record : function record() {}

Defined in debugger/src/timeTravel/main.ts:126

Registers an operation to be called on `undo` in reverse direction

#### Type declaration:

▸ <**T**>(`f`: T): *void*

**Type parameters:**

▪ **T**: *[Callable](../interfaces/_timetravel_core_.callable.md)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | T |

___

### `Const` redo

• **redo**: *function* = config.timeTravel
  ? function redo() {
      flush();
      const { future } = journal;
      if (!future) return null;
      const ops = future.operations;
      future.operations = void 0;
      const { now } = journal;
      if (now) now.prev = journal.past;
      journal.past = now;
      journal.now = future;
      journal.future = future.prev;
      for (let i = ops, j; i != null; i = j) {
        j = i.prev;
        context.call = i;
        i.call();
      }
      flush();
      return future;
    }
  : function redo() {
      return null;
    }

Defined in debugger/src/timeTravel/main.ts:49

#### Type declaration:

▸ (): *[Record](../interfaces/_state_.record.md) | null*

___

### `Const` reset

• **reset**: *[reset](_timetravel_core_.md#reset)* = Core.reset

Defined in debugger/src/timeTravel/main.ts:11

___

### `Const` typedArrayDisableTrace

• **typedArrayDisableTrace**: *typedArrayDisableTrace* = config.timeTravel
  ? function typedArrayDisableTrace(arr: any) {
      if (arr.set === Core.typedArraySaved.set) return;
      arr.set = Core.typedArraySaved.set;
      arr.sort = Core.typedArraySaved.sort;
      return arr;
    }
  : function typedArrayDisableTrace(arr: any) {
      return arr;
    }

Defined in debugger/src/timeTravel/main.ts:131

disables tracing on a specific TypedArray object

___

### `Const` undo

• **undo**: *function* = config.timeTravel
  ? function undo(): Record | null {
      flush();
      const { now } = journal;
      if (!now) return null;
      const ops = now.operations;
      now.operations = void 0;
      for (let i = ops, j; i != null; i = j) {
        j = i.prev; // `call` may reschedule the same object
        context.call = i;
        i.call();
      }
      flush();
      let { future, past } = journal;
      now.prev = future;
      journal.future = now;
      journal.now = past;
      if (past) {
        journal.past = past.prev;
        past.prev = null;
      } else {
        journal.past = null;
      }
      return past;
    }
  : function undo() {
      return null;
    }

Defined in debugger/src/timeTravel/main.ts:20

This rollbacks all changed objects and runs functions registered by `record`,
(assumes an empty last checkpoint).

#### Type declaration:

▸ (): *[Record](../interfaces/_state_.record.md) | null*

## Functions

### `Const` checkpointImpl

▸ **checkpointImpl**(): *null | [Record](../interfaces/_state_.record.md)*

Defined in debugger/src/timeTravel/main.ts:101

**Returns:** *null | [Record](../interfaces/_state_.record.md)*

___

###  recordContext

▸ **recordContext**(): *void*

Defined in debugger/src/timeTravel/main.ts:73

**Returns:** *void*

___

###  recordFrame

▸ **recordFrame**(`frame`: [Frame](../interfaces/_state_.frame.md)): *void*

Defined in debugger/src/timeTravel/main.ts:198

**Parameters:**

Name | Type |
------ | ------ |
`frame` | [Frame](../interfaces/_state_.frame.md) |

**Returns:** *void*

___

###  resetContextOp

▸ **resetContextOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/main.ts:84

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  restoreFrameFullOp

▸ **restoreFrameFullOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/main.ts:142

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  restoreFrameOp

▸ **restoreFrameOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/main.ts:151

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*

___

###  restoreGeneratorFrameOp

▸ **restoreGeneratorFrameOp**(`this`: any): *void*

Defined in debugger/src/timeTravel/main.ts:165

**Parameters:**

Name | Type |
------ | ------ |
`this` | any |

**Returns:** *void*
