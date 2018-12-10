# JavaScript embedded effects compiler

This is a JavaScript to JavaScript transpiler. It extends JavaScript
language with various computation effects by means of runtime
libraries.

There are such libraries for:

 * EcmaScript effects extensions (async functions, generators and
   async generators)
   * **_Why not native or other transpilers_**
     * Abstract API -
       [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
     * Persistent state -
       [@effectful/es-persist](https://github.com/awto/effectfuljs/tree/master/packages/es-persist)
     * Concrete API -
       [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es),
       the best performance
     * Implicit parallelism - Docs SOON
     * Deriving program's static graphs for analysis and conversion to other
       languages - SOON
 * Multi-prompt delimited continuations -
   [@effectful/cc](https://github.com/awto/effectfuljs/tree/master/packages/cc)
 * Logical programming - SOON [Old version](https://github.com/awto/mfjs-logic)

Not yet implemented:
  * probabilistic programming
  * parallel and distributed programming
  * persistent continuations
  * adaptive computations
  * reactive programming (with RxJS) - [Old version](https://github.com/awto/mfjs-rx)

They are typically small libraries, some of them are just tiny
wrappers around well-known interfaces, such as Promises or
Observables.

The compiler converts ES2018 to ES2018 and doesn't need any syntax
extensions.  So it may be applied to results of other compilers
targeting JS such as CoffeeScript, TypeScript etc.

## How it works

The compiler stratifies input JavaScript code into two levels. The
first level (*pure*) contains JS constructs (expressions, statements)
kept as is in generated code.  The second level (*effectful*) contains
effectful constructs. The compiler converts them into abstract
function calls.

I'm abusing term *pure* here. The statements or expressions on this
level can have any side effect already implemented in
JavaScript. Namely IO, references, exceptions, loops, breaks, returns,
etc.

The levels may be either explicit or implicit in syntax (two-level or
single-level syntax resp.).

Async functions or generators syntax can be used for marking
expressions of explicit *effectful* level.

```javascript 
async function a() { 
  console.log("x:",await getX()); 
}
```

Unlike standard ECMAScript async function this will be converted to
abstract API calls. The API is

The overloading may be either compile time - implementing some syntax
transforms, or runtime - providing libraries with abstract interfaces
implementations.

This is an example of one of a few possible outputs:

```javascript 
function a() { return M.chain(getX(), _1);
function _1(a) { console.log("x:",a) }
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
[test folder](https://github.com/awto/effectfuljs/tree/master/packages/js/test/samples).

It is arguable if explicit or implicit levels separation is
better. This likely depends on what kind of effects is used. The
succinct and more readable code is good, but if effects are heavy
making them explicit may be better. So EffectfulJS compiler supports
both options.

## Usage

There are babel presets in separate packages.

*
  [@effectful/js](https://github.com/awto/effectfuljs/tree/master/packages/js)
  compiles to the most abstract code, single or double level depending
  on parameters *
  [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
  for two-levels syntax either concrete ECMAScript compatible effects
  or abstract for async, generator and async generators semantics
  overloading.  *
  [@effectful/es-inline](https://github.com/awto/effectfuljs/tree/master/packages/es)
  A shortcut for
  [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
  with concrete ECMAScript effects implementations.

All the presets are just shortcuts to
[@effectful/core](https://github.com/awto/effectfuljs/tree/master/packages/es)
setting needed lower level options described in
[config.js](https://github.com/awto/effectfuljs/blob/master/packages/core/src/config.js)
thus generated code uses different runtime interfaces.

## LICENSE

Copyright © 2016-2018 Vitaliy Akimov

Distributed under the terms of The MIT License (MIT).

