---
title: JavaScript simple transducers
date: 2016-06-23
---
# Simpler transducers

It is, of course, good design practice to split computation into several
separate stages. The smaller the stage, the easier it is to reason, develop
and maintain. For example we split some computation into 3 stages in functions
f, g, k with resulting one is `input => f(g(k(input)))` or using Ramda
`R.comp(f,g,k)`. The problem with this approach is intermediate data passed
between functions, and each sub-stage should finish its computation completely
before passing the result to next stage. The data size they operate with may
be large or even infinite if it is some server requests stream. In a case of
unlimited data `k` will never return control. As it is often occurring task,
there are many solutions, like nodejs streams with their `.pipe()` operation
adding stream transformer to the chain. Transducers described in this post may
be seen as a simpler solution to the problem.

Transducers are easy to compose. In fact they are just functions and function
composition is just enough, the expressions above (`input => f(g(k(input)))`
and `R.comp(f,g,k)`) are the same for transducers. The resulting transducer
is a pipeline of computations receiving data from _producer_ and passing it
to _consumer_. Producer and consumer may do many things, read/write network
data, file, DB, or just in-memory array.

The term transducers became popular after introducing them in Clojure in this
[blog post](http://blog.cognitect.com/blog/2014/8/6/transducers-are-coming)
and ported to JavaScript by a few libraries including Ramda.
Clojure style transducers are different to the ones described in this post.
They transform consumers, which are called reducers in Clojure. Unlike these
transducers which transform producers. This distinction makes them much simpler
to define in use in ES6 because of generator functions.

Clojure transducers type from the original blog post is:

```clojure
;;reducing function signature
whatever, input -> whatever
;;transducer signature
(whatever, input -> whatever) -> (whatever, input -> whatever)
```

There is an earlier paper with the example of transducers transforming producers
instead of consumers:
[Lazy v. Yield: Incremental, Linear Pretty-printing](http://okmij.org/ftp/continuations/PPYield/yield-pp.pdf)
 in Haskell. And data types there are:

```haskell
type GenT e m = ReaderT (e  -> m ()) m
type Producer m e = GenT e m ()
type Consumer m e = e -> m ()
type Transducer m1 m2 e1 e2 = Producer m1 e1 -> Producer m2 e2
```

To see Consumer there is a reducer from Clojure substitute
`State e a = s -> m (a, s)` into Consumer definition:

```
Consumer (State whatever) input
= input -> State whatever ()
= input -> whatever -> ((), whatever)
= whatever, input -> whatever
```

Producer in the paper has a more complex type. Fortunately, this effect is already
embedded into JavaScript with ES6 generators. Producers are just any iterable value.
It may be some in-memory array or any generator function. Consumer is a function
taking iterable value and interpreting it somehow, for example by saving results
to file, or JavaScript standard `Array.from` function stores result in in-memory
Array. The approach will work even if the sequence is infinite.

Transducers take input Producer (Iterator) along with other optional parameters
and return another Producer-iterator with another computation stacked on top of it.

A typical patter is:

```javascript
function* f(parameter, input) {
  // local variables storing transducer’s internal
  // state with initial state initialization
  for(const I of input) {
    // use current value i along with current state
    // and parameters to compute output value `o`
    yield o;
  }
}
```

For example `map` function applying a function to each element is:

```javascript
function* (fun, input) {
   for(const I of input) {
     yield fun(i);
   }
}
```

Or filter, passing further only elements satisfying some predicate:

```javascript
function* filter(pred, input) {
  for(const I of input) {
     if (pred(i))
        yield I;
  }
}
```

Hierarchical data may be handled as well; an example is
[estree-transducers](https://github.com/awto/estree-transducers)
project for JavaScript syntax transformation.

But everything is not this simple if there is an asynchronous code at some
stage.  Likely this is required in Producer because IO in JavaScript is typically
asynchronous. It is possible to call `next` of an iterator in an asynchronous
callback, but not `yield`. This complicates things a lot. However, there is a
simple solution for this, namely using
[Effectful.js compiler](https://github.com/awto/effectfuljs)
with asynchronous functions, and simple, readable `for-of` loops.


UPD: another option is to use not fully finished yet
[Async Generator Functions](https://github.com/tc39/proposal-async-iteration)

UPD: there is [imlazy](https://github.com/benji6/imlazy) library implementing
this kind of transducers.

