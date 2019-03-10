/**
 * @file ES async, generator, async generator functions implementation with
 *       access to their current state
 */

export {
  generator,
  generatorFunction,
  iterator,
  iteratorM,
  forInIterator
} from "@effectful/es-rt";
import { Generator, iteratorM } from "@effectful/es-rt";

/**
 * Property name for accessing coroutines store.
 * @type {Symbol}
 */
export var contextSymbol = Symbol("@effectful/es-persist/context");

var prototypeSym = Symbol("@effectful/es-persist/prototype");

/**
 * Name of a method to send defunct method messages (next:0/throw:1/return:2) to
 * async iterator if supported
 *
 * @type {Symbol}
 */
export var sendSymbol = Symbol("@effectful/es-persist/send");

var NEXT_METHOD = 0;
var THROW_METHOD = 1;
var RETURN_METHOD = 2;

/**
 * Name of a method like `Promise.prototype.then`. But instead of two callbacks,
 * it takes an object with `resume`/`reject` methods, thus making it easier to
 * serialize. And it returns nothing to avoid some allocations. Use `chain`
 * function To chain a few async computations without async/await
 * syntax.
 * @Type {Symbol}
 */
export var awaitSymbol = Symbol("@effectful/es-persist/await");

/**
 * List of constructors used by this lib to be handled by some serialization
 * library if needed
 * @type {Array.<Function>}
 */
export var constructors = [Generator];

var DELEGATE_CONT = 2;
var DELEGATE_RESUME = 3;

export const eventLoopScheduler = new EventLoopScheduler();

/**
 * Registry for currently running async functions.
 *
 * The default value may be overriden by setting context into async (generator) function definition with `contextSymbol` property.
 * @constructor
 */
export function Context(scheduler) {
  this.running = new Set();
  this.scheduler = scheduler || eventLoopScheduler;
}

/**
 * Called on each async thread (function's call) execution start
 */
Context.prototype.reg = function reg(instance) {
  this.running.add(instance);
};

/**
 * Called on each async thread exit
 */
Context.prototype.unreg = function unreg(instance) {
  this.running.delete(instance);
  instance.$last = instance.$step = 0;
};

function EventLoopScheduler() {
  this.jobs = 0;
  this._idle = [];
}

EventLoopScheduler.prototype.enqueue = function(job) {
  var self = this;
  ++this.jobs;
  Promise.resolve().then(function trampoline() {
    job.run();
    --self.jobs;
    while (self.jobs === 0 && self._idle.length) self._idle.shift().run();
  });
};

EventLoopScheduler.prototype.onIdle = function(job) {
  if (this.jobs === 0) this.enqueue(job);
  else this._idle.push(job);
};

/** default registry */
var globalContext = new Context();

/**
 * Gets current context or replace it with some new one if an argument is
 * provided
 */
export function context(ctx) {
  if (ctx) {
    var old = globalContext;
    globalContext = ctx;
    return old;
  }
  return globalContext;
}

export var AsyncState = {
  pending: 0,
  resolved: 1,
  rejected: 2
};

export function Async() {
  this[contextSymbol].reg(this);
  this.dest = [];
  this.state = AsyncState.pending;
  this.value = void 0;
}

var Ap = Async.prototype;
Ap.constructor = Async;

function AsyncGenerator() {
  this[contextSymbol].reg(this);
  this.queue = [];
}

function construct(caller) {
  var res = Object.create(caller.prototype);
  caller.prototype.constructor.call(res);
  return res;
}

export var asyncGenerator = construct;
export var async = construct;

var AGp = AsyncGenerator.prototype;
AGp.constructor = AsyncGenerator;

Ap.$err = AGp.$err = function() {
  return 1;
};
AGp.$fin = function() {
  return 0;
};

AGp[Symbol.asyncIterator] = function() {
  return this;
};

function Residual() {
  this.dest = [];
  this.state = AsyncState.pending;
}

constructors.push(Residual);

/**
 * Returns Residual value
 *
 * Some async function can use the result of this function to block in `await`
 * expression, and some another async function may unblock it by calling
 * `resume` there.
 *
 */
export function lock() {
  return new Residual();
}

var Rp = Residual.prototype;

Rp.resume = function(value) {
  var dest = this.dest,
    i;
  this.state = AsyncState.resolved;
  this.value = value;
  while ((i = dest.pop())) i.resume(value);
};

Rp.reject = function(e) {
  var dest = this.dest,
    i;
  this.state = AsyncState.rejected;
  this.value = e;
  while ((i = dest.pop())) i.reject(e);
};

Rp.run = function() {
  var i,
    dest = this.dest;
  switch (this.state) {
    case AsyncState.resolved:
      while ((i = dest.pop())) i.resume(this.value);
      break;
    case AsyncState.rejected:
      while ((i = dest.pop())) i.reject(this.value);
      break;
  }
};

Rp.then = function(next, err) {
  return this.toPromise().then(next, err);
};

Rp.toPromise = function() {
  var ctx = this;
  switch (this.state) {
    case AsyncState.resolved:
      return Promise.resolve(this.value);
    case AsyncState.rejected:
      return Promise.reject(this.value);
    default:
      return new Promise(function(r, e) {
        ctx.dest.push({ resume: r, reject: e });
      });
  }
};

Rp[awaitSymbol] = function(next) {
  switch (this.state) {
    case AsyncState.resolved:
      next.resume(this.value);
      break;
    case AsyncState.rejected:
      next.reject(this.value);
      break;
    default:
      this.dest.push(next);
  }
};

Promise.prototype[awaitSymbol] = function(next) {
  this.then(
    function(v) {
      next.resume(v);
    },
    function(e) {
      next.reject(e);
    }
  );
};

Ap.jump = AGp.jump = function(v, cont) {
  this.$step = cont;
  this.enqueue(v);
};

AGp.run = Ap.run = function() {
  var value;
  try {
    return this.resume(((value = this.$arg), (this.$arg = void 0), value));
  } catch (e) {
    this.reject(e);
  }
};

AGp.scope = function(step) {
  this.$last = this.$step = step;
  return this;
};

AGp.chain = Ap.chain = function(v, cont) {
  this.$step = cont;
  if (!v || !v[awaitSymbol]) this.enqueue(v);
  else v[awaitSymbol](this);
};

Ap.scope = function(cont) {
  this.$step = cont;
  this.cont = new Residual();
  this.resume();
  return this.cont;
};

Ap[awaitSymbol] = function(t) {
  this.cont[awaitSymbol](t);
};
Ap.then = function(t, e) {
  return this.cont.then(t, e);
};

Ap.pure = function(value) {
  this[contextSymbol].unreg(this);
  this.cont.resume(value);
};

Ap.raise = function(error) {
  this[contextSymbol].unreg(this);
  this.cont.reject(error);
};

AGp.pure = function(value) {
  this[contextSymbol].unreg(this);
  result(this, { value: value, done: true }, AsyncState.resolved);
};

AGp.raise = function(error) {
  this[contextSymbol].unreg(this);
  result(this, error, AsyncState.rejected);
};

AGp.resume = Ap.resume = function resume(v) {
  try {
    var s = this.$step;
    switch (s) {
      case DELEGATE_CONT:
        this.chain(this.$sub.next(v), DELEGATE_RESUME);
        break;
      case DELEGATE_RESUME:
        if (v.done) {
          this.$run((this.$last = this.$step = this.$resume), v);
          this.$sub = this.$resume = void 0;
          break;
        }
        this.yld(v.value, DELEGATE_CONT);
        break;
      default:
        this.$run((this.$last = this.$step), v);
    }
  } catch (e) {
    this.reject(e);
  }
};

AGp.enqueue = Ap.enqueue = function enqueue(v) {
  this.$arg = v;
  this[contextSymbol].scheduler.enqueue(this);
};

AGp.yld = function(value, step) {
  this.$step = step;
  result(this, { value: value, done: false }, AsyncState.resolved);
};

AGp.yldStar = function(iter, step) {
  this.$sub = iteratorM(iter);
  this.$resume = step;
  return this.chain(this.$sub.next(), DELEGATE_RESUME);
};

function send(ctx, value, method) {
  if (ctx[sendSymbol]) return ctx[sendSymbol](value, method);
  switch (method) {
    case NEXT_METHOD:
      return ctx.next(value);
    case THROW_METHOD:
      return ctx.throw ? ctx.throw(value) : Promise.reject(value);
    case RETURN_METHOD:
      return ctx.return
        ? ctx.return(value)
        : Promise.resolve({ value: void 0, done: true });
  }
  throw new Error("unknown method");
}

function method(ctx, cont, arg, method) {
  if (ctx.$step === DELEGATE_CONT) {
    if (method === RETURN_METHOD) ctx.$resume = ctx.$fin(ctx.$last);
    ctx.chain(send(ctx.$sub, arg, method), DELEGATE_RESUME);
  } else {
    if (method !== NEXT_METHOD)
      ctx.$step =
        method === THROW_METHOD ? ctx.$err(ctx.$last) : ctx.$fin(ctx.$last);
    ctx.enqueue(arg);
  }
}

function result(ctx, value, state) {
  var queue = ctx.queue,
    frame = queue.shift(),
    cont;
  frame.state = state;
  frame.value = value;
  if (queue.length) {
    cont = queue[0];
    method(ctx, cont, cont.$arg, cont.$method);
  }
  frame.run();
}

AGp[sendSymbol] = function(value, methodId) {
  var queue = this.queue,
    cont = new Residual();
  if (queue.push(cont) === 1) method(this, cont, value, methodId);
  else {
    cont.$arg = value;
    cont.$method = methodId;
  }
  return cont;
};

AGp.next = function(value) {
  return this[sendSymbol](value, NEXT_METHOD);
};

AGp.throw = function(value) {
  return this[sendSymbol](value, THROW_METHOD);
};

AGp.return = function(value) {
  return this[sendSymbol](value, RETURN_METHOD);
};

Ap.reject = AGp.reject = function(e) {
  if ((this.$step = this.$err(this.$last)) !== 1) this.enqueue(e);
  else this.raise(e);
};

function makeConstructor(proto, reg) {
  return function(fun, handler, err, fin) {
    var p = handler[prototypeSym];
    if (p) {
      fun.prototype = p;
      return fun;
    }
    p = Object.create(proto);
    fun.prototype = handler[prototypeSym] = p;
    if (!p[contextSymbol]) p[contextSymbol] = globalContext;
    p.$run = handler;
    if (err) p.$err = err;
    if (fin) p.$fin = fin;
    p.name = fun.name;
    reg(fun);
    return fun;
  };
}

function nop() {}

/**
 * async function constructor for libraries overriding default behavior
 */
export function makeAsyncFunctionConstructor(reg) {
  return makeConstructor(Ap, reg);
}

/**
 * async generator function constructor for libraries overriding default behavior
 */
export function makeAsyncGeneratorFunctionConstructor(reg) {
  return makeConstructor(AGp, reg);
}

export var asyncFunction = makeConstructor(Ap, nop);
export var asyncGeneratorFunction = makeConstructor(AGp, nop);

function All(arr) {
  var len = arr.length,
    i;
  this.dest = [];
  this.state = len === 0 ? AsyncState.resolved : AsyncState.pending;
  this.value = new Array(len);
  this.countdown = len;
  for (i = 0; i < len; ++i) arr[i][awaitSymbol](new AllCont(this, i));
}

constructors.push(All);

/** like `Promise.all` */
export function all(iterable) {
  return new All(Array.from(iterable));
}

var AllProto = (All.prototype = Object.create(Rp));
AllProto.constructor = All;

function AllCont(src, index) {
  this.src = src;
  this.index = index;
}

constructors.push(AllCont);

AllCont.prototype.resume = function(value) {
  var src = this.src;
  if (src.state !== AsyncState.rejected) {
    src.value[this.index] = value;
    if (--src.countdown === 0) src.resume(src.value);
  }
};

AllCont.prototype.reject = function(value) {
  this.src.reject(value);
};

function Any(arr) {
  var len = arr.length,
    i;
  this.dest = [];
  this.state = AsyncState.pending;
  for (i = 0; i < len; ++i) arr[i][awaitSymbol](new AnyCont(this));
}

constructors.push(Any);

/** like `Promise.race` */
export function any(iterable) {
  return new Any(Array.from(iterable));
}

function AnyCont(src) {
  this.src = src;
}

constructors.push(AnyCont);

AnyCont.prototype.resume = function(value) {
  var src = this.src;
  if (src.state === AsyncState.pending) src.resume(value);
};

AnyCont.prototype.reject = function(value) {
  var src = this.src;
  if (src.state === AsyncState.pending) src.reject(value);
};

var AnyProto = (Any.prototype = Object.create(Rp));
AnyProto.constructor = Any;

/**
 * returns async iterator where message can be sent using
 * `send` method and it can be finished with `stop` method
 */
export function producer() {
  return new Producer();
}

function Producer() {
  this.iq = [];
  this.oq = [];
}

constructors.push(Producer);

Producer.prototype[Symbol.asyncIterator] = function() {
  return this;
};

Producer.prototype.next = function(value) {
  var res = new Residual();
  if (this.oq.length) res.resume(this.oq.shift());
  else this.iq.push(res);
  return res;
};

Producer.prototype.stop = function(value) {
  var frame = this.iq.shift();
  if (frame) frame.resume({ value, done: true });
  else this.oq.push({ value, done: true });
};

Producer.prototype.send = function(value) {
  var frame = this.iq.shift();
  if (frame) frame.resume({ value, done: false });
  else this.oq.push({ value, done: false });
};

function Current() {}
constructors.push(Current);

/** Returns current continuation */
export var current = new Current();

Current.prototype[awaitSymbol] = function(cont) {
  cont.resume(cont);
};

function Abort() {}
constructors.push(Abort);

/** Stops current continuation */
export var abort = new Abort();

Abort.prototype[awaitSymbol] = function() {};

function Idle() {}
constructors.push(Idle);

/**
 * Like `current`, but also suspends current continuation until jobs
 * queue is empty
 */
export var idle = new Idle();

Idle.prototype[awaitSymbol] = function(next) {
  next.$arg = next;
  next[contextSymbol].scheduler.onIdle(next);
};

function Managed() {}
constructors.push(Managed);

/**
 * Resolves to `true` if current thread is transpiled
 * and runs using `es-persist` runtime.
 */
export var managed = new Managed();

Managed.prototype[awaitSymbol] = function(next) {
  next.resume(true);
};
Managed.prototype.then = function(resolve) {
  resolve(false);
};
