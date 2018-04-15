import {iterator as iterSym} from "./symbol"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"

/** smart constructor for generators with lean iterator interface */
export var generator

/** a separate object for iterables for ES object model compliance */
export var IterablePrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  IterablePrototype[Symbol.iterator] = function () { return this }

/** 
 * constructor for generators with ES iterators interface 
 */
export function Generator() {}

/** wraps generator function to adapt its object model for ES conformance */
export var generatorFunction

/** final Generator.prototype */
var Gp = Generator.prototype = Object.create(IterablePrototype)

var runningCont

if (process.env.EJS_NO_ES_OBJECT_MODEL && !process.env.EJS_DEFUNCT) {
  generator = function generator() {
    var res = Object.create(Gp)
    res.value = void 0
    res.done = false
    if (!process.env.EJS_NO_TRAMPOLINE)
      res.$running = false
    return res
  }
} else {
  generator = function generator(caller) {
    var esProto = caller && caller.prototype instanceof Generator
          ? caller.prototype : Generator.prototype,
        res = Object.create(esProto)
    res.value = void 0
    res.done = false
    res.$running = false
    return res
  }
}

Gp.$redirResult = function redirResult(iter) {
  if (iter.done) {
    this.$step = this.$resume
    this.$sub = this.$iter = this.$resume = void 0
    if (!process.env.EJS_INLINE) {
      this.$contExit = this.$resumeExit
      this.$contHandle = this.$resumeHandle
      this.$resumeExit = this.$resumeHandle = void 0
    }
    return this.step(iter.value)
  }
  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
    this.$step = delegateCont
  this.value = iter.value
  return this
}

Gp.handle = function handle(value) {
  if (this.$step === delegateCont) {
    try {
      return this.$redirResult(this.$sub.handle(value))
    } catch(e) {
      value = e
    }
  }
  if (this.$handle) {
    this.$step = this.$handle
    this.$handle = void 0
    return this.step(value)
  }
  throw value
}

Gp.exit = function exit(value) {
  if (this.$step === delegateCont) {
    try {
      var iter = this.$sub
      this.$resume = this.$exit
      return this.$redirResult(this.$sub.exit(value))
    } catch(e) {
      return this.handle(e)
    }
  } else {
    this.$step = this.$exit
    return this.step(value)
  }
}

if (!process.env.EJS_DEFUNCT || !process.env.EJS_INLINE) {
  function runImpl(ctx,value) {
    if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
      if (ctx.$step === runningCont)
        ctx.$alreadyRunning()
    try {
      if (process.env.EJS_DEFUNCT) {
        if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
          var s
          ctx.$run((s = ctx.$step, ctx.$step = runningCont, s),value)
        } else {
        ctx.$run(ctx.$step,value)
        }
      } else {
        if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
          ctx.$run = ctx.$step
          ctx.$step = runningCont
          ctx.$run(value)
        } else {
          ctx.$step(value)
        }
      }
    } catch(e) {
      ctx.handle(e)
    }
  }
  Gp.step = function step(value) {
    if (!process.env.EJS_INLINE) {
      this.$handle = this.$contHandle
      this.$exit = this.$contExit
    }
    if (!process.env.EJS_NO_TRAMPOLINE)
      this.$running = false
    runImpl(this,value)
    if (!process.env.EJS_NO_TRAMPOLINE) {
      while(this.$running) {
        this.$running = false
        runImpl(this,this.value)
      }
    }
    return this
  }
}

var delegateCont = process.env.EJS_DEFUNCT ? 2 : delegateStep

function delegateStep(v) {
  try {
    return this.$redirResult(this.$sub.step(v))
  } catch(e) {
    this.$step = this.$handle
    this.$sub = this.$iter = this.$resume = void 0
    if (!process.env.EJS_INLINE)
      this.$resumeExit = this.$resumeHandle = void 0
    return this.step(e)
  }
}

if (process.env.EJS_DEFUNCT) {
  Gp.$redir = delegateStep
}

if (!process.env.EJS_INLINE) {
  Gp.yld = function yld(value, step, handle, exit) {
    this.value = value
    this.$step = step
    this.$contHandle = handle
    this.$contExit = exit
    return this
  }
  
  Gp.yldStar = function yldStar(iter, step, handle, exit) {
    this.$step = delegateCont
    this.$resumeHandle = handle
    this.$resumeExit = exit
    this.$resume = step
    this.$sub = this.iterator(iter)
    if (process.env.EJS_DEFUNCT)
      return this.$redir(void 0)
    else
      return this.step(void 0)
  }

  Gp.jump = Gp.jumpR = function jump(value, step, handle, exit) {
    try {
      this.$step = step
      this.$handle = this.$contHandle = handle
      this.$exit = this.$contExit = exit
      if (process.env.EJS_NO_TRAMPOLINE)
        return this.step(value)
      else {
        this.$running = true
        return this
      }
    } catch(e) {
      return this.handle(e)
    }
  }
  
  Gp.scope = function scope(step, handle, exit) {
    this.$step = step
    this.$handle = this.$contHandle = handle
    this.$exit = this.$contExit = exit
    return this
  }
} else {
  Gp.$delegate = function yldStar(iter) {
    this.$resume = this.$step
    this.$step = delegateCont
    this.$sub = iterator(iter)
    if (process.env.EJS_DEFUNCT)
      return this.$redir(void 0)
    else
      return this.$step(void 0)
  }

}

var terminated = process.env.EJS_DEFUNCT ? 0 : function terminated(value) {
  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
    this.$step = terminated
  this.value = value
  return this
}
  
Gp.pure = function pure(value) {
  this.done = true
  this.value = value
  this.$step = this.$exit = terminated
  this.$handle = void 0
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = void 0
  }
  return this
}

Gp.raise = function genRaise(ex) {
  this.done = true
  this.value = void 0
  this.$step = this.$exit = terminated
  this.$handle = void 0
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = void 0
  }
  throw ex
}

Gp.iterator = iterator
Gp.forInIterator = forInIterator

Gp[iterSym] = function() { return this }

if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
  Gp.$alreadyRunning = function alreadyRunning() {
    throw new TypeError("Generator is already running")
  }
  runningCont = process.env.EJS_DEFUNCT ? 3 : Gp.$alreadyRunning
}

Gp.next = function(value)  {
  this.step(value)
  return {value:this.value,done:this.done}
}

Gp.throw = function(value)  {
  this.handle(value)
  return {value:this.value,done:this.done}
}

Gp.return = function(value)  {
  this.exit(value)
  return {value:this.value,done:this.done}
}

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunctionPrototype.prototype = Gp
  GeneratorFunction.prototype = Gp.constructor
    = GeneratorFunctionPrototype
  GeneratorFunctionPrototype.constructor = GeneratorFunction
  GeneratorFunctionPrototype[Symbol.toString] =
    GeneratorFunction.displayName = "GeneratorFunction"
  generatorFunction = function generatorFunction(fun,handler) {
    Object.setPrototypeOf(fun, GeneratorFunctionPrototype)
    fun.prototype = Object.create(Gp)
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
} else
  generatorFunction = function generatorFunction(fun,handler) {
    fun.prototype = Object.create(Gp)
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


