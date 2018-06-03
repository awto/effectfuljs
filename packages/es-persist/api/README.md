
#  @effectful/es-persist

## Index

### Interfaces

* [Async](interfaces/async.md)
* [AsyncGenerator](interfaces/asyncgenerator.md)
* [Chainable](interfaces/chainable.md)
* [Context](interfaces/context.md)
* [Continuation](interfaces/continuation.md)
* [Job](interfaces/job.md)
* [Producer](interfaces/producer.md)
* [Scheduler](interfaces/scheduler.md)
* [Thenable](interfaces/thenable.md)

### Type aliases

* [Result](#result)

### Variables

* [abort](#abort)
* [chainSymbol](#chainsymbol)
* [constructors](#constructors)
* [contextSymbol](#contextsymbol)
* [current](#current)
* [eventLoopScheduler](#eventloopscheduler)
* [idle](#idle)
* [managed](#managed)

### Functions

* [all](#all)
* [any](#any)
* [context](#context)
* [producer](#producer)
* [residual](#residual)

---

## Type aliases

<a id="result"></a>

###  Result

**ΤResult**: * `object` &#124; `object`
*

*Defined in types.ts:91*

ECMAScript compatible Iterator result

___

## Variables

<a id="abort"></a>

### `<Const>` abort

**● abort**: *[Chainable](interfaces/chainable.md)*

*Defined in types.ts:167*

Stops execution without returning any result. Used to cancel continuation if it is cloned and is going to be resumed.

___
<a id="chainsymbol"></a>

### `<Const>` chainSymbol

**● chainSymbol**: *`keyof symbol`*

*Defined in types.ts:48*

method name for `Promise#then` replacement

___
<a id="constructors"></a>

### `<Const>` constructors

**● constructors**: *`Function`[]*

*Defined in types.ts:187*

List of constructor functions in this library to register in some serialization library

___
<a id="contextsymbol"></a>

### `<Const>` contextSymbol

**● contextSymbol**: *`keyof symbol`*

*Defined in types.ts:43*

name of a property to define context object

___
<a id="current"></a>

### `<Const>` current

**● current**: *[Chainable](interfaces/chainable.md)<[Continuation](interfaces/continuation.md)>*

*Defined in types.ts:153*

Current continuation, it can be cloned or serialized after. The cloned version may be resumed and control will go from the point where `current` was invoked (e.g. `await R.current`). When resumed result of the `await` expression will be different. It will be an argument of `resume`.

___
<a id="eventloopscheduler"></a>

### `<Const>` eventLoopScheduler

**● eventLoopScheduler**: *[Scheduler](interfaces/scheduler.md)*

*Defined in types.ts:144*

Implementation of `Schedule` interface where jobs are scheduled using JS engine event loop.

___
<a id="idle"></a>

### `<Const>` idle

**● idle**: *[Chainable](interfaces/chainable.md)<[Continuation](interfaces/continuation.md)>*

*Defined in types.ts:161*

Same as `current` but ensures current context scheduler doesn't have enqueued jobs. This way programs are more deterministic and they don't need to serialize the jobs. The default scheduler doesn't even provide any means for this.

___
<a id="managed"></a>

### `<Const>` managed

**● managed**: *[Chainable](interfaces/chainable.md)<`boolean`>*

*Defined in types.ts:181*

Returns `true` if the code using this runtime is properly transpiled using this library preset and thus this library continuation tools can be applied.

___

## Functions

<a id="all"></a>

###  all

▸ **all**(iterable: *`Iterable`<[Chainable](interfaces/chainable.md)>*): [Chainable](interfaces/chainable.md)

*Defined in types.ts:193*

Same as `Promise.all` but for `Chainable` objects, thus if all the objects are serializable the result is serializable too

**Parameters:**

| Param | Type |
| ------ | ------ |
| iterable | `Iterable`<[Chainable](interfaces/chainable.md)> |

**Returns:** [Chainable](interfaces/chainable.md)

___
<a id="any"></a>

###  any

▸ **any**T(iterable: *`Iterable`<[Chainable](interfaces/chainable.md)<`T`>>*): [Chainable](interfaces/chainable.md)<`T`>

*Defined in types.ts:199*

Same as `Promise.race` but for `Chainable` objects, thus if all the objects are serializable the result is serializable too

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| iterable | `Iterable`<[Chainable](interfaces/chainable.md)<`T`>> |

**Returns:** [Chainable](interfaces/chainable.md)<`T`>

___
<a id="context"></a>

###  context

▸ **context**(newContext?: *[Context](interfaces/context.md)*): [Context](interfaces/context.md)

*Defined in types.ts:123*

Gets or sets (if there is an argument) current context. It may be used to override default context object and it will be assigned to a async function's prototype when it is defined.

Note, function declaration are hoisted in JS. So the function won't change context of function declaration in the same block (module top level) where it is called. Import another module with the call instead.

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` newContext | [Context](interfaces/context.md) |

**Returns:** [Context](interfaces/context.md)

___
<a id="producer"></a>

###  producer

▸ **producer**(): [Producer](interfaces/producer.md)

*Defined in types.ts:212*

**Returns:** [Producer](interfaces/producer.md)

___
<a id="residual"></a>

###  residual

▸ **residual**(): [Chainable](interfaces/chainable.md)

*Defined in types.ts:174*

Simple lock. Some async function can use the result of this function to block on `await` expression, and some another async function may unblock it by calling `resume`.

**Returns:** [Chainable](interfaces/chainable.md)

___

