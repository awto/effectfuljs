import * as Es from "@effectful/es-rt/opts/defunct"

export var contextSymbol = Symbol("@effectful/es-persist/context")
export var chainSymbol = Symbol("@effectful/es-persist/then")

export var generator = Es.generator
export var async = Es.async
export var asyncGenerator = Es.asyncGenerator
export var iterator = Es.iterator
export var iteratorM = Es.iteratorM
export var forInIterator = Es.forInIterator

var globalContext = new Context()

export function context() {
  return globalContext
}

export function Async() {
  this[contextSymbol].threads.add(this)
  this.awaiting = void 0
  this.$next = []
}

var EsAp = Es.Async.prototype
var Ap = Async.prototype = Object.create(EsAp)
Ap.constructor = Async

function AsyncGenerator() {
  Async.call(this)
  this.unwrap = this
}

var EsAGp = Es.AsyncGenerator.prototype.leanPrototype
var AGp = AsyncGenerator.prototype = Object.create(EsAGp)
AGp.constructor = AsyncGenerator

function Generator() {}
var Gp = Generator.prototype = Object.create(Es.Generator.prototype)
Gp.constructor = Generator

Ap.chain = AGp.chain = function chain(value, cont, handle, exit) {
  this.awaiting = value
  this.$step = cont
  this.$handle = handle
  this.$exit = exit
  value && value[chainSymbol] && value[chainSymbol](this)
  return this
}

Ap.then = function(resume, handle) {
  if (this.done)
    return resume(this.value)
  function canceled() { return this }
  function cancel() { this.resume = canceled }
  this.$next.push({resume,handle,cancel})
  return this
}

AGp[chainSymbol] = Ap[chainSymbol] = function(next) {
  if (this.awaiting === void 0)
    next.resume(this.value)
  else
    this.$next.push(next)
}

Promise.prototype[chainSymbol] = function(next) {
  return this.then(v => next.resume(v), e => next.handle(e))
}

Ap.cancel = function cancel() {
  this.canceld = true
  this.$awaiting = void 0
}

AGp.resume = Ap.resume = function resume(value) {
  if (this.canceled)
    return this
  this.awaiting = void 0
  return this.$run(this.$step, value)
}

function Context() {
  this.threads = new Set()
}

function cont(ctx,v) {
  var next
  while((next = ctx.$next.shift()))
    next.resume(v)
  return ctx
}

function contErr(ctx,v) {
  var next
  while((next = ctx.$next.shift()))
    next.handle(v)
  return ctx
}

Ap.pure = function pure(v) {
  this[contextSymbol].threads.delete(this)
  this.done = true
  this.value = v
  return cont(this,v)
}

AGp.pure = function pure(v) {
  this[contextSymbol].threads.delete(this)
  EsAGp.pure.call(this,v)
  return cont(this,{value:this.value,done:true})
}

AGp.yld = function yld(v, step, handle, exit) {
  EsAGp.yld.call(this,v)
  return cont(this,{value:this.value,done:false})
}


AGp.return = function(v) {
  if (this.awaiting && this.awaiting.cancel)
    this.awaiting.cancel()
  return EsAGp.return.call(this,v)
}

AGp.throw = function(v) {
  if (this.awaiting && this.awaiting.cancel)
    this.awaiting.cancel()
  return EsAGp.throw.call(this,v)
}

AGp.raise = Ap.raise = function(v) {
  if (this.awaiting && this.awaiting.cancel)
    this.awaiting.cancel()
  this[contextSymbol].threads.delete(this)
  contErr(this,v)
  return this
}

function ext(proto) {
  return function(fun, handler) {
    fun.prototype = Object.create(proto)
    if (!fun.prototype[contextSymbol])
      fun.prototype[contextSymbol] = globalContext
    fun.prototype.$run = handler
    fun.prototype.name = fun.name
    return fun
  }
}

export const generatorFunction = ext(Gp)
export const asyncFunction = ext(Ap)
export const asyncGeneratorFunction = ext(AGp)

