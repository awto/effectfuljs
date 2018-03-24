import {asyncIterator as asyncIterSym} from "./symbol"
import {iterator} from "./leanIterator"

/** function returning lean async iterator for async iterable object */
export var iteratorM


/** constructor for a wrapper converting ES Async Iterator to Lean  */
export var EsWrapper

export function LeanAsyncIterator() {} 
var LeanAsyncIteratorPrototype = LeanAsyncIterator.prototype

LeanAsyncIteratorPrototype[Symbol.asyncIterator]
  = LeanAsyncIteratorPrototype[asyncIterSym]
  = function () { return this }

function esResult(ctx, v) {
  return Promise.resolve(v).then(function() { return {value:ctx.value, done:ctx.done}})
}

LeanAsyncIteratorPrototype.next = function esNext(v) {
  return esResult(this, this.step(v))
}

LeanAsyncIteratorPrototype.throw = function esThrow(e) {
  return esResult(this, this.handle(e))
}

LeanAsyncIteratorPrototype.return = function esReturn(v) {
  return esResult(this, this.exit(v))
}

/** if `yield` argument is a promise it will be resolved (demanded by ECMAScript) */
export var UnwrapWrapper

/** queue for `next/throw/return` demanded by ECMAScript */
export var QueueWrapper

if (!process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR) {

  UnwrapWrapper = function UnwrapWrapper(inner) {
    this.done = false
    this.$inner = inner
  }
  
  UnwrapWrapper.prototype = Object.create(LeanAsyncIteratorPrototype)

  UnwrapWrapper.prototype.constructor = UnwrapWrapper

  UnwrapWrapper.prototype.init = function init() {
    this.done = false
    return (this.$inner = Object.create(this.unwrapPrototype)).init()
  }

  function unwrap(ctx,v) {
    function rethrow(e) { return ctx.raise(e) }
    return Promise.resolve(v).then(
      function(inner) {
        return Promise.resolve(inner.value).then(function(value) {
          ctx.$inner = inner
          if (inner.done)
              ctx.done = true
          ctx.value = inner.value = value
          return ctx
        })
      })
  }

  UnwrapWrapper.prototype.step = function step(v) {
    return unwrap(this,this.$inner.step(v))
  }

  UnwrapWrapper.prototype.handle = function handle(e) {
    return unwrap(this,this.$inner.handle(e))
  }

  UnwrapWrapper.prototype.exit = function exit(v) {
    return unwrap(this,this.$inner.exit(v))
  }
}

if (!process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
  QueueWrapper = function AsyncGenerator(inner) {
    this.$inner = inner
    this.$queue = []
  }

  QueueWrapper.prototype = Object.create(LeanAsyncIteratorPrototype)

  QueueWrapper.prototype.constructor = QueueWrapper

  function enqueue(ctx, func) {
    var res
    function run(i) {
      return Promise.resolve(func(i)).then(function(v) {
        ctx.done = ctx.$inner.done
        ctx.value = ctx.$inner.value
        return ctx
      }) 
    }
    function wait() {
      if (!ctx.$queue.length) { 
        ctx.$busy = null
        return
      }
      var i = ctx.$queue.shift()
      ctx.$busy =
        Promise.resolve(i.run(ctx.$inner))
        .then(function(next) {
          i.cont(next)
          wait()
        },function(error) {
          i.errCont(error)
          wait()
        })
    }
    if (ctx.$busy) {
      res = new Promise(function(cont,errCont) {
        ctx.$queue.push({run:run,cont:cont,errCont:errCont})
      })
    } else {
      res = Promise.resolve(run(ctx.$inner))
      ctx.$busy = res.then(wait,wait)
    }
    return res
  }

  QueueWrapper.prototype.step = function qStep(v) {
    return enqueue(this, function(i) { return i.step(v) })
  }
  
  QueueWrapper.prototype.handle = function qHandle(e) {
    return enqueue(this, function(i) { return i.handle(e) })
  }
  
  QueueWrapper.prototype.exit = function qExit(v) {
    return enqueue(this, function(i) { return i.exit(v) })
  }
}

if (!process.env.EJS_NO_ES_ITERATORS) {
  EsWrapper = function EsWrapper(iter) {
    this.iter = iter[Symbol.asyncIterator]()
    this.done = false
  }

  EsWrapper.prototype = Object.create(LeanAsyncIteratorPrototype)

  EsWrapper.prototype.constructor = EsWrapper
  
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

  EsWrapper.prototype.step = function step(v) {
    return result(this,this.iter.next(v))
  }

  EsWrapper.prototype.pure = function pure(value) {
    this.value = value
    this.done = true
    return this
  }

  EsWrapper.prototype.raise = function raise(ex) {
    this.value = void 0
    this.done = true
    throw ex
  }

  EsWrapper.prototype.handle = function handle(e) {
    var iter = this.iter, next
    if (!iter.throw) {
      if (iter.return)
        return Promise.resolve(iter.return()).catch(e => e.raise(e))
      return this.raise(new TypeError("iterator does not have a throw method"))
    }
    return result(this,this.iter.throw(e))
  }
  
  EsWrapper.prototype.exit = function exit(value) {
    var iter = this.iter, next
    if (!iter.return)
      return this.pure(value)
    return result(this,this.iter.return(value))
  }

  iteratorM = function asyncIterator(cont) {
    return cont[asyncIterSym]
      ? cont[asyncIterSym]()
      : cont[Symbol.asyncIterator]
      ? new EsWrapper(cont)
      : iterator(cont)
  }
  
} else {
  iteratorM = function asyncIterator(cont) {
    return cont[asyncIterSym] ? cont[asyncIterSym]() : iterator(cont)
  }
}

