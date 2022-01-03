/** runtime for ES async/await */

import { cancel as cancelSym } from "./symbol";
import { iterator } from "./leanIterator";
import { iteratorM, cancel, ignore } from "./leanAsyncIterator";
import { forInIterator } from "./forInIterator";

/**
 * wraps function to make AsyncFunction object model
 * compatible with ES standard
 */
export var asyncFunction;

/** context type */
export function Async() {}

var Ap = Async.prototype;

export function async(caller) {
  var esProto =
      caller && caller.prototype instanceof Async
        ? caller.prototype
        : Async.prototype,
    ctx = Object.create(esProto);
  if (!process.env.EJS_NO_ES_OBJECT_MODEL) ctx.constructor.call(ctx);
  if (process.env.EJS_INLINE) {
    ctx.$resolve = function (v) {
      return ctx.step(v);
    };
    ctx.$reject = function (v) {
      return (ctx.$step = ctx.$err(ctx.$cur)), ctx.step(v);
    };
  }
  if (!process.env.EJS_NO_PAR) {
    ctx.$caller = caller;
    ctx.$ = {};
  }
  return ctx;
}

function id(v) {
  return v;
}

export function par(threads) {
  var promise = Promise.all(threads).then(id, function parErr(err) {
    return Promise.all(threads.map(cancel)).then(
      function () {
        throw err;
      },
      function () {
        throw err;
      }
    );
  });
  promise[cancelSym] = function () {
    return Promise.all(threads.map(cancel));
  };
  return promise;
}

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function AsyncFunction() {}
  function AsyncFunctionPrototype() {}
  AsyncFunctionPrototype.prototype = Async.prototype;
  AsyncFunction.prototype = AsyncFunctionPrototype;
  Ap.constructor = AsyncFunctionPrototype.constructor = AsyncFunction;
  AsyncFunctionPrototype[Symbol.toStringTag] = AsyncFunction.displayName =
    "AsyncFunction";
  asyncFunction = function asyncFunction(fun, handler, err, fin) {
    Object.setPrototypeOf(fun, AsyncFunctionPrototype);
    fun.prototype = Object.create(Ap);
    if (handler) {
      if (process.env.EJS_INLINE) fun.prototype.step = handler;
      else fun.prototype.$run = handler;
    }
    if (err) fun.prototype.$err = err;
    if (fin) fun.prototype.$fin = fin;
    return fun;
  };
} else {
  asyncFunction = function asyncFunction(fun, handler, err, fin) {
    fun.prototype = Object.create(Ap);
    fun.prototype.constructor = fun;
    if (handler) {
      if (process.env.EJS_INLINE) fun.prototype.step = handler;
      else fun.prototype.$run = handler;
    }
    if (err) fun.prototype.$err = err;
    if (fin) fun.prototype.$fin = fin;
    return fun;
  };
}

Ap.$err = function () {
  return 1;
};
Ap.$fin = function () {
  return 0;
};

if (!process.env.EJS_INLINE) {
  Ap.scope = function scope(step) {
    var res;
    try {
      this.$step = step;
      res = this.$run(this.$step);
    } catch (e) {
      res = this.$run((this.$step = this.$err(this.$step)), e);
    }
    if (!process.env.EJS_NO_CANCEL) {
      return wrapCancel(this, res);
    } else {
      return res;
    }
  };
  Ap.chain = function chain(arg, step) {
    var ctx = this;
    return Promise.resolve((ctx.$await = arg)).then(
      function (v) {
        if (ctx.$await !== arg) return;
        ctx.$await = null;
        ctx.$step = step;
        try {
          return ctx.$run(ctx.$step, v);
        } catch (e) {
          return ctx.$run((ctx.$step = ctx.$err(ctx.$step)), e);
        }
      },
      function (e) {
        if (ctx.$await !== arg) return;
        ctx.$await = null;
        return ctx.$run((ctx.$step = ctx.$err(ctx.$step)), e);
      }
    );
  };
  Ap.jump = function jump(value, step) {
    this.$step = step;
    try {
      return this.$run(this.$step, value);
    } catch (e) {
      return this.$run((this.$step = this.$err(this.$step)), e);
    }
  };
  Ap.pure = function pure(v) {
    return Promise.resolve(v);
  };
  Ap.raise = function raise(ex) {
    return Promise.reject(ex);
  };
  Ap.share = function (v) {
    return v;
  };
  if (!process.env.EJS_NO_PAR) {
    function clone(src, tls) {
      var ctx = Object.assign(async(src.$caller), src);
      ctx.$tls = tls;
      return ctx;
    }
    Ap.fork = function fork(tls, step) {
      var ctx = clone(this, tls);
      return wrapCancel(ctx, ctx.jump(null, step));
    };
    Ap.chainFork = function chainFork(tls, p, step) {
      var ctx = clone(this, tls);
      return wrapCancel(ctx, ctx.chain(p, step));
    };
  }
  Ap.join = par;
  function wrapCancel(ctx, promise) {
    if (promise)
      promise[cancelSym] = function () {
        return ctx.cancel();
      };
    return promise;
  }
  Ap.cancel = function () {
    return this.chain(ignore(cancel(this.$await)), this.$fin(this.$step));
  };
}

if (process.env.EJS_LEAN_METHOD_ITERATORS) {
  Ap.iterator = iterator;
  Ap.iteratorM = iteratorM;
  Ap.forInIterator = forInIterator;
}
