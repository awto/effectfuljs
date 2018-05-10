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

export function async(caller) {
  var esProto = caller && caller.prototype instanceof Async
      ? caller.prototype : Async.prototype,
      ctx = Object.create(esProto)
  if (!process.env.EJS_NO_ES_OBJECT_MODEL)
    ctx.constructor.call(ctx)
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
  asyncFunction = function asyncFunction(fun,handler,err) {
    Object.setPrototypeOf(fun, AsyncFunctionPrototype)
    fun.prototype = Object.create(Ap)
    if (process.env.EJS_DEFUNCT) {
      if (handler) {
        if (process.env.EJS_INLINE)
          fun.prototype.step = handler
        else
          fun.prototype.$run = handler
      }
      if (!process.env.EJS_INLINE)
        if (err)
          fun.prototype.$err = err
    }
    return fun
  }
} else {
  asyncFunction = function asyncFunction(fun,handler,err) {
    fun.prototype = Object.create(Ap)
    fun.prototype.constructor = fun
    if (process.env.EJS_DEFUNCT) {
      if (handler) {
        if (process.env.EJS_INLINE)
          fun.prototype.step = handler
        else
          fun.prototype.$run = handler
      }
      if (!process.env.EJS_INLINE)
        if (err)
          fun.prototype.$err = err
    }
    return fun
  }
}

if (!process.env.EJS_INLINE) {
  if (process.env.EJS_DEFUNCT) {
    Ap.scope = function scope(step) {
      try {
        this.$step = step
        return this.$run(this.$step)
      } catch(e) {
        return this.$run(this.$step = this.$err(this.$step),e)
      }
    }
    Ap.chain = function chain(p, step) {
      const ctx = this
      return Promise.resolve(p)
            .then(
              function(v) {
                ctx.$step = step
                try {
                  return ctx.$run(ctx.$step,v)
                } catch(e) {
                  return ctx.$run(ctx.$step = ctx.$err(ctx.$step),e)
                }
              },
              function(e) {
                return ctx.$run(ctx.$step = ctx.$err(ctx.$step),e)
              })
    }
    Ap.jump = function jump(value, step) {
      this.$step = step
      try {
        return this.$run(this.$step, value)
      } catch(e) {
        return this.$run(this.$step = this.$err(this.$step),e)
      }
    }
    Ap.$err = function() { return 1 }
  } else {
    Ap.scope = function scope(step, handle) {
      try {
        this.$handle = handle
        this.$step = step
        return this.$step()
      } catch(e) {
        return this.$handle ? this.$handle(e) : this.raise(e)
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
                  return ctx.$step(v)
                } catch(e) {
                  return ctx.$handle(e)
                }
              },
              function(e) {
                return ctx.$handle(e)
              })
    }
    Ap.jump = function jump(value, step, handle) {
      this.$handle = handle
      this.$step = step
      try {
        return this.$step(value)
      } catch(e) {
        return this.$handle(e)
      }
    }
  }

  Ap.pure = function pure(v) { return Promise.resolve(v) }
  Ap.raise = function raise(ex) { return Promise.reject(ex) }
  
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  Ap.iterator = iterator
  Ap.iteratorM = iteratorM
  Ap.forInIterator = forInIterator
}
