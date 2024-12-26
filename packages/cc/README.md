# @effectful/cc

Runtime library for multi-prompt delimited continuations with
[EffectfulJS](https://github.com/awto/effectfuljs).

From v2 the library uses [@effectful/debugger](../debugger) for implementation of control effects.
This makes the transpilation to be heavier, but many useful features are enabled by default. Such us:

* code is debuggable in VSCode using [effectfuk.debugger](https://marketplace.visualstudio.com/items?itemName=effectful.debugger) extension
* continuations and all the functions are serializable
* and more

It's also now only supports one-layer JavaScript (no overriding of async/await and generators syntaxes at the moment). I simply don't need them, but they are quite simple to add if needed. Let me know if you need them. 

Async/await and genrators are still available, though, with the same semantics as in JavaScript. However, it's not clear, why you would need them in the presence of delimited continuations.

[API documentation](api.md)

## Description

It is the most generic effects API implementation, and it can be
converted into any other one. These include JavaScript built-in
effects - state, async/await, generators, exception, etc.

Delimited continuations effect is also, probably, the most complex to
understand. I'm trying to explain it using exceptions analogy here. It
is like an exception, with execution may be resumed from `throw` point
several times.

This library is multi-prompt one. Prompt is a kind of a label. Imagine
JavaScript has labeled `try-catch` and `throw` statements. The label
is specified as another argument of `throw` and only `catch` block
with the same label catches it. All the others just rethrow to their
upper level. In the library the prompt(label) function is created
using `CC.newPrompt` function.

Function `CC.pushPrompt` is a replacement of `try` block. Its first
argument is a prompt object (specifying which exceptions) to catch,
and the second argument is a `try` body where an exception (with same
prompt) may raise. Note, there is no `catch` block, it is specified
with `throw` replacement.

The `throw` replacement is `CC.withSubCont`. Its first argument is a
prompt object again, specifying which `CC.pushPrompt` should catch
it. If there are a few `CC.pushPrompt` with the same prompt, the
innermost will be selected. The second argument is a `catch`
block. Unlike `try-catch` where the block is adjunct of `try`
statement, here it is specified along with `throw` replacement. Also,
there is no exception object.

The catch block is a function taking continuation object. It captures
execution path from `CC.withSubCont` (`throw`) to `CC.pushPrompt`
(`try`). In JavaScript exceptions, it is simply dropped. This object
allows resuming execution from the `CC.withSubCont` (`throw`) several
times.

If the captured continuation never executed the library works
precisely like exceptions. First executes `catch` block and continues
after `try` if the `catch` block doesn't throw anything else.

The continuation object received in `CC.withSubCont` may be called
anywhere using `CC.pushSubCont` function. Its first argument is the
continuation object captured in `CC.withSubCont`.

When `CC.withSubCont` is called, like for `throw` statement, the
execution control is suspended (aborted). When `CC.pushSubCont` is
called the execution is resumed with a resulting value of
`CC.withSubCont` on the resume is a result of the second argument of
`CC.pushSubCont`.

After the resumed execution control reaches `CC.pushPrompt` (`try`
statement), if not interrupted by anything else, it continues from the
`CC.pushSubCont` call. The call result is a result of `CC.pushPrompt`
block.

These four functions are the base. The others are defined using them.

When resuming continuations several times, if they change some
variable values, the change is visible on next run by
default. However, the continuation object may be cloned in whatever
way your program needs (shallow/deep) to restore variables
values. Alternatively, it may be Proxy based copy-on-write for better
performance.

The continuations are serializable using [@effectful/serialization](../serialization/).

## Usage

```
npm install @effectful/cc
npm install --save-dev @effectful/js
```

Note, if you need to use `eval` or Function constructor, `--save` "@effectful/js" too.

Import into your code, and use [babel-plugin-macro](https://github.com/kentcdodds/babel-plugin-macros) to transform the whole file:

```
import ctrl from "@effectful/js/macro";
import * as CC from "@effectful/cc";

```

WARNING: the babel plugin for the transpilation must run in a separate pass in the preset, for example:

```json
{
  "passPerPreset": true,
  "presets": [
    "some-other-preset",
    {
      "plugins": ["babel-plugin-macro"]
    }
  ]
}
```

See [@effectful/js](../js) for more details about alternative ways to transpile the code.

Since the transpiler currently doesn't support `import` and thus must be pre-transpiled into CommonJS with 
[@babel/plugin-transform-modules-commonjs](https://babeljs.io/docs/babel-plugin-transform-modules-commonjs). And babel-plugin-macros ignores `require` if it isn't in variable declarations, we cannot use a shorthand syntax with just `import`. It must be default import (or some variable declaration for CommonJS `require`), with the actual imported value never used.

Also [@babel/plugin-transform-typescript](https://babeljs.io/docs/babel-plugin-transform-typescript) may remove this import since it isn't used. To avoid this pass `{ "onlyRemoveTypeImports": true }` argument.

## References

The library implements interface from [A Monadic Framework for Delimited Continuations][2]
paper.

[1]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.43.8213 "Representing Monads, Andrzej Filinski."
[2]: http://www.cs.indiana.edu/cgi-bin/techreports/TRNNN.cgi?trnum=TR615 "A Monadic Framework for Delimited Continuations, R. Kent Dybvig, Simon Peyton Jones, Amr Sabry."

## License

Distributed under the terms of the [The MIT License (MIT)](LICENSE).
