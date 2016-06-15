# JavaScript embedded effects compiler

This is  a JavaScript to JavaScript transpiler. It offers extending JavaScript
language with various effects by means of runtime libraries, without even using
compiler plugins.

There are such libraries for:

 * [Asynchronous programming](https://github.com/awto/mfjs-promise)
 * [Reactive programming (with RxJS)](https://github.com/awto/mfjs-rx)
 * [Logical programming](https://github.com/awto/mfjs-logic)
 * [Multi-prompt delimited continuations](https://github.com/awto/mfjs-cc)

These are small libraries, some of them are just tiny wrappers of well known
interfaces, such as Promises and Rx Observables.

The compiler converts ES5 to ES5 without any syntax extensions. So it may be
applied to results of other compilers targeting JS such as CoffeeScript,
TypeScript, Babel etc.

It stratifies input JavaScript code into two levels, namely object and meta
level. Their separation may be either explicit or implicit. 

One of the main transpilers goals is generating human readable code, so
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

More examples of input/output of the tool may be found in
[test folder](https://github.com/awto/mfjs-compiler/tree/master/test/samples).

The `mapply` function there is abstract. For example its concrete implementation
for promises is their `then` function. There are a dozen of such function
required to be implemented in concrete effects implementation library.
Default implementations of most of them may be automatically derived from
a few base ones. They are higher order abstract functions calls. The interface
is based on Monads interfaces hierarchy from Haskell (Functor, Applicative,
Alternative, Monad).

It is arguable if explicit or implicit level separation is better. This likely
depend on what kind effect is used. Succinct and more readable code is good,
but if effects are heavy making them explicit may be better. So mfjs
compiler supports both options.

I will abuse term *pure* for some JS code or values. This doesn't
mean the code is really pure of course. This is original JavaScript and it
is absolutely not a problem to use the side effects already embedded
in JavaScript. Including IO, references, exceptions etc. 

Besides two basic explicit and implicit modes there are means to selectively
treat some parts of code to be either effectful or pure.

## Background

There are quite a few JavaScript transpilers adding some concrete new effects
into JavaScript language. This tool adds abstract side effects into language,
so any concrete effects may be loaded in runtime as implementation of that
abstract interface.

One of examples is recent ES standard updates with generators and `async/await`.
It is a new concrete side effects embedded into language. Adding same coroutines
effects with mfjs doesn't require standard, syntax change and new compilers.

Human readability for generated code aim is shared with
[kneden](https://github.com/marten-de-vries/kneden) transpiler, and turning
`async/await` into promises expressions. The same may be achieved using mfjs
with a tiny adapter from promises interface into mfjs. There is one implemented
in [@mfjs/promise](https://github.com/awto/mfjs-promise). This means mfjs approach
does require runtime library loading, while kneden team highlights no runtime
library dependency as an advantage. There is a plan to implement combinators
inlining in mfjs, so generated code for promises library will be very similar.
Also mfjs is more complete than kneden(at the time of writing this). It at least
can handle `breaks/return/continue` from `try/catch/finally`.

There are other less known JS extensions may be implemented as library using mfjs
compiler. These are [webppl](https://github.com/probmods/webppl) for probalistic
programming, [flapjax](http://www.flapjax-lang.org/) language for reactive
programming.

A few other JS libraries abstract generators interface to any monad, for example
[burrido](https://github.com/pelotom/burrido). This works pretty well if effects
don't require re-executing of some control paths several times. Which is the
case for reactive, logical programming and continuations. Here is a problem
description for rx monad
[with burrido](https://gist.github.com/awto/9f5337fcf205df335c92f93a859e2fdf)
and this is the same
[with mfjs](https://gist.github.com/awto/d71bc466884dc9a9a6a93026ce363d17).

In other languages the most famous examples of similar tools are Haskell
do-notation and C# LINQ. They implement explicit separation of meta and
object levels. They have different syntaxes. In JS burrido does the same.
The effectful level expressions are generators expressions, with
interface adapted to arbitrary monad, while pure code parts uses plain JS
syntax.

In single level syntax the level separation is implicit, and both use the
same syntax. First mention of this I know is embedding monads using delimited
control by Andrzej Filinski in
[Representing monad](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.43.8213&rep=rep1&type=pdf)
paper from 1994. There is more recent implementation of same idea for Java in
[quasar framework](http://docs.paralleluniverse.co/quasar/) described in
[this post](https://www.infoq.com/articles/Dont-graft-Monads-onto-Imperative-Languages).
Continuations based implementation doesn't allow detecting and automatically
generating Applicative combinators instead of Monadic ones, for more efficient
code (more details in [Applicative vs Monad interface](#applicative-vs-monad-interface)).

There are also concrete side effects compilers with single level syntax,
for example flapjax and webppl.

## Usage

### Command line tool

In the current version it is very simple, offering only running transform
and saving results to another folder or file.

    $ npm install @mfjs/compiler
    $ mfjsc input.js --output dist

The remained options are used to augment default configuration object, and
it is constructed using [optimist](https://www.npmjs.com/package/optimist)
command line encoding. For example namespace for core and translation profile
may be specified via command line too:

    $ mfjsc input.js --output dist --transform.packageVar=M --transform.start=defaultFull

It will use stdin/stdout if no input/output files are specified.

### Browserify transform

    $ npm install @mfjs/compiler
    $ browserify -t @dmjs/compiler/monadify input.js -o index.js

Or with options:

    $ browserify -t [@dmjs/compiler/monadify --transform.packageVar=M --transform.start=defaultFull] input.js -o index.js

### Hook for require in node.js

The hook is implemented in `@mfjs/compiler/nastyRegister`. It overrides all
currently registered extensions and post-process their output with the
transpiler. It is bad idea to use it in production.

For example, for mocha

    $ mocha --compilers js:@mfjs/compiler/nastyRegister

### Other options

 * [gulp plugin](https://github.com/awto/mfjs-gulp)
 * [grunt plugin](https://github.com/awto/mfjs-grunt)


## Code transformation

By default it doesn't touch any code, so it is safe to apply it to all JS
files in the project. The translation is activated when it encounters CommonJS
require for core library module. By default it is `@mfjs/core` but may be
configured. The require call expression must be assigned to some namespace
variable and that namespace name is used to detect translation directives
further in the code. I will use name M for core namespace in the doc but
it may be any other.

In default mode (after require) it still doesn't translate anything. To
start actual translation specify how eager you want it to be with `M.profile`
directive receiving string with name of the mode. For example "defaultFull"
mode may be used to treat all function calls as effectful in all function
definition except the current one.

In short the tool converts effectful monadic values in code into its inner
pure value. For example for promises it converts Promise object into the value
it is going to be resolved to (or already resolved). In generated code this is
converted to appropriate `then` usages. The backward translation is also
needed. In the promises example the code may need access to original promise
object, for example to wait a few promises in parallel.

### From pure to effectul

 * `M.reify` - expects function expression, the function is immediately
    executed and returned value isn't translated to pure value
    and so may be passed to a function expecting effectful value.
 * `M.p` - is the same as `M.reify` but its argument is not a function
   but just some value the compiler will treat as already pure.
 * `M.$` is similar to `M.reify` with argument function containing all the
   statements in the current block (delimited with curly braces) before
   statement with `M.$` as argument. It may be also used as a function. In
   this case expression in the argument will be returned as result of reified
   monadic value.

For example if implementation library has some `sum` function it may be
called like:

```javascript
    const k = getValue()
    const s = M.$(k).sum()
```

### From effectful to pure

The general backward translation from effectful value to pure value can be
performed using `M` directive, that will translate monadic value into pure
even in "minimal" profile. In "full" profile all functions call will be
immediately reflected into pure value.


### Coercions

Since JavaScript is dynamically typed language we cannot know in compile type
if the function will indeed return monadic value or it may return any pure
value or no value at all. For this to work the library must keep checking type
of the value and construct monadic value (with M.pure function) if it is not
already monadic.

This of course adds additional overhead, so there is an option to disable
coercions. In this case generated code will always return effectful values from
effectful functions, and will not add runtime checks. This requires stronger
discipline for functions not not translated with the compiler using some strong
code style conventions or probably some future type checker. If accidently not
effectful functions is called it will crash.

There is also exceptions coercion. If it is enabled (disabled by default) all
function invocation will be wrapped into `try..catch` block and in case of
exception its value is translated into `M.raise`.

The coercion level is defined using coerce option possible values: "none",
"all" or "value".

### Variables scope

Some monads may re-execute some parts of control path several times. The most
typical example is logical programming monad, reactive programming and
continuations.

Programmers would expect variables values to revert their values
on backtracking in typical logical programming language. The compiler tries to
capture some local variables values for this to work. Non local variables are
treated as global references (the references related effects are embedded into
JavaScript). If you apply mutable operator to local variable it will also be
visible on backtracking. This is a good reason to move to immutable data
structures though.

To avoid local variables capturing use `M.ref` directive
specifying variables as arguments. If the code will be used only for monads
where variable capturing is not needed (like Promise) to avoid capturing
overhead set option `varCapt` to false.

### Applicative vs Monad interface

There is interfaces hierarchy Functor <- Applicative <- Monad. Functor allows
only changing inner value of effectful value, Applicative allows combining
several effectful values into one, and Monad is the more generic one allows
changing structure of effectful value depending on inner value. In mfjs the
main corresponding functions for the interfaces are `mapply`, `M.arr`,
`mbind` respectively. 

Looking on differences between `mapply` and `mbind`, the first one always
returns pure value while the second (with enabled coercion) may either return
pure or effectful value. And in fact if coercions is enabled if `mbind` returns
pure value it is semantically absolutely equivalent to `mapply`. So one may
wonder why `mapply` is needed at all. Monad generalizes Applicative interface,
so if something has Monad interface it is automatically Functor and Applicative.
But monadic expression is not suitable for static analysis, since parts of it
depend on inner value, and the inner value is not known until some future point
in runtime. 

For example, for parser combinators monad this means Monad-based one allows
introducing context dependencies (where depending on some already parsed part
you may return grammar for the next part), while Applicative combinators don't
offer such context dependency but they allow building much more efficient parsers
because it may analyze grammars during parser construction (calculate FOLLOW,
FIRST sets etc). That is impossible for Monad parser because parts of its grammar
will be known only during parsing.

Applicative interface allows implicit program parallelization like in
[haxl](https://github.com/facebook/Haxl).

For some functional reactive libraries which build data-flow graph, monadish
application means graph rebuilding (switching). The same applicative version
will have that graph always static. So for example `if-then-else`, if this is
implemented as Monad the 2 branches graph will be always rebuilt on new value
of condition, and there will be only one branch branch constructed. While for
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
expressions are pure, tests and body doesn’t change any variable (assignment
is allowed). Some monad implementation may run each iteration in parallel.

In the future versions the compiler will try to to translate more code
patterns into Applicative form.

### Alternatives

Many monads may support multiply inner values in single monadic value.
These are reactive programming, logical programming monads etc.

If monad support this you may use either methods from the interface directly
or directives (`M.answer` or `M.yield`), `yield` expression
(if not in "regenerator" profile). All three are
aliases and have the same encoding. It acts similar to return statement but
allows continuing same function executions after the point where they were
invoked adding more answers to result of the function.

No answer result is `M.empty` function call. Yield will discharge no answer
values in the current block (between {}). So execution will be not performed in
single block between something executing `M.empty` and up till next and
including `M.yield`.

## Configuration

There is a global configuration object and it is possible to augment it either
from command line,  browserify transform arguments, gulp/grunt options, or
directly from some loaded module if `M.require` is used. The tool also looks
for a file `mfjs-config.json` in folder there input file located and in its
ancestors folders using only the first closest found. It is parsed and merged
into configuration object too.

Top level fields of the configuration object:

 * `parser` - directly passed to esprima parser options
 * `printer` - directly passed to escodegen printer options
 * `transform` - options for transformation, described in this section
     * `packageVar` - name of namespace variable used for importing core library
                    using CommonJS require, it may be specified if no require
                    is used
     * `packageName` - name of core library package used to detect CommonJS
                     require call to guess `packageVar` in sources
     * `start` - initial state name, by default it is a state where it doesn't
               touch anything
     * `verbose` - debug output
     * `policyTrace` - outpus details about how options for specific AST node
                     were chosen
     * `naming` - for `block`, `scope`, `M`, `repeat`, `forPar`
       adds additional autogenerated unique constant argument, it may be used
       for memoization for example, its value may be either `true` or an object
       with names of combinators it is applicable, and optional `prefix` field
       for the auto-generated constant prefix
     * `states` - rules description for deriving translation options for each
                AST nodes

To set some options in other module you may use `M.require`. During compilation
the module is loaded with `M.compileTime === true`. The tool expects it exports
object with `_compile` method and it is called with `this` bound to compilers
`Scope` object and an variable name the require call is assigned to as argument.
The `M.require` call is replaced with `require` call in resulting code. The `Scope`
object has  `profile` and `option` methods similar to corresponding directives.


```javascript
var M = require("@dmjs/core");
if (M.compileTime) {
  module.exports = {
     _compile: function(v) {
        var p = {};
        p[v] = true;
        this.profile("defaultMinimal");
        this.option({minimal:{CallExpression:{match:{name:p}}}});
     }
  }
}

```

And in some other file:

```javascript

var P = M.require("lib");
// here translation is in defaultMinimal state and effectful
// values may be marked with P function call

```

## Interface

There is a reference implementation library
[@mfjs/core](https://github.com/awto/mfjs-core)
with documentation for each function, but it is not required to use that
library. 

The generated code expects monadic value to have following methods:

 * `mbind` - takes function argument and applies it to inner value of `this`
             returning coerced monadic result (Haskell’s `>>=` function from
             Monad class) 
 * `mapply`  - takes function argument and applies it to inner value of `this`
               replacing that inner value with result without changing monadic
               value structure (Haskell `fmap` function from Functor class)
 * `mopt` - adds `undefined` to set of answers of `this`
 * `mfinally` - takes a function and executes after control exits `this` block
 * `mhandle` - takes a function and executes it if `this` throws exception
 * `mconst` - a helper for variables threading,
              same as `v => this.mapply(() => v)`
 * `munshiftTo` - a helper for variables threading, same as
                  `arr => this.mapply(v => arr.unshift(v), v)`

And the imported core library should have following free functions:

 * `M` - coerces value, if returns argument as-is if it is already monadic or
         `M.pure(v)` otherwise.
 * `M.pure` - returns monadic value with inner value from argument and with no
              effects
 * `M.raise` - returns monadic value representing exception throw
 * `M.coerce` - wraps function in argument in `try-catch` block and converts
                thrown exceptions into `M.raise`
 * `M.empty ` - monadic value with no answers
 * `M.repeat` - takes a function and initial arguments for it, apply that
                function infinitely, threading output arguments to input of
                next function invocation
 * `M.forPar` - takes test function, iteration body function, update function,
                with first iteration arguments, test and update functions are
                pure, all receives current iteration arguments, update
                function returns iteration arguments for next iteration. 
 * `M.block` - takes a function and executes it giving another function as
               argument for exiting the block, it is used for `break`,
               `continue`, `yield` encodings
 * `M.scope` - same as `M.block` but for the whole function, for `return`
               encoding
 * `M.arr` - takes array of monadic value and returns monadic value of array of
             inner values corresponding to input array, this is from Haskell’s
             Applicative interface, but adapted for more convenient usage in
             JavaScript
 * `M.spread` - it simply converts function receiving several arguments to
                function receiving array of arguments, it will be replaced with
                modern ES function spreads after the tool will start
                generating it

The compiler requires specific iterator interface. It is not compatible with ES
iterators because they are mutable, while for some monads execution control may
backtrack to some already passed position. In fact if ES allowed such iterators
cloning this compiler wouldn't be needed.

The iterator is a function object, with `value` field for current value. 

 * `M.iterator` - takes ES iterable object returns mfjs compatible iterator, it
    is just interface adapter, but works like ES one, taking next iterator
    invalidates previous ones, returned iterator already points to first element
    or null if input collection is empty
 * `M.iteratorBuf` - same as `M.iterator` but it will keep all passed values
    so all iterators are valid
 * `M.forInIterator` - returns mfjs compatible iterator for `for-in` statement

## Selective transform

Because of coercions it is pretty ok to transform just everything with "full"
profile but overhead of some heavy monads is quite sensible. There are means
to apply transformation option to a some parts of code. There are predefined
profiles mentioned before but there is also flexible tuning utility. You may
specify some very custom project policy based on some code conventions in your
project. 

The policy tool is based on extended but still very low level finite state
machine. It is very simple and flexible but some policies definition may be big
because it is too low level. There are plans to implement some more higher
level system however that is pretty good idea to restrict from creating complex
policies, that may lead to incomprehensible code.

States and transitions are defined in `transform.states` map in configuration.
The default one is defined in `config.js`.

### M.profile

The directive simply moves the policy machine into specified state. Its scope
is a block delimited with curly brackets. On current block exit old state will
be returned. There are a few predefined states. 

 * "defaultMinimal" - in next function definitions doesn’t translate anything
    except it is specified as exception in configuration (for example
    `M` function).
 * "defaultFull" - in next function definitions  treats as effectful all
    function calls except exceptions from configuration (for example by default
    there window, process, and console functions are exceptions)
 * "full" - same as "defaultFull" but starts immediately
 * "minimal" - same as "defaultMinimal" but starts immediately
 * "regenerator" - very similar to minimal mode but uses generators syntax
   extensions, it will compile without coercions all `function*`, and in them
   treat `yield` expression as `M.refect` and `yield*` as `M` in minimal mode. 

### M.option

The function augments the policy state machine definition. It simply merges the
object from argument into `transform.states` and recalculates caches. So the
function allows creating new states and changing options and matcher in current
state (for example to add more exception to "full" and "minimal" policies). Its
scope is function definition scope. When translation exits function definition
where `M.option` was called it will revert states object to the one used before
entering function.

During transformation of each AST node it is matched using custom predicate
specific for current state. If it is matched it further may instruct the
system to move to some other state or just return some set of options used
to guide transformation process.

The transition system is encoded as a plain JS object. Each field is either
option value or some key used to specify more exact match. On the first level
map keys are [ESTree](https://github.com/estree/estree/blob/master/spec.md)
node type name and default options for all node. On the second level for each
node type arbitrary predicate may be used (names specified in `select` field).
It may be registered by adding a function to `require('@mfjs/compiler/policy').selector`
map. However in the present version it is better to use only predefined ones
because of likely near future changes.

To match declaration or a function call by name use `matchDeclName` or
`matchCallName` selectors. As configuration they use `match` and `cases`
fields. The first assigns some key to some name pattern and the second
matches key to options to next level. The pattern is an object with prefix,
postfix, name, package and qname fields. They are also objects with fields
corresponding to name’s prefix, postfix, full name, package name (the first
name of qualified names) and qname (fully qualified name) respectively, and
values of the fields is the key to be looked in `cases` for further
instructions.

There are `sub` and `next` fields to specify state to transit to if the node
is matched. The state will be reverted after the node is handled if it is `sub`
transition or kept until next jump or function definition exit if it is `next`.


For example, here we augment `minimal` mode to translate from monadic to pure
function calls where function name ends with M letter.

```javascript
M.option({minimal:{CallExpression:{match:{postfix:{M:true}}}}});
```

More details in upcoming reference. 

Here is the set of possible options:

 * `bind` - the main option, it specifies if the current node is to be treated
   as effectful or not, i.e. if compiler needs to inject code translating
   effectful value to pure one for it
 * `compile` - compiles transforms function definition
 * `coerce` - `enum {none, value, all}` specify compilers needs to add coercion
    where needed
 * `expr` - if it is equal to `seq` expression will follow JS rules for order
    of execution of sub expression
 * `bindAssoc` - if value is "right" it will prefer right associative binds
   generation. If monad definition satisfies monad’s laws the generated code
   should have the same semantics as default left associative, but code may
   be cleaner because some variable threading may be avoided.
 * `loop` - if its value is "seq" the compiler will not generate `M.forPar`
    loops
 * `subScope` - if true it will detect JS trick for variables scopes
   (i.e. `(function() { /*...*/)()`) and treat it as scope not as function
   declaration (default is true).
 * `keepScope` - if it is true the compiler doesn’t remove useless M.scope
    calls
 * `varCapt` - doesn't do variable capturing if false, if true it will capture
               variable values using new temporal variables, and if it is
               string "closure" will use closures for this. Capturing with
               closures generates cleaner code, but much slower. Default
               value is true.
 * `keepForOf` - for pure functions don't translate `for-of` statements 
 * `mopt` - translates `yield` statement to `mopt`, default is true

## Directives

The toolset doesn't interoduce any syntax extension, however it uses a set of
predefined function as directives to provide some translation options. They
are executed in compile time. Here is the list of currently used ones:

 * `M/M.reflect` - converts from effectful expression to pure
 * `M.p` - converts from pure expression to effectful
 * `M.reify` - same as `M.p` but receives function expression which is to be
    called immediately
 * `M.$` - placeholder position 
 * `M.option` - changes state transition definitions
 * `M.profile` - changes current state
 * `M.ref` - treats variables in arguments as references and don't capture them
 * `M.require` - replacement for CommonJS require allowing to do some compile
    time actions defined in external module
 * `M.answer/M.yield` - may be used as replacement of `yield` expression

## LICENSE

Copyright © 2016 Vitaliy Akimov

Distributed under the terms of the The MIT License (MIT).


