# @effectful/es-persist

ECMAScript standard effects (async, generator and async generator functions)
with access to their full internal state.

It may be used for fully persistent state, time traveling, custom jobs
scheduling etc.

## Usage

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-persist
```

In .babelrc:

```json
{
  "presets": "@effectful/es-persist/transform"
}

```

Unlike ECMAScript, async functions won't return Promise object, but an object
storing all the local variables values and execution control state.

This object is serializable if the local variables are. This must be
reference-aware serialization. Closure captured variables will use shared
references to their parent object.

If the async function was suspended on `await`, its argument is in `awaiting` field.
To resume execution after call `resume` method, with its argument is result of
the `await` expression.

If the function exited its result value will be in `value` field,
and property `done' is `true`.

All threads are stored in global variable and it may be read using `context` function.

```javascript
import * as R from "@effectful/es-persist"

// ....

var ctx = R.context()
```

It contains `threads` field with a `Set` of all currently running async functions,
and may be used to store and restore the whole application state.

The library itself doesn't contain any serialization routine, any third party
can be applied.

The library may be also used for time traveling. Just store state diffs and patch
the current state if needed.


The `await` argument isn't required to be a Promise. It even isn't supposed to
be then-able. Any value applies, it is up to the application how to interpret
the values.

Optionally it may contain `R.chainSymbol` method as a replacement of `then`.

```typescript

type Chainable = {
  [R.chainSymbol](r: Resumable): Chainable
}

type Resumable = {
   resume(v:any): Chainable
}

```

The object is to call `resume` method after some async operation is over,
passing its result as argument. This will automatically resume execution of
the dependent thread.

Alternatively, some scheduler may be used instead. For example it may even
support priorities. The application just needs to interpret threads from the
context in any specific order.

## License

Copyright © 2018 Vitaliy Akimov

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 

