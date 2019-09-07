import { forInIterator } from "./forInIterator";
import { iteratorM, AsyncIterator, cancel, ignore } from "./leanAsyncIterator";
import { cancel as cancelSym } from "./symbol";

export var asyncGeneratorFunction;
/** generators with optionally added queues and unwraps */

/** generators without queues and unwraps wrappers */
export var AsyncGenerator = function AsyncGenerator() {
  var ctx = this;
  if (process.env.EJS_INLINE) {
    ctx.$resolve = function(v) {
      return process.env.EJS_INLINE ? ctx.$run(v) : ctx.$run(ctx.$step, v);
    };
    ctx.$reject = function(v) {
      return (ctx.$step = ctx.$err(ctx.$cur)), ctx.$run(v);
    };
  }
  ctx.$proceed = function() {
    proceed(ctx);
  };
  if (!process.env.EJS_NO_CANCEL) {
    ctx.$redirCancel = function() {
      return redirCancel(ctx);
    };
  }
  this.$q = [];
};

var AGp = (AsyncGenerator.prototype = new AsyncIterator());
AGp.constructor = AsyncGenerator;

export function asyncGenerator(caller) {
  var proto, es;
  if (caller && caller.prototype instanceof AsyncIterator) {
    proto = caller.prototype;
  } else {
    proto = AGp;
  }
  es = Object.create(proto);
  proto.constructor.call(es);
  return es;
}

export function esAsyncIterator(lean) {
  return lean[Symbol.asyncIterator]();
}

var DELEGATE_CONT = 2;

var runImpl;
var DELEGATE_RESUME = 3;

if (!process.env.EJS_INLINE) {
  AGp.scope = function(step) {
    this.$cur = this.$step = step;
    return this;
  };
  AGp.chain = function chain(p, step) {
    const ctx = this;
    return Promise.resolve((this.$await = p)).then(
      function(v) {
        ctx.$await = null;
        ctx.$step = step;
        return runImpl(ctx, v);
      },
      function(e) {
        ctx.$await = null;
        ctx.$step = ctx.$err(ctx.$cur);
        return runImpl(ctx, e);
      }
    );
  };
  AGp.jump = AGp.chain;
  AGp.yld = function(value, step) {
    this.$step = step;
    return { value: value, done: false };
  };
  AGp.yldStar = function yldStar(iter, step) {
    this.$step = DELEGATE_CONT;
    this.$sub = iteratorM(iter);
    this.$resumeCur = this.$cur;
    this.$resume = step;
    return this.$redir();
  };

  function walk(s, ctx, value) {
    try {
      return ctx.$run(s, value);
    } catch (e) {
      if ((ctx.$step = ctx.$err(s)) === 1) return ctx.raise(e);
      return runImpl(ctx, e);
    }
  }

  runImpl = function runImpl(ctx, value) {
    var s = ctx.$step;
    if (s === DELEGATE_CONT)
      return ctx.chain(ctx.$sub.next(value), DELEGATE_RESUME);
    if (s === DELEGATE_RESUME) return ctx.$redirResult(value);
    ctx.$cur = s;
    return walk(s, ctx, value);
  };
} else {
  AGp.$delegate = function yldStar(iter) {
    this.$resume = this.$step;
    this.$resumeCur = this.$cur;
    this.$step = DELEGATE_CONT;
    this.$sub = iteratorM(iter);
    return this.$run(void 0);
  };
  runImpl = function runImpl(ctx, value) {
    return ctx.$run(value);
  };
}

AGp.$err = function() {
  return 1;
};
AGp.$fin = function() {
  return 0;
};

function proceed(ctx) {
  if (!ctx.$q.length) {
    ctx.$busy = null;
    return;
  }
  var i = ctx.$q.shift();
  ctx.$busy = true;
  Promise.resolve(runImpl(ctx, i.value)).then(
    function(v) {
      i.cont(v);
    },
    function(e) {
      i.errCont(e);
    }
  );
}

function redirCancel(ctx) {
  return ctx.chain(ignore(cancel(ctx.$await)), ctx.$fin(ctx.$step)).then(
    function(v) {
      while (ctx.$q.length) ctx.$q.shift().cont(v);
      ctx.$q.length = 0;
      ctx.$busy = null;
      return v;
    },
    function(e) {
      while (ctx.$q.length) ctx.$q.shift().errCont(e);
      ctx.$q.length = 0;
      ctx.$busy = null;
      throw e;
    }
  );
}

function nop() {}

AGp.next = function next(value) {
  var ctx = this,
    res;
  if (process.env.EJS_NO_ASYNC_ITERATOR_QUEUE) {
    res = Promise.resolve(runImpl(this, value));
  } else {
    if (ctx.$busy) {
      res = new Promise(function(cont, errCont) {
        ctx.$q.push({ value: value, cont: cont, errCont: errCont });
      });
    } else {
      res = Promise.resolve(runImpl(this, value));
      ctx.$busy = true;
    }
  }
  if (!process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR) {
    var unwrapped = res.then(
      function(item) {
        if (!item) return;
        var value = item.value,
          ures = Promise.resolve(value).then(
            function(v) {
              proceed(ctx);
              return { value: v, done: item.done };
            },
            function(err) {
              ctx.$busy = null;
              return ctx.throw(err);
            }
          );
        if (process.env.EJS_INLINE || !process.env.EJS_NO_CANCEL) {
          unwrapped[cancelSym] =
            value && value[cancelSym]
              ? function() {
                  return value[cancelSym]();
                }
              : nop;
        }
        return ures;
      },
      function(e) {
        proceed(ctx);
        throw e;
      }
    );
    if (process.env.EJS_INLINE || !process.env.EJS_NO_CANCEL)
      unwrapped[cancelSym] = ctx.$redirCancel;
    return unwrapped;
  } else {
    if (process.env.EJS_INLINE || !process.env.EJS_NO_CANCEL)
      res[cancelSym] = ctx.$redirCancel;
    return res;
  }
};

AGp.throw = function(value) {
  if (this.$step === DELEGATE_CONT) {
    if (process.env.EJS_INLINE) {
      return this.next(this.$sub.throw(value));
    } else {
      return this.chain(this.$sub.throw(value), DELEGATE_RESUME);
    }
  }
  this.$step = this.$err(this.$cur);
  return this.next(value);
};

AGp.return = function(value) {
  if (this.$step === DELEGATE_CONT) {
    if (process.env.EJS_INLINE) {
      this.$resumeCur = this.$resume = this.$fin(this.$resumeCur);
      return this.next(this.$sub.return(value));
    } else {
      this.$resumeCur = this.$resume = this.$fin(this.$resumeCur);
      return this.chain(this.$sub.return(value), DELEGATE_RESUME);
    }
  } else {
    this.$step = this.$fin(this.$cur);
    return this.next(value);
  }
};

AGp.iterator = iteratorM;
AGp.forInIterator = forInIterator;
AGp.iteratorM = iteratorM;

var TERMINATED = 0;

AGp.pure = function(value) {
  this.$step = TERMINATED;
  this.$cur = TERMINATED;
  return { value: value, done: true };
};

AGp.raise = function(e) {
  this.$cur = this.$step = TERMINATED;
  throw e;
};

AGp.$redirResult = redirResult;
function redirResult(iter) {
  if (iter.done) {
    this.$cur = this.$step = this.$resume;
    this.$sub = this.$resume = this.$resumeCur = void 0;
    return runImpl(this, iter.value);
  }
  if (process.env.EJS_INLINE) {
    this.$step = DELEGATE_CONT;
    return iter;
  } else {
    return this.yld(iter.value, DELEGATE_CONT);
  }
}

AGp.$redir = function a(p) {
  if (process.env.EJS_INLINE) {
    this.$step = DELEGATE_RESUME;
    return this.$sub.next(p);
  } else {
    return this.chain(this.$sub.next(p), DELEGATE_RESUME);
  }
};

if (!process.env.EJS_INLINE) {
  /** like `return` but also cancels pending `await` expressions */
  AGp.cancel = function() {
    return redirCancel(this);
  };
}

var AsyncGeneratorFunctionPrototype;

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncGeneratorFunction() {}
  AsyncGeneratorFunctionPrototype = function AsyncGeneratorFunctionPrototype() {};
  AsyncGeneratorFunctionPrototype.prototype = AGp;
  AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  AsyncGeneratorFunctionPrototype[
    Symbol.toStringTag
  ] = AsyncGeneratorFunction.displayName = "AsyncGeneratorFunction";
}

asyncGeneratorFunction = function asyncGeneratorFunction(
  fun,
  handler,
  err,
  fin
) {
  var proto = AGp;
  if (!process.env.EJS_NO_ES_OBJECT_MODEL)
    Object.setPrototypeOf(fun, AsyncGeneratorFunctionPrototype);
  if (handler) {
    proto = Object.create(AGp);
    proto.$run = handler;
  }
  if (!process.env.EJS_INLINE) {
    if (err) proto.$err = err;
    if (fin) proto.$fin = fin;
  }
  fun.prototype = proto;
  return fun;
};
