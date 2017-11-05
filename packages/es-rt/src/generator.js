import {Symbol} from "./symbol"
import {Generator} from "./esIterator"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"

export var generator

function raiseImpl(e) { this.raise(e) }
if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  generator = function generator(caller) {
    var res = new LeanGenerator(),
        esProto = caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
        esIterator = res.esIterator = Object.create(esProto)
    esIterator.state = res
    return res
  }
} else if (!process.env.EJS_NO_ES_ITERATORS) {
  generator = function generator() {
    var res = new LeanGenerator()
    res.unwrap = new Generator(res)
    return res
  }
} else {
  generator = function generator() {
    return new LeanGenerator()
  }
}

export function LeanGenerator() {
  this.done = false
  this.value = void 0
}

var LGp = LeanGenerator.prototype


if (!process.env.EJS_INLINE) {
  function nop() {
    this.value = void 0
    return this
  }

  function resume(v) {
    this.$handle = this.$subHandle
    this.$cont = this.$subCont
    this.$exit = this.$subExit
    this.$subCont = this.$subExit = this.$subHandle = null
    if (process.env.EJS_DEFUNCT) {
      this.step = step
      return this.step(v)
    } else {
      return this.$cont(v)
    }
  }

  LGp.exit = function exit(value) {
    try {
      return process.env.EJS_DEFUNCT
        ? this.$run(this.$exit,value)
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
      ctx.step = resume
    } else {
      ctx.$cont = resume
    }
  }

  function step(a) {
    try {
      return process.env.EJS_DEFUNCT ? this.$run(this.$cont,a) : this.$cont(a)
    } catch(e) {
      return this.handle(e)
    }
  }
  LGp.step = step

  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
    LGp._step = LGp.step
    LGp.step = function step(a) {
      if (this.$running) {
        this.$running = false
        return this.alreadyRunning()
      }
      try {
        this.$running = true
        return this._step(a)
      } finally {
        this.$running = false
      }
    }
  }
  
  LGp.yld = function yld(value, cont, handle, exit) {
    this.value = value
    suspend(this, cont, handle, exit)
    return this
  }
  
  LGp.yldStar = function yldStar(iter, cont, handle, exit) {
    suspend(this, cont, handle, exit)
    iter = this.delegate(iter)
    return iter
  }
  
  LGp.jump = function jump(cont, handle, exit) {
    this.$cont = cont
    this.$handle = handle
    this.$exit = exit
    return process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING
      || process.env.EJS_INLINE
      ? this.step()
      : this._step()
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
          ? this.$run(this.$exit,value)
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

  LGp.exit = function exit(value) {
    return process.env.EJS_DEFUNCT
      ? this.$run(this.$exit,value)
      : this.$exit(value) 
  }
  
  exitSub = function exitSub(value) {
    try {
      if (this.$exit) {
        this.pure = contExitSub
        return process.env.EJS_DEFUNCT
          ? this.$run(this.$exit,value)
          : this.$exit(value)
      }
    } catch(e) {
      return this.handle(e)
    }
    return this.$sub.exit(value)
  }
}

var exitSub

export function makeDelegate(iterator) {
  return function delegate(i) {
    var iter = iterator(i)
    iter.$sub = this
    iter.pure = contSub
    iter.raise = handleSub
    iter.exit = exitSub
    return iter.step()
  }
}

function contSub(v) {
  return process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING
    || process.env.EJS_INLINE ? this.$sub.step(v) : this.$sub._step(v)
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

LGp[Symbol.leanIterator] = function() { return this }

if (!process.env.EJS_NO_ES_ITERATORS)
  LGp[Symbol.iterator] = function() { return this.unwrap }

if (process.env.EJS_DEFUNCT) {
  LGp.step = function(v) {
    return this.$run(this.$cont,v)
  }
  LGp.exit = function(v) {
    return this.$run(this.$exit,v)
  }
}

LGp.handle = function(ex) {
  return process.env.EJS_DEFUNCT
    ? this.$run(this.$handle,ex)
    : this.$handle(ex)
}

LGp.raise = function genRaise(ex) {
  this.$handle = raiseImpl
  this.exit()
  throw ex
}

if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
  LGp.alreadyRunning = function alreadyRunning() {
    throw new TypeError("Generator is already running")
  }
}

LGp.delegate = makeDelegate(iterator)

