import {iterator as iterSym} from "./symbol"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"

/** smart constructor for generators with lean iterator interface */
export var generator

/** a separate object for iterables for ES object model compliance */
export var IterablePrototype = {}

export function esIterator(i) {
  return i
}

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

if (process.env.EJS_NO_ES_OBJECT_MODEL) {
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

Gp.$redirResult = function delegateResult(iter) {
  if (iter.done) {
    this.$step = this.$resume
    this.$sub = this.$iter = this.$resume = void 0
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
  this.$step = this.$handle
  return this.step(value)
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
  }
  function runTryCatch(ctx,value) {
    if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
      if (ctx.$step === runningCont)
        ctx.$alreadyRunning()
    try {
      runImpl(ctx,value)
    } catch(e) {
      ctx.$step = ctx.$handle
      runImpl(ctx,e)
    }
  }
  Gp.step = function step(value) {
    if (!process.env.EJS_INLINE) {
      if (this.$step !== delegateCont) {
        this.$handle = this.$contHandle
        this.$exit = this.$contExit
      }
    }
    if (!process.env.EJS_NO_TRAMPOLINE)
      this.$running = false
    runTryCatch(this,value)
    if (!process.env.EJS_NO_TRAMPOLINE) {
      while(this.$running) {
        this.$running = false
        runTryCatch(this,this.value)
      }
    }
    return this
  }
}

export var delegateCont = process.env.EJS_DEFUNCT ? 0 : delegateStep

function delegateStep(v) {
  try {
    return this.$redirResult(this.$sub.step(v))
  } catch(e) {
    this.$step = this.$handle
    this.$sub = this.$iter = this.$resume = void 0
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
    this.$contHandle = handle
    this.$contExit = exit
    this.$resume = step
    this.$sub = iterator(iter)
    if (process.env.EJS_DEFUNCT)
      return this.$redir(void 0)
    else
      return this.step(void 0)
  }

  Gp.jump = function jump(value, step, handle, exit) {
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

var terminated = process.env.EJS_DEFUNCT ? 1 : function terminated(value) {
  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
    this.$step = terminated
  this.value = value
  return this
}

var terminatedHandle = process.env.EJS_DEFUNCT ? 2 : function terminatedHandle(value) {
  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
    this.$step = terminated
  throw value
}
  
Gp.pure = function pure(value) {
  this.done = true
  this.value = value
  this.$step = this.$exit = terminated
  this.$handle = terminatedHandle
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = terminatedHandle
  }
  return this
}

Gp.raise = function genRaise(ex) {
  this.done = true
  this.value = void 0
  this.$step = this.$exit = terminated
  this.$handle = terminatedHandle
  if (!process.env.EJS_INLINE) {
    this.$contExit = terminated
    this.$contHandle = terminatedHandle
  }
  throw ex
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  Gp.iterator = iterator
  Gp.forInIterator = forInIterator
}

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
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype
  GeneratorFunctionPrototype.constructor = GeneratorFunction
  GeneratorFunctionPrototype[Symbol.toString] =
    GeneratorFunction.displayName = "GeneratorFunction"
  generatorFunction = function generatorFunction(fun) {
    Object.setPrototypeOf(fun, GeneratorFunctionPrototype)
    fun.prototype = Object.create(Gp)
    return fun
  }
}

