# @effectful/cc

Runtime library for multi-prompt delimited continuations with
[EffectfulJS](https://github.com/awto/effectfuljs).

[API documentation](api/README.md)

## Usage

For single level syntax and activating by import:

```
$ npm install --save-dev @effectful/js
$ npm install --save @effectful/cc
```

In .babelrc:

For two-level syntax with `async/await` overloading:

```json
{
  "presets": "@effectful/cc/transform-async-do"
}
```

NOTE: If you need another babel presets, add `"passPerPreset":true`, e.g.

```json
{
  "passPerPreset": true,
  "presets": ["@effectful/cc/transform-async-do", "env"]
}
```


In JS files to transpile:

```javascript
import * as CC from "@effectful/cc"
```

or

```javascript
var CC = require("@effectful/cc")

```

All async functions in files with the imports will be transpiled into delimited
continuations functions.

For single-level:

```json
{
  "presets": "@effectful/cc/transform"
}
```

After in files importing "@effectful/cc" use directives:

```javascript
import * as CC from "@effectful/cc"

// ... all functions here won't be modified

CC.profile("defaultFull")

// ... all functions here are transpiled treating any function call as effectful

CC.profile("disabled")

// ... all functions here aren't modified again

```

To get effectful value in single-level mode use `CC.reify` function.

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
prompt) may raise.  Note, there is no `catch` block, it is specified
with `throw` replacement.

The `throw` replacement is `CC.withSubCont`.  Its first argument is a
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

If the program is built with `topLevel:true` the continuation object
may be even serialized and restored in some other process. This, of
course, requires all the captured variables to be serializable.

Why do we need the other libraries if this library is the more
generic? Becuase of performance, no indirection layer, and another
effects API may be inlined.  The compiler is also able to derive more
efficient combinators, for example, implicit parallelism (Applicative
function API).

## References

The library implements interface from [A Monadic Framework for Delimited Continuations][2]
paper.

[1]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.43.8213
     "Representing Monads, Andrzej Filinski."
[2]: http://www.cs.indiana.edu/cgi-bin/techreports/TRNNN.cgi?trnum=TR615
     "A Monadic Framework for Delimited Continuations, R. Kent Dybvig, Simon Peyton Jones, Amr Sabry."

## License

Copyright © 2016-2018 Vitaliy Akimov

Distributed under the terms of the [The MIT License (MIT)](LICENSE). 

