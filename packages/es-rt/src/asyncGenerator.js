import {asyncIterator as asyncIterSym} from "./symbol"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"
import {Generator,delegateCont} from "./generator"
import {iteratorM,UnwrapWrapper} from "./leanAsyncIterator"
import {Async,setupCallbacks} from "./async"

export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  AsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

export var asyncGeneratorFunction

export function AsyncGenerator(lean) {
  this.$state = lean
  this.$queue = []
}

var AGp = AsyncGenerator.prototype = Object.create(AsyncIteratorPrototype)

function LeanAsyncGenerator() {}

var LAGp = LeanAsyncGenerator.prototype

var LGp = Generator.prototype

export function asyncGenerator(caller) {
  var esProto, esGen, leanGen, leanProto, wrap
  if (caller && caller.prototype instanceof AsyncGenerator) {
    esProto = caller.prototype
    leanProto = caller.leanAsyncGeneratorPrototype
  } else {
    esProto = AGp
    leanProto = LAGp
  }
  esGen = Object.create(esProto)
  leanGen = Object.create(leanProto)
  leanGen.$state = void 0
  leanGen.done = false
  esGen.$state = process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR
    ? leanGen : new UnwrapWrapper(leanGen)
  esGen.$queue = []
  leanGen.unwrap = esGen
  if (process.env.EJS_INLINE)
    setupCallbacks(leanGen)
  return leanGen
}

if (!process.env.EJS_NO_ES_ITERATORS) {
  AGp[asyncIterSym] = function() { return this.state }

  function result(ctx, v) {
    return Promise.resolve(v).then(function(i) {
      ctx.$state = i;
      return {value:i.value, done:i.done}
    })
  }
  
  function enqueue(ctx, func) {
    var res
    function wait(value) {
      if (!ctx.$queue.length) { 
        ctx.$busy = null
        return
      }
      var i = ctx.$queue.shift()
      ctx.$busy =
        Promise.resolve(i.func(ctx.$state))
        .then(function(v) {
          i.cont(v)
          wait(ctx)
        })
    }
    if (ctx.$busy) {
      res = new Promise(function(cont) {
        ctx.$queue.push({func:func,cont:cont})
      })
    } else {
      res = Promise.resolve(func(ctx.$state))
      ctx.$busy = res.then(wait,wait)
    }
    return res
  }

  AGp.next = function esFromLeanAsyncNext(v) {
    var ctx = this
    return enqueue(ctx, function(i) { return result(ctx,i.step(v)) })
  }
  
  AGp.throw = function esFromLeanAsyncNext(e) {
    var ctx = this
    return enqueue(ctx, function(i) { return result(ctx,i.handle(e)) })
  }
  
  AGp.return = function esFromLeanAsyncNext(v) {
    var ctx = this
    return enqueue(ctx, function(i) { return result(ctx,i.exit(v)) })
  }
}

export function esAsyncIterator(lean) {
  return lean[Symbol.asyncIterator]
    ? lean[Symbol.asyncIterator]()
    : new AsyncGenerator(lean)
}

if (!process.env.EJS_INLINE) {
  var Ap = Async.prototype
  LAGp.scope = function(step,handle,exit) {
    this.$step = step
    this.$handle = this.$contHandle = handle
    this.$exit = this.$contExit = exit
    return this.unwrap
  }
  LAGp.yldStar = LGp.yldStar
  LAGp.chain = Ap.chain
  
  LAGp.jump = function jump(value, step, handle, exit) {
    // it is actually also same as the one from LGp, but without trampoline
    try {
      this.$step = step
      this.$handle = this.$contHandle = handle
      this.$exit = this.$contExit = exit
      return this.step(value)
    } catch(e) {
      return this.handle(e)
    }
  }
  LAGp.yld = LGp.yld
  if (process.env.EJS_LEAN_METHOD_ITERATORS) {
    LAGp.iterator = iterator
    LAGp.forInIterator = forInIterator
    LAGp.iteratorM = iteratorM
  }
} else if (process.env.EJS_DEFUNCT) {
  LAGp.chain = Async.prototype.chain
}

LAGp[asyncIterSym] = LAGp[Symbol.asyncIterator] = function() { return this }

LAGp.handle = LGp.handle
LAGp.pure = LGp.pure
LAGp.raise = LGp.raise

LAGp.$redirResultPure = LGp.redirResult

LAGp.$redirResult = function(iter) {
  var ctx = this
  return Promise.resolve(iter).then(function(iter) {
    return ctx.$redirResultPure(iter)
  })
}

if (!process.env.EJS_DEFUNCT || !process.env.EJS_INLINE) {
  function runImpl(ctx,value) {
    if (process.env.EJS_DEFUNCT) {
      return ctx.$run(ctx.$step,value)
    } else {
      return ctx.$step(value)
    }
  }
  LAGp.step = function step(value) {
    if (!process.env.EJS_INLINE) {
      if (this.$step !== delegateCont) {
        this.$handle = this.$contHandle
        this.$exit = this.$contExit
      }
    }
    try {
      return runImpl(this, value)
    } catch(e) {
      this.$step = this.$handle
      return runImpl(this, value)
    }
  }
}

LAGp.exit = LGp.exit

function setupHandler(ctx, handler) {
  if (process.env.EJS_DEFUNCT) {
    if (handler) {
      if (process.env.EJS_INLINE)
        ctx.step = handler
      else
        ctx.$run = handler
    }
  }
}

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunctionPrototype.prototype = AGp
  AsyncGeneratorFunction.prototype = AGp.constructor = AsyncGeneratorFunctionPrototype
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  AsyncGeneratorFunctionPrototype[Symbol.toString] =
    AsyncGeneratorFunction.displayName = "AsyncGeneratorFunction";
  asyncGeneratorFunction = function asyncGeneratorFunction(fun,handler) {
    Object.setPrototypeOf(fun, AsyncGeneratorFunctionPrototype);
    fun.prototype = Object.create(AGp)
    setupHandler(fun.leanAsyncGeneratorPrototype = Object.create(LAGp), handler)
    return fun
  }
} else {
  asyncGeneratorFunction = function asyncGeneratorFunction(fun,handler) {
    fun.prototype = Object.create(AGp)
    setupHandler(fun.leanAsyncGeneratorPrototype = Object.create(LAGp), handler)
    return fun
  }
}


