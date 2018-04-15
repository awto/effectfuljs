import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"
import {iteratorM,QueueWrapper,UnwrapWrapper,LeanAsyncIterator,EsWrapper} from "./leanAsyncIterator"
import {Async} from "./async"

export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  AsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

export var asyncGeneratorFunction
/** generators with optionally added queues and unwraps */
export var AsyncGenerator

var LAGp, AGp

/** generators without queues and unwraps wrappers */
export var LeanAsyncGenerator = function AsyncGenerator() {
  if (process.env.EJS_INLINE) {
    var ctx = this
    ctx.$resolve = function(v) {
      return process.env.EJS_DEFUNCT
        ? (process.env.EJS_INLINE ? ctx.next(v) : ctx.$run(ctx.$step,v))
        : res.$step(v)
    }
    ctx.$reject = function(v) {
      if (!ctx.$handle)
        return ctx.raise(v)
      return process.env.EJS_DEFUNCT
        ? (process.env.EJS_INLINE
           ? (ctx.$step = ctx.$handle, ctx.next(v))
           : ctx.$run(ctx.$handle,v))
        : ctx.$handle(v)
    }
  }
}

LAGp = LeanAsyncGenerator.prototype = Object.create(LeanAsyncIterator.prototype)
LAGp.constructor = LeanAsyncGenerator

if (!process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
  AsyncGenerator = function AsyncGenerator() {
    var lean = this.$lean = Object.create(this.leanPrototype)
    this.leanPrototype.constructor.call(lean)
    if (!process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR)
      this.$inner = new UnwrapWrapper(lean)
    else
      this.$inner = lean
    this.$queue = []
  }
  AGp = AsyncGenerator.prototype = Object.create(QueueWrapper.prototype)
  AGp.constructor = AsyncGenerator
  AGp.leanPrototype = LAGp
} else {
  AsyncGenerator = LeanAsyncIterator
  AGp = LAGp
}

export function asyncGenerator(caller) {
  var proto, es
  if (caller && caller.prototype instanceof LeanAsyncIterator) {
    proto = caller.prototype
  } else {
    proto = AGp
  }
  es = Object.create(proto)
  proto.constructor.call(es)
  if (process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
    es.unwrap = es
    return es
  } else {
    if (es.$lean) { 
      es.$lean.unwrap = es
      return es.$lean
    }
    return es
  }
}

export function esAsyncIterator(lean) { return lean[Symbol.asyncIterator]() }

var delegateCont = process.env.EJS_DEFUNCT ? 2 : function delegateStep(v) {
  try {
    var ctx = this
    if (process.env.EJS_INLINE) {
      return Promise.resolve(this.$sub.next(v))
        .then(function(v) {
          return ctx.$redirResult(v)
        })
    } else {
      return this.chain(
        this.$sub.next(v),
        function(v) {
          return ctx.$redirResult(v)
        })
    }
  } catch (e) {
    if (!this.$handle)
      return this.raise(e)
    this.$step = this.$handle
    this.$sub = this.$iter = this.$resume = void 0
    if (!process.env.EJS_INLINE) {
      this.$resumeExit = this.$resumeHandle = void 0
    }
    return this.next(e)
  }
}

if (!process.env.EJS_INLINE) {
  var Ap = Async.prototype
  LAGp.scope = function(step,handle,exit) {
    this.$step = step
    this.$handle = this.$contHandle = handle
    this.$exit = this.$contExit = exit
    return this.unwrap
  }
  LAGp.chain = Ap.chain  
  LAGp.jump = function jump(value, step, handle, exit) {
    // it is actually also same as the one from Gp, but without trampoline
    try {
      this.$step = step
      this.$handle = this.$contHandle = handle
      this.$exit = this.$contExit = exit
      return runImpl(this, value)
    } catch(e) {
      return this.throw(e)
    }
  }
  LAGp.yld = function(value, step, handle, exit) {
    this.$step = step
    this.$contHandle = handle
    this.$contExit = exit
    return {value:value, done:false}
  }
  LAGp.yldStar = function yldStar(iter, step, handle, exit) {
    this.$step = delegateCont
    this.$sub = iteratorM(iter)
    this.$resumeHandle = handle
    this.$resumeExit = exit
    this.$resume = step
    if (process.env.EJS_DEFUNCT)
      return this.$redir()
    else
      return this.next()
  }
} else {
  LAGp.$delegate = function yldStar(iter) {
    this.$resume = this.$step
    this.$step = delegateCont
    this.$sub = iteratorM(iter)
    if (process.env.EJS_DEFUNCT) {
      this.$step = 2
      return this.next()
    } else {
      return this.$step()
    }
  }
}

LAGp.iterator = iteratorM
LAGp.forInIterator = forInIterator
LAGp.iteratorM = iteratorM

var terminated = process.env.EJS_DEFUNCT ? 0
    : function (value) { return {value:value,done:true} }

LAGp.pure = function(value) {
  this.$step = this.$exit = terminated
  this.$handle = void 0
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = void 0
  }
  return {value:value,done:true}
}

LAGp.raise = function(e) {
  this.$step = this.$exit = terminated
  this.$handle = void 0
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = void 0
  }
  throw e
}


function runImpl(ctx,value) {
  if (process.env.EJS_DEFUNCT) {
    if (process.env.EJS_INLINE) {
      return ctx.$run(ctx.$step,value)
    } else {
      try {
        return ctx.$run(ctx.$step,value)
      } catch(e) {
        if (!ctx.$handle)
          throw e
        ctx.$step = ctx.$handle
        return runImpl(ctx, e)
      }
    }
  } else {
    if (process.env.EJS_INLINE) {
      return ctx.$step(value)
    } else {
      try {
        return ctx.$step(value)
      } catch(e) {
        if (!ctx.$handle)
          throw e
        ctx.$step = ctx.$handle
        return runImpl(ctx, e)
      }
    }
  }
}

LAGp.$redirResult = function(iter) {
  if (iter.done) {
    this.$step = this.$resume
    if (!process.env.EJS_INLINE) {
      this.$handle = this.$resumeHandle
      this.$exit = this.$resumeExit
      this.$resumeHandle = this.$resumeExit = void 0
    }
    this.$sub = this.$iter = this.$resume = void 0
    return runImpl(this,iter.value)
  }
  if (process.env.EJS_INLINE) {
    this.$step = delegateCont
    return iter
  } else {
    return this.yld(iter.value,delegateCont,this.$contHandle,this.$contExit)
  }
}

if (process.env.EJS_DEFUNCT) {
  LAGp.$redir = function a(p) {
    if (!process.env.EJS_INLINE) {
      return this.chain(this.$sub.next(p),3,this.$handle,this.$exit)
    } else {
      this.$step = 3
      return this.$sub.next(p)
    }
  }
}

LAGp.next = function next(value) {
  if (!process.env.EJS_INLINE) {
    this.$handle = this.$contHandle
    this.$exit = this.$contExit
  }
  return runImpl(this, value)
}

LAGp.throw = function(value) {
  if (this.$step === delegateCont) {
    if (!process.env.EJS_INLINE) {
      return this.chain(this.$sub.throw(value),
                        3,this.$handle,this.$exit)
    } else {
      this.$step = 3
      return this.$sub.throw(value)
    }
  }
  if (!this.$handle)
    return this.raise(value)
  this.$step = this.$handle
  return this.next(value)
}

LAGp.return = function(value) {
  if (this.$step === delegateCont) {
    var iter = this.$sub
    this.$resume = this.$exit
    if (!process.env.EJS_INLINE) {
      return this.chain(this.$sub.return(value),
                        3,this.$handle,this.$exit)
    } else {
      this.$step = 3
      return this.$sub.return(value)
    }
  } else {
    this.$step = this.$exit
    return this.next(value)
  }
}

var AsyncGeneratorFunctionPrototype

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncGeneratorFunction() {}
  AsyncGeneratorFunctionPrototype = function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunctionPrototype.prototype = AGp
  AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  AsyncGeneratorFunctionPrototype[Symbol.toString] =
    AsyncGeneratorFunction.displayName = "AsyncGeneratorFunction";
}

asyncGeneratorFunction = function asyncGeneratorFunction(fun,handler) {
  var leanProto = LAGp
  if (!process.env.EJS_NO_ES_OBJECT_MODEL)
    Object.setPrototypeOf(fun, AsyncGeneratorFunctionPrototype);
  if (process.env.EJS_DEFUNCT) {
    if (handler) {
      leanProto = Object.create(LAGp)
      if (process.env.EJS_INLINE)
        leanProto.next = handler
      else
        leanProto.$run = handler
    }
  }
  if (process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
    fun.prototype = leanProto
  } else {
    var esProto = Object.create(AGp)
    esProto.leanPrototype = leanProto
    fun.prototype = esProto
  }
  return fun
}

