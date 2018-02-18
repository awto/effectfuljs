# JavaScript embedded effects compiler

This is  a JavaScript to JavaScript transpiler. It offers extending JavaScript
language with various effects by means of runtime libraries, with or without
compiler plugins.

There are such libraries for:

 * EcmaScript effects extensions (async functions, generators and async generators)
   [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
 * Multi-prompt delimited continuations -
   [@effectful/cc](https://github.com/awto/effectfuljs/tree/master/packages/cc)
 * Logical programming - SOON [Old version](https://github.com/awto/mfjs-logic)

Not yet implemented:
 * probabilistic programming
 * parallel and distributed programming
 * persistent continuations
 * adaptive computations
 * reactive programming (with RxJS) - [Old version](https://github.com/awto/mfjs-rx)

They are typically small libraries, some of them are just tiny wrappers
around well known interfaces, such as Promises or Observables.

The compiler converts ES2018 to ES2018 and doesn't need any syntax extensions. 
So it may be applied to results of other compilers targeting JS such as 
CoffeeScript, TypeScript, Babel etc.

It stratifies input JavaScript code into two levels. The first level (*pure*)
contains JS constructs (expressions, statements) kept as is in generated code.
The second level (*effectful*) contains effectful constructs. The compiler
converts them into abstract function calls.

I'm abusing term *pure* here. I don't mean the first level staments or expressions
don't have side effects. This is plain, usual  JavaScript and it is absolutely
not a problem to use the side effects already embedded in JavaScript.
Namely IO, references, exceptions, control flow, etc. 

Their separation may be either explicit or implicit (two-level or
single-level syntax resp.). 

Async functions or generators syntax can be used for explicit level separation.

```javascript
async function a() {
  console.log("x:",await getX());
}
```

The resulting function may be either standard conforming async function,
or some effects library can overload default behavior to implement something
from the list above. 

The overloading may be either compile time - implementing some syntax transforms,
or runtime - providing libraries with abstract interfaces implementations.

This is an example of one of a few possible outputs:

```javascript
function a() {
  return M.chainBH(getX(), _1, _2);

  function _1(a) {
    console.log("x:",a)
  }

  function _2(e) {
    return M.raise(e);
  }
}
```

There `chainBH`, `raise` methods are provided by some runtime library.
For example its concrete implementation for Promises calls `then` function
for `chainBH` and rejects the promise in `M.raise`.

The names and interfaces of the functions in the generated code
are configurable.

There is a dozen of such functions required to be implemented in concrete
effects implementation library but usually they are trivial.

The interface is based on Monads. However understanding Monads is required
only to implement some new effects library.

With the implicit single-level mode the same code may be even more succinct:

```javascript
function() {
  console.log("x:",getX());
}
```

There are more examples of input/output in the
[test folder](https://github.com/awto/effectfuljs/tree/master/packages/js/test/samples).

It is arguable if explicit or implicit levels separation is better. This likely
depends on what kind of effects is used. The succinct and more readable code is good,
but if effects are heavy making them explicit may be better. So EffectfulJS
compiler supports both options.

## Usage

There are babel presets in separate packages.

* [@effectful/js](https://github.com/awto/effectfuljs/tree/master/packages/js)
  compiles to the most abstract code, single or double level depending on
  parameters
* [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
  for two-levels syntax either concrete ECMAScript compatible effects or abstract for
  async, generator and async generators semantics overloading.
* [@effectful/es-inline](https://github.com/awto/effectfuljs/tree/master/packages/es)
  A shortcut for [@effectful/es](https://github.com/awto/effectfuljs/tree/master/packages/es)
  with concrete ECMAScript effects implementations.

All the presets are just shortcuts to
[@effectful/core](https://github.com/awto/effectfuljs/tree/master/packages/es)
setting needed lower level options described in
[config.js](https://github.com/awto/effectfuljs/blob/master/packages/core/src/config.js)
thus generated code uses different runtime interfaces.

## Known major limitations
 * ES6 supper just replaced with `Object.getPrototypeOf(...)` and `call`, 
   this is enough for most applications. If it is not, transpile classes with babel 
   before effectful pass. No plans to fix this for now. No plans to implement.
 * In parameter's threading mode closure captured variables are always handled by reference. 
   Compiler tries to handle only
   variables by value. All mutating operation like `Array::push` or object's 
   field setting are still visible in other control threads. Closure capturing variables
   semantically are nothing but object's field. So they are references now too.
   But there are short term plans to track even mutating updates soon.
 * setters/getters and constructors cannot be effectful now, may be changed in near future
   after effectful's object referrences are implemented
 * eval/Function construction from string doesn't work, no plans to implement it.
 * configurations with state handling don't support `arguments` object aliasing 
   (chainging its element - changes parameter value).
   This may be implemented in future.

## LICENSE

Copyright © 2016-2018 Vitaliy Akimov

Distributed under the terms of The MIT License (MIT).

