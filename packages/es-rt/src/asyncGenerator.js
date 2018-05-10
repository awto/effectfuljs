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
        : ctx.$step(v)
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

var DELEGATE_CONT = process.env.EJS_DEFUNCT ? 2 : function delegateStep(v) {
  try {
    var ctx = this
    if (process.env.EJS_INLINE) {
      return Promise.resolve(this.$sub.next(v))
        .then(function(v) {
          return ctx.$redirResult(v)
        })
    } else {
      return this.chain(
        this.$sub.next(v),DELEGATE_RESUME,this.$handle,this.$exit)
    }
  } catch (e) {
    if (!this.$handle)
      return this.raise(e)
    this.$step = this.$handle
    this.$sub = this.$resume = void 0
    if (!process.env.EJS_INLINE) {
      this.$resumeExit = this.$resumeHandle = void 0
    }
    return this.next(e)
  }
}

var runImpl
var DELEGATE_RESUME = process.env.EJS_DEFUNCT ? 3 : redirResult

if (!process.env.EJS_INLINE) {
  var Ap = Async.prototype
  if (process.env.EJS_DEFUNCT) {
    LAGp.scope = function(step) {
      this.$last = this.$step = step
      return this.unwrap
    }
    LAGp.chain = function chain(p, step) {
      const ctx = this
      return Promise.resolve(p)
            .then(
              function(v) {
                ctx.$step = step
                return ctx.next(v)
              },
              function(e) {
                return ctx.throw(e)
              })
    }
    LAGp.jump = LAGp.chain
    /*
    LAGp.jump = function jump(value, step) {
      try {
        // tail call
        return runImpl(this.$step = step,this, value)
      } catch(e) {
        return this.throw(e)
      }
    }*/
    LAGp.yld = function(value, step) {
      this.$step = step
      return {value:value, done:false}
    }
    LAGp.yldStar = function yldStar(iter, step) {
      this.$step = DELEGATE_CONT
      this.$sub = iteratorM(iter)
      this.$resume = step
      return this.$redir()
    }
    LAGp.$err = function() { return 1 }
    LAGp.$fin = function() { return 0 }
    LAGp.next = function next(value) {
      var s = this.$step
      if (s === DELEGATE_CONT)
        return this.chain(this.$sub.next(value), DELEGATE_RESUME)
      if (s === DELEGATE_RESUME)
        return this.$redirResult(value)
      return runImpl(s, this, value)
    }
    
    runImpl = function runImpl(s,ctx,value) {
      ctx.$last = s
      try {
        return ctx.$run(s,value)
      } catch(e) {
        if ((ctx.$step = ctx.$err(s)) === 1)
          return ctx.raise(e)
        return runImpl(ctx.$step,ctx, e)
      }
    }
  } else {
    LAGp.scope = function(step,handle,exit) {
      this.$step = step
      this.$handle = this.$contHandle = handle
      this.$exit = this.$contExit = exit
      return this.unwrap
    }
    LAGp.chain = Ap.chain
    LAGp.jump = LAGp.chain
    /*
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
    }*/
    LAGp.yld = function(value, step, handle, exit) {
      this.$step = step
      this.$contHandle = handle
      this.$contExit = exit
      return {value:value, done:false}
    }
    LAGp.yldStar = function yldStar(iter, step, handle, exit) {
      this.$step = DELEGATE_CONT
      this.$sub = iteratorM(iter)
      this.$resumeHandle = handle
      this.$resumeExit = exit
      this.$resume = step
      return this.next()
    }
  }
} else {
  LAGp.$delegate = function yldStar(iter) {
    this.$resume = this.$step
    this.$step = DELEGATE_CONT
    this.$sub = iteratorM(iter)
    if (process.env.EJS_DEFUNCT) {
      this.$step = DELEGATE_CONT
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
  this.$step = terminated
  if (process.env.EJS_DEFUNCT && !process.env.EJS_INLINE) {
    this.$last = terminated
  } else {
    this.$exit = terminated
    this.$handle = void 0
    if (!process.env.EJS_INLINE) {
      this.$contExit = terminated
      this.$contHandle = void 0
    }
  }
  return {value:value,done:true}
}

LAGp.raise = function(e) {
  this.$step = terminated
  if (process.env.EJS_DEFUNCT && !process.env.EJS_INLINE) {
    this.$last = terminated
  } else {
    this.$exit = terminated
    this.$handle = void 0
    if (!process.env.EJS_INLINE) {
      this.$contExit = terminated
      this.$contHandle = void 0
    }
  }
  throw e
}

if (!process.env.EJS_DEFUNCT) {
  LAGp.next = function next(value) {
    if (!process.env.EJS_INLINE) {
      this.$handle = this.$contHandle
      this.$exit = this.$contExit
    }
    return runImpl(this, value)
  }
  runImpl = function runImpl(ctx,value) {
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

LAGp.$redirResult = redirResult
function redirResult(iter) {
  if (iter.done) {
    this.$step = this.$resume
    if (!process.env.EJS_INLINE) {
      if (process.env.EJS_DEFUNCT) {
        this.$last = this.$step
      } else {
        this.$handle = this.$resumeHandle
        this.$exit = this.$resumeExit
        this.$resumeHandle = this.$resumeExit = void 0
      }
    }
    this.$sub = this.$resume = void 0
    return this.next(iter.value)
  }
  if (process.env.EJS_INLINE) {
    this.$step = DELEGATE_CONT
    return iter
  } else if (process.env.EJS_DEFUNCT) {
    return this.yld(iter.value,DELEGATE_CONT)
  } else {
    return this.yld(iter.value,DELEGATE_CONT,this.$contHandle,this.$contExit)
  }
}

if (process.env.EJS_DEFUNCT) {
  LAGp.$redir = function a(p) {
    if (!process.env.EJS_INLINE) {
      return this.chain(this.$sub.next(p),DELEGATE_RESUME)
    } else {
      this.$step = DELEGATE_RESUME
      return this.$sub.next(p)
    }
  }
}

LAGp.throw = function(value) {
  if (this.$step === DELEGATE_CONT) {
    if (process.env.EJS_INLINE) {
      if (process.env.EJS_DEFUNCT) {
        return this.next(this.$sub.throw(value))
      } else {
        this.$state = DELEGATE_RESUME
        return Promise.resolve(this.$sub.throw(value)).then(this.$resolve,this.$reject)
      }
    } else {
      if (process.env.EJS_DEFUNCT)
        return this.chain(this.$sub.throw(value),DELEGATE_RESUME)
      else
        return this.chain(this.$sub.throw(value),
                          DELEGATE_RESUME,this.$handle,this.$exit)
    }
  }
  if (!process.env.EJS_INLINE && process.env.EJS_DEFUNCT)
    this.$step = this.$err(this.$last)
  else {
    if (!(this.$step = this.$handle))
      return this.raise(value)
  }
  return this.next(value)
}

LAGp.return = function(value) {
  if (this.$step === DELEGATE_CONT) {
    if (process.env.EJS_INLINE) {
      this.$resume = this.$exit
      if (process.env.EJS_DEFUNCT) {
        return this.next(this.$sub.return(value))
      } else {
        this.$state = DELEGATE_RESUME
        return Promise.resolve(this.$sub.return(value)).then(this.$resolve,this.$reject)
      }
    } else {
      if (process.env.EJS_DEFUNCT) {
        this.$resume = this.$fin(this.$last)
        return this.chain(this.$sub.return(value),DELEGATE_RESUME)
      } else {
        this.$resume = this.$exit
        return this.chain(this.$sub.return(value),
                          DELEGATE_RESUME,this.$handle,this.$exit)
      }
    }
  } else {
    if (!process.env.EJS_INLINE && process.env.EJS_DEFUNCT)
      this.$step = this.$fin(this.$last)
    else
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

asyncGeneratorFunction = function asyncGeneratorFunction(fun,handler,err,fin) {
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
    if (!process.env.EJS_INLINE) {
      if (err)
        leanProto.$err = err
      if (fin)
        leanProto.$fin = fin
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

