/** constructor for a wrapper converting ES Async Iterator to Lean  */
export var EsWrapper

export function LeanAsyncIterator() {} 
var LeanAsyncIteratorPrototype = LeanAsyncIterator.prototype

LeanAsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

/** if `yield` argument is a promise it will be resolved (demanded by ECMAScript) */
export var UnwrapWrapper

/** queue for `next/throw/return` demanded by ECMAScript */
export var QueueWrapper

if (!process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR) {

  UnwrapWrapper = function UnwrapWrapper(inner) {
    this.$inner = inner
  }
  
  UnwrapWrapper.prototype = Object.create(LeanAsyncIteratorPrototype)

  UnwrapWrapper.prototype.constructor = UnwrapWrapper

  function unwrap(ctx,v) {
    return Promise.resolve(v).then(
      function(inner) {
        return Promise.resolve(inner.value).then(function(value) {
          return {value:value,done:inner.done}
        })
      })
  }

  UnwrapWrapper.prototype.next = function(v) {
    return unwrap(this,this.$inner.next(v))
  }

  UnwrapWrapper.prototype.throw = function(e) {
    return unwrap(this,this.$inner.throw(e))
  }

  UnwrapWrapper.prototype.return = function(v) {
    return unwrap(this,this.$inner.return(v))
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
        ctx.$queue.push({run:func,cont:cont,errCont:errCont})
      })
    } else {
      res = Promise.resolve(func(ctx.$inner))
      ctx.$busy = res.then(wait,wait)
    }
    return res
  }

  QueueWrapper.prototype.next = function(v) {
    return enqueue(this, function(i) { return i.next(v) })
  }
  
  QueueWrapper.prototype.throw = function(e) {
    return enqueue(this, function(i) { return i.throw(e) })
  }
  
  QueueWrapper.prototype.return = function(v) {
    return enqueue(this, function(i) { return i.return(v) })
  }
}

/** function returning lean async iterator for async iterable object */
export var iteratorM = function asyncIterator(cont) {
  return cont[Symbol.asyncIterator] ? cont[Symbol.asyncIterator]() : cont[Symbol.iterator](cont)
}

