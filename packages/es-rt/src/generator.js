import {iterator as iterSym, delegateIterator as delegateSym} from "./symbol"
import {Generator} from "./esIterator"
import {iterator,delegate} from "./leanIterator"
import {forInIterator} from "./forInIterator"

/** smart constructor for generators */
export var generator
var GeneratorConstructor

if (process.env.EJS_DELEGATE_FOR_OF) {
  generator = function generator(caller) {
    return new GeneratorConstructor()
  }
} else if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  generator = function generator(caller) {
    var res = new GeneratorConstructor(),
        esProto = caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
        unwrap = res.unwrap = Object.create(esProto)
    unwrap.$t = res
    return res
  }
} else if (process.env.EJS_NO_ES_ITERATORS) {
  generator = function generator() {
    return new GeneratorConstructor()
  }
} else {
  generator = function generator() {
    var res = new GeneratorConstructor()
    res.unwrap = new Generator(res)
    return res
  }
}

/** lean iterator implementation for generators */
export function LeanGenerator() {
  this.done = false
  this.value = void 0
}

var LGp = LeanGenerator.prototype
GeneratorConstructor = LeanGenerator

/** passing default implementations to async generators */

if (!process.env.EJS_DEFUNCT) {
  var trampoline = function trampoline(c,a) {
    do {
      c.$tail = false
      c = c.$step(a)
    } while(c.$tail)
    return c
  }
}

if (!process.env.EJS_INLINE) {

  function resume(a) {
    this.$handle = this.$subHandle
    this.$step = this.$subStep
    this.$exit = this.$subExit
    this.$subStep = this.$subExit = this.$subHandle = null
    if (process.env.EJS_DEFUNCT)
      this.runStep = step
    try {
      return process.env.EJS_DEFUNCT ? this.$run(a) : this.$step(a)
    } catch(e) {
      return this.handle(e)
    }
  }

  LGp.exit = function exit(value) {
    try {
      return process.env.EJS_DEFUNCT
        ? (this.$step = this.$exit, this.$run(value))
        : this.$exit(value)
    } catch(e) {
      return this.handle(e)
    }
  }

  function suspend(ctx, cont, handle, exit) {
    ctx.$subStep = cont
    ctx.$subHandle = handle
    ctx.$subExit = exit
    if (process.env.EJS_DEFUNCT) {
      ctx.runStep = resume
    } else {
      ctx.$step = resume
    }
  }

  function step(a) {
    try {
      return process.env.EJS_DEFUNCT ? this.$run(a) : this.$step(a)
    } catch(e) {
      return this.handle(e)
    }
  }
  if (process.env.EJS_DEFUNCT) {
    LGp.runStep = step
    LGp.step = function(a) {
      return this.runStep(a)
    }
  } else
    LGp.step = step
  
  LGp.yld = function yld(value, cont, handle, exit) {
    this.value = value
    suspend(this, cont, handle, exit)
    return this
  }
  
  LGp.yldStar = function yldStar(iter, cont, handle, exit) {
    suspend(this, cont, handle, exit)
    return this.delegate(iter)
  }
  
  LGp.jump = function jump(value, step, handle, exit) {
    try {
      this.$step = step
      this.$handle = handle
      this.$exit = exit
      return process.env.EJS_DEFUNCT ? this.$run(value) : this.$step(value)
    } catch(e) {
      return this.handle(e)
    }
  }
  
  LGp.scope = function scope(step, handle, exit) {
    this.$step = step
    this.$handle = handle
    this.$exit = exit
    return this.unwrap
  }

  LGp.pure = function pure(value) {
    this.done = true
    this.value = value
    if (process.env.EJS_DEFUNCT) {
      this.$step = this.$handle = this.$exit = void 0
      this.step = terminated
      this.handle = terminatedHandle
      this.exit = terminated
    } else {
      this.$step = terminated
      this.$handle = terminatedHandle
      this.$exit = terminated
    }
    return this
  }
} else {  
  LGp.pure = function pure(value) {
    this.done = true
    this.value = value
    this.step = terminated
    this.handle = terminatedHandle
    if (process.env.EJS_DEFUNCT) {
      this.$exit = void 0
      this.exit = terminated
    } else 
      this.$exit = terminated
    return this
  }

  LGp.yld = function yld(value) {
    this.value = value
    return this
  }
  
  LGp.exit = function exit(value) {
    if (process.env.EJS_DELEGATE_FOR_OF)
      this.$rstep = this.$r.exit
    return process.env.EJS_DEFUNCT
      ? (this.$step = this.$exit, this.$run(value))
      : this.$exit(value)
  }

  if (process.env.EJS_DEFUNCT) {
    LGp.step = function(v) {
      return this.$run(v)
    }
  } else {
    LGp.step = function(v) {
      return this.$step(v)
    }
  }
}

function exitSub(value) {
  try {
    if (this.$exit) {
      this.pure = contExitSub
      return process.env.EJS_DEFUNCT
        ? (this.$step = this.$exit, this.$run(value))
        : this.$exit(value)
    }
  } catch(e) {
    return this.handle(e)
  }
  return this.$sub.exit(value)
}

export function makeDelegate(iterator) {
  return function delegate(i) {
    var iter = iterator(i)
    iter.$sub = this
    iter.$subPure = iter.pure
    iter.pure = contSub
    iter.raise = handleSub
    iter.exit = exitSub
    return iter.step()
  }
}

function contSub(v) {
  this.pure = this.$subPure
  return this.$sub.step(v)
}

function handleSub(v) {
  return this.$sub.handle(v)
}

function contExitSub(v) {
  return this.$sub.exit(v)
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  LGp.iterator = iterator
  LGp.forInIterator = forInIterator
}

LGp[iterSym] = function() { return this }

LGp.handle = function(ex) {
  return process.env.EJS_DEFUNCT
    ? (this.$step = this.$handle, this.$run(ex))
    : this.$handle(ex)
}

LGp.raise = function genRaise(ex) {
  this.$step = this.$handle = this.$exit = void 0
  this.handle = terminatedHandle
  this.exit = this.step = terminated
  this.value = void 0
  this.done = true
  throw ex
}

var TLGp = LGp

if (!process.env.EJS_NO_TRAMPOLINE && !process.env.EJS_DELEGATE_FOR_OF) {
  function TrampolineGenerator() {
    this.$running = false
    this.done = false
    this.value = void 0
  }
  GeneratorConstructor = TrampolineGenerator
  TrampolineGenerator.prototype = TLGp = Object.create(LGp)
  TLGp.oneStep = LGp.step
  TLGp.oneHandle = LGp.handle
  TLGp.oneExit = LGp.exit
  TLGp.step = function(v) {
    this.$running = false
    var t = this.oneStep(v)
    while(t.$running) {
      t.$running = false
      t = t.oneStep(t.value)
    }
    return t
  }
  TLGp.handle = function(v) {
    var t = this.oneHandle(v)
    while(t.$running) {
      t.$running = false
      t = t.oneStep(t.value)
    }
    return t
  }
  TLGp.exit = function(v) {
    this.$running = false
    var t = this.oneExit(v)
    while(t.$running) {
      t.$running = false
      t = t.oneStep(t.value)
    }
    return t
  }
  if (!process.env.EJS_INLINE) {
    TLGp.jumpR = function jumpR(value,step,handle,exit) {
      this.$step = step
      this.$handle = handle
      this.$exit = exit
      this.$running = true
      return this
    }
    if (process.env.EJS_TRAMPOLINE_JUMPS)
      TLGp.jump = TLGp.jumpR
  }
}

if (process.env.EJS_DELEGATE_FOR_OF) {  
  LGp.delegate = delegate
  LGp[delegateSym] = LGp.delegateTo = function(dst,y,r,rstep,iyld) {
    if (process.env.EJS_DEBUG_LOOSE)
      this[delegateSym] = doubleDelegate
    this.$s = this
    this.$i = this.$e = dst
    this.$y = y
    this.$r = r
    this.$rstep = rstep
    this.$iyld = iyld
    this.unwrap = dst.unwrap
    this.$running = false
    return this
  }

  function doubleDelegate() {
    throw new TypeError(
      "Not Implemented: taking iterator of deligated generator")
  }

  function wrapDelegate(dst,y,r,rstep,iyld) {
    return this.$dst[delegateSym](dst,y,r,rstep,iyld)
  }

  function contIter() {
    return this.$dst
  }

  function finished(value) {
    this.value = value
    return this
  }

  function defaultRes(value) {
    this.value = value
    this.done = true
    this.$t = this
    return this
  }
  
  LGp[Symbol.iterator] = LGp[iterSym] = function() {
    var res = this.$dst = new Generator(this)
    this.delegateTo(res,res,res,defaultRes,finished)
    this[Symbol.iterator] = this[iterSym] = contIter
    this[delegateSym] = wrapDelegate
    return res
  }

  LGp.next = function(v) {
    return this[Symbol.iterator]().next(v)
  }
  
  LGp.return = function(v) {
    return this[Symbol.iterator]().return(v)
  }

  LGp.throw = function(v) {
    return this[iterSym]().throw(v)
  }

} else {
  if (!process.env.EJS_NO_ES_ITERATORS)
    LGp[Symbol.iterator] = function() { return this.unwrap }
  LGp.delegate = makeDelegate(iterator)
}



if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
  LGp.alreadyRunning = process.env.EJS_DEFUNCT ? -1
    : function alreadyRunning() {
      throw new TypeError("Generator is already running")
    }
  if (!process.env.EJS_INLINE || process.env.EJS_DEFUNCT) {
    function CheckRunningGenerator() {
      this.done = false
      this.value = void 0
    }
    var WLGp = CheckRunningGenerator.prototype = Object.create(TLGp)
    GeneratorConstructor = CheckRunningGenerator
    WLGp.stepNoCheck = TLGp.step
    function contSubNoCheck(v) {
      return this.$sub.stepNoCheck(v)
    }
    WLGp.delegate = function(i) {
      var iter = iterator(i)
      iter.$sub = this
      iter.pure = contSubNoCheck
      iter.raise = handleSub
      iter.exit = exitSub
      return iter.step()
    }
    WLGp.step = function(v) {
      if (this.$noenter) {
        this.$noenter = false
        throw new TypeError("Generator is already running")
      }
      this.$noenter = true
      try {
        return this.stepNoCheck(v)
      } finally {
        this.$noenter = false
      }
    }
  }
}

function terminated() {
  if (process.env.EJS_DEBUG_LOOSE) {
    console.error("running terminate")
    throw new Error("running terminated")
  }
  this.value = void 0
  return this
}

function terminatedHandle(e) {
  if (process.env.EJS_DEBUG_LOOSE) {
    console.error("running terminate")
    throw new Error("running terminated")
  }
  return this.raise(e)
}

