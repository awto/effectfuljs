export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  AsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

if (!Symbol.asyncIterator)
  Symbol.asyncIterator = Symbol.for("asyncIterator")

export var asyncGeneratorFunction

export function AsyncGenerator(lean) {
  this.state = lean
  this.queue = []
}

var AGp = AsyncGenerator.prototype = Object.create(AsyncIteratorPrototype)

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunctionPrototype.prototype = AGp
  AsyncGeneratorFunction.prototype = AGp.constructor = AsyncGeneratorFunctionPrototype
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  AsyncGeneratorFunctionPrototype[Symbol.toString] =
    AsyncGeneratorFunction.displayName = "AsyncGeneratorFunction";
  asyncGeneratorFunction = function asyncGeneratorFunction(fun) {
    Object.setPrototypeOf(fun, AsyncGeneratorFunctionPrototype);
    fun.prototype = Object.create(AGp)
    return fun
  }
}

if (!process.env.EJS_NO_ES_ITERATORS) {
  AGp[Symbol.leanAsyncIterator] = function() { return this.state }
  AGp.await = function() {
    if (!this.queue.length) { 
      this.busy = null
      return
    }
    var i = this.queue.shift()
    var ctx = this
    this.busy =
      Promise.resolve(i.func(this.state))
      .then(function(v) {
        i.cont(v)
        ctx.await()
      })
  }

  function result(ctx, v) {
    return Promise.resolve(v).then(function(i) {
      ctx.state = i;
      return {value:i.value, done:i.done}
    })
  }
  
  AGp.enqueue = function enqueue(func) {
    var res
    var ctx = this
    function cont() {
      return ctx.await()
    }
    if (this.busy) {
      res = new Promise(function(cont) {
        ctx.queue.push({func:func,cont:cont})
      })
    } else {
      res = Promise.resolve(func(this.state))
      this.busy = res.then(cont,cont)
    }
    return res
  }

  AGp.next = function esFromLeanAsyncNext(v) {
    var ctx = this
    return this.enqueue(function(i) { return result(ctx,i.step(v)) })
  }
  
  AGp.throw = function esFromLeanAsyncNext(e) {
    var ctx = this
    return this.enqueue(function(i) { return result(ctx,i.handle(e)) })
  }
  
  AGp.return = function esFromLeanAsyncNext(v) {
    var ctx = this
    return this.enqueue(function(i) { return result(ctx,i.exit(v)) })
  }
}

export function esAsyncIterator(lean) {
  return lean[Symbol.asyncIterator] ? lean : new AsyncGenerator(lean)
}


