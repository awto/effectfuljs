import { iterator as iterSym } from "./symbol";
import { iterator } from "./leanIterator";
import { forInIterator } from "./forInIterator";

/** smart constructor for generators with lean iterator interface */
export var generator;

/** a separate object for iterables for ES object model compliance */
export var IterablePrototype = {};

if (!process.env.EJS_NO_ES_ITERATORS)
  IterablePrototype[Symbol.iterator] = function() {
    return this;
  };

/**
 * constructor for generators with ES iterators interface
 */
export function Generator() {}

/** wraps generator function to adapt its object model for ES conformance */
export var generatorFunction;

/** final Generator.prototype */
var Gp = (Generator.prototype = Object.create(IterablePrototype));

var runningCont;

generator = function generator(caller) {
  var esProto =
      caller && caller.prototype instanceof Generator
        ? caller.prototype
        : Generator.prototype,
    res = Object.create(esProto);
  res.value = void 0;
  res.done = false;
  res.$running = false;
  return res;
};

Gp.$redirResult = function redirResult(iter) {
  if (iter.done) {
    this.$step = this.$resume;
    this.$cur = this.$resumeCur;
    this.$sub = this.$resume = this.$resumeCur = void 0;
    return this.step(iter.value);
  }
  if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) this.$step = delegateCont;
  this.value = iter.value;
  return this;
};

Gp.handle = function handle(value) {
  if (this.$step === delegateCont) {
    try {
      return this.$redirResult(this.$sub.handle(value));
    } catch (e) {
      this.$step = this.$err(this.$resumeCur);
      return this.step(e);
    }
  }
  if ((this.$step = this.$err(this.$cur)) !== 1) return this.step(value);
  this.raise(value);
};

Gp.exit = function exit(value) {
  if (this.$step === delegateCont) {
    try {
      var iter = this.$sub;
      this.$resume = this.$fin(this.$resumeCur);
      return this.$redirResult(this.$sub.exit(value));
    } catch (e) {
      this.$step = this.$err(this.$resumeCur);
      return this.step(e);
    }
  } else {
    this.$step = this.$fin(this.$cur);
    return this.step(value);
  }
};

if (!process.env.EJS_INLINE) {
  function runImpl(ctx, value) {
    if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING)
      if (ctx.$step === runningCont) ctx.$alreadyRunning();
    try {
      if (!process.env.EJS_INLINE) ctx.$cur = ctx.$step;
      if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
        var s;
        ctx.$run(((s = ctx.$step), (ctx.$step = runningCont), s), value);
      } else {
        ctx.$run(ctx.$step, value);
      }
    } catch (e) {
      ctx.handle(e);
    }
  }
  Gp.step = function step(value) {
    if (!process.env.EJS_NO_TRAMPOLINE) this.$running = false;
    runImpl(this, value);
    if (!process.env.EJS_NO_TRAMPOLINE) {
      while (this.$running) {
        this.$running = false;
        runImpl(this, this.value);
      }
    }
    return this;
  };
}

var delegateCont = 2;

function delegateStep(v) {
  try {
    return this.$redirResult(this.$sub.step(v));
  } catch (e) {
    this.$step = this.$err(this.$resumeCur);
    this.$sub = this.$resume = this.$resumeCur = void 0;
    return this.step(e);
  }
}

Gp.$redir = delegateStep;
Gp.$err = function() {
  return 1;
};
Gp.$fin = function() {
  return 0;
};

if (!process.env.EJS_INLINE) {
  Gp.yld = function yld(value, step) {
    this.value = value;
    this.$step = step;
    return this;
  };

  Gp.yldStar = function yldStar(iter, step, handle, exit) {
    this.$resumeCur = this.$cur;
    this.$step = delegateCont;
    this.$resume = step;
    this.$sub = this.iterator(iter);
    return this.$redir(void 0);
  };

  Gp.jump = Gp.jumpR = function jump(value, step, handle, exit) {
    try {
      this.$step = step;
      if (process.env.EJS_NO_TRAMPOLINE) return this.step(value);
      else {
        this.value = value;
        this.$running = true;
        return this;
      }
    } catch (e) {
      return this.handle(e);
    }
  };

  Gp.scope = function scope(step, handle, exit) {
    this.$cur = this.$step = step;
    return this;
  };
} else {
  Gp.$delegate = function yldStar(iter) {
    this.$resume = this.$step;
    this.$resumeCur = this.$cur;
    this.$step = delegateCont;
    this.$sub = iterator(iter);
    return this.$redir(void 0);
  };
}

var terminated = 0;

Gp.pure = function pure(value) {
  this.done = true;
  this.value = value;
  this.$cur = this.$step = terminated;
  return this;
};

Gp.raise = function genRaise(ex) {
  this.done = true;
  this.value = void 0;
  this.$cur = this.$step = terminated;
  throw ex;
};

Gp.iterator = iterator;
Gp.forInIterator = forInIterator;

Gp[iterSym] = function() {
  return this;
};

if (!process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING) {
  Gp.$alreadyRunning = function alreadyRunning() {
    throw new TypeError("Generator is already running");
  };
  runningCont = 3;
}

Gp.next = function(value) {
  this.step(value);
  return { value: this.value, done: this.done };
};

Gp.throw = function(value) {
  this.handle(value);
  return { value: this.value, done: this.done };
};

Gp.return = function(value) {
  this.exit(value);
  return { value: this.value, done: this.done };
};

if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunctionPrototype.prototype = Gp;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[Symbol.toString] = GeneratorFunction.displayName =
    "GeneratorFunction";
  generatorFunction = function generatorFunction(fun, handler, err, fin) {
    Object.setPrototypeOf(fun, GeneratorFunctionPrototype);
    fun.prototype = Object.create(Gp);
    if (handler) {
      if (process.env.EJS_INLINE) fun.prototype.step = handler;
      else fun.prototype.$run = handler;
    }
    if (err) fun.prototype.$err = err;
    if (fin) fun.prototype.$fin = fin;
    return fun;
  };
} else
  generatorFunction = function generatorFunction(fun, handler, err, fin) {
    fun.prototype = Object.create(Gp);
    if (handler) {
      if (process.env.EJS_INLINE) fun.prototype.step = handler;
      else fun.prototype.$run = handler;
    }
    if (err) fun.prototype.$err = err;
    if (fin) fun.prototype.$fin = fin;
    return fun;
  };
