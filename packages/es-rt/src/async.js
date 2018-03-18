/** runtime for ES async/await */

import {iterator} from "./leanIterator"
import {iteratorM} from "./leanAsyncIterator"
import {forInIterator} from "./forInIterator"

/**
 * wraps function to make AsyncFunction object model 
 * compatible with ES standard
 */
export var asyncFunction

/** context type */
export function Async() {}

var Ap = Async.prototype

export function setupCallbacks(ctx) {
  if (process.env.EJS_INLINE) {
    ctx.$resolve = function(v) {
      return process.env.EJS_DEFUNCT
        ? (process.env.EJS_INLINE ? ctx.step(v) : ctx.$run(ctx.$step,v))
        : res.$step(v)
    }
    ctx.$reject = function(v) {
      return process.env.EJS_DEFUNCT
        ? (process.env.EJS_INLINE
           ? (ctx.$step = ctx.$handle, ctx.step(v))
           : ctx.$run(ctx.$handle,v))
        : ctx.$handle(v)
    }
  }
}

export function async(caller) {
  var esProto = caller && caller.prototype instanceof Async
      ? caller.prototype : Async.prototype,
      ctx = Object.create(esProto)
  if (process.env.EJS_INLINE)
    setupCallbacks(ctx)
  return ctx
}

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncFunction() {}
  function AsyncFunctionPrototype() {}
  AsyncFunctionPrototype.prototype = Async.prototype;
  AsyncFunction.prototype = AsyncFunctionPrototype;
  Ap.constructor = AsyncFunctionPrototype.constructor = AsyncFunction;
  AsyncFunctionPrototype[Symbol.toStringTag] =
    AsyncFunction.displayName = "AsyncFunction";
  asyncFunction = function asyncFunction(fun,handler) {
    Object.setPrototypeOf(fun, AsyncFunctionPrototype)
    fun.prototype = Object.create(Ap)
    if (process.env.EJS_DEFUNCT) {
      if (handler) {
        if (process.env.EJS_INLINE)
          fun.prototype.step = handler
        else
          fun.prototype.$run = handler
      }
    }
    return fun
  }
} else {
  asyncFunction = function asyncFunction(fun,handler) {
    fun.prototype = Object.create(Ap)
    fun.prototype.constructor = fun
    if (process.env.EJS_DEFUNCT) {
      if (handler) {
        if (process.env.EJS_INLINE)
          fun.prototype.step = handler
        else
          fun.prototype.$run = handler
      }
    }
    return fun
  }
}

if (!process.env.EJS_INLINE) {
  Ap.scope = function scope(step, handle) {
    try {
      this.$handle = handle
      this.$step = step
      return process.env.EJS_DEFUNCT ? this.$run(this.$step) : this.$step()
    } catch(e) {
      return process.env.EJS_DEFUNCT
        ? (this.$step = this.$handle, this.$run(this.$step,e))
        : this.$handle(e)
    }
  }
  Ap.chain = function chain(p, step, handle) {
    const ctx = this
    return Promise.resolve(p)
      .then(
        function(v) {
          ctx.$handle = handle
          ctx.$step = step
          try {
            return process.env.EJS_DEFUNCT ? ctx.$run(ctx.$step,v) : ctx.$step(v)
          } catch(e) {
            return process.env.EJS_DEFUNCT
              ? (ctx.$step = ctx.$handle, ctx.$run(ctx.$step,e))
              : ctx.$handle(e)
          }
        },
        function(e) {
          return process.env.EJS_DEFUNCT
            ? (ctx.$step = ctx.$handle, ctx.$run(ctx.$step,e))
            : ctx.$handle(e)
        })
  }
  
  Ap.jump = function jump(value, step, handle) {
    this.$handle = handle
    this.$step = step
    try {
      return process.env.EJS_DEFUNCT
        ? this.$run(this.$step,value)
        : this.$step(value)
    } catch(e) {
      return process.env.EJS_DEFUNCT
        ? (this.$step = this.$handle, this.$run(this.$step,e))
        : this.$handle(e)
    }
  }

  Ap.pure = function pure(v) {
    return Promise.resolve(v)
  }

  Ap.raise = function raise(ex) {
    return Promise.reject(ex)
  }
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  Ap.iterator = iterator
  Ap.iteratorM = iteratorM
  Ap.forInIterator = forInIterator
}
