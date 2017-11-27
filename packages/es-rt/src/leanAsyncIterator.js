import {asyncIterator as asyncIterSym} from "./symbol"
import {iterator} from "./leanIterator"

/** function returning lean async iterator for async iterable object */
export var iteratorM

export var LeanAsyncIteratorPrototype = {}

/** constructor for a wrapper converting ES Async Iterator to Lean  */
export var LeanAsyncIterator

LeanAsyncIteratorPrototype[asyncIterSym] = function () { return this }

export var UnwrapWrapper

if (!process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR) {
  UnwrapWrapper = function UnwrapWrapper(inner) {
    this.inner = inner
    this.done = false
  }
  UnwrapWrapper.prototype = Object.create(LeanAsyncIteratorPrototype)

  function doUnwrap(ctx,v) {
    function rethrow(e) { return ctx.raise(e) }
    return Promise.resolve(v).then(
      function(inner) {
        return Promise.resolve(inner.value).then(function(value) {
          ctx.inner = inner
          if (inner.done)
            return ctx.pure(value)
          ctx.value = inner.value = value
          return ctx
        })
      },
      function(ex) {
        return ctx.raise(ex)
      })
  }

  UnwrapWrapper.prototype.step = function step(v) {
    return doUnwrap(this,this.inner.step(v))
  }

  UnwrapWrapper.prototype.handle = function handle(e) {
    return doUnwrap(this,this.inner.handle(e))
  }

  UnwrapWrapper.prototype.exit = function exit(v) {
    return doUnwrap(this,this.inner.exit(v))
  }

  UnwrapWrapper.prototype.pure = function pure(value) {
    this.value = value
    this.done = true
    return this
  }

  UnwrapWrapper.prototype.raise = function raise(ex) {
    this.value = void 0
    this.done = true
    throw ex
  }

}

if (!process.env.EJS_NO_ES_ITERATORS) {
  LeanAsyncIterator = function LeanAsyncIterator(iter) {
    this.iter = iter[asyncIterSym]()
    this.done = false
  }

  LeanAsyncIterator.prototype = Object.create(LeanAsyncIteratorPrototype)

  // TODO: v8 shows off their bind is faster, check it
  function result(ctx,v) {
    return Promise.resolve(v).then(
      function(i) {
        if ((ctx.done = i.done))
          return ctx.pure(i.value)
        ctx.value = i.value
        return ctx
      },
      function(ex) {
        return ctx.raise(ex)
      })
  }

  LeanAsyncIterator.prototype.step = function step(v) {
    return result(this,this.iter.next(v))
  }

  LeanAsyncIterator.prototype.pure = function pure(value) {
    this.value = value
    this.done = true
    return this
  }

  LeanAsyncIterator.prototype.raise = function raise(ex) {
    this.value = void 0
    this.done = true
    throw ex
  }

  LeanAsyncIterator.prototype.handle = function handle(e) {
    var iter = this.iter, next
    if (!iter.throw) {
      if (iter.return)
        return Promise.resolve(iter.return()).catch(e => e.raise(e))
      return this.raise(new TypeError("iterator does not have a throw method"))
    }
    return result(this,this.iter.throw(e))
  }
  
  LeanAsyncIterator.prototype.exit = function exit(value) {
    var iter = this.iter, next
    if (!iter.return)
      return this.pure(value)
    return result(this,this.iter.return(value))
  }

  iteratorM = function asyncIterator(cont) {
    return cont[asyncIterSym]
      ? cont[asyncIterSym]()
      : cont[Symbol.asyncIterator]
      ? new LeanAsyncIterator(cont)
      : iterator(cont)
  }
  
} else {
  iteratorM = function asyncIterator(cont) {
    return cont[asyncIterSym] ? cont[asyncIterSym]() : iterator(cont)
  }
}

