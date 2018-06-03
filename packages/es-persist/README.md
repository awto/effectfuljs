# @effectful/es-persist

ECMAScript async, generator and async generator functions with access to their
state. The state can be clonable and serializable.

This enables:
  * universal apps, time traveling, hot reloading
  * custom jobs scheduling
  * long-running workflows (storing state in DB)
  * various control manipulation operators

## Usage

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-persist
```

In .babelrc:

```json
{
  "presets": ["@effectful/es-persist/transform"]
}

```

If there are other babel presets, add `"passPerPreset":true`.

Import it in your module:

```javascript
import * as R from "@effectful/es-persist"

// OR:
// const R = require("@effectful/es-persist")

async function main() {
  await say("hello world")
}

```

## API

Like ECMAScript, transpiled async(generator) functions return an object with
corresponding protocol support - `Thenable` and `AsyncIterator` resp.  But
unlike ECMAScript, these objects also store necessary local and closure captured
variables values and execution control state (`yield`/`await` expression address
where the function is suspended).

This object is serializable if the local variables are. If there are closures,
the serialization library should be reference-aware.  The transpiled code saves
only variables with writes before any `yield`/`await` and reads after. It also
resets them to `undefined` if its value isn't read after.

### AsyncValue interface

```typescript
interface AsyncValue {
  [R.awaitSymbol](r: Continuation)
}
```

The results of async functions and `AsyncIterator` protocol methods calls aren't
Promises. There is another interface for them - `AsyncValue`. It is a
replacement for Promises. The `then` method is replaced with `[R.awaitSymbol]`.
It takes an object with `Continuation` interface instead of two callbacks.  In
the transpiled code `AsyncValue` interface is used instead of `Thenable`.  All
the `AsyncValue` objects in this library also implement `Thenable`, so
everything (except a few control operators) works even if not transpiled.

The goal of this new interface is to make the continuation (the two callbacks
methods of `Thenable` replacement) to be serializable. It is difficult to
serialize a function if it has closure captured variables, or it is a result of
`Function#bind`. But it is much simpler if instead of callbacks the program
operates with objects where method are defined in its prototype.

The method name is a local symbol - `R.awaitSymbol`. This makes extending other
classes (like Promise) safer.

Transpiled program expects `await` arguments to be `AsyncValue`.  Passing a
Promise there will work because the library extends its prototype. However, this
will make the state not-serializable until it is settled.

Not-transpiled(native) version works only with `Thenable`. So if the code is
supposed to be used in both modes (transpiled and not), the argument should
implement both interfaces.

Unlike `then` method `[R.awaitSymbol]` returns nothing. So async operations can
be composed only at the left (e.g., something like `a.then(f).then(g)` isn't
possible, and its equivalent `a.then(x => f(x).then(g))` to be used
instead). This way we avoid allocations considering the API is designed to be
used mostly by generated code, and the generated code composes computations only
at the right.

### Continuation interface

```typescript
interface Continuation {
   resume(v:any)
   reject(v:any)
}
```

This is a protocol for `[R.awaitSymbol]` methods argument. Here
`resume`/`reject` methods correspond to `then` arguments in `Thenable`
interface.

These objects can be captured, saved (or cloned) and resumed after.

The ability to clone continuations makes it different to ECMAScript async
(generator) functions. There the continuation can be executed at most once.

Some lightweight ES Proxy based copy on write can be used instead of a full
clone for better performance. Or the object may be stored in some DB if it is
suspended on some long-running remote operation.

### Context

JavaScript engines have a single global event loop and a queue to schedule async
jobs. For simplicity, assume there is a global variable maintained by JavaScript
runtime. I'm calling it Context here.

Unlike JS engines, this library supports multiple contexts. They may be assigned
either globally, or per each async(generator) functions, or per each currently
running async(generator) threads.

By threads here I mean cooperative multitasking threads - coroutines. The
control can be switched to another thread only when the currently running thread
suspends on `yield`/`await`. However, they are not really coroutines here. With
the library, it is possible to resume them more than once from the same
point. This feature makes coroutines different to continuations.

There are many use cases for having multiple contexts. Some custom scheduling
strategies, say, animation jobs have bigger priority, etc. Or some (but not all)
running instances may be shared between, say, front-end and back-end.

For running threads contexts are assigned to its `[R.contextSymbol]`
property. It may be a property of the value itself or its prototype - the
invoked function `prototype` property.

There is also a global context used to assign the prototype's property when
function's objects are constructed. It can be changed/accessed with
`R.context(newContext?:Context):Context` function.


```typescript
interface Context {
  reg(thread:Async|AsyncGenerator)
  unreg(thread:Async|AsyncGenerator)
  running?: Set<Async|AsyncGenerator>
  scheduler: Scheduler
}
```

Here `reg`/`unreg` callbacks are called when the function's invoked and exited,
`running` field is optional, not used by the library, but maintained by default
`Context` implementation for use in applications.

### Scheduler

It is an interface for `scheduler` field in `Context` objects. It defines an
order of `Job`s executing in this context. The default implementation uses
JavaScript engines event loop.

```typescript
interface Scheduler {
  enqueue(job: Job)
  onIdle(job: Job)
}

interface Job {
  run()
}
```

The library schedules jobs to be executed using `enqueue` or `onIdle`
methods. The first one asks scheduler to run the job in an unspecified order and
the second only if no other jobs are enqueued on this schedule. The idle queue
only needed by `R.idle`. If it is not used the method may be omitted too.

### Serialization

The library itself doesn't contain any serialization or cloning routine. Any
third party can be applied.

As an option there is 
[@effectful/serialization](https://github.com/awto/effectfuljs/tree/master/packages/serialization)
library and there are another library binding these two -
[@effectful/es-persist-serialization](https://github.com/awto/effectfuljs/tree/master/packages/es-persist-serialization)

### Accessing execution state

The library may be used without transpiling sources, and it will work the same
way ECMAScript effects work for most of the programs. There is a set of
constants to access the extras. And they will work only if the sources are
transpiled. Their type extends `AsyncValue`, so to access the value use either
`await` or its `[R.awaitSymbol]` method.

#### `R.current: AsyncValue<Continuation>`

Awaiting this value returns current continuation object to the calling thread.
This object may be used to resume the computation from the same `await R.current` 
expression, but next times it returns values passed to the
continuation `resume` function, or it throws an exception if `reject` function
is called.

The returned continuation object is a reference. It is not a clone. If some
variable is changed or the calling thread suspends on next `await`/`yield` the
object will be updated too. It is the responsibility of the caller to clone it.

This can be used to fork threads (like POSIX `fork` function). The forked thread
can even survive process restart if stored in DB.

```javascript

let cont

async function forkable() {
    // ....
    const current = await R.current
    if (current) {
       cont = clone(current)
       // continue the same thread
    } else {
       // child thread
    }
}

async function startChild() {
  cont.resume()
}

```

The resume can receive any argument here. It will be a result of `await
R.current` in `forkable`. The test for a child thread in the sample may need a
change though.

Cloning and re-running the same continuation several times will execute
`finally` blocks several times as well. This may be not desired behavior if the
blocks are used to clean some resources. Your library will need a special
combinator [dynamic-wind](https://docs.racket-lang.org/reference/cont.html#%28def._%28%28quote._~23~25kernel%29._dynamic-wind%29%29) to handle this, and it requires delimited continuations implemented in
[@effectful/cc](https://github.com/awto/effectfuljs/tree/master/packages/cc).

It works only in transpiled code.

#### `R.idle: AsyncValue<Continuation>`

It is the same as `R.current` but the `await` expression will be settled only if
the current scheduler has nothing enqueued.

Using it instead of `R.current` makes programs more deterministic. Also no needs
to serialize scheduler state. The default scheduler isn't even serializable. It
uses JS engine's event loop.

It works only in transpiled code.

#### `R.abort: AsyncValue`

Awaiting `R.abort` stops execution without returning any result.  It
can be used to cancel further execution if the corresponding
continuation is cloned and will be executed after.

It is similar to awaiting never settling Promise but without holding a
reference to its local variables. They can be garbage
collected. However `finally` blocks aren't executed. If a program
needs cleaning some resources in `finally` block, better throw some
exception and catch it somewhere in top-level.

It works only in transpiled code.

#### `R.managed: AsyncValue<boolean>`

This returns true if the currently running thread is transpiled to support the
other control combinators (`R.current`/`R.idle`/`R.abort`/`R.lock`).

### Helpers

#### `R.all(arg: Iterable<AsyncValue>): AsyncValue<any[]>`

An alternative for ECMAScript `Promise.all`. The result is serializable if all
elements of `arg` are.

#### `R.any(arg: Iterable<AsyncValue>): AsyncValue`

An alternative for ECMAScript `Promise.race`. The result is serializable if all
elements of `arg` are.

#### `R.producer(): Producer`

Returns an AsyncIterator object with functions `send`/`stop` to provide some
next value and to finish it resp.

#### `R.lock(): AsyncValue & Continuation`

A helper to implement different threads combinators. Returns an object which is
both an AsyncValue and a Continuation. Awaiting the object will block the thread
until `resume` or `reject` method of the same object is called.

It works only in transpiled code.

## Performance

At the time of writing this, @effectful generators implementation is faster than
natives for all mainstream engines. Implementing persistence requires replacing
local variable references with object's member access. It is an overhead, but
modern engines handle it well.

## License

Copyright © 2018 Vitaliy Akimov

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 
