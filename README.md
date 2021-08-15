# JavaScript embedded effects compiler

[![Build Status](https://dev.azure.com/effectful/js/_apis/build/status/awto.effectfuljs?branchName=master)](https://dev.azure.com/effectful/js/_build/latest?definitionId=1&branchName=master)

This is a tool to build JavaScript to JavaScript transpilers(babel plugins)
along with a few predefined ones. It extends JavaScript language with
various computation effects by means of runtime libraries but without any syntax extension.

There are such libraries for:

- EcmaScript effects extensions (async functions, generators and
  async generators)
  - **_Why not native or other transpilers_**
    - Abstract API -
      [@effectful/es](packages/es)
    - Persistent state -
      [@effectful/es-persist](packages/es-persist)
    - Concrete API -
      [@effectful/es-inline](packages/es-inline),
      the best performance
    - Implicit parallelism
    - Deriving program's static graphs for analysis and conversion to other
      languages - WIP
- Multi-prompt delimited continuations -
  [@effectful/cc](packages/cc)
- Logical programming - WIP [Old version](https://github.com/awto/mfjs-logic)
- Debugger API -
  [@effectful/debugger](packages/debugger) and VSCode plugin [effectful/debugger](packages/vscode-debugger)

Not yet implemented:

- algebraic effects
- probabilistic programming
- parallel and distributed programming
- persistent continuations
- adaptive computations
- reactive programming (with RxJS) - [Old version](https://github.com/awto/mfjs-rx)

They are typically small libraries, some of them are just tiny
wrappers around well-known interfaces, such as Promises or
Observables.

The compiler converts ES2018 to ES2018 and doesn't need any syntax
extensions. So it may be applied to results of other compilers
targeting JS such as CoffeeScript, TypeScript etc.

## Usage

EffectfulJS is a tool to build transpilers. There are many packaging
options and usages, but typically the follow next
pattern. Transformations usually contain a babel plugin (and/or macro)
along with some runtime. They can be in a single package, with
Effectful to be a peer dependency (along with a dev dependency). This
way the transpiler can be installed with:

```
$ npm install --save <lib name>
$ npm install --save-dev @effectful/core
```

If the babel plugin is in `transform.js` of `<lib name>` package, `.babelrc` can be:

```
{
   "plugins": [<lib name>/transform]
}
```

The package can also contain `macro.js` file for zero-configuration using
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros). This works also for
[Create Reat App](https://github.com/facebook/create-react-app)) where `.babelrc` is disabled.

Check the libraries documentation for exact details:

- [@effectful/js](packages/js)
  compiles to the most abstract code, single or double level depending
  on parameters
- [@effectful/es](packages/es)
  for two-levels syntax either concrete ECMAScript compatible effects
  or abstract for async, generator and async generators semantics
  overloading.
- [@effectful/es-inline](packages/es)
  A shortcut for [@effectful/es](packages/es)
  with concrete ECMAScript effects implementations.

All the plugins and macros are just shortcuts to
[@effectful/core](packages/es)
setting needed lower level options described in
[config.js](packages/core/src/config.js)
thus generated code uses different runtime interfaces.

## Examples

These examples are not the full list of features. The project is
abstract, with a lot of different applications.

### Persistent state

Save all your application state in DB or file. The state includes the point
where it executes now along with all variables values implementing any
serialization interface.

Restore the saved state after, maybe in a different process or even on a
different hardware.

For the application, the state transfer will be transparent.

This feature greatly simplifies defining long-running workflows. If the
program requires some not immediate action from a human,
e.g. email-confirmation, or it should await some exact date. No needs to
bother implementing all these details, just write a very simple script
describing the business logic and nothing else.

Here's some shop business logic example.

```javascript
function order(customer, item) {
  begin();
  customer.balance -= item.price;
  item.vendor.balance += item.price;
  scheduleShipment(customer, item);
  commit();
}
```

The `scheduleShipment` function may require some other people involved. They can
reject the transaction and so the balances values must be reset to original
levels, even if a few days already passed. We don't care about implementation
details. Such as where and how to store the state, how to reset it, etc.
Everything is done by some underlying generic framework. The framework is not a
subject of EffectfulJS though.

There are a lot of other applications for a persistent state. It can be used
also for debugging purposes. This makes it very simple to implement **hot
reloading** and **time traveling**, as this just saving and restoring the
application state at some particular execution points.

More details are in [@effectful/es](packages/es)
project.

### Delimited continuations

This is the most generic computational effect. Any other can be implemented
using it. It looks very similar to Coroutines (async functions and
generators). But unlike Coroutines, it allows resuming computation from the same
point more than once.

Unlimited continuation like `callcc` is a special case. They allow capturing all
and only all execution context. While with delimited continuations it is
possible to specify only some region. For example, for the persistent state,
this allows saving not the whole application state, which may be big, but only
some interesting part.

Check [@effectful/cc](packages/es) for
more details.

## Implicit parallelism

Async functions considerably simplify asynchronous source code. But it
serializes operation execution. Next operation executes only after the current
is finished. If we want to run the operations in parallel we can use
`Promise.all`.

Say, we have two async operations (probably some remote server requests) - `A`
and `B`:

```javascript
async function a() {
  const a = await A;
  const b = await B;
}
```

If these operations are independent they can be executed in parallel:

```javascript
async function a() {
  const [a, b] = await Promise.all([A, B]);
}
```

This doesn't look more complex, but what if we make `B` dependent on `A` and add
another operation `C`:

```javascript
async function parDemo() {
  const a = await A;
  const b = await B(a);
  const c = await C;
}
```

Now it is impossible to start `B` before `A` is finished, but we can start `C`
in parallel with `A` and `B`:

```javascript
async function parDemo() {
  const [a, c] = await Promise.all([A, C]);
  const b = await B(a);
}
```

This version is not effective, operation `C` may take much longer than `A`
and this will prevent `B` from starting execution. The correct version is:

```javascript
async function parDemo() {
  let a;
  const [b, c] = await Promise.all([
    (async () => {
      a = await A;
      b = await B(a);
    })(),
    C
  ]);
}
```

This is obviously significantly more complex, error-prone, harder to read and
maintain. It will become even much worse with some next small changes. They may
require almost full function rewrite.

Fortunately, EffectfulJS can do the transformation automatically, just specify
which block you want to parallelize. The transpiler will automatically compute
variables dependencies and structure the block parts in `Promise.all`
accordingly.

Here is how the last example looks with EffectfulJS:

```javascript
async function parDemo() {
  "par";
  const a = await A;
  const b = await B(a);
  const c = await C;
}
```

Switching between parallel and sequential code is just a matter of adding "seq"/"par"
directives.

This works for loops too. With the help of a **persistent state** some jobs may
be delegated to **WebWorker** or some **cloud server**, making simple but
effective distributed programs.

### Reactive programming (WIP)

Reactive programs operate with values which change with time. While in
the source code it looks like a single value variable:

```javascript
function drawBox(root) {
  const down = event(root, "mousedown");
  if (down && down.button === 0) {
    const move = event(root, "mousemove");
    const up = event(root, "up");
    const cur = move || up;
    const box = (
      <div className={up ? "box" : "drawing"}>
        style=
        {{
          left: Math.min(down.x, cur.x) + pageXOffset,
          top: Math.min(down.y, cur.y) + pageYOffset,
          width: Math.abs(down.x - cur.x),
          height: Math.abs(down.y - cur.y)
        }}
        >
      </div>
    );
    const del = event(box, "contextMenu");
    if (!del) root.appendChild(box);
    if (!move) return;
  }
}
```

Here all the variables may change when some mouse event is received, while the
program looks like it is executed only once. The framework is responsible for
recalculating dependant parts of the program. Such programs are much easier to
write, test, debug and maintain.

### Logical programming (WIP)

This is a library for adding logical programming languages features to
JavaScript. Most Prolog books start from classical bi-directional list append
function. Depending on input arguments it may either append two lists or split
some list in two. Here is an almost literal translation of its implementation in
JavaScript:

```javascript
function append(a, b, r) {
  const [h, t, rt] = newRefs();
  unify(a, cons(h, t));
  unify(r, cons(h, rt));
  append(t, b, rt);
  M.or();
  unify(a, nil());
  unify(r, b);
}
```

For front-end, this, for example, can be useful to specify some control's values
constraints. In the next example, there are three cyclically dependent fields,
namely payment amount without discount, with discount and the discount
value. The end-user may enter two of them while the third will be calculated
automatically.

```javascript
function PaymentForm() {
  const [cost, discount, finalCost] = newRefs();
  constraint(finalCost === (cost * discount) / 100);
  return (
    <form action="/pay">
      <input type="text" name="cost" value={cost} />
      <input type="text" name="discount" value={discount} />
      <input type="text" name="finalCost" value={finalCost} />
      <input type="submit" value="Pay" />
    </form>
  );
}
```

The same can be done with the new React hooks, which is an implementation of
computational effect relying on runtime only. Transpiler like EffectfulJS
doesn't have runtime-only limitations, namely,
[React Hooks Rules](https://reactjs.org/docs/hooks-rules.html).
They significantly reduce the number of useful use cases. Some complex program
logic may be simplified with loops, conditions and other common JavaScript
constructs.

## How it works

The compiler stratifies input JavaScript code into two levels. The
first level (_pure_) contains JS constructs (expressions, statements)
kept as is in generated code. The second level (_effectful_) contains
effectful constructs. The compiler converts them into abstract
function calls.

I'm abusing term _pure_ here. The statements or expressions on this
level can have any side effect already implemented in
JavaScript. Namely IO, references, exceptions, loops, breaks, returns,
etc.

The levels may be either explicit or implicit in syntax (two-level or
single-level syntax resp.).

Async functions or generators syntax can be used for marking
expressions of explicit _effectful_ level.

```javascript
async function a() {
  console.log("x:", await getX());
}
```

Unlike standard ECMAScript async function this will be converted to
abstract API calls. The API is

The overloading may be either compile time - implementing some syntax
transforms, or runtime - providing libraries with abstract interfaces
implementations.

This is an example of one of a few possible outputs:

```javascript
function a() {
  return M.chain(getX(), _1);
  function _1(a) {
    console.log("x:", a);
  }
}
```

There `chain`, `raise` methods are provided by some runtime library.
For example, its concrete implementation for Promises calls `then`
function for `chain` and rejects the promise in `M.raise`.

The names and interfaces of the functions in the generated code are
configurable.

There is a dozen of such functions required to be implemented in
concrete effects implementation library but, usually, most of them are
trivial.

The interface is based on Monads. However understanding Monads is
required only to implement some new effects library. No needs to know
anything about them to use the libraries.

With the implicit single-level mode the same code may be even more
succinct:

```javascript
function() {
  console.log("x:",getX());
}
```

There are more examples of input/output in the
[test folder](packages/js/test/samples).

It is arguable if explicit or implicit levels separation is
better. This likely depends on what kind of effects is used. The
succinct and more readable code is good, but if effects are heavy
making them explicit may be better. So EffectfulJS compiler supports
both options.

## LICENSE

Distributed under the terms of The MIT License (MIT).
