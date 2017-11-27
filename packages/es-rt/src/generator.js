import {iterator as iterSym, delegateIterator as diSym} from "./symbol"
import {Generator} from "./esIterator"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"

export var generator
var GeneratorConstructor

function raiseImpl(e) { this.raise(e) }
if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  generator = function generator(caller) {
    var res = new GeneratorConstructor(),
        esProto = caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
        unwrap = res.unwrap = Object.create(esProto)
    unwrap.state = res
    return res
  }
} else if (!process.env.EJS_NO_ES_ITERATORS) {
  generator = function generator() {
    var res = new GeneratorConstructor()
    res.unwrap = new Generator(res)
    return res
  }
} else {
  generator = function generator() {
    return new GeneratorConstructor()
  }
}

export function LeanGenerator() {
  this.done = false
  this.value = void 0
}

var LGp = LeanGenerator.prototype
GeneratorConstructor = LeanGenerator

if (!process.env.EJS_DEFUNCT) {
  var trampoline = function trampoline(c,a) {
    do {
      c.$tail = false
      c = c.$cont(a)
    } while(c.$tail)
    return c
  }
}

if (!process.env.EJS_INLINE) {
  function nop() {
    this.value = void 0
    return this
  }

  function resume(a) {
    this.$handle = this.$subHandle
    this.$cont = this.$subCont
    this.$exit = this.$subExit
    this.$subCont = this.$subExit = this.$subHandle = null
    if (process.env.EJS_DEFUNCT)
      this.$step = step
    try {
      return process.env.EJS_DEFUNCT ? this.$run(a) : this.$cont(a)
    } catch(e) {
      return this.handle(e)
    }
  }

  LGp.exit = function exit(value) {
    try {
      return process.env.EJS_DEFUNCT
        ? (this.$cont = this.$exit, this.$run(value))
        : this.$exit(value)
    } catch(e) {
      return this.handle(e)
    }
  }

  function suspend(ctx, cont, handle, exit) {
    ctx.$subCont = cont
    ctx.$subHandle = handle
    ctx.$subExit = exit
    if (process.env.EJS_DEFUNCT) {
      ctx.$step = resume
    } else {
      ctx.$cont = resume
    }
  }

  function step(a) {
    try {
      return process.env.EJS_DEFUNCT ? this.$run(a) : this.$cont(a)
    } catch(e) {
      return this.handle(e)
    }
  }
  if (process.env.EJS_DEFUNCT) {
    LGp.$step = step
    LGp.step = function(a) {
      return this.$step(a)
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
  
  LGp.jump = function jump(value, cont, handle, exit) {
    try {
      this.$cont = cont
      this.$handle = handle
      this.$exit = exit
      return process.env.EJS_DEFUNCT ? this.$run(value) : this.$cont(value)
    } catch(e) {
      return this.handle(e)
    }
  }
  
  LGp.scope = function scope(cont, handle, exit) {
    this.$cont = cont
    this.$handle = handle
    this.$exit = exit
    return this.unwrap
  }

  LGp.pure = function pure(value) {
    this.done = true
    this.value = value
    if (process.env.EJS_DEFUNCT) {
      this.$cont = this.$handle = this.$exit = void 0
      this.step = nop
      this.handle = raiseImpl
      this.exit = nop
    } else {
      this.$cont = nop
      this.$handle = raiseImpl
      this.$exit = nop
    }
    return this
  }
  
  exitSub = function exitSub(value) {
    try {
      if (this.$exit) {
        this.pure = contExitSub
        return process.env.EJS_DEFUNCT
          ? (this.$cont = this.$exit, this.$run(value))
          : this.$exit(value)
      }
    } catch(e) {
      return this.handle(e)
    }
    return this.$sub.exit(value)
  }
} else {  
  function terminated() {
    this.value = void 0
    return this
  }

  function terminatedHandle(e) { return this.raise(e) }

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
      ? (this.$cont = this.$exit, this.$run(value))
      : this.$exit(value) 
  }
  
  exitSub = function exitSub(value) {
    try {
      if (this.$exit) {
        this.pure = contExitSub
        return process.env.EJS_DEFUNCT
          ? (this.$cont = this.$exit, this.$run(value))
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
    LGp.exit = function(v) {
      return this.$cont = this.$exit, this.$run(v)
    }
  } else {
    LGp.step = function(v) {
      return this.$cont(v)
    }
    LGp.handle = function(v) {
      return this.$handle(v)
    }
  }
}

var exitSub

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

if (process.env.EJS_DELEGATE_ITERATOR)
  LGp[diSym] = function(yld,raise,pure) {
    this.yld = yld
    this.raise = raise
    this.pure = pure
    return this
  }

if (!process.env.EJS_NO_ES_ITERATORS)
  LGp[Symbol.iterator] = function() { return this.unwrap }

LGp.handle = function(ex) {
  return process.env.EJS_DEFUNCT
    ? (this.$cont = this.$handle, this.$run(ex))
    : this.$handle(ex)
}

LGp.raise = function genRaise(ex) {
  this.$handle = raiseImpl
  this.pure()
  // this.exit()
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
    var t = this.oneExit(v)
    while(t.$running) {
      t.$running = false
      t = t.oneStep(t.value)
    }
    return t
  }
  if (!process.env.EJS_INLINE) {
    TLGp.jumpR = function jumpR(value,cont,handle,exit) {
      this.$cont = cont
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
    WLGp.delegate = function(i) {
      var iter = iterator(i)
      iter.$sub = this
      iter.pure = contSubNoCheck
      iter.raise = handleSub
      iter.exit = exitSub
      return iter.step()
    }
    WLGp.step = function(v) {
      if (this.$running) {
        this.$running = false
        throw new TypeError("Generator is already running")
      }
      this.$running = true
      try {
        return this.stepNoCheck(v)
      } finally {
        this.$running = false
      }
    }
  }
}

LGp.delegate = makeDelegate(iterator)

export var delegateIterator

if (process.env.EJS_DELEGATE_ITERATOR) {
  delegateIterator = function(iterable,step,err,res) {
    if (iterable[diSym])
      return iterable[diSym](step,err,res)
    var inner = iterator(iterable)
    return inner[diSym](step,err,res)
  }
}

