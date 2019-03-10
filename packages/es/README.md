# @effectful/es

The two-level syntax for effects based on ECMAScript async, generator and
async generator functions syntax overloading.

The project is a babel plugin for integrating new custom computational effects
into JavaScript.

The first level is plain JavaScript constructs, and the second level
is async, generators and async generators function syntax. By means of the plugin
default implementations for the effectful(second) level syntax can be overloaded.

As a proof of concept, there are default implementations of corresponding ECMAScript
standard effects.

The project is a part of [EffectfulJS](https://github.com/awto/effectfuljs) tool chain.


## Why

Here is a list of things not available with native or other transpiler implementations:

 * Abstract API - can be re-implemented or amended for your purposes, next items are consequences of this one
 * Custome Concrete API for better performance
 * [Persistent state](https://github.com/awto/effectfuljs/tree/master/packages/es-persist)
 * Implicit parallelism - Docs SOON
 * Deriving program's graph for static analysis - SOON

## Usage

### Abstract interface

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-rt
```

For example:

```json
{
  "plugins": ["@effectful/es/transform"]
}
```

Or:

```
$ babel --plugins @effectful/es/transform index.js
```

By default it injects imports for
[@effectful/es-rt](https://github.com/awto/effectfuljs/tree/master/packages/es-rt).

It is an implementation of the abstract interface for EcmaScript async,
generators and async functions. The interface doesn't yet have documentation.
The default implementation is pretty small and can be used as a reference for
now. There is `importRT` option to pass some overloaded concrete
implementations libraries. 

```json
{
  "plugins": [["@effectful/es/transform",{"importRT":"my-custom-effects"}]]
}
```


### Zero-config transformation

Zero-configuration using
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros),
or any other tool where it is enabled by default (such as 
[Create Reat App](https://github.com/facebook/create-react-app) since v2).

Just import "@effectful/es/macro" module in the module you want to transpile.

### Inlined concrete implementation

```
$ npm install --save-dev @effectful/es
$ npm install --save @effectful/es-inline-rt
```

This .babelrc

```json
{
  "plugins": [["@effectful/es/transform",{"inline":true}]]
}
```

It is a much faster implementation, but there is no way to overload anything.

Other options are:

  * `loose` - like `inline` but it also drops a few ECMAScript compatibility
  features to make the generated code even more smaller and faster
  * `defunct` - if `true` state is encoded as number and a there is a single
  function to move between states; otherwise, the state is a state transition
  function callback
  * `topLevel` - if `true` moves state transition functions outside original
  function's body
  * `par` - enables implicit parallelism. It doesn't yet work with 
  "inline", "loose" and "topLevel"

There are quite a few of lower level options described in
[config.js](https://github.com/awto/effectfuljs/blob/master/packages/core/src/config.js).

Their values can be provided using `all`, `file`, `pure`, `effectful`, `generators`, `async`,
`asyncGenerators` fields in the plugin options. For example, to use CommonJS modules instead
of defaulting ES for runtime injection use:

```json
{
  "plugins": [["@effectful/es/transform",{"file":{"modules":"commonjs"}}]]
}
```

## Implicit parallelism

If enabled the compiler will locate "par" and "seq" in the beginning
of the block to switch between parallel and sequential mode resp.

For example:

```javascript
async function parDemo() {
  "par";
  const a = await A;
  const b = await B(a);
  const c = await C;
}
```

ESLint complains about not used expressions, so as an alternative to
the directives there is `profile` function which expects a single
string literal parameter ("par" or "seq"):


```javascript
import * as M from "@effectful/es"

async function parDemo() {
  M.pofile("par");
  const a = await A;
  {
    M.profile("seq")
    const b = await B;
    const c = await C;
  }
}
```

## Cancelation

By default, the runtime also adds `M.cancelSymbol` property to each
returned Promise.  It is a function and it tries to stop the execution
of the corresponding async function.  The cancelation is propagated to
`await` expressions if they have this method, but it isn't propagated
to children.

There is also a helper function `M.cancel` which simply calls
`promise[M.cancelSymbol]()` if it exists.


## LICENSE

Distributed under the terms of The MIT License (MIT).
