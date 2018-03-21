import * as Es from "@effectful/es-rt/opts/defunct"

export var contextSymbol = Symbol("@effectful/redux/context")
export var chainSymbol = Symbol("@effectful/redux/then")

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
  return value && value[chainSymbol] ? value[chainSymbol](this) : this
}

AGp[chainSymbol] = Ap[chainSymbol] = function(next) {
  return this.awaiting === void 0 ? next.resume(this.value) : this.$next = next
}

AGp.resume = Ap.resume = function resume(value) {
  this.awaiting = void 0
  return this.$run(this.$step, value)
}

function Context() {
  this.threads = new Set()
}

function cont(ctx,v) {
  var next = ctx.$next
  return next ? (ctx.$next = null, next.resume(v)) : ctx
}

Ap.pure = function pure(v) {
  this[contextSymbol].threads.delete(this)
  this.value = v
  return cont(this,v)
}

AGp.pure = function pure(v) {
  this[contextSymbol].threads.delete(this)
  EsAGp.pure.call(this,v)
  return cont(this,this)
}

AGp.yld = function yld(v, step, handle, exit) {
  EsAGp.yld.call(this,v)
  return cont(this,this)
}

AGp.raise = Ap.raise = function raise(v) {
  this[contextSymbol].threads.delete(this)
  throw v
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

