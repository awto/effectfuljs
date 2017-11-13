# JavaScript embedded effects compiler

This is  a JavaScript to JavaScript transpiler. It offers extending JavaScript
language with various effects by means of runtime libraries, without even using
compiler plugins.

There are such libraries for (not yet supporting the new interface):

 * Asynchronous programming SOON - [Old version](https://github.com/awto/mfjs-promise)
 * Reactive programming (with RxJS) - [Old version](https://github.com/awto/mfjs-rx)
 * Logical programming - SOON [Old version](https://github.com/awto/mfjs-logic)
 * Multi-prompt delimited continuations - SOON [Old version](https://github.com/awto/mfjs-cc)

Not yet implemented:
 * probabilistic programming
 * parallel and distributed programming
 * persistent continuations
 * adaptive computations

Theare are typically small, some of them are just tiny wrappers of well known
interfaces, such as Promises and Rx Observables.

The compiler converts ES8 to ES8 and doesn't need any syntax extensions. 
So it may be applied to results of other compilers targeting JS such as 
CoffeeScript, TypeScript, Babel etc.

It stratifies input JavaScript code into two levels, namely object and meta
level. Their separation may be either explicit or implicit. 

Generators syntax can be used for explicit level separation. This
way following code:

```javascript
function* () {
  console.log("x:",yield getX());
}
```

will be translated into:

```javascript
function() {
  return getX().mapply(function (b) { console.log("x:", b); });
}
```

Or with implicit mode input code may be even more succinct:

```javascript
function() {
  console.log("x:",getX());
}
```

The output will be the same.

There are more examples of input/output in the
[test folder](https://github.com/awto/effectfuljs/tree/master/test/samples).

The `mapply` function there is abstract. For example its concrete implementation
for promises is their `then` function. There is a dozen of such functions
required to be implemented in concrete effects implementation library.
There is a library with default implementations of most of them using small
basis. The interface builds on Monads interfaces hierarchy from Haskell
(Functor, Applicative, Alternative, Monad).

It is arguable if explicit or implicit levels separation is better. This likely
depend on what kind effect is used. The succinct and more readable code is good,
but if effects are heavy making them explicit may be better. So effectfuljs
compiler supports both options.

I will abuse term *pure* for some JS code or values. This doesn't
mean the code is really pure of course. This is original JavaScript and it
is absolutely not a problem to use the side effects already embedded
in JavaScript. Including IO, references, exceptions, etc. 

Besides two primary explicit and implicit modes, there are means to
treat some parts of the code selectively to be either effectful or pure.

## Background

There are quite a few JavaScript transpilers adding some concrete new effects
into JavaScript language. This tool embeds abstract side effects into language.
Any concrete effect is a runtime library implementing that abstract interface.

One of the examples is recent ES standard updates with generators and `async/await`.
It is a new concrete side effect embedded into language. Adding same coroutines
effects with effectful-js doesn't require standard, syntax change and new compilers.

Human readability for generated code aim is shared with
[kneden](https://github.com/marten-de-vries/kneden) transpiler, and turning
`async/await` into promises expressions. The same may be achieved using effectful-js
with a tiny adapter from promises interface into effectfuljs. There is one implemented
in [@mfjs/promise](https://github.com/awto/mfjs-promise), so effectfuljs approach
does require runtime library loading, while kneden team highlights no runtime
library dependency as an advantage. There is a plan to implement combinators
inlining in effectfuljs, so generated code for promises library will be very similar.
Also, effectfuljs is more complete than kneden(at the time of writing this). It at least
can handle `breaks/return/continue` from `try/catch/finally`.

There are other less known JS extensions may be implemented as library using effectfuljs
compiler. These are [webppl](https://github.com/probmods/webppl) for probabilistic
programming, [flapjax](http://www.flapjax-lang.org/) language for reactive
programming.

A few other JS libraries abstract generators interface to any monad, for example
[burrido](https://github.com/pelotom/burrido). It works pretty well if effects
don't require re-executing of some control paths several times. Which is the
case for reactive, logical programming and continuations. Here is a problem
description for rx monad
[with burrido](https://gist.github.com/awto/9f5337fcf205df335c92f93a859e2fdf)
and this is the same
[with effectfuljs](https://gist.github.com/awto/d71bc466884dc9a9a6a93026ce363d17).

In other languages the most famous examples of similar tools are Haskell
do-notation and C# LINQ. They implement explicit separation of meta and
object levels. They have different syntaxes. In JS burrido does the same.
The effectful level expressions are generators expressions, with
interface adapted to arbitrary monad, while pure code parts use plain JS
syntax.

In single level syntax the layers separation is implicit, and both use the
same language. The first mention of this I know is embedding monads using delimited
control by Andrzej Filinski in
[Representing monad](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.43.8213&rep=rep1&type=pdf)
paper from 1994. There is a more recent implementation of the same idea for Java in
[quasar framework](http://docs.paralleluniverse.co/quasar/) described in
[this post](https://www.infoq.com/articles/Dont-graft-Monads-onto-Imperative-Languages).
Continuations based implementation doesn't allow detecting and automatically
generating Applicative combinators instead of Monadic ones, for more efficient
code (more details in [Applicative vs Monad interface](#applicative-vs-monad-interface)).

There are also concrete side effects compilers with single level syntax,
for example flapjax and webppl.

## Usage

The current version is a library on top of
[estransducers](https://github.com/awto/estransducers) JS transformation
framework. You won't typically use it directly unless you develop own effects
library. There is a babel preset for default translations
[@effectful/babel-presetp-env](https://github.com/awto/effectful-babel-preset-env), or some effects
library may provide similar preset. 

The preset is an extension of [babel-preset-env](https://github.com/babel/babel-preset-env)
and accepts the same arguments
with additional `effectful` object specifying options for effectful framework.

First install it:

```sh
$ npm install @effectful/es
```

Next compile your sources with babel using presets from:

```json
{
  "presets": ["@effectful/es"]
}
```

## Two layers mode

TODO

## Single layer mode

### Code transformation

By default it doesn't touch any code, so it is safe to apply it to all JS
files in the project. The translation is activated when it encounters CommonJS
require for core library module. By default it is `@mfjs/core` but may be
configured. The require call expression must be assigned to some namespace
variable and that namespace name is used to detect translation directives
further in the code. I will use name M for core namespace in the doc.

In default mode (after require) it still doesn't translate anything. To
start actual translation specify how eager you want it to be with `M.profile`
directive receiving a string with the name of the mode. For example "defaultFull"
mode may be used to treat all function calls as effectful in all function
definition except the current one.

In short, the tool converts effectful monadic values in code into its inner
pure value. For example for  promises it converts Promise object into the value
it is going to be resolved to (or already resolved). In generated code this is
converted to appropriate `then` usages. The backward translation is also
needed. In the promises example the code may require access to original promise
object, for example to wait for a few promises in parallel.

### From pure to effectul

 * `M.reify` - expects function expression, executes it immediately but doesn't
    translate value to pure one.

### From effectful to pure

The general backward translation from effectful value to pure value can be
performed using `M` directive. That will translate monadic value into pure
even in "minimal" profile. In "full" profile all functions call will be
immediately reflected into pure value.


### Coercions

Since JavaScript is dynamically typed language we cannot know in compile type
if the function will indeed return monadic value or it may return any pure
value or no value at all. For this to work the library must keep checking the type
of the value and construct monadic value (with M.pure function) if it is not
already monadic. This of course adds additional overhead, so there is an option to
disable coercions. In this case generated code will always return effectful values from
effectful functions, and will not add runtime checks. This, of course, requires stronger
discipline for functions not translated with the compiler using some strong
code style conventions or probably some future type checker. If accidently not
effectful functions are called it will crash.

There is also exceptions coercion. If it is enabled (disabled by default) all
function invocation will be wrapped into `try..catch` block and in the case of
exception its value is translated into `M.raise`.

The coercion level is defined using coerce option with possible values: "none",
"all" or "value".

### Variables scope

Some monads may re-execute some parts of control path several times. The most
typical example is logical programming monad, reactive programming and
continuations.

Programmers would expect variables values to revert their values
on backtracking in a typical logical programming language. The compiler tries to
capture some local variables values for this to work. Not local variables are
global references (the embedded into JavaScript references effects).
If you apply some mutable operator to a local variable it will also be
visible on backtracking. This is a good reason to move to immutable data
structures though.

To avoid local variables capturing use `M.ref` directive
specifying variables as arguments. If the code will be used only for monads
where variable capturing is not needed (like Promise) it may be disabled to avoid
overhead, by setting option `varCapt` to false.

## Applicative vs Monad interface - SOON

There is interfaces hierarchy __Functor__ <- __Applicative__ <- ___Monad__. Functor allows
only changing its inner value of effectful value. Applicative allows combining
several effectful values into one, and Monad is the most generic one allows
changing structure of effectful value depending on inner value. In effectful the
main corresponding functions for the interfaces are `mapply`, `M.arr`,
`mbind` respectively. 

Looking at differences between `mapply` and `mbind`, the first one always
returns pure value while the second (with enabled coercion) may either return
pure or effectful value. And in fact if coercions is active if `mbind` returns
pure value it is semantically equivalent to `mapply`. So one may
wonder why `mapply` is needed at all. Monad generalizes Applicative interface,
so if something has Monad interface it is automatically Functor and Applicative.
But monadic expressions are not suitable for static analysis.

For example, for parser combinators monad this means Monad-based one allows
introducing context dependencies. Depending on some already parsed part
it may return grammar for the next part. While Applicative combinators don't
offer such context dependency but they allow building much more efficient parsers.
It may analyze grammars during parser construction (calculate FOLLOW,
FIRST sets etc). That is impossible for Monad parser because parts of its grammar
will be known only during parsing.

Applicative interface allows implicit program parallelization like in
[haxl](https://github.com/facebook/Haxl).

For some functional reactive libraries which build a data-flow graph, the monadish
application means graph rebuilding (switching). The same applicative version
will have that graph always static. So for example `if-then-else`, if this is
implemented as Monad the two branches graph will always be rebuilt on new value
of condition, and there will be only one branch constructed. While for
Applicative-based one both branches will be always built and only signal
propagation will continue to some single branch depending on input value. This
may be more efficient for libraries where graph construction is expensive,
because of some possible optimizations.

At the present version compiler always tries to translate expressions into
Applicative form, unless they are logical operators (&&, ||) or conditional
(?:), or they change some variable value using direct assignment or update
(+=, ++, =). This diverges from JavaScript semantics because order of
operations and whence side effects order isn’t defined. This is a bad code
practice to have such operation in a single expression anyway. But you may
still disable this by setting option `expr: "seq"`.

The compiler will translate for-loop into `M.forPar` if its tests and update
expressions are pure, tests and body don’t change any variable (assignment
is allowed). Some monad implementation may run each iteration in parallel.

Another option is to translate a sequence of statements into parallel blocks.
It will use `M.par` function in generated code. It takes an array of monadic
values and by default returns another monadic value representing a sequence of
computations. A concrete monad's implementation is free to override it to
something more efficient. The compiler may optionally try to reorder
computations to get more such parallel blocks. 

The translation is similar to applicative _do_ notation for Haskell described
in the paper:
[Desugaring Haskell’s do-notation Into Applicative Operations](
http://research.microsoft.com/en-us/um/people/simonpj/papers/list-comp/applicativedo.pdf).
To  enable it in some block use `parBlock` option with
following possible values:

  * `all` - grouping all statements in `par` block, regardless its
  possible dependencies
  * `byUsage` - groups statements into single `par` block if they
  don't have shared variable.
  * `byLhsUsage` - same like `byUsage` but will avoid grouping if
  some variable is updated before used.
  * `reorderByUsage` - like `byUsage` but reorders statement to get
  bigger parallel blocks
  * `reorderByLhsUsage` - like `byUsage` but reorders statements too

In the future versions the compiler will try to translate more code
patterns into Applicative form.

### Alternatives

Many monads may support multiply inner values in single monadic value.
These are reactive programming, logical programming monads etc.

If monad supports this you may use either method from the interface directly
or directives (`M.answer` or `M.yield`), `yield` expression
(if not in "regenerator" profile). All three are
aliases and have the same encoding. It acts similar to return statement but
allows continuing same function executions after the point where they were
invoked adding more answers to result of the function.

No answer result is `M.empty` function call. Yield will discharge no answer
values in the current block (between {}). So execution will be not performed in
single block between something executing `M.empty` and up till next and
including `M.yield`.

## Selective transform

Because of coercions it is pretty ok to transform just everything with "full"
profile but overhead of some heavy monads is quite sensible. There are means
to apply transformation option to some parts of code. There are predefined
profiles mentioned before but there is also flexible tuning utility. You may
specify some very custom project policy based on some code conventions in your
project. 

### M.profile

The directive performs some named action to change internal state of transformations.
There are a few predefined states. 

 * "defaultMinimal" - in following function definitions doesn’t translate anything
    except it is specified as exception in configuration (for example
    `M` function).
 * "defaultFull" - in next function definitions  treats as effectful all
    function calls except exceptions from configuration (for example by default
    there window, process, and console functions are exceptions)
 * "full" - same as "defaultFull" but starts immediately
 * "minimal" - same as "defaultMinimal" but starts immediately
 * "generatorsDo" - very similar to minimal mode but uses generators syntax
   extensions, it will compile without coercions all `function*`, and in them
   treat `yield` expression as `M.refect` and `yield*` as `M` in minimal mode. 
 * "generators" - will convert generator functions to use `M.generator` as its scope 

The scope of these predefined profiles is a block in curly brackets.

### M.option

The function simply merges the object from argument into current option object.
Its scope is a block in curly bracket by default. When translation exits the block
where `M.option` was called it will revert states object to the one used before
entering function. The interpretation of the fields' value in the object depends on
exact passes implementation.

## Directives

The toolset doesn't introduce any syntax extension, it uses a set of
predefined function as directives to provide some translation options. They
are executed at compile time. Here is the list of currently used ones:

 * `M/M.reflect` - converts from effectful expression to pure
 * `M.reify` - same as `M.p` but receives function expression which is to be
    called immediately
 * `M.option` - changes current options object
 * `M.profile` - changes current state

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

Copyright © 2016-2017 Vitaliy Akimov

Distributed under the terms of The MIT License (MIT).

