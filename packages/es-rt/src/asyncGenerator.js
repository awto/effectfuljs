import {asyncIterator as asyncIterSym} from "./symbol"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"
import {Generator} from "./generator"
import {iteratorM,QueueWrapper,UnwrapWrapper,LeanAsyncIterator,EsWrapper} from "./leanAsyncIterator"
import {Async,setupCallbacks} from "./async"

export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  AsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

export var asyncGeneratorFunction

/** generators without queues and unwraps wrappers */
export var LeanAsyncGenerator
/** generators with optionally added queues and unwraps */
export var AsyncGenerator

var LAGp, AGp
var Gp = Generator.prototype

if (!process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
  LeanAsyncGenerator = function LeanAsyncGenerator() {
    this.done = false
    if (process.env.EJS_INLINE)
      setupCallbacks(this)
  }
  LAGp = LeanAsyncGenerator.prototype = Object.create(LeanAsyncIterator.prototype)
  LAGp.constructor = LeanAsyncGenerator
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
  AsyncGenerator = LeanAsyncIterator = function AsyncGenerator() {
    if (process.env.EJS_INLINE)
      setupCallbacks(this)
  }
  AGp = LAGp = LeanAsyncGenerator.prototype = Object.create(LeanAsyncIterator.prototype)
  LAGp.constructor = AsyncGenerator
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

export function esAsyncIterator(lean) {
  return lean[Symbol.asyncIterator]()
}


var delegateCont = process.env.EJS_DEFUNCT ? 2 : function delegateStep(v) {
  try {
    var ctx = this
    if (process.env.EJS_INLINE) {
      return Promise.resolve(this.$sub.step(v))
        .then(function(v) {
          ctx.$step = delegateCont
          return ctx.$redirResult(v);
        });
    } else {
      return this.chain(
        this.$sub.step(v),
        function(v) {
          ctx.$step = delegateCont
          return ctx.$redirResult(v);
        });
    }
  } catch (e) {
    this.$step = this.$handle;
    this.$sub = this.$iter = this.$resume = void 0;
    return this.step(e);
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
      return this.step(value)
    } catch(e) {
      return this.handle(e)
    }
  }
  LAGp.yld = Gp.yld
  LAGp.yldStar = function yldStar(iter, step, handle, exit) {
    this.$step = delegateCont
    this.$contHandle = handle
    this.$contExit = exit
    this.$resume = step
    this.$sub = iteratorM(iter)
    if (process.env.EJS_DEFUNCT)
      return this.$redir(void 0)
    else
      return this.step(void 0)
  }
} else {
  LAGp.$delegate = function yldStar(iter) {
    this.$resume = this.$step
    this.$step = delegateCont
    this.$sub = iteratorM(iter)
    if (process.env.EJS_DEFUNCT) {
      this.$step = 2
      return this.step()
    } else {
      return this.$step()
    }
  }
}

LAGp.iterator = iteratorM
LAGp.forInIterator = forInIterator
LAGp.iteratorM = iteratorM

LAGp[asyncIterSym] = LAGp[Symbol.asyncIterator] = function() { return this }

LAGp.handle = Gp.handle
LAGp.pure = Gp.pure
LAGp.raise = Gp.raise

LAGp.$redirResult = function a(iter) {
  if (iter.done) {
    this.$step = this.$resume
    this.$sub = this.$iter = this.$resume = void 0
    return this.step(iter.value)
  }
  this.$step = delegateCont
  this.value = iter.value
  return iter
}

if (process.env.EJS_DEFUNCT) {
  LAGp.$redir = function a(p) {
    if (!process.env.EJS_INLINE) {
      return this.chain(this.$sub.step(p),3,this.$handle,this.$exit)
    } else {
      this.$step = 3
      return this.$sub.step(p)
    }
  }
}

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
    return runImpl(this, e)
  }
}

LAGp.exit = Gp.exit

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
        leanProto.step = handler
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

