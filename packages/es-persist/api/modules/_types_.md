[@effectful/es-persist](../README.md) › ["types"](_types_.md)

# Module: "types"

# @effectful/es-persist API

## Index

### Interfaces

* [Async](../interfaces/_types_.async.md)
* [AsyncGenerator](../interfaces/_types_.asyncgenerator.md)
* [AsyncIterator](../interfaces/_types_.asynciterator.md)
* [AsyncValue](../interfaces/_types_.asyncvalue.md)
* [Context](../interfaces/_types_.context.md)
* [Continuation](../interfaces/_types_.continuation.md)
* [Job](../interfaces/_types_.job.md)
* [Producer](../interfaces/_types_.producer.md)
* [Scheduler](../interfaces/_types_.scheduler.md)
* [Thenable](../interfaces/_types_.thenable.md)

### Type aliases

* [Result](_types_.md#result)

### Variables

* [abort](_types_.md#const-abort)
* [awaitSymbol](_types_.md#const-awaitsymbol)
* [constructors](_types_.md#const-constructors)
* [contextSymbol](_types_.md#const-contextsymbol)
* [current](_types_.md#const-current)
* [eventLoopScheduler](_types_.md#const-eventloopscheduler)
* [idle](_types_.md#const-idle)
* [managed](_types_.md#const-managed)

### Functions

* [all](_types_.md#all)
* [any](_types_.md#any)
* [context](_types_.md#context)
* [lock](_types_.md#lock)
* [producer](_types_.md#producer)

## Type aliases

###  Result

Ƭ **Result**: *object | object*

Defined in types.ts:99

ECMAScript compatible AsyncIterator result

## Variables

### `Const` abort

• **abort**: *[AsyncValue](../interfaces/_types_.asyncvalue.md)*

Defined in types.ts:185

Stops execution without returning any result. Used to cancel continuation if
it is cloned and is going to be resumed.

___

### `Const` awaitSymbol

• **awaitSymbol**: *keyof symbol*

Defined in types.ts:55

Subscribes a `Continuation` to be resumed on `AsyncValue` is settled

___

### `Const` constructors

• **constructors**: *Function[]*

Defined in types.ts:204

List of constructor functions in this library to register in some
serialization library

___

### `Const` contextSymbol

• **contextSymbol**: *keyof symbol*

Defined in types.ts:50

Name of a property to define context object.

___

### `Const` current

• **current**: *[AsyncValue](../interfaces/_types_.asyncvalue.md)‹[Continuation](../interfaces/_types_.continuation.md)›*

Defined in types.ts:172

Current continuation, it can be cloned or serialized after.  The cloned
version may be resumed and control will go from the point where `current` was
invoked (e.g. `await R.current`).  When resumed result of the `await`
expression will be different. It will be an argument of `resume`.

___

### `Const` eventLoopScheduler

• **eventLoopScheduler**: *[Scheduler](../interfaces/_types_.scheduler.md)*

Defined in types.ts:164

Implementation of `Schedule` interface where jobs are scheduled using
JS engine event loop.

___

### `Const` idle

• **idle**: *[AsyncValue](../interfaces/_types_.asyncvalue.md)‹[Continuation](../interfaces/_types_.continuation.md)›*

Defined in types.ts:179

Same as `current` but ensures current context scheduler doesn't have enqueued
jobs. This way programs are more deterministic and don't need to serialize
the jobs. The default scheduler doesn't even provide any means for this.

___

### `Const` managed

• **managed**: *[AsyncValue](../interfaces/_types_.asyncvalue.md)‹boolean›*

Defined in types.ts:198

Returns `true` if the code using this runtime is transpiled utilizing this
library preset, and thus this library continuation tools can be applied.

## Functions

###  all

▸ **all**(`iterable`: Iterable‹[AsyncValue](../interfaces/_types_.asyncvalue.md)›): *[AsyncValue](../interfaces/_types_.asyncvalue.md)*

Defined in types.ts:210

Same as `Promise.all` but for `AsyncValue` objects. If all the objects are
serializable the result is serializable too

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹[AsyncValue](../interfaces/_types_.asyncvalue.md)› |

**Returns:** *[AsyncValue](../interfaces/_types_.asyncvalue.md)*

___

###  any

▸ **any**<**T**>(`iterable`: Iterable‹[AsyncValue](../interfaces/_types_.asyncvalue.md)‹T››): *[AsyncValue](../interfaces/_types_.asyncvalue.md)‹T›*

Defined in types.ts:216

Same as `Promise.race` but for `AsyncValue` objects. If all the objects are
serializable the result is serializable too

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹[AsyncValue](../interfaces/_types_.asyncvalue.md)‹T›› |

**Returns:** *[AsyncValue](../interfaces/_types_.asyncvalue.md)‹T›*

___

###  context

▸ **context**(`newContext?`: [Context](../interfaces/_types_.context.md)): *[Context](../interfaces/_types_.context.md)*

Defined in types.ts:143

Sets current context if there is an argument, returns context before the
change.  It may be used to override default context object, and it will be
assigned to an async function's prototype when it is defined.

Note, function declarations are hoisted in JS (can be used before declared).
So the function won't change context of a function declaration in the same
block (module top level) where it is called. Import another module with the
call instead.

**Parameters:**

Name | Type |
------ | ------ |
`newContext?` | [Context](../interfaces/_types_.context.md) |

**Returns:** *[Context](../interfaces/_types_.context.md)*

___

###  lock

▸ **lock**(): *[AsyncValue](../interfaces/_types_.asyncvalue.md) & [Continuation](../interfaces/_types_.continuation.md)*

Defined in types.ts:192

Some async function can use the result of this function to block in `await`
expression, and some another async function may unblock it by calling
`resume` there. Can be used to implement chaining of async computations.

**Returns:** *[AsyncValue](../interfaces/_types_.asyncvalue.md) & [Continuation](../interfaces/_types_.continuation.md)*

___

###  producer

▸ **producer**(): *[Producer](../interfaces/_types_.producer.md)*

Defined in types.ts:232

Creates new Producer

**Returns:** *[Producer](../interfaces/_types_.producer.md)*
