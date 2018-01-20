---
title: Why abstract effects interface matters
date: 2017-05-05
---

# Why effects abstract interface matters

JavaScript recently received three new effects systems. The are:

 * generators
 * await/async
 * async generators

The latest is a combination of the first two. If at some point
JavaScript gets some other effect support in syntax it will have
to have seven language extensions for each combination, and so on.
This may be for example recently added in runtime Observable effects
for reactive programming. It may get own syntax extension sooner or
later. Or you may use effectful.js immediately without waiting.

While at first, it seems like a problem of the language developers
developing new syntax, in fact, it is a problem for developers
using the language too.

For example, many projects in their styling rules require use Array
traversal functions (like map, forEach etc.) instead of `for` statements.
And, say, we have a function duplicating elements implemented as a
simple generator function:

```javascript
function* dup(arr) {
  for(const i of arr) {
     yield i;
     yield i;
  }
}

```

We cannot just copy-paste the body of the loop into, say, `forEach` body like this:

```javascript
    arr.forEach(function* i() {
         yield i;
         yield i;
    })
```

To make a fully general library we need four versions of forEach, and
each other higher order function: map, filter, etc. Say, filter predicate
may need to consult some remote service and so it should by async.

It is even worse if the task like AST transforms with a significant number of
nodes and Visitors written for traversal. To make a generic library there
should be 4 version of visitor types again.

In Haskell, effects have an abstract interface (Monad), and only one version
of functions set is required (well, in fact, two for pure function and effectful).

There are a few libraries in JavaScript implementing different concrete effects
with some a common abstract interface. Like fantasy-land.

The Monad interface came from math, namely category theory. Its sole purpose
from the very beginning was an abstraction. Theorems proved using abstract
monads interface may be immediately applied to likely also abstract but more
concrete interface instances, like some structures from universal algebra or
topology. 

Later the interface was utilized to describe and reason about programming
languages with effects in domains theory. The Same purpose again, theorems
proved with a single abstract interface may be applied to many programming
languages and their full range of possible effects they support.

And after, Monads reached programming languages themselves. Using
[Curry–Howard correspondece](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence),
where programming language types are theorems, and their proofs are
programs, Monads are programming abstract language interfaces. So like
in math, proved theorems with some general math structure may be applied
to any concrete realization of that structure. In programming languages,
a function using abstract type for arguments objects may be invoked with
any specific implementation of that object. Well, at least if its design
follows [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle).
Unfortunately violating it in JavaScript is easy.

If there is a generic function like (map, forEach, filter) using Monad interface
rather than some of its concrete implementation, it should work for any other
effect.

There are many different options in choosing names for interface functions,
or a set of basis functions, or split it into a hierarchy somehow.
There are a few libraries already defining the interface and providing
a few of its implementations. Like fantasy-land. 

Effectful.js compiler uses own interface, but it may be easily adapted to any
other either by implementing wrappers or inlining calls to other methods.

Effectful.js doesn't introduce any syntax extensions, but can overload JavaScript
extensions, like generators or await/async syntax to generalize them.

