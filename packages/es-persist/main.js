/**
 * ES async, generator, async generator functions implementation with
 * access to their current state
 */

export {generator,generatorFunction,iterator,
        iteratorM,forInIterator} from "@effectful/es-rt"
import {Generator,iteratorM} from "@effectful/es-rt"

/** a property name for accessing threads store */
export var contextSymbol = Symbol("@effectful/es-persist/context")

/**
 * a name of a method like `Promise.prototype.then`, but instead of two 
 * callbacks it takes an object with `resume`/`reject` methods, thus
 * making it easier to serialize 
 */
export var chainSymbol = Symbol("@effectful/es-persist/chain")

var prototypeSym = Symbol("@effectful/es-persist/prototype")

/** 
 * same as `chainSymbol` but the method doesn't return next async value,
 * just subscribes to `this` settlement events
 */
export var awaitSymbol = Symbol("@effectful/es-persist/await")

/**
 * list of constructors used by this lib to be handled by some serialization
 * library if needed
 */
export var constructors = [Generator]

var DELEGATE_CONT = 2
var DELEGATE_RESUME = 3

/** 
 * registry for currently running async functions 
 * 
 * The default value may be overriden by setting context into
 * async (generator) function definition with `contextSymbol` 
 * property.
 */
export function Context(scheduler) {
  this.threads = new Set()
  this.scheduler = scheduler || new EventLoopScheduler()
}

/** 
 * called for each async function once, at its module's top level
 */
Context.prototype.reg = function(fun) {}

/**
 * called on each async function execution
 */
Context.prototype.startThread = function startThread(thread) {
  this.threads.add(thread)
}

/**
 * called on each asyn function exit
 */
Context.prototype.exitThread = function exitThread(thread) {
  this.threads.delete(thread)
  thread.$last = thread.$step = 0
}

function EventLoopScheduler() {}

EventLoopScheduler.prototype.enqueue = function(job) {
  Promise.resolve().then(() => job.run())
}

/** default registry */
var globalContext = new Context()

var contextStack = []

/** 
 * gets current context or replace it with some new one if an argument is provided
 */
export function context(ctx) {
  if (ctx)
    globalContext = ctx
  return globalContext
}

export var AsyncState = {
  pending: 0,
  resolved: 1,
  rejected: 2
}

export function Async() {
  this[contextSymbol].startThread(this)
  this.dest = []
  this.state = AsyncState.pending
  this.value = void 0
}

constructors.push(Async)

var Ap = Async.prototype
Ap.constructor = Async

function AsyncGenerator() {
  this[contextSymbol].startThread(this)
  this.queue = []
}

constructors.push(AsyncGenerator)

function construct(caller) {
  var res = Object.create(caller.prototype)
  caller.prototype.constructor.call(res)
  return res
}

export var asyncGenerator = construct
export var async = construct

var AGp = AsyncGenerator.prototype
AGp.constructor = AsyncGenerator

Ap.$err = AGp.$err = function() { return 1 }
AGp.$fin = function() { return 0 }

AGp[Symbol.asyncIterator] = function() { return this }

function Residual() {
  this.dest = []
  this.state = AsyncState.pending
}

constructors.push(Residual)

/**
 * returns Residual value
 * 
 * Residual value is like Promise but without callbacks, 
 * there is a `[chainSymbol]` method instead of `then` to specify next 
 * continuations. The continuation object has two methods `resume`/`reject` to continue 
 * execution in either normal or exception paths.
 *
 * The Residual object is itself an instance of continuation. 
 */
export function residual() {
  return new Residual()
}

var Rp = Residual.prototype

Promise.prototype[chainSymbol] = Rp[chainSymbol] = function chain(t) {
  var res = new Residual()
  t.cont = res
  this[awaitSymbol](t)
  return res
}

Rp.resume = function(value) {
  var dest = this.dest, i
  this.state = AsyncState.resolved
  this.value = value
  while((i = dest.pop()))
    i.resume(value)
}

Rp.reject = function (e) {
  var dest = this.dest, i
  this.state = AsyncState.rejected
  this.value = e
  while((i = dest.pop()))
    i.reject(e)
}

Rp.then = function(next, err) {
  return this.toPromise().then(next,err)
}

Rp.toPromise = function() {
  var ctx = this
  switch(this.state) {
  case AsyncState.resolved:
    return Promise.resolve(this.value)
  case AsyncState.rejected:
    return Promise.reject(this.value)
  default:
    return new Promise(function(r,e) {
      ctx.dest.push({resume:r,reject:e,deb_:(new Error()).stack})
    })
  }
}
  
Rp[awaitSymbol] = function(next) {
  switch(this.state) {
  case AsyncState.resolved:
    next.resume(this.value)
    break
  case AsyncState.rejected:
    next.reject(this.value)
    break
  default:
    this.dest.push(next)
  }
}

Promise.prototype[awaitSymbol] = function(next) {
  this.then(function(v) { next.resume(v) },
            function(e) { next.reject(e) })
}

Ap.jump = AGp.jump = function(v, cont) {
  this.$step = cont
  this.enqueue(v)
}

AGp.run = Ap.run = function() {
  var value
  try {
    return this.$run(this.$last = this.$step,
                     (value = this.$arg, this.$arg = void 0,value))
  } catch(e) {
    this.reject(e)
  }
}

AGp.scope = function(step) {
  this.$last = this.$step = step
  return this
}

AGp.chain = Ap.chain = function(v, cont) {
  this.$step = cont
  if (!v || !v[awaitSymbol])
    this.enqueue(v)
  else
    v[awaitSymbol](this)
}

Ap.scope = function(cont) {
  this.$step = cont
  this.cont = new Residual()
  this.resume()
  return this.cont
}

Ap[chainSymbol] = function chain(t) { return this.cont[chainSymbol](t) }
Ap.then = function (t,e) { return this.cont.then(t, e) }

Ap.pure = function(value) {
  this[contextSymbol].exitThread(this)
  this.cont.resume(value)
}

Ap.raise = function(error) {
  this[contextSymbol].exitThread(this)
  this.cont.reject(error)
}

AGp.pure = function(result) {
  this[contextSymbol].exitThread(this)
  this.queue.shift().resume({value:result,done:true})
}

AGp.raise = function(error) {
  this[contextSymbol].exitThread(this)
  this.queue.shift().reject(error)
}

AGp.resume = Ap.resume = function resume(v) {
  try {
    var s = this.$step
    switch(s) {
    case DELEGATE_CONT:
      this.chain(this.$sub.next(v), DELEGATE_RESUME)
      break
    case DELEGATE_RESUME:
      if (v.done) {
        this.$run(this.$last = this.$step = this.$resume, v)
        this.$sub = this.$resume = void 0
        break
      }
      this.yld(v.value, DELEGATE_CONT)
      break
    default:
      this.$last = this.$step
      this.$run(this.$step, v)
    }
  } catch(e) {
    this.reject(e)
  }
}

AGp.enqueue = Ap.enqueue = function enqueue(v) {
  this.$arg = v
  this[contextSymbol].scheduler.enqueue(this)
}

AGp.yld = function(value, step) {
  this.$step = step
  return this.queue.shift().resume({value:value,done:false})
}


AGp.yldStar = function(iter, step) {
  this.$sub = iteratorM(iter)
  this.$resume = step
  return this.chain(this.$sub.next(),DELEGATE_RESUME)
}

AGp.return = function(value) {
  var res = new Residual(this)
  this.queue.push(res)
  if (this.$step === DELEGATE_CONT && this.$sub.return) {
    this.$resume = this.$fin(this.$last)
    this.chain(this.$sub.return(value),DELEGATE_RESUME)
  } else {
    this.$step = this.$fin(this.$last)
    this.enqueue(value)
  }
  return res
}

Ap.reject = AGp.reject = function(e) {
  if((this.$step = this.$err(this.$last)) !== 1)
    this.enqueue(e)
  else
    this.raise(e)
}

AGp.throw = function(value) {
  var res = new Residual(this)
  this.queue.push(res)
  if (this.$step === DELEGATE_CONT && this.$sub.throw) {
    this.chain(this.$sub.throw(value),DELEGATE_RESUME)
  } else {
    this.$step = this.$err(this.$last)
    this.enqueue(value)
  }
  return res
}

AGp.next = function next(value) {
  var res = new Residual(this)
  this.queue.push(res)
  if (this.$step === DELEGATE_CONT) {
    this.chain(this.$sub.next(value),DELEGATE_RESUME)
  } else {
    this.enqueue(value)
  }
  return res
}

function makeConstructor(proto) {
  return function(fun, handler, err, fin) {
    var p = handler[prototypeSym]
    if (p) {
      fun.prototype = p
      return fun
    }
    p = Object.create(proto)
    fun.prototype = handler[prototypeSym] = p
    if (!p[contextSymbol])
      p[contextSymbol] = globalContext
    p.$run = handler
    if (err)
      p.$err = err
    if (fin)
      p.$fin = fin
    p.name = fun.name
    p[contextSymbol].reg(fun)
    return fun
  }
}

export var asyncFunction = makeConstructor(Ap)
export var asyncGeneratorFunction = makeConstructor(AGp)

function All(arr) {
  var len = arr.length, i
  this.dest = []
  this.state = len === 0 ? AsyncState.resolved : AsyncState.pending
  this.value = new Array(len)
  this.countdown = len
  for(i=0;i<len;++i)
    arr[i][awaitSymbol](new AllCont(this,i))
}

constructors.push(All)

/** like `Promise.all` */
export function all(iterable) {
  return new All(Array.from(iterable))
}

var AllProto = All.prototype = Object.create(Rp)
AllProto.constructor = All

function AllCont(src,index) {
  this.src = src
  this.index = index
}

constructors.push(AllCont)

AllCont.prototype.resume = function(value) {
  var src = this.src
  if (src.state !== AsyncState.rejected) {
    src.value[this.index] = value
    if (--src.countdown === 0)
      src.resume(src.value)
  }
}

AllCont.prototype.reject = function(value) {
  this.src.reject(value)
}

function Any(arr) {
  var len = arr.length, i
  this.dest = []
  this.state = AsyncState.pending
  for(i=0;i<len;++i)
    arr[i][awaitSymbol](new AnyCont(this))
}

constructors.push(Any)

/** like `Promise.race` */
export function any(iterable) {
  return new Any(Array.from(iterable))
}

function AnyCont(src) {
  this.src = src
}

constructors.push(AnyCont)

AnyCont.prototype.resume = function(value) {
  var src = this.src
  if (src.state === AsyncState.pending)
    src.resume(value)
}

AnyCont.prototype.reject = function(value) {
  var src = this.src
  if (src.state === AsyncState.pending)
    src.reject(value)
}

var AnyProto = Any.prototype = Object.create(Rp)
AnyProto.constructor = Any

/** 
 * returns async iterator where message can be sent using
 * `send` method and it can be finished with `stop` method
 */
export function subject() {
  return new Subject()
}

function Subject() {
  this.iq = []
  this.oq = []
}

constructors.push(Subject)

Subject.prototype[Symbol.asyncIterator] = function() { return this }

Subject.prototype.next = function(value) {
  var res = new Residual(this)
  if (this.oq.length)
    res.resume(this.oq.shift())
  else
    this.iq.push(res)
  return res
}

Subject.prototype.stop = function(value) {
  var frame = this.iq.shift()
  if (frame)
    frame.resume({value,done:true})
  else
    this.oq.push({value,done:true})
}

Subject.prototype.send = function(value) {
  var frame = this.iq.shift()
  if (frame)
    frame.resume({value,done:false})
  else
    this.oq.push({value,done:false})
}

function Fork() {}

/** 
 * captures current continuation returning a function to 
 * resume into it
 *
 * it doesn't clone the control context
 */
export function fork() {
  return new Fork()
}

constructors.push(Fork)

Fork.prototype[awaitSymbol] = function(cont) {
  var res = new Residual()
  res.dest.push(cont)
  cont.resume(res)
}

