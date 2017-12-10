import {iterator as iterSym} from "./symbol"
import {Generator} from "./esIterator"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"

export var generator
var GeneratorConstructor

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  /** smart constructor for generators */
  generator = function generator(caller) {
    var res = new GeneratorConstructor(),
        esProto = caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
        unwrap = res.unwrap = Object.create(esProto)
    if (process.env.EJS_DELEGATE_FOR_OF)
      res.$ = res
    unwrap.state = res
    return res
  }
} else if (!process.env.EJS_NO_ES_ITERATORS) {
  generator = function generator() {
    var res = new GeneratorConstructor()
    if (process.env.EJS_DELEGATE_FOR_OF)
      res.$ = res
    res.unwrap = new Generator(res)
    return res
  }
} else {
  generator = function generator() {
    var res = new GeneratorConstructor()
    if (process.env.EJS_DELEGATE_FOR_OF)
      res.$ = res
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
    return this.delegateYld(iter)
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
  
  exitSub = function exitSub(value) {
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
    return process.env.EJS_DEFUNCT
      ? (this.$step = this.$exit, this.$run(value))
      : this.$exit(value) 
  }
  
  exitSub = function exitSub(value) {
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

var exitSub

export function makeDelegateYld(iterator) {
  return function delegateYld(i) {
    var iter = iterator(i)
    iter.$sub = this
    iter.$subPure = iter.pure
    iter.pure = contSub
    iter.raise = handleSub
    iter.exit = exitSub
    return iter.step()
  }
}

LGp.delegateYld = makeDelegateYld(iterator)

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

if (!process.env.EJS_NO_ES_ITERATORS)
  LGp[Symbol.iterator] = function() { return this.unwrap }

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

if (!process.env.EJS_NO_TRAMPOLINE) {
  function TrampolineGenerator() {
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
    WLGp.delegateYld = function(i) {
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

if (process.env.EJS_DELEGATE_FOR_OF) {
  function DelegatingLeanGenerator() {
    this.done = false
    this.value = void 0
  }
  GeneratorConstructor = DelegatingLeanGenerator
  var DLGp = DelegatingLeanGenerator.prototype

  DLGp.pure = function pure(value) {
    this.$.done = true
    this.$.value = value
    this.$.$step = terminated
    this.$.$handle = terminatedHandle
    this.$.$exit = terminated
    return this
  }

  DLGp.raise = function genRaise(ex) {
    this.$.$handle = terminatedHandle
    this.$.$step = this.$exit = terminated
    this.$.done = true
    this.$.value = void 0
    throw ex
  }
  
  DLGp.yld = function yld(value) {
    this.$.value = value
  }
  /**
   * runs iterable calling `yld` for each outpit and `done` for result
   * all the callbacks must be not depend on `this`
   */
  DLGp.delegateFor = function(iterable,yld,done) {
    var iter = iterator(iterable)
    iter.$delegateFor(this,yld,done)
    return iter
  }

  DLGp.$delegateFor = function $delegateFor(dest,yld,done) {
    this.yld = yld
    this.pure = done
  }
  /** switches context temporarly to `iterable` until it exits */
  DLGp.delegateYld = function delegateYld(iterable) {
    var iter = iterator(iterable)
    iter.$delegateYld(this)
    this.$.$step()
  }

  DLGp.$delegateYld = function $delegateYld(dest) {
    var delegate = this
    var self = this.$ = dest.$
    var step = self.$step, handle = self.$handle, exit = self.$exit
    this.pure = function delegatePure(v) {
      self.$step = step
      self.$handle = handle
      self.$exit = exit
      return self.cont(v)
    }
    this.raise = function delegateRaise(e) {
      self.$step = step
      self.$handle = handle
      self.$exit = exit
      return self.$handle(e)
    }
    this.yld = dest.yld
    self.$step = this.$step
    self.$handle = this.$handle
    self.$exit = this.$exit
  }
  
  DLGp.cont = DLGp.step = function step(v) {
    this.$step(v)
    if (!process.env.EJS_TRAMPOLINE_JUMPS) {
      while(this.$running) {
        this.$running = false
        this.$step(this.value)
      }
    }
    return this
  }

  DLGp.runHandle = LGp.handle
  DLGp.handle = function handle(v) {
    this.runHandle(v)
    if (!process.env.EJS_TRAMPOLINE_JUMPS) {
      while(this.$running) {
        this.$running = false
        this.$step(this.value)
      }
    }
    return this
  }
  DLGp.exit = function exit(v) {
    var self = this
    this.cont =exit
    this.$exit(v)
    if (!process.env.EJS_TRAMPOLINE_JUMPS) {
      while(this.$running) {
        this.$running = false
        this.$step(this.value)
      }
    }
    return this
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

