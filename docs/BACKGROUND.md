# Background

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
in [@effectful/es-inline-rt](https://github.com/awto/effectfuljs/tree/master/packages/es-inline-rt), 
so effectfuljs approach does require runtime library loading, while kneden team highlights no runtime
library dependency as an advantage. Though from it is easy to remove not used features from 
Effectful.js runtime. And it may be even inlined into target modules.
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

There are a few other things not possible to implement with libraries such as burrido, 
for example [ApplicativeDo](
http://research.microsoft.com/en-us/um/people/simonpj/papers/list-comp/applicativedo.pdf),
single layer syntax, persistent control flow.

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

There are a few languages now with direct style effects operations using type 
system extensions - Algebraic Effects. E.g. [koka](https://github.com/koka-lang/koka)
or [eff](https://github.com/matijapretnar/eff). Types provide additional safety 
there and it is easier to combine algebraic effects comparing to monads.


