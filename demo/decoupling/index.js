(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * exports Symbols to get lean iterators from containers at runtime
 * 
 * if option LEAN_ITERATOR_SYMBOL_GLOBAL is set it will use global 
 * symbols, so no 2 implementation can exist in a single process
 */

var iterator$1 = Symbol.for("Effectful.iterator");

var asyncIterator = Symbol.for("Effectful.asyncIterator");

if (!undefined && !Symbol.asyncIterator) Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator");

Symbol.effectfulIterator = iterator$1;
Symbol.effectfulAsyncIterator = asyncIterator;

var LeanIteratorPrototype = {};

LeanIteratorPrototype[iterator$1] = function () {
  return this;
};



{
  function LeanIterator(iter) {
    this.iter = iter[Symbol.iterator]();
    this.done = false;
  }

  var LIp = LeanIterator.prototype = Object.create(LeanIteratorPrototype);

  LIp[Symbol.iterator] = function () {
    return this.iter;
  };

  LIp.step = function (v) {
    var next = this.iter.next(v);
    if (next.done) return this.pure(next.value);
    this.value = next.value;
    return this;
  };

  LIp.yld = function (v) {
    this.value = v;
    return this;
  };

  LIp.pure = function (value) {
    this.value = value;
    this.done = true;
    return this;
  };

  LIp.raise = function (ex) {
    this.value = void 0;
    this.done = true;
    throw ex;
  };

  LIp.handle = function (e) {
    var iter = this.iter,
        next;
    if (!iter.throw) {
      if (iter.return) {
        try {
          iter.return();
        } catch (e) {
          return this.raise(e);
        }
      }
      return this.raise(new TypeError("iterator does not have a throw method"));
    }
    try {
      next = this.iter.throw(e);
    } catch (e) {
      return this.raise(e);
    }
    return next.done ? this.pure(next.value) : this.yld(next.value);
  };

  LIp.exit = function (value) {
    var iter = this.iter,
        next;
    if (!iter.return) return this.pure(value);
    try {
      next = iter.return(value);
    } catch (e) {
      return this.raise(e);
    }
    return next.done ? this.pure(next.value) : this.yld(next.value);
  };

  exports.iterator = function (cont) {
    return cont[iterator$1] ? cont[iterator$1]() : new LeanIterator(cont);
    // return process.env.EJS_DELEGATE_FOR_OF ? new Term(res) : res
  };
}

var IteratorPrototype = {};



IteratorPrototype[Symbol.iterator] = function () {
  return this;
};

/** wraps lean iterator into ES iterator, the name is to conform ES standard */
var Generator;

/** wraps generator function to adapt its object model for ES conformance */


/** a function to convert lean iterator to ES iterator */


var Gp;

Generator = function (lean) {
  this.$t = lean;
};

Gp = Generator.prototype = Object.create(IteratorPrototype);

{
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunctionPrototype.prototype = Gp;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[Symbol.toString] = GeneratorFunction.displayName = "GeneratorFunction";
  exports.generatorFunction = function (fun) {
    Object.setPrototypeOf(fun, GeneratorFunctionPrototype);
    fun.prototype = Object.create(Gp);
    return fun;
  };
}

Gp[iterator$1] = function () {
  return this.$t;
};

Gp.next = function (v) {
  var next = this.$t.step(v);
  this.$t = next;
  return { value: next.value, done: next.done };
};

Gp.throw = function (e) {
  var next = this.$t = this.$t.handle(e);
  return { value: next.value, done: next.done };
};

Gp.return = function (v) {
  var next = this.$t = this.$t.exit(v);
  return { value: next.value, done: next.done };
};

exports.esIterator = function (lean) {
  return lean[Symbol.iterator] ? lean : new Generator(lean);
};

/**
 * lean iterator for JS array
 */
function ArrayLeanIterator(arr) {
  this.arr = arr;
  this.x = 0;
  this.done = arr.length === 0;
  this.value = void 0;
}

var ALIp = ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype);

ALIp.step = function () {
  if (this.x >= this.arr.length) return this.pure();
  this.value = this.arr[this.x++];
  return this;
};

Array.prototype[iterator$1] = function () {
  return new ArrayLeanIterator(this);
};


ALIp.raise = function (ex) {
  this.value = void 0;
  this.done = true;
  throw ex;
};

ALIp.pure = function (value) {
  this.value = value;
  this.done = true;
  return this;
};

ALIp.exit = function () {
  this.value = void 0;
  this.done = true;
  return this;
};

ALIp.handle = function () {
  return this.exit();
};

ALIp.next = function () {
  this.step();
  return { value: this.value, done: this.done };
};

function ForInIterator(obj) {
  var i, arr;
  this.obj = obj;
  arr = [];
  for (i in obj) arr.push(i);
  this.fields = arr;
  this.x = 0;
}

ForInIterator.prototype = Object.create(LeanIteratorPrototype);

ForInIterator.prototype.step = function () {
  for (;;) {
    if (this.x >= this.fields.length) {
      this.done = true;
      this.value = void 0;
      return this;
    }
    if ((this.value = this.fields[this.x++]) in this.obj) return this;
  }
};

function forInIterator(obj) {
  return new ForInIterator(obj);
}

/** smart constructor for generators */

var GeneratorConstructor;

exports.generator = function (caller) {
  var res = new GeneratorConstructor(),
      esProto = caller && caller.prototype instanceof Generator ? caller.prototype : Generator.prototype,
      unwrap = res.unwrap = Object.create(esProto);
  unwrap.$t = res;
  return res;
};

/** lean iterator implementation for generators */
function LeanGenerator() {
  this.done = false;
  this.value = void 0;
}

var LGp = LeanGenerator.prototype;
GeneratorConstructor = LeanGenerator;

LGp.pure = function (value) {
  this.done = true;
  this.value = value;
  this.step = terminated;
  this.handle = terminatedHandle;

  this.$exit = terminated;
  return this;
};

LGp.yld = function (value) {
  this.value = value;
  return this;
};

LGp.exit = function (value) {
  return this.$exit(value);
};

exitSub = function (value) {
  try {
    if (this.$exit) {
      this.pure = contExitSub;
      return this.$exit(value);
    }
  } catch (e) {
    return this.handle(e);
  }
  return this.$sub.exit(value);
};

LGp.step = function (v) {
  return this.$step(v);
};


var exitSub;

function makeDelegate(iterator$$1) {
  return function (i) {
    var iter = iterator$$1(i);
    iter.$sub = this;
    iter.$subPure = iter.pure;
    iter.pure = contSub;
    iter.raise = handleSub;
    iter.exit = exitSub;
    return iter.step();
  };
}

LGp.delegate = makeDelegate(exports.iterator);

function contSub(v) {
  this.pure = this.$subPure;
  return this.$sub.step(v);
}

function handleSub(v) {
  return this.$sub.handle(v);
}

function contExitSub(v) {
  return this.$sub.exit(v);
}

LGp.iterator = exports.iterator;
LGp.forInIterator = forInIterator;


LGp[iterator$1] = function () {
  return this;
};

LGp[Symbol.iterator] = function () {
  return this.unwrap;
};

LGp.handle = function (ex) {
  return this.$handle(ex);
};

LGp.raise = function (ex) {
  this.$step = this.$handle = this.$exit = void 0;
  this.handle = terminatedHandle;
  this.exit = this.step = terminated;
  this.value = void 0;
  this.done = true;
  throw ex;
};

var TLGp = LGp;

{
  function TrampolineGenerator() {
    this.done = false;
    this.value = void 0;
  }
  GeneratorConstructor = TrampolineGenerator;
  TrampolineGenerator.prototype = TLGp = Object.create(LGp);
  TLGp.oneStep = LGp.step;
  TLGp.oneHandle = LGp.handle;
  TLGp.oneExit = LGp.exit;
  TLGp.step = function (v) {
    this.$running = false;
    var t = this.oneStep(v);
    while (t.$running) {
      t.$running = false;
      t = t.oneStep(t.value);
    }
    return t;
  };
  TLGp.handle = function (v) {
    var t = this.oneHandle(v);
    while (t.$running) {
      t.$running = false;
      t = t.oneStep(t.value);
    }
    return t;
  };
  TLGp.exit = function (v) {
    this.$running = false;
    var t = this.oneExit(v);
    while (t.$running) {
      t.$running = false;
      t = t.oneStep(t.value);
    }
    return t;
  };
}

LGp.alreadyRunning = function () {
  throw new TypeError("Generator is already running");
};
function terminated() {
  this.value = void 0;
  return this;
}

function terminatedHandle(e) {
  return this.raise(e);
}

/** function returning lean async iterator for async iterable object */


var LeanAsyncIteratorPrototype = {};

/** constructor for a wrapper converting ES Async Iterator to Lean  */
var LeanAsyncIterator;

LeanAsyncIteratorPrototype[asyncIterator] = function () {
  return this;
};

var UnwrapWrapper;

{
  UnwrapWrapper = function (inner) {
    this.inner = inner;
    this.done = false;
  };
  UnwrapWrapper.prototype = Object.create(LeanAsyncIteratorPrototype);

  function doUnwrap(ctx, v) {
    return Promise.resolve(v).then(function (inner) {
      return Promise.resolve(inner.value).then(function (value) {
        ctx.inner = inner;
        if (inner.done) return ctx.pure(value);
        ctx.value = inner.value = value;
        return ctx;
      });
    }, function (ex) {
      return ctx.raise(ex);
    });
  }

  UnwrapWrapper.prototype.step = function (v) {
    return doUnwrap(this, this.inner.step(v));
  };

  UnwrapWrapper.prototype.handle = function (e) {
    return doUnwrap(this, this.inner.handle(e));
  };

  UnwrapWrapper.prototype.exit = function (v) {
    return doUnwrap(this, this.inner.exit(v));
  };

  UnwrapWrapper.prototype.pure = function (value) {
    this.value = value;
    this.done = true;
    return this;
  };

  UnwrapWrapper.prototype.raise = function (ex) {
    this.value = void 0;
    this.done = true;
    throw ex;
  };
}

{
  LeanAsyncIterator = function (iter) {
    this.iter = iter[Symbol.asyncIterator]();
    this.done = false;
  };

  LeanAsyncIterator.prototype = Object.create(LeanAsyncIteratorPrototype);

  // TODO: v8 shows off their bind is faster, check it
  function result(ctx, v) {
    return Promise.resolve(v).then(function (i) {
      if (ctx.done = i.done) return ctx.pure(i.value);
      ctx.value = i.value;
      return ctx;
    }, function (ex) {
      return ctx.raise(ex);
    });
  }

  LeanAsyncIterator.prototype.step = function (v) {
    return result(this, this.iter.next(v));
  };

  LeanAsyncIterator.prototype.pure = function (value) {
    this.value = value;
    this.done = true;
    return this;
  };

  LeanAsyncIterator.prototype.raise = function (ex) {
    this.value = void 0;
    this.done = true;
    throw ex;
  };

  LeanAsyncIterator.prototype.handle = function (e) {
    var iter = this.iter;
    if (!iter.throw) {
      if (iter.return) return Promise.resolve(iter.return()).catch(e => e.raise(e));
      return this.raise(new TypeError("iterator does not have a throw method"));
    }
    return result(this, this.iter.throw(e));
  };

  LeanAsyncIterator.prototype.exit = function (value) {
    var iter = this.iter;
    if (!iter.return) return this.pure(value);
    return result(this, this.iter.return(value));
  };

  exports.iteratorM = function (cont) {
    return cont[asyncIterator] ? cont[asyncIterator]() : cont[Symbol.asyncIterator] ? new LeanAsyncIterator(cont) : exports.iterator(cont);
  };
}

/** runtime for ES async/await */

/**
 * wraps function to make AsyncFunction object model 
 * compatible with ES standard
 */


/** context constructor for a few configurations */


/** context type */
var Async;

var Ap;

Async = function () {};
Ap = Async.prototype;
exports.async = function () {
  return new Async();
};
{
  function AsyncFunction() {}
  function AsyncFunctionPrototype() {}
  AsyncFunctionPrototype.prototype = Async.prototype;
  AsyncFunction.prototype = AsyncFunctionPrototype;
  Ap.constructor = AsyncFunctionPrototype.constructor = AsyncFunction;
  AsyncFunctionPrototype[Symbol.toStringTag] = AsyncFunction.displayName = "AsyncFunction";
  exports.asyncFunction = function (fun) {
    Object.setPrototypeOf(fun, AsyncFunctionPrototype);
    return fun;
  };
}

Ap.iterator = exports.iterator;
Ap.iteratorM = exports.iteratorM;
Ap.forInIterator = forInIterator;

var AsyncIteratorPrototype$1 = {};

AsyncIteratorPrototype$1[Symbol.asyncIterator] = function () {
  return this;
};



function AsyncGenerator(lean) {
  this.state = lean;
  this.queue = [];
}

var AGp = AsyncGenerator.prototype = Object.create(AsyncIteratorPrototype$1);

{
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunctionPrototype.prototype = AGp;
  AsyncGeneratorFunction.prototype = AGp.constructor = AsyncGeneratorFunctionPrototype;
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  AsyncGeneratorFunctionPrototype[Symbol.toString] = AsyncGeneratorFunction.displayName = "AsyncGeneratorFunction";
  exports.asyncGeneratorFunction = function (fun) {
    Object.setPrototypeOf(fun, AsyncGeneratorFunctionPrototype);
    fun.prototype = Object.create(AGp);
    return fun;
  };
}

{
  AGp[asyncIterator] = function () {
    return this.state;
  };
  AGp.await = function () {
    if (!this.queue.length) {
      this.busy = null;
      return;
    }
    var i = this.queue.shift();
    var ctx = this;
    this.busy = Promise.resolve(i.func(this.state)).then(function (v) {
      i.cont(v);
      ctx.await();
    });
  };

  function result$1(ctx, v) {
    return Promise.resolve(v).then(function (i) {
      ctx.state = i;
      return { value: i.value, done: i.done };
    });
  }

  AGp.enqueue = function (func) {
    var res;
    var ctx = this;
    function cont() {
      return ctx.await();
    }
    if (this.busy) {
      res = new Promise(function (cont) {
        ctx.queue.push({ func: func, cont: cont });
      });
    } else {
      res = Promise.resolve(func(this.state));
      this.busy = res.then(cont, cont);
    }
    return res;
  };

  AGp.next = function (v) {
    var ctx = this;
    return this.enqueue(function (i) {
      return result$1(ctx, i.step(v));
    });
  };

  AGp.throw = function (e) {
    var ctx = this;
    return this.enqueue(function (i) {
      return result$1(ctx, i.handle(e));
    });
  };

  AGp.return = function (v) {
    var ctx = this;
    return this.enqueue(function (i) {
      return result$1(ctx, i.exit(v));
    });
  };
}

function esAsyncIterator(lean) {
  return lean[Symbol.asyncIterator] ? lean[Symbol.asyncIterator]() : new AsyncGenerator(lean);
}

var asyncGenerator = function (caller) {
  var res = new LeanAsyncGenerator(),
      esProto = caller && caller.prototype instanceof AsyncGenerator ? caller.prototype : AsyncGenerator.prototype,
      unwrap = res.unwrap = Object.create(esProto);
  unwrap.state = new UnwrapWrapper(res);
  unwrap.queue = [];
  unwrap.busy = null;
  return res;
};

function LeanAsyncGenerator() {
  this.$state = void 0;
  this.done = false;
}

var LAGp = LeanAsyncGenerator.prototype;

var LGp$1 = LeanGenerator.prototype;
LAGp[asyncIterator] = LAGp[Symbol.asyncIterator] = function () {
  return this;
};


LAGp.step = LGp$1.step;
LAGp.exit = LGp$1.exit;
LAGp.handle = LGp$1.handle;
LAGp.pure = LGp$1.pure;
LAGp.raise = LGp$1.raise;

LAGp.delegate = makeDelegate(exports.iteratorM);

// TODO: move to (info) file
var opts = {
  inline: !!"1",
  iteratorMethods: !!"1",
  objectModel: !undefined,
  checkRunning: !undefined,
  unwrapAsync: !undefined,
  localSymbols: !!undefined,
  defunct: !!undefined,
  delegateForOf: !!undefined
};

exports.opts = opts;
exports.forInIterator = forInIterator;
exports.esAsyncIterator = esAsyncIterator;
exports.asyncGenerator = asyncGenerator;

},{}],2:[function(require,module,exports){
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var M = require("@effectful/es-inline-rt");

var _makeDragActions = M.asyncGeneratorFunction(makeDragActions);

var _palette = M.asyncGeneratorFunction(palette);

var _setZIndex = M.asyncGeneratorFunction(setZIndex);

var _addCounter = M.asyncGeneratorFunction(addCounter);

var _assignOver = M.asyncGeneratorFunction(assignOver);

var _trash = M.asyncGeneratorFunction(trash);

var _animRemove = M.asyncGeneratorFunction(animRemove);

var _undoCancel = M.asyncGeneratorFunction(undoCancel);

var _removeCancelled = M.asyncGeneratorFunction(removeCancelled);

var _validateDrop = M.asyncGeneratorFunction(validateDrop);

var _applyRemove = M.asyncGeneratorFunction(applyRemove);

var _setPosition = M.asyncGeneratorFunction(setPosition);

var _filterUseless = M.asyncGeneratorFunction(filterUseless);

var _layoutSource = M.asyncGeneratorFunction(layoutSource);

var _layoutTarget = M.asyncGeneratorFunction(layoutTarget);

var _flyBack = M.asyncGeneratorFunction(flyBack);

var _stopThread = M.asyncGeneratorFunction(stopThread);

var _threadBy = M.asyncGeneratorFunction(threadBy);

var _animateIntersectDrop = M.asyncGeneratorFunction(animateIntersectDrop);

var _highlightIntersectDrag = M.asyncGeneratorFunction(highlightIntersectDrag);

var _setIntersectProperty = M.asyncGeneratorFunction(setIntersectProperty);

var _selectMark = M.asyncGeneratorFunction(selectMark);

var _makeSelectActions = M.asyncGeneratorFunction(makeSelectActions);

var _propagateSelection = M.asyncGeneratorFunction(propagateSelection);

var _inertiaStart = M.asyncGeneratorFunction(inertiaStart);

var _inertiaIntercept = M.asyncGeneratorFunction(inertiaIntercept);

var _anim = M.asyncGeneratorFunction(anim);

var _produce = M.asyncGeneratorFunction(produce);

var _consume = M.asyncFunction(consume);

function main(i) {
  // converts touch and mouse events into pointer events
  // if browser does not support it
  i = pointerEvents(i);
  // converts pointer events on `dragstart`, `dragging` and `drop`
  i = makeDragActions(i);
  // converts pointer events into `select`, `selecting` and `selected` actions
  i = makeSelectActions(i);
  // higlights selected elements
  i = selectMark(i);
  // if user drags some selected item same action is duplicated for
  // all other selected items 
  i = propagateSelection(i);
  // creates new element if user starts dragging from palette area
  i = byElement(palette, i);
  // adds counter number to each new element
  i = addCounter(i);
  // moves dragging element to top 
  i = setZIndex(i);
  i = layoutSource(i);
  i = byElement(function (i) {
    // gets current velocity on drop
    // and injects a few more drags to continue movement
    i = inertiaStart(i);
    // assigns `over` field in each action
    // if its `element` is over ".target" DOM element
    i = assignOver(i);
    // stops elements moving by inertia 
    // if it is over some ".inertia-intercept" 
    i = inertiaIntercept(i);
    // generates "remove" action for elements dropped 
    // over ".trash" element
    i = trash(i);
    // sets `intersect` property into an action if its 
    // element boundaries intersect some other ".draggable" element
    i = setIntersectProperty(i);
    // checks if user dropped an item exactly on some ".target"
    // otherwise generates "dragcancel" action
    i = validateDrop(i);
    // animated return to original "dragstart" position on "dragcancel"
    i = flyBack(i);
    // animates drop on list element
    i = animateIntersectDrop(i);
    // highlight position to drop the items in lists
    i = highlightIntersectDrag(i);
    // animation for "remove" action
    i = animRemove(i);
    // if canceled drag started not for palette
    // simulates drop to original location
    i = undoCancel(i);
    // moves element into a list ".target" children on drop from "body"
    i = layoutTarget(i);
    // converts "dragcancel" to "remove"
    i = removeCancelled(i);
    // handles "remove" by removing the element from DOM
    i = applyRemove(i);
    // updates current element absolute position
    i = setPosition(i);
    return i;
  }, i);
  return i;
}

const POINTER_EVENTS = typeof PointerEvent !== "undefined";

const pointerEvents = POINTER_EVENTS ? v => v : M.asyncGeneratorFunction(function mouseToPointer(input) {
  var last,
      i,
      _mouseToPointer = M.asyncGenerator(mouseToPointer),
      loop,
      fc,
      r,
      err;

  _mouseToPointer.$exit = mouseToPointer_7;
  _mouseToPointer.handle = mouseToPointer_8;
  _mouseToPointer.step = mouseToPointer_1;
  return _mouseToPointer.unwrap;

  function mouseToPointer_1() {
    try {
      last = void 0;
      return mouseToPointer_2();
    } catch (ex) {
      return mouseToPointer_8(ex);
    }
  }

  function mouseToPointer_2() {
    _mouseToPointer.$exit = mouseToPointer_11;
    _mouseToPointer.handle = mouseToPointer_10;

    try {
      loop = M.iteratorM(input);
      return mouseToPointer_3();
    } catch (ex) {
      return mouseToPointer_10(ex);
    }
  }

  function mouseToPointer_3() {
    try {
      _mouseToPointer.step = mouseToPointer_4;
      return Promise.resolve(loop.step()).then(mouseToPointer_4, mouseToPointer_10);
    } catch (ex) {
      return mouseToPointer_10(ex);
    }
  }

  function mouseToPointer_4(c) {
    var a, b, d;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        var f;
        i = loop.value;
        d = (f = M.asyncGeneratorFunction(i => {
          var t,
              ctx = M.asyncGenerator(f);
          ctx.$exit = f_4;
          ctx.handle = f_5;
          ctx.step = f_1;
          return ctx.unwrap;

          function f_1() {
            try {
              switch (i.type) {
                case "mousemove":
                case "mouseup":
                case "mousedown":
                  ctx.step = f_3;
                  ctx.value = { type: `pointer${i.type.substr(5)}`,
                    target: i.target,
                    x: i.clientX, y: i.clientY,
                    preventDefault: () => i.preventDefault() };
                  return ctx;

                case "touchmove":
                case "touchstart":
                  if (i.targetTouches.length !== 1) {
                    return ctx.pure();
                  } else {
                    last = i;
                    return f_2();
                  }case "touchend":
                case "touchcancel":
                  return f_2();

                default:
                  return ctx.pure();
              }
            } catch (ex) {
              return f_5(ex);
            }
          }

          function f_2() {
            try {
              t = last.targetTouches[0];
              ctx.step = f_3;
              ctx.value = {
                type: i.type === "touchstart" ? "pointerdown" : i.type === "touchmove" ? "pointermove" : "pointerup",
                target: i.target,
                x: t && t.clientX,
                y: t && t.clientY,
                preventDefault: () => i.preventDefault() };
              return ctx;
            } catch (ex) {
              return f_5(ex);
            }
          }

          function f_3() {
            return ctx.pure();
          }

          function f_4(r) {
            ctx.$exit = f_4;
            ctx.handle = f_5;
            return ctx.pure(r);
          }

          function f_5(e) {
            return ctx.raise(e);
          }
        }))(i);
        _mouseToPointer.step = mouseToPointer_3;
        return _mouseToPointer.delegate(d);
      } else {
        fc = mouseToPointer_6;
        return mouseToPointer_5();
      }
    } catch (ex) {
      return mouseToPointer_10(ex);
    }
  }

  function mouseToPointer_5() {
    _mouseToPointer.$exit = mouseToPointer_7;
    _mouseToPointer.handle = mouseToPointer_8;

    try {
      if (loop.exit) {
        _mouseToPointer.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return mouseToPointer_8(ex);
    }
  }

  function mouseToPointer_6() {
    return _mouseToPointer.pure(r);
  }

  function mouseToPointer_7(r) {
    _mouseToPointer.$exit = mouseToPointer_7;
    _mouseToPointer.handle = mouseToPointer_8;
    return _mouseToPointer.pure(r);
  }

  function mouseToPointer_8(e) {
    return _mouseToPointer.raise(e);
  }

  function mouseToPointer_9() {
    try {
      return _mouseToPointer.raise(err);
    } catch (ex) {
      return mouseToPointer_8(ex);
    }
  }

  function mouseToPointer_10(a) {
    fc = mouseToPointer_9, err = a;
    return mouseToPointer_5();
  }

  function mouseToPointer_11(a) {
    fc = mouseToPointer_6, r = a;
    return mouseToPointer_5();
  }
});

function makeDragActions(input) {
  var source,
      i,
      element,
      j,
      dragging,
      makeDragActions = M.asyncGenerator(_makeDragActions),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  makeDragActions.$exit = makeDragActions_14;
  makeDragActions.handle = makeDragActions_15;
  makeDragActions.step = makeDragActions_1;
  return makeDragActions.unwrap;

  function makeDragActions_1() {
    try {
      source = share(input);
      return makeDragActions_2();
    } catch (ex) {
      return makeDragActions_15(ex);
    }
  }

  function makeDragActions_2() {
    makeDragActions.$exit = makeDragActions_19;
    makeDragActions.handle = makeDragActions_18;

    try {
      loop = M.iteratorM(source);
      return makeDragActions_3();
    } catch (ex) {
      return makeDragActions_18(ex);
    }
  }

  function makeDragActions_3() {
    try {
      makeDragActions.step = makeDragActions_4;
      return Promise.resolve(loop.step()).then(makeDragActions_4, makeDragActions_18);
    } catch (ex) {
      return makeDragActions_18(ex);
    }
  }

  function makeDragActions_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "pointerdown") {
          element = i.target.closest(".draggable");

          if (element) {
            i.preventDefault();
            makeDragActions.step = makeDragActions_5;
            makeDragActions.value = { type: "dragstart", element, x: i.x, y: i.y, event: i };
            return makeDragActions;
          } else {
            return makeDragActions_11();
          }
        } else {
          return makeDragActions_11();
        }
      } else {
        _fc = makeDragActions_13;
        return makeDragActions_12();
      }
    } catch (ex) {
      return makeDragActions_18(ex);
    }
  }

  function makeDragActions_5() {
    makeDragActions.$exit = makeDragActions_21;
    makeDragActions.handle = makeDragActions_20;

    try {
      _loop = M.iteratorM(source);
      return makeDragActions_6();
    } catch (ex) {
      return makeDragActions_20(ex);
    }
  }

  function makeDragActions_6() {
    try {
      makeDragActions.step = makeDragActions_7;
      return Promise.resolve(_loop.step()).then(makeDragActions_7, makeDragActions_20);
    } catch (ex) {
      return makeDragActions_20(ex);
    }
  }

  function makeDragActions_7(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;

        if (j.type === "pointerup" || j.type === "pointermove") {
          j.preventDefault();
          dragging = j.type === "pointermove";
          makeDragActions.step = makeDragActions_8;
          makeDragActions.value = { type: dragging ? "dragging" : "drop",
            element, x: j.x, y: j.y, event: j };
          return makeDragActions;
        } else {
          return makeDragActions_9();
        }
      } else {
        fc = makeDragActions_3;
        return makeDragActions_10();
      }
    } catch (ex) {
      return makeDragActions_20(ex);
    }
  }

  function makeDragActions_8() {
    try {
      if (!dragging) {
        fc = makeDragActions_3;
        return makeDragActions_10();
      } else {
        return makeDragActions_9();
      }
    } catch (ex) {
      return makeDragActions_20(ex);
    }
  }

  function makeDragActions_9() {
    try {
      makeDragActions.step = makeDragActions_6;
      makeDragActions.value = j;
      return makeDragActions;
    } catch (ex) {
      return makeDragActions_20(ex);
    }
  }

  function makeDragActions_10() {
    makeDragActions.$exit = makeDragActions_19;
    makeDragActions.handle = makeDragActions_18;

    try {
      if (_loop.exit) {
        makeDragActions.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, makeDragActions_18);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return makeDragActions_18(ex);
    }
  }

  function makeDragActions_11() {
    try {
      makeDragActions.step = makeDragActions_3;
      makeDragActions.value = i;
      return makeDragActions;
    } catch (ex) {
      return makeDragActions_18(ex);
    }
  }

  function makeDragActions_12() {
    makeDragActions.$exit = makeDragActions_14;
    makeDragActions.handle = makeDragActions_15;

    try {
      if (loop.exit) {
        makeDragActions.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return makeDragActions_15(ex);
    }
  }

  function makeDragActions_13() {
    return makeDragActions.pure(r);
  }

  function makeDragActions_14(r) {
    makeDragActions.$exit = makeDragActions_14;
    makeDragActions.handle = makeDragActions_15;
    return makeDragActions.pure(r);
  }

  function makeDragActions_15(e) {
    return makeDragActions.raise(e);
  }

  function makeDragActions_16() {
    try {
      return makeDragActions.raise(err);
    } catch (ex) {
      return makeDragActions_15(ex);
    }
  }

  function makeDragActions_17() {
    try {
      return makeDragActions.raise(_err);
    } catch (ex) {
      return makeDragActions_15(ex);
    }
  }

  function makeDragActions_18(a) {
    _fc = makeDragActions_16, err = a;
    return makeDragActions_12();
  }

  function makeDragActions_19(a) {
    _fc = makeDragActions_13, r = a;
    return makeDragActions_12();
  }

  function makeDragActions_20(a) {
    fc = makeDragActions_12, _fc = makeDragActions_17, _err = a;
    return makeDragActions_10();
  }

  function makeDragActions_21(a) {
    fc = makeDragActions_12, _fc = makeDragActions_13, r = a;
    return makeDragActions_10();
  }
}

function palette(input) {
  var source,
      i,
      box,
      element,
      j,
      palette = M.asyncGenerator(_palette),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  palette.$exit = palette_12;
  palette.handle = palette_13;
  palette.step = palette_1;
  return palette.unwrap;

  function palette_1() {
    try {
      source = share(input);
      return palette_2();
    } catch (ex) {
      return palette_13(ex);
    }
  }

  function palette_2() {
    palette.$exit = palette_17;
    palette.handle = palette_16;

    try {
      loop = M.iteratorM(source);
      return palette_3();
    } catch (ex) {
      return palette_16(ex);
    }
  }

  function palette_3() {
    try {
      palette.step = palette_4;
      return Promise.resolve(loop.step()).then(palette_4, palette_16);
    } catch (ex) {
      return palette_16(ex);
    }
  }

  function palette_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragstart" && i.element.closest(".palette")) {
          box = i.element.getBoundingClientRect();
          element = i.element.cloneNode(true);

          element.style.left = `${box.x + window.pageXOffset}px`;
          element.style.top = `${box.y + window.pageYOffset}px`;
          document.body.appendChild(element);
          palette.step = palette_5;
          palette.value = _extends({}, i, { element });
          return palette;
        } else {
          palette.step = palette_3;
          palette.value = i;
          return palette;
        }
      } else {
        _fc = palette_11;
        return palette_10();
      }
    } catch (ex) {
      return palette_16(ex);
    }
  }

  function palette_5() {
    palette.$exit = palette_19;
    palette.handle = palette_18;

    try {
      _loop = M.iteratorM(source);
      return palette_6();
    } catch (ex) {
      return palette_18(ex);
    }
  }

  function palette_6() {
    try {
      palette.step = palette_7;
      return Promise.resolve(_loop.step()).then(palette_7, palette_18);
    } catch (ex) {
      return palette_18(ex);
    }
  }

  function palette_7(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;

        if (j.element === i.element) {
          palette.step = palette_8;
          palette.value = _extends({}, j, { element });
          return palette;
        } else {
          palette.step = palette_6;
          palette.value = j;
          return palette;
        }
      } else {
        fc = palette_3;
        return palette_9();
      }
    } catch (ex) {
      return palette_18(ex);
    }
  }

  function palette_8() {
    try {
      if (j.type === "drop") {
        fc = palette_3;
        return palette_9();
      } else {
        return palette_6();
      }
    } catch (ex) {
      return palette_18(ex);
    }
  }

  function palette_9() {
    palette.$exit = palette_17;
    palette.handle = palette_16;

    try {
      if (_loop.exit) {
        palette.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, palette_16);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return palette_16(ex);
    }
  }

  function palette_10() {
    palette.$exit = palette_12;
    palette.handle = palette_13;

    try {
      if (loop.exit) {
        palette.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return palette_13(ex);
    }
  }

  function palette_11() {
    return palette.pure(r);
  }

  function palette_12(r) {
    palette.$exit = palette_12;
    palette.handle = palette_13;
    return palette.pure(r);
  }

  function palette_13(e) {
    return palette.raise(e);
  }

  function palette_14() {
    try {
      return palette.raise(err);
    } catch (ex) {
      return palette_13(ex);
    }
  }

  function palette_15() {
    try {
      return palette.raise(_err);
    } catch (ex) {
      return palette_13(ex);
    }
  }

  function palette_16(a) {
    _fc = palette_14, err = a;
    return palette_10();
  }

  function palette_17(a) {
    _fc = palette_11, r = a;
    return palette_10();
  }

  function palette_18(a) {
    fc = palette_10, _fc = palette_15, _err = a;
    return palette_9();
  }

  function palette_19(a) {
    fc = palette_10, _fc = palette_11, r = a;
    return palette_9();
  }
}

function setZIndex(input) {
  var z,
      i,
      setZIndex = M.asyncGenerator(_setZIndex),
      loop,
      fc,
      r,
      err;
  setZIndex.$exit = setZIndex_7;
  setZIndex.handle = setZIndex_8;
  setZIndex.step = setZIndex_1;
  return setZIndex.unwrap;

  function setZIndex_1() {
    try {
      z = 0;
      return setZIndex_2();
    } catch (ex) {
      return setZIndex_8(ex);
    }
  }

  function setZIndex_2() {
    setZIndex.$exit = setZIndex_11;
    setZIndex.handle = setZIndex_10;

    try {
      loop = M.iteratorM(input);
      return setZIndex_3();
    } catch (ex) {
      return setZIndex_10(ex);
    }
  }

  function setZIndex_3() {
    try {
      setZIndex.step = setZIndex_4;
      return Promise.resolve(loop.step()).then(setZIndex_4, setZIndex_10);
    } catch (ex) {
      return setZIndex_10(ex);
    }
  }

  function setZIndex_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragstart") {
          i.element.style.zIndex = ++z;
        }setZIndex.step = setZIndex_3;
        setZIndex.value = i;
        return setZIndex;
      } else {
        fc = setZIndex_6;
        return setZIndex_5();
      }
    } catch (ex) {
      return setZIndex_10(ex);
    }
  }

  function setZIndex_5() {
    setZIndex.$exit = setZIndex_7;
    setZIndex.handle = setZIndex_8;

    try {
      if (loop.exit) {
        setZIndex.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return setZIndex_8(ex);
    }
  }

  function setZIndex_6() {
    return setZIndex.pure(r);
  }

  function setZIndex_7(r) {
    setZIndex.$exit = setZIndex_7;
    setZIndex.handle = setZIndex_8;
    return setZIndex.pure(r);
  }

  function setZIndex_8(e) {
    return setZIndex.raise(e);
  }

  function setZIndex_9() {
    try {
      return setZIndex.raise(err);
    } catch (ex) {
      return setZIndex_8(ex);
    }
  }

  function setZIndex_10(a) {
    fc = setZIndex_9, err = a;
    return setZIndex_5();
  }

  function setZIndex_11(a) {
    fc = setZIndex_6, r = a;
    return setZIndex_5();
  }
}

function addCounter(input) {
  var cnt,
      i,
      num,
      addCounter = M.asyncGenerator(_addCounter),
      loop,
      fc,
      r,
      err;
  addCounter.$exit = addCounter_7;
  addCounter.handle = addCounter_8;
  addCounter.step = addCounter_1;
  return addCounter.unwrap;

  function addCounter_1() {
    try {
      cnt = 0;
      return addCounter_2();
    } catch (ex) {
      return addCounter_8(ex);
    }
  }

  function addCounter_2() {
    addCounter.$exit = addCounter_11;
    addCounter.handle = addCounter_10;

    try {
      loop = M.iteratorM(input);
      return addCounter_3();
    } catch (ex) {
      return addCounter_10(ex);
    }
  }

  function addCounter_3() {
    try {
      addCounter.step = addCounter_4;
      return Promise.resolve(loop.step()).then(addCounter_4, addCounter_10);
    } catch (ex) {
      return addCounter_10(ex);
    }
  }

  function addCounter_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragstart") {
          if (!i.element.firstChild.classList.contains("id")) {
            num = document.createElement("span");

            i.element.insertBefore(num, i.element.firstChild);
            num.outerHTML = `<span class="id">${++cnt}</span>`;
          }
        }
        addCounter.step = addCounter_3;
        addCounter.value = i;
        return addCounter;
      } else {
        fc = addCounter_6;
        return addCounter_5();
      }
    } catch (ex) {
      return addCounter_10(ex);
    }
  }

  function addCounter_5() {
    addCounter.$exit = addCounter_7;
    addCounter.handle = addCounter_8;

    try {
      if (loop.exit) {
        addCounter.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return addCounter_8(ex);
    }
  }

  function addCounter_6() {
    return addCounter.pure(r);
  }

  function addCounter_7(r) {
    addCounter.$exit = addCounter_7;
    addCounter.handle = addCounter_8;
    return addCounter.pure(r);
  }

  function addCounter_8(e) {
    return addCounter.raise(e);
  }

  function addCounter_9() {
    try {
      return addCounter.raise(err);
    } catch (ex) {
      return addCounter_8(ex);
    }
  }

  function addCounter_10(a) {
    fc = addCounter_9, err = a;
    return addCounter_5();
  }

  function addCounter_11(a) {
    fc = addCounter_6, r = a;
    return addCounter_5();
  }
}

function assignOver(input) {
  var over = function over(element) {
    const box = element.getBoundingClientRect();
    for (const target of document.getElementsByClassName("target")) {
      const targetBox = target.getBoundingClientRect();
      if (targetBox.top < box.top && targetBox.left < box.left && targetBox.bottom > box.bottom && targetBox.right > box.right) return target;
    }
    return null;
  },
      i,
      assignOver = M.asyncGenerator(_assignOver),
      loop,
      fc,
      r,
      err;

  assignOver.$exit = assignOver_6;
  assignOver.handle = assignOver_7;
  assignOver.step = assignOver_1;
  return assignOver.unwrap;

  function assignOver_1() {
    assignOver.$exit = assignOver_10;
    assignOver.handle = assignOver_9;

    try {
      loop = M.iteratorM(input);
      return assignOver_2();
    } catch (ex) {
      return assignOver_9(ex);
    }
  }

  function assignOver_2() {
    try {
      assignOver.step = assignOver_3;
      return Promise.resolve(loop.step()).then(assignOver_3, assignOver_9);
    } catch (ex) {
      return assignOver_9(ex);
    }
  }

  function assignOver_3(c) {
    var a, b, d;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        d = i.element ? _extends({}, i, { over: over(i.element) }) : i;
        assignOver.step = assignOver_2;
        assignOver.value = d;
        return assignOver;
      } else {
        fc = assignOver_5;
        return assignOver_4();
      }
    } catch (ex) {
      return assignOver_9(ex);
    }
  }

  function assignOver_4() {
    assignOver.$exit = assignOver_6;
    assignOver.handle = assignOver_7;

    try {
      if (loop.exit) {
        assignOver.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return assignOver_7(ex);
    }
  }

  function assignOver_5() {
    return assignOver.pure(r);
  }

  function assignOver_6(r) {
    assignOver.$exit = assignOver_6;
    assignOver.handle = assignOver_7;
    return assignOver.pure(r);
  }

  function assignOver_7(e) {
    return assignOver.raise(e);
  }

  function assignOver_8() {
    try {
      return assignOver.raise(err);
    } catch (ex) {
      return assignOver_7(ex);
    }
  }

  function assignOver_9(a) {
    fc = assignOver_8, err = a;
    return assignOver_4();
  }

  function assignOver_10(a) {
    fc = assignOver_5, r = a;
    return assignOver_4();
  }
}

function trash(input) {
  var i,
      trash = M.asyncGenerator(_trash),
      loop,
      fc,
      r,
      err;
  trash.$exit = trash_6;
  trash.handle = trash_7;
  trash.step = trash_1;
  return trash.unwrap;

  function trash_1() {
    trash.$exit = trash_10;
    trash.handle = trash_9;

    try {
      loop = M.iteratorM(input);
      return trash_2();
    } catch (ex) {
      return trash_9(ex);
    }
  }

  function trash_2() {
    try {
      trash.step = trash_3;
      return Promise.resolve(loop.step()).then(trash_3, trash_9);
    } catch (ex) {
      return trash_9(ex);
    }
  }

  function trash_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "drop" && i.over && i.over.closest(".trash")) {
          trash.step = trash_2;
          trash.value = _extends({}, i, { type: "remove" });
          return trash;
        } else {
          trash.step = trash_2;
          trash.value = i;
          return trash;
        }
      } else {
        fc = trash_5;
        return trash_4();
      }
    } catch (ex) {
      return trash_9(ex);
    }
  }

  function trash_4() {
    trash.$exit = trash_6;
    trash.handle = trash_7;

    try {
      if (loop.exit) {
        trash.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return trash_7(ex);
    }
  }

  function trash_5() {
    return trash.pure(r);
  }

  function trash_6(r) {
    trash.$exit = trash_6;
    trash.handle = trash_7;
    return trash.pure(r);
  }

  function trash_7(e) {
    return trash.raise(e);
  }

  function trash_8() {
    try {
      return trash.raise(err);
    } catch (ex) {
      return trash_7(ex);
    }
  }

  function trash_9(a) {
    fc = trash_8, err = a;
    return trash_4();
  }

  function trash_10(a) {
    fc = trash_5, r = a;
    return trash_4();
  }
}

function animRemove(input) {
  var i,
      el,
      box,
      j,
      animRemove = M.asyncGenerator(_animRemove),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  animRemove.$exit = animRemove_11;
  animRemove.handle = animRemove_12;
  animRemove.step = animRemove_1;
  return animRemove.unwrap;

  function animRemove_1() {
    animRemove.$exit = animRemove_16;
    animRemove.handle = animRemove_15;

    try {
      loop = M.iteratorM(input);
      return animRemove_2();
    } catch (ex) {
      return animRemove_15(ex);
    }
  }

  function animRemove_2() {
    try {
      animRemove.step = animRemove_3;
      return Promise.resolve(loop.step()).then(animRemove_3, animRemove_15);
    } catch (ex) {
      return animRemove_15(ex);
    }
  }

  function animRemove_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "remove") {
          el = i.element;
          box = el.getBoundingClientRect();
          return animRemove_4();
        } else {
          return animRemove_8();
        }
      } else {
        _fc = animRemove_10;
        return animRemove_9();
      }
    } catch (ex) {
      return animRemove_15(ex);
    }
  }

  function animRemove_4() {
    animRemove.$exit = animRemove_18;
    animRemove.handle = animRemove_17;

    try {
      _loop = M.iteratorM(anim());
      return animRemove_5();
    } catch (ex) {
      return animRemove_17(ex);
    }
  }

  function animRemove_5() {
    try {
      animRemove.step = animRemove_6;
      return Promise.resolve(_loop.step()).then(animRemove_6, animRemove_17);
    } catch (ex) {
      return animRemove_17(ex);
    }
  }

  function animRemove_6(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;

        el.style.width = `${box.width * (1 - j)}px`;
        el.style.height = `${box.height * (1 - j)}px`;
        el.style.top = `${box.y + window.pageYOffset + box.height * j / 2}px`;
        el.style.left = `${box.x + window.pageXOffset + box.width * j / 2}px`;
        return animRemove_5();
      } else {
        fc = animRemove_8;
        return animRemove_7();
      }
    } catch (ex) {
      return animRemove_17(ex);
    }
  }

  function animRemove_7() {
    animRemove.$exit = animRemove_16;
    animRemove.handle = animRemove_15;

    try {
      if (_loop.exit) {
        animRemove.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, animRemove_15);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return animRemove_15(ex);
    }
  }

  function animRemove_8() {
    try {
      animRemove.step = animRemove_2;
      animRemove.value = i;
      return animRemove;
    } catch (ex) {
      return animRemove_15(ex);
    }
  }

  function animRemove_9() {
    animRemove.$exit = animRemove_11;
    animRemove.handle = animRemove_12;

    try {
      if (loop.exit) {
        animRemove.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return animRemove_12(ex);
    }
  }

  function animRemove_10() {
    return animRemove.pure(r);
  }

  function animRemove_11(r) {
    animRemove.$exit = animRemove_11;
    animRemove.handle = animRemove_12;
    return animRemove.pure(r);
  }

  function animRemove_12(e) {
    return animRemove.raise(e);
  }

  function animRemove_13() {
    try {
      return animRemove.raise(err);
    } catch (ex) {
      return animRemove_12(ex);
    }
  }

  function animRemove_14() {
    try {
      return animRemove.raise(_err);
    } catch (ex) {
      return animRemove_12(ex);
    }
  }

  function animRemove_15(a) {
    _fc = animRemove_13, err = a;
    return animRemove_9();
  }

  function animRemove_16(a) {
    _fc = animRemove_10, r = a;
    return animRemove_9();
  }

  function animRemove_17(a) {
    fc = animRemove_9, _fc = animRemove_14, _err = a;
    return animRemove_7();
  }

  function animRemove_18(a) {
    fc = animRemove_9, _fc = animRemove_10, r = a;
    return animRemove_7();
  }
}

function undoCancel(input) {
  var startOver,
      i,
      undoCancel = M.asyncGenerator(_undoCancel),
      loop,
      fc,
      r,
      err;
  undoCancel.$exit = undoCancel_8;
  undoCancel.handle = undoCancel_9;
  undoCancel.step = undoCancel_1;
  return undoCancel.unwrap;

  function undoCancel_1() {
    try {
      startOver = void 0;
      return undoCancel_2();
    } catch (ex) {
      return undoCancel_9(ex);
    }
  }

  function undoCancel_2() {
    undoCancel.$exit = undoCancel_12;
    undoCancel.handle = undoCancel_11;

    try {
      loop = M.iteratorM(input);
      return undoCancel_3();
    } catch (ex) {
      return undoCancel_11(ex);
    }
  }

  function undoCancel_3() {
    try {
      undoCancel.step = undoCancel_4;
      return Promise.resolve(loop.step()).then(undoCancel_4, undoCancel_11);
    } catch (ex) {
      return undoCancel_11(ex);
    }
  }

  function undoCancel_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragstart") {
          startOver = i.over;
          return undoCancel_5();
        } else {
          if (i.type === "dragcancel") {
            if (startOver) {
              undoCancel.step = undoCancel_3;
              undoCancel.value = _extends({}, i, { type: "drop" });
              return undoCancel;
            } else {
              return undoCancel_5();
            }
          } else {
            return undoCancel_5();
          }
        }
      } else {
        fc = undoCancel_7;
        return undoCancel_6();
      }
    } catch (ex) {
      return undoCancel_11(ex);
    }
  }

  function undoCancel_5() {
    try {
      undoCancel.step = undoCancel_3;
      undoCancel.value = i;
      return undoCancel;
    } catch (ex) {
      return undoCancel_11(ex);
    }
  }

  function undoCancel_6() {
    undoCancel.$exit = undoCancel_8;
    undoCancel.handle = undoCancel_9;

    try {
      if (loop.exit) {
        undoCancel.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return undoCancel_9(ex);
    }
  }

  function undoCancel_7() {
    return undoCancel.pure(r);
  }

  function undoCancel_8(r) {
    undoCancel.$exit = undoCancel_8;
    undoCancel.handle = undoCancel_9;
    return undoCancel.pure(r);
  }

  function undoCancel_9(e) {
    return undoCancel.raise(e);
  }

  function undoCancel_10() {
    try {
      return undoCancel.raise(err);
    } catch (ex) {
      return undoCancel_9(ex);
    }
  }

  function undoCancel_11(a) {
    fc = undoCancel_10, err = a;
    return undoCancel_6();
  }

  function undoCancel_12(a) {
    fc = undoCancel_7, r = a;
    return undoCancel_6();
  }
}

function removeCancelled(input) {
  var i,
      removeCancelled = M.asyncGenerator(_removeCancelled),
      loop,
      fc,
      r,
      err;
  removeCancelled.$exit = removeCancelled_6;
  removeCancelled.handle = removeCancelled_7;
  removeCancelled.step = removeCancelled_1;
  return removeCancelled.unwrap;

  function removeCancelled_1() {
    removeCancelled.$exit = removeCancelled_10;
    removeCancelled.handle = removeCancelled_9;

    try {
      loop = M.iteratorM(input);
      return removeCancelled_2();
    } catch (ex) {
      return removeCancelled_9(ex);
    }
  }

  function removeCancelled_2() {
    try {
      removeCancelled.step = removeCancelled_3;
      return Promise.resolve(loop.step()).then(removeCancelled_3, removeCancelled_9);
    } catch (ex) {
      return removeCancelled_9(ex);
    }
  }

  function removeCancelled_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragcancel") {
          removeCancelled.step = removeCancelled_2;
          removeCancelled.value = _extends({}, i, { type: "remove" });
          return removeCancelled;
        } else {
          removeCancelled.step = removeCancelled_2;
          removeCancelled.value = i;
          return removeCancelled;
        }
      } else {
        fc = removeCancelled_5;
        return removeCancelled_4();
      }
    } catch (ex) {
      return removeCancelled_9(ex);
    }
  }

  function removeCancelled_4() {
    removeCancelled.$exit = removeCancelled_6;
    removeCancelled.handle = removeCancelled_7;

    try {
      if (loop.exit) {
        removeCancelled.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return removeCancelled_7(ex);
    }
  }

  function removeCancelled_5() {
    return removeCancelled.pure(r);
  }

  function removeCancelled_6(r) {
    removeCancelled.$exit = removeCancelled_6;
    removeCancelled.handle = removeCancelled_7;
    return removeCancelled.pure(r);
  }

  function removeCancelled_7(e) {
    return removeCancelled.raise(e);
  }

  function removeCancelled_8() {
    try {
      return removeCancelled.raise(err);
    } catch (ex) {
      return removeCancelled_7(ex);
    }
  }

  function removeCancelled_9(a) {
    fc = removeCancelled_8, err = a;
    return removeCancelled_4();
  }

  function removeCancelled_10(a) {
    fc = removeCancelled_5, r = a;
    return removeCancelled_4();
  }
}

function validateDrop(input) {
  var i,
      validateDrop = M.asyncGenerator(_validateDrop),
      loop,
      fc,
      r,
      err;
  validateDrop.$exit = validateDrop_7;
  validateDrop.handle = validateDrop_8;
  validateDrop.step = validateDrop_1;
  return validateDrop.unwrap;

  function validateDrop_1() {
    validateDrop.$exit = validateDrop_11;
    validateDrop.handle = validateDrop_10;

    try {
      loop = M.iteratorM(input);
      return validateDrop_2();
    } catch (ex) {
      return validateDrop_10(ex);
    }
  }

  function validateDrop_2() {
    try {
      validateDrop.step = validateDrop_3;
      return Promise.resolve(loop.step()).then(validateDrop_3, validateDrop_10);
    } catch (ex) {
      return validateDrop_10(ex);
    }
  }

  function validateDrop_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "drop") {
          if (!i.over) {
            validateDrop.step = validateDrop_2;
            validateDrop.value = _extends({}, i, { type: "dragcancel" });
            return validateDrop;
          } else {
            return validateDrop_4();
          }
        } else {
          return validateDrop_4();
        }
      } else {
        fc = validateDrop_6;
        return validateDrop_5();
      }
    } catch (ex) {
      return validateDrop_10(ex);
    }
  }

  function validateDrop_4() {
    try {
      validateDrop.step = validateDrop_2;
      validateDrop.value = i;
      return validateDrop;
    } catch (ex) {
      return validateDrop_10(ex);
    }
  }

  function validateDrop_5() {
    validateDrop.$exit = validateDrop_7;
    validateDrop.handle = validateDrop_8;

    try {
      if (loop.exit) {
        validateDrop.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return validateDrop_8(ex);
    }
  }

  function validateDrop_6() {
    return validateDrop.pure(r);
  }

  function validateDrop_7(r) {
    validateDrop.$exit = validateDrop_7;
    validateDrop.handle = validateDrop_8;
    return validateDrop.pure(r);
  }

  function validateDrop_8(e) {
    return validateDrop.raise(e);
  }

  function validateDrop_9() {
    try {
      return validateDrop.raise(err);
    } catch (ex) {
      return validateDrop_8(ex);
    }
  }

  function validateDrop_10(a) {
    fc = validateDrop_9, err = a;
    return validateDrop_5();
  }

  function validateDrop_11(a) {
    fc = validateDrop_6, r = a;
    return validateDrop_5();
  }
}

function applyRemove(input) {
  var i,
      applyRemove = M.asyncGenerator(_applyRemove),
      loop,
      fc,
      r,
      err;
  applyRemove.$exit = applyRemove_6;
  applyRemove.handle = applyRemove_7;
  applyRemove.step = applyRemove_1;
  return applyRemove.unwrap;

  function applyRemove_1() {
    applyRemove.$exit = applyRemove_10;
    applyRemove.handle = applyRemove_9;

    try {
      loop = M.iteratorM(input);
      return applyRemove_2();
    } catch (ex) {
      return applyRemove_9(ex);
    }
  }

  function applyRemove_2() {
    try {
      applyRemove.step = applyRemove_3;
      return Promise.resolve(loop.step()).then(applyRemove_3, applyRemove_9);
    } catch (ex) {
      return applyRemove_9(ex);
    }
  }

  function applyRemove_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "remove") {
          if (i.element.parentNode) {
            i.element.parentNode.removeChild(i.element);
          }applyRemove.step = applyRemove_2;
          applyRemove.value = _extends({}, i, { type: "drop" });
          return applyRemove;
        } else {
          applyRemove.step = applyRemove_2;
          applyRemove.value = i;
          return applyRemove;
        }
      } else {
        fc = applyRemove_5;
        return applyRemove_4();
      }
    } catch (ex) {
      return applyRemove_9(ex);
    }
  }

  function applyRemove_4() {
    applyRemove.$exit = applyRemove_6;
    applyRemove.handle = applyRemove_7;

    try {
      if (loop.exit) {
        applyRemove.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return applyRemove_7(ex);
    }
  }

  function applyRemove_5() {
    return applyRemove.pure(r);
  }

  function applyRemove_6(r) {
    applyRemove.$exit = applyRemove_6;
    applyRemove.handle = applyRemove_7;
    return applyRemove.pure(r);
  }

  function applyRemove_7(e) {
    return applyRemove.raise(e);
  }

  function applyRemove_8() {
    try {
      return applyRemove.raise(err);
    } catch (ex) {
      return applyRemove_7(ex);
    }
  }

  function applyRemove_9(a) {
    fc = applyRemove_8, err = a;
    return applyRemove_4();
  }

  function applyRemove_10(a) {
    fc = applyRemove_5, r = a;
    return applyRemove_4();
  }
}

function setPosition(input) {
  var source,
      i,
      element,
      box,
      x,
      y,
      j,
      setPosition = M.asyncGenerator(_setPosition),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  setPosition.$exit = setPosition_13;
  setPosition.handle = setPosition_14;
  setPosition.step = setPosition_1;
  return setPosition.unwrap;

  function setPosition_1() {
    try {
      source = share(input);
      return setPosition_2();
    } catch (ex) {
      return setPosition_14(ex);
    }
  }

  function setPosition_2() {
    setPosition.$exit = setPosition_18;
    setPosition.handle = setPosition_17;

    try {
      loop = M.iteratorM(source);
      return setPosition_3();
    } catch (ex) {
      return setPosition_17(ex);
    }
  }

  function setPosition_3() {
    try {
      setPosition.step = setPosition_4;
      return Promise.resolve(loop.step()).then(setPosition_4, setPosition_17);
    } catch (ex) {
      return setPosition_17(ex);
    }
  }

  function setPosition_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        setPosition.step = setPosition_5;
        setPosition.value = i;
        return setPosition;
      } else {
        _fc = setPosition_12;
        return setPosition_11();
      }
    } catch (ex) {
      return setPosition_17(ex);
    }
  }

  function setPosition_5() {
    try {
      if (i.type === "dragstart") {
        ({ element } = i);
        box = element.getBoundingClientRect();
        x = box.x + window.pageXOffset;
        y = box.y + window.pageYOffset;
        return setPosition_6();
      } else {
        return setPosition_3();
      }
    } catch (ex) {
      return setPosition_17(ex);
    }
  }

  function setPosition_6() {
    setPosition.$exit = setPosition_20;
    setPosition.handle = setPosition_19;

    try {
      _loop = M.iteratorM(source);
      return setPosition_7();
    } catch (ex) {
      return setPosition_19(ex);
    }
  }

  function setPosition_7() {
    try {
      setPosition.step = setPosition_8;
      return Promise.resolve(_loop.step()).then(setPosition_8, setPosition_19);
    } catch (ex) {
      return setPosition_19(ex);
    }
  }

  function setPosition_8(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;
        setPosition.step = setPosition_9;
        setPosition.value = j;
        return setPosition;
      } else {
        fc = setPosition_3;
        return setPosition_10();
      }
    } catch (ex) {
      return setPosition_19(ex);
    }
  }

  function setPosition_9() {
    try {
      if (j.type === "drop") {
        fc = setPosition_3;
        return setPosition_10();
      } else {
        if (j.type === "dragging") {
          element.style.left = `${x + j.x - i.x}px`;
          element.style.top = `${y + j.y - i.y}px`;
        }
        return setPosition_7();
      }
    } catch (ex) {
      return setPosition_19(ex);
    }
  }

  function setPosition_10() {
    setPosition.$exit = setPosition_18;
    setPosition.handle = setPosition_17;

    try {
      if (_loop.exit) {
        setPosition.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, setPosition_17);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return setPosition_17(ex);
    }
  }

  function setPosition_11() {
    setPosition.$exit = setPosition_13;
    setPosition.handle = setPosition_14;

    try {
      if (loop.exit) {
        setPosition.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return setPosition_14(ex);
    }
  }

  function setPosition_12() {
    return setPosition.pure(r);
  }

  function setPosition_13(r) {
    setPosition.$exit = setPosition_13;
    setPosition.handle = setPosition_14;
    return setPosition.pure(r);
  }

  function setPosition_14(e) {
    return setPosition.raise(e);
  }

  function setPosition_15() {
    try {
      return setPosition.raise(err);
    } catch (ex) {
      return setPosition_14(ex);
    }
  }

  function setPosition_16() {
    try {
      return setPosition.raise(_err);
    } catch (ex) {
      return setPosition_14(ex);
    }
  }

  function setPosition_17(a) {
    _fc = setPosition_15, err = a;
    return setPosition_11();
  }

  function setPosition_18(a) {
    _fc = setPosition_12, r = a;
    return setPosition_11();
  }

  function setPosition_19(a) {
    fc = setPosition_11, _fc = setPosition_16, _err = a;
    return setPosition_10();
  }

  function setPosition_20(a) {
    fc = setPosition_11, _fc = setPosition_12, r = a;
    return setPosition_10();
  }
}

function filterUseless(input) {
  var i,
      filterUseless = M.asyncGenerator(_filterUseless),
      loop,
      fc,
      r,
      err;
  filterUseless.$exit = filterUseless_6;
  filterUseless.handle = filterUseless_7;
  filterUseless.step = filterUseless_1;
  return filterUseless.unwrap;

  function filterUseless_1() {
    filterUseless.$exit = filterUseless_10;
    filterUseless.handle = filterUseless_9;

    try {
      loop = M.iteratorM(input);
      return filterUseless_2();
    } catch (ex) {
      return filterUseless_9(ex);
    }
  }

  function filterUseless_2() {
    try {
      filterUseless.step = filterUseless_3;
      return Promise.resolve(loop.step()).then(filterUseless_3, filterUseless_9);
    } catch (ex) {
      return filterUseless_9(ex);
    }
  }

  function filterUseless_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        switch (i.type) {
          case "dragstart":
          case "dragging":
          case "drop":
            filterUseless.step = filterUseless_2;
            filterUseless.value = i;
            return filterUseless;

          default:
            return filterUseless_2();
        }
      } else {
        fc = filterUseless_5;
        return filterUseless_4();
      }
    } catch (ex) {
      return filterUseless_9(ex);
    }
  }

  function filterUseless_4() {
    filterUseless.$exit = filterUseless_6;
    filterUseless.handle = filterUseless_7;

    try {
      if (loop.exit) {
        filterUseless.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return filterUseless_7(ex);
    }
  }

  function filterUseless_5() {
    return filterUseless.pure(r);
  }

  function filterUseless_6(r) {
    filterUseless.$exit = filterUseless_6;
    filterUseless.handle = filterUseless_7;
    return filterUseless.pure(r);
  }

  function filterUseless_7(e) {
    return filterUseless.raise(e);
  }

  function filterUseless_8() {
    try {
      return filterUseless.raise(err);
    } catch (ex) {
      return filterUseless_7(ex);
    }
  }

  function filterUseless_9(a) {
    fc = filterUseless_8, err = a;
    return filterUseless_4();
  }

  function filterUseless_10(a) {
    fc = filterUseless_5, r = a;
    return filterUseless_4();
  }
}

function layoutSource(input) {
  var i,
      target,
      el,
      box,
      dummy,
      layoutSource = M.asyncGenerator(_layoutSource),
      loop,
      fc,
      r,
      err;
  layoutSource.$exit = layoutSource_7;
  layoutSource.handle = layoutSource_8;
  layoutSource.step = layoutSource_1;
  return layoutSource.unwrap;

  function layoutSource_1() {
    layoutSource.$exit = layoutSource_11;
    layoutSource.handle = layoutSource_10;

    try {
      loop = M.iteratorM(input);
      return layoutSource_2();
    } catch (ex) {
      return layoutSource_10(ex);
    }
  }

  function layoutSource_2() {
    try {
      layoutSource.step = layoutSource_3;
      return Promise.resolve(loop.step()).then(layoutSource_3, layoutSource_10);
    } catch (ex) {
      return layoutSource_10(ex);
    }
  }

  function layoutSource_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        target = void 0;

        if (i.type === "dragstart" && (target = i.element.closest(".list"))) {
          el = i.element;
          box = el.getBoundingClientRect();
          dummy = document.createElement("div");

          dummy.classList.add("dummy");
          dummy.style.width = `${box.width}px`;
          dummy.style.height = `${box.height}px`;
          el.parentNode.insertBefore(dummy, el);
          el.parentNode.removeChild(el);
          el.style.left = `${box.left + window.pageXOffset}px`;
          el.style.top = `${box.top + window.pageYOffset}px`;
          document.body.appendChild(el);
          layoutSource.step = layoutSource_4;
          layoutSource.value = _extends({}, i, { over: target });
          return layoutSource;
        } else {
          layoutSource.step = layoutSource_2;
          layoutSource.value = i;
          return layoutSource;
        }
      } else {
        fc = layoutSource_6;
        return layoutSource_5();
      }
    } catch (ex) {
      return layoutSource_10(ex);
    }
  }

  function layoutSource_4() {
    try {
      layoutSource.step = layoutSource_2;
      layoutSource.value = { type: "remove", element: dummy };
      return layoutSource;
    } catch (ex) {
      return layoutSource_10(ex);
    }
  }

  function layoutSource_5() {
    layoutSource.$exit = layoutSource_7;
    layoutSource.handle = layoutSource_8;

    try {
      if (loop.exit) {
        layoutSource.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return layoutSource_8(ex);
    }
  }

  function layoutSource_6() {
    return layoutSource.pure(r);
  }

  function layoutSource_7(r) {
    layoutSource.$exit = layoutSource_7;
    layoutSource.handle = layoutSource_8;
    return layoutSource.pure(r);
  }

  function layoutSource_8(e) {
    return layoutSource.raise(e);
  }

  function layoutSource_9() {
    try {
      return layoutSource.raise(err);
    } catch (ex) {
      return layoutSource_8(ex);
    }
  }

  function layoutSource_10(a) {
    fc = layoutSource_9, err = a;
    return layoutSource_5();
  }

  function layoutSource_11(a) {
    fc = layoutSource_6, r = a;
    return layoutSource_5();
  }
}

function layoutTarget(input) {
  var source,
      i,
      target,
      layoutTarget = M.asyncGenerator(_layoutTarget),
      loop,
      fc,
      r,
      err;
  layoutTarget.$exit = layoutTarget_7;
  layoutTarget.handle = layoutTarget_8;
  layoutTarget.step = layoutTarget_1;
  return layoutTarget.unwrap;

  function layoutTarget_1() {
    try {
      source = share(input);
      return layoutTarget_2();
    } catch (ex) {
      return layoutTarget_8(ex);
    }
  }

  function layoutTarget_2() {
    layoutTarget.$exit = layoutTarget_11;
    layoutTarget.handle = layoutTarget_10;

    try {
      loop = M.iteratorM(source);
      return layoutTarget_3();
    } catch (ex) {
      return layoutTarget_10(ex);
    }
  }

  function layoutTarget_3() {
    try {
      layoutTarget.step = layoutTarget_4;
      return Promise.resolve(loop.step()).then(layoutTarget_4, layoutTarget_10);
    } catch (ex) {
      return layoutTarget_10(ex);
    }
  }

  function layoutTarget_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        target = void 0;

        if (i.type === "drop" && i.over && i.over.classList.contains("list")) {
          i.over.insertBefore(i.element, i.intersect && i.intersect.parentNode === i.over ? i.intersect : null);
        }layoutTarget.step = layoutTarget_3;
        layoutTarget.value = i;
        return layoutTarget;
      } else {
        fc = layoutTarget_6;
        return layoutTarget_5();
      }
    } catch (ex) {
      return layoutTarget_10(ex);
    }
  }

  function layoutTarget_5() {
    layoutTarget.$exit = layoutTarget_7;
    layoutTarget.handle = layoutTarget_8;

    try {
      if (loop.exit) {
        layoutTarget.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return layoutTarget_8(ex);
    }
  }

  function layoutTarget_6() {
    return layoutTarget.pure(r);
  }

  function layoutTarget_7(r) {
    layoutTarget.$exit = layoutTarget_7;
    layoutTarget.handle = layoutTarget_8;
    return layoutTarget.pure(r);
  }

  function layoutTarget_8(e) {
    return layoutTarget.raise(e);
  }

  function layoutTarget_9() {
    try {
      return layoutTarget.raise(err);
    } catch (ex) {
      return layoutTarget_8(ex);
    }
  }

  function layoutTarget_10(a) {
    fc = layoutTarget_9, err = a;
    return layoutTarget_5();
  }

  function layoutTarget_11(a) {
    fc = layoutTarget_6, r = a;
    return layoutTarget_5();
  }
}

function flyBack(input) {
  var start,
      i,
      j,
      flyBack = M.asyncGenerator(_flyBack),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  flyBack.$exit = flyBack_13;
  flyBack.handle = flyBack_14;
  flyBack.step = flyBack_1;
  return flyBack.unwrap;

  function flyBack_1() {
    try {
      start = void 0;
      return flyBack_2();
    } catch (ex) {
      return flyBack_14(ex);
    }
  }

  function flyBack_2() {
    flyBack.$exit = flyBack_18;
    flyBack.handle = flyBack_17;

    try {
      loop = M.iteratorM(input);
      return flyBack_3();
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_3() {
    try {
      flyBack.step = flyBack_4;
      return Promise.resolve(loop.step()).then(flyBack_4, flyBack_17);
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        switch (i.type) {
          case "dragstart":
            start = i;
            return flyBack_10();

          case "dragcancel":
            if (!start) {
              return flyBack_10();
            } else {
              return flyBack_5();
            }

          default:
            return flyBack_10();
        }
      } else {
        _fc = flyBack_12;
        return flyBack_11();
      }
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_5() {
    flyBack.$exit = flyBack_20;
    flyBack.handle = flyBack_19;

    try {
      _loop = M.iteratorM(anim());
      return flyBack_6();
    } catch (ex) {
      return flyBack_19(ex);
    }
  }

  function flyBack_6() {
    try {
      flyBack.step = flyBack_7;
      return Promise.resolve(_loop.step()).then(flyBack_7, flyBack_19);
    } catch (ex) {
      return flyBack_19(ex);
    }
  }

  function flyBack_7(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;
        flyBack.step = flyBack_6;
        flyBack.value = _extends({}, i, { type: "dragging",
          x: i.x + j * (start.x - i.x),
          y: i.y + j * (start.y - i.y) });
        return flyBack;
      } else {
        fc = flyBack_9;
        return flyBack_8();
      }
    } catch (ex) {
      return flyBack_19(ex);
    }
  }

  function flyBack_8() {
    flyBack.$exit = flyBack_18;
    flyBack.handle = flyBack_17;

    try {
      if (_loop.exit) {
        flyBack.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, flyBack_17);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_9(a) {
    try {
      flyBack.step = flyBack_10;
      flyBack.value = _extends({}, i, { type: "dragcancel", over: start.over });
      return flyBack;
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_10() {
    try {
      flyBack.step = flyBack_3;
      flyBack.value = i;
      return flyBack;
    } catch (ex) {
      return flyBack_17(ex);
    }
  }

  function flyBack_11() {
    flyBack.$exit = flyBack_13;
    flyBack.handle = flyBack_14;

    try {
      if (loop.exit) {
        flyBack.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return flyBack_14(ex);
    }
  }

  function flyBack_12() {
    return flyBack.pure(r);
  }

  function flyBack_13(r) {
    flyBack.$exit = flyBack_13;
    flyBack.handle = flyBack_14;
    return flyBack.pure(r);
  }

  function flyBack_14(e) {
    return flyBack.raise(e);
  }

  function flyBack_15() {
    try {
      return flyBack.raise(err);
    } catch (ex) {
      return flyBack_14(ex);
    }
  }

  function flyBack_16() {
    try {
      return flyBack.raise(_err);
    } catch (ex) {
      return flyBack_14(ex);
    }
  }

  function flyBack_17(a) {
    _fc = flyBack_15, err = a;
    return flyBack_11();
  }

  function flyBack_18(a) {
    _fc = flyBack_12, r = a;
    return flyBack_11();
  }

  function flyBack_19(a) {
    fc = flyBack_11, _fc = flyBack_16, _err = a;
    return flyBack_8();
  }

  function flyBack_20(a) {
    fc = flyBack_11, _fc = flyBack_12, r = a;
    return flyBack_8();
  }
}

const byElement = (transducer, input) => threadBy(i => i.element, i => stopThread(transducer(i)), input);

function stopThread(input) {
  var i,
      stopThread = M.asyncGenerator(_stopThread),
      loop,
      fc,
      r,
      err;
  stopThread.$exit = stopThread_7;
  stopThread.handle = stopThread_8;
  stopThread.step = stopThread_1;
  return stopThread.unwrap;

  function stopThread_1() {
    stopThread.$exit = stopThread_11;
    stopThread.handle = stopThread_10;

    try {
      loop = M.iteratorM(input);
      return stopThread_2();
    } catch (ex) {
      return stopThread_10(ex);
    }
  }

  function stopThread_2() {
    try {
      stopThread.step = stopThread_3;
      return Promise.resolve(loop.step()).then(stopThread_3, stopThread_10);
    } catch (ex) {
      return stopThread_10(ex);
    }
  }

  function stopThread_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        stopThread.step = stopThread_4;
        stopThread.value = i;
        return stopThread;
      } else {
        fc = stopThread_6;
        return stopThread_5();
      }
    } catch (ex) {
      return stopThread_10(ex);
    }
  }

  function stopThread_4() {
    try {
      if (i.type === "drop") {
        fc = stopThread_6;
        return stopThread_5();
      } else {
        return stopThread_2();
      }
    } catch (ex) {
      return stopThread_10(ex);
    }
  }

  function stopThread_5() {
    stopThread.$exit = stopThread_7;
    stopThread.handle = stopThread_8;

    try {
      if (loop.exit) {
        stopThread.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return stopThread_8(ex);
    }
  }

  function stopThread_6() {
    return stopThread.pure(r);
  }

  function stopThread_7(r) {
    stopThread.$exit = stopThread_7;
    stopThread.handle = stopThread_8;
    return stopThread.pure(r);
  }

  function stopThread_8(e) {
    return stopThread.raise(e);
  }

  function stopThread_9() {
    try {
      return stopThread.raise(err);
    } catch (ex) {
      return stopThread_8(ex);
    }
  }

  function stopThread_10(a) {
    fc = stopThread_9, err = a;
    return stopThread_5();
  }

  function stopThread_11(a) {
    fc = stopThread_6, r = a;
    return stopThread_5();
  }
}

function threadBy(select, transducer, input) {
  var threads,
      iter,
      main,
      i,
      threadBy = M.asyncGenerator(_threadBy),
      r;
  threadBy.$exit = threadBy_4;
  threadBy.handle = threadBy_5;
  threadBy.step = threadBy_1;
  return threadBy.unwrap;

  function threadBy_1() {
    try {
      threads = new Map();
      iter = M.asyncGeneratorFunction(function source() {
        var i,
            _source = M.asyncGenerator(source),
            loop,
            fc,
            r,
            err;

        _source.$exit = source_7;
        _source.handle = source_8;
        _source.step = source_1;
        return _source.unwrap;

        function source_1() {
          _source.$exit = source_11;
          _source.handle = source_10;

          try {
            loop = M.iteratorM(input);
            return source_2();
          } catch (ex) {
            return source_10(ex);
          }
        }

        function source_2() {
          try {
            _source.step = source_3;
            return Promise.resolve(loop.step()).then(source_3, source_10);
          } catch (ex) {
            return source_10(ex);
          }
        }

        function source_3(c) {
          var a, b, d;

          try {
            b = loop = c;
            a = b.done;

            if (!a) {
              var f;
              i = loop.value;
              d = (f = M.asyncGeneratorFunction(i => {
                var key,
                    thread,
                    q,
                    cont,
                    iter,
                    ctx = M.asyncGenerator(f),
                    r;
                ctx.$exit = f_4;
                ctx.handle = f_5;
                ctx.step = f_1;
                return ctx.unwrap;

                function f_1() {
                  try {
                    key = select(i);

                    if (!key) {
                      ctx.step = f_2;
                      ctx.value = i;
                      return ctx;
                    } else {
                      thread = threads.get(key);

                      if (!thread) {
                        q = [];
                        cont = void 0;
                        iter = transducer(M.asyncGeneratorFunction(function f() {
                          var ctx = M.asyncGenerator(f);
                          ctx.$exit = f_3;
                          ctx.handle = f_4;
                          ctx.step = f_1;
                          return ctx.unwrap;

                          function f_1() {
                            var a;

                            try {
                              if (q.length) {
                                a = q.shift();
                                ctx.step = f_1;
                                ctx.value = a;
                                return ctx;
                              } else {
                                ctx.step = f_2;
                                return Promise.resolve(new Promise(k => cont = k)).then(f_2);
                              }
                            } catch (ex) {
                              return f_4(ex);
                            }
                          }

                          function f_2() {
                            try {
                              cont = null;
                              return f_1();
                            } catch (ex) {
                              return f_4(ex);
                            }
                          }

                          function f_3(r) {
                            ctx.$exit = f_3;
                            ctx.handle = f_4;
                            return ctx.pure(r);
                          }

                          function f_4(e) {
                            return ctx.raise(e);
                          }
                        })())[Symbol.asyncIterator]();

                        thread = {
                          iter,
                          task: iter.next(),
                          key,
                          send(i) {
                            q.push(i);
                            if (cont) cont();
                          }
                        };
                        threads.set(key, thread);
                        ctx.step = f_3;
                        ctx.value = false;
                        return ctx;
                      } else {
                        return f_3();
                      }
                    }
                  } catch (ex) {
                    return f_5(ex);
                  }
                }

                function f_2() {
                  try {
                    return ctx.pure(0);
                  } catch (ex) {
                    return f_5(ex);
                  }
                }

                function f_3() {
                  try {
                    thread.send(i);
                    return ctx.pure(1);
                  } catch (ex) {
                    return f_5(ex);
                  }
                }

                function f_4(r) {
                  ctx.$exit = f_4;
                  ctx.handle = f_5;
                  return ctx.pure(r);
                }

                function f_5(e) {
                  return ctx.raise(e);
                }
              }))(i);
              _source.step = source_4;
              return _source.delegate(d);
            } else {
              fc = source_6;
              return source_5();
            }
          } catch (ex) {
            return source_10(ex);
          }
        }

        function source_4(a) {
          try {
            switch (a) {
              case 1:
                return source_2();

              default:
                return source_2();
            }
          } catch (ex) {
            return source_10(ex);
          }
        }

        function source_5() {
          _source.$exit = source_7;
          _source.handle = source_8;

          try {
            if (loop.exit) {
              _source.step = fc;
              return Promise.resolve(loop.exit()).then(fc);
            } else {
              return fc();
            }
          } catch (ex) {
            return source_8(ex);
          }
        }

        function source_6() {
          return _source.pure(r);
        }

        function source_7(r) {
          _source.$exit = source_7;
          _source.handle = source_8;
          return _source.pure(r);
        }

        function source_8(e) {
          return _source.raise(e);
        }

        function source_9() {
          try {
            return _source.raise(err);
          } catch (ex) {
            return source_8(ex);
          }
        }

        function source_10(a) {
          fc = source_9, err = a;
          return source_5();
        }

        function source_11(a) {
          fc = source_6, r = a;
          return source_5();
        }
      })()[Symbol.asyncIterator]();
      main = { iter, task: iter.next() };
      return threadBy_2();
    } catch (ex) {
      return threadBy_5(ex);
    }
  }

  function threadBy_2() {
    var a;

    try {
      a = Promise.race([main, ...threads.values()].map(i => i.task.then(({ done, value }) => (i.value = value, i.done = done, i))));
      threadBy.step = threadBy_3;
      return Promise.resolve(a).then(threadBy_3);
    } catch (ex) {
      return threadBy_5(ex);
    }
  }

  function threadBy_3(a) {
    var b;

    try {
      i = a;

      if (i.done) {
        if (i === main) {
          return threadBy.pure(i.value);
        } else {
          threads.delete(i.key);
          return threadBy_2();
        }
      } else {
        i.task = i.iter.next();
        if (i.value) {
          b = i.value;
          threadBy.step = threadBy_2;
          threadBy.value = b;
          return threadBy;
        } else {
          return threadBy_2();
        }
      }
    } catch (ex) {
      return threadBy_5(ex);
    }
  }

  function threadBy_4(r) {
    threadBy.$exit = threadBy_4;
    threadBy.handle = threadBy_5;
    return threadBy.pure(r);
  }

  function threadBy_5(e) {
    return threadBy.raise(e);
  }
}

function animateIntersectDrop(input) {
  var i,
      dummy,
      box,
      j,
      dummyBox,
      animateIntersectDrop = M.asyncGenerator(_animateIntersectDrop),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  animateIntersectDrop.$exit = animateIntersectDrop_12;
  animateIntersectDrop.handle = animateIntersectDrop_13;
  animateIntersectDrop.step = animateIntersectDrop_1;
  return animateIntersectDrop.unwrap;

  function animateIntersectDrop_1() {
    animateIntersectDrop.$exit = animateIntersectDrop_17;
    animateIntersectDrop.handle = animateIntersectDrop_16;

    try {
      loop = M.iteratorM(input);
      return animateIntersectDrop_2();
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_2() {
    try {
      animateIntersectDrop.step = animateIntersectDrop_3;
      return Promise.resolve(loop.step()).then(animateIntersectDrop_3, animateIntersectDrop_16);
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.over && i.over.classList.contains("list")) {
          if (i.type === "drop") {
            dummy = document.createElement("div");

            i.over.insertBefore(dummy, i.intersect);
            box = i.element.getBoundingClientRect();
            return animateIntersectDrop_4();
          } else {
            return animateIntersectDrop_9();
          }
        } else {
          return animateIntersectDrop_9();
        }
      } else {
        _fc = animateIntersectDrop_11;
        return animateIntersectDrop_10();
      }
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_4() {
    animateIntersectDrop.$exit = animateIntersectDrop_19;
    animateIntersectDrop.handle = animateIntersectDrop_18;

    try {
      _loop = M.iteratorM(anim());
      return animateIntersectDrop_5();
    } catch (ex) {
      return animateIntersectDrop_18(ex);
    }
  }

  function animateIntersectDrop_5() {
    try {
      animateIntersectDrop.step = animateIntersectDrop_6;
      return Promise.resolve(_loop.step()).then(animateIntersectDrop_6, animateIntersectDrop_18);
    } catch (ex) {
      return animateIntersectDrop_18(ex);
    }
  }

  function animateIntersectDrop_6(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;
        dummyBox = dummy.getBoundingClientRect();

        dummy.style.height = `${j * box.height}px`;
        i.element.style.left = `${box.x + window.pageXOffset + j * (dummyBox.x - box.x)}px`;
        i.element.style.top = `${box.y + window.pageYOffset + j * (dummyBox.y - box.y)}px`;
        return animateIntersectDrop_5();
      } else {
        fc = animateIntersectDrop_8;
        return animateIntersectDrop_7();
      }
    } catch (ex) {
      return animateIntersectDrop_18(ex);
    }
  }

  function animateIntersectDrop_7() {
    animateIntersectDrop.$exit = animateIntersectDrop_17;
    animateIntersectDrop.handle = animateIntersectDrop_16;

    try {
      if (_loop.exit) {
        animateIntersectDrop.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, animateIntersectDrop_16);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_8(a) {
    try {
      i.over.removeChild(dummy);
      return animateIntersectDrop_9();
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_9() {
    try {
      animateIntersectDrop.step = animateIntersectDrop_2;
      animateIntersectDrop.value = i;
      return animateIntersectDrop;
    } catch (ex) {
      return animateIntersectDrop_16(ex);
    }
  }

  function animateIntersectDrop_10() {
    animateIntersectDrop.$exit = animateIntersectDrop_12;
    animateIntersectDrop.handle = animateIntersectDrop_13;

    try {
      if (loop.exit) {
        animateIntersectDrop.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return animateIntersectDrop_13(ex);
    }
  }

  function animateIntersectDrop_11() {
    return animateIntersectDrop.pure(r);
  }

  function animateIntersectDrop_12(r) {
    animateIntersectDrop.$exit = animateIntersectDrop_12;
    animateIntersectDrop.handle = animateIntersectDrop_13;
    return animateIntersectDrop.pure(r);
  }

  function animateIntersectDrop_13(e) {
    return animateIntersectDrop.raise(e);
  }

  function animateIntersectDrop_14() {
    try {
      return animateIntersectDrop.raise(err);
    } catch (ex) {
      return animateIntersectDrop_13(ex);
    }
  }

  function animateIntersectDrop_15() {
    try {
      return animateIntersectDrop.raise(_err);
    } catch (ex) {
      return animateIntersectDrop_13(ex);
    }
  }

  function animateIntersectDrop_16(a) {
    _fc = animateIntersectDrop_14, err = a;
    return animateIntersectDrop_10();
  }

  function animateIntersectDrop_17(a) {
    _fc = animateIntersectDrop_11, r = a;
    return animateIntersectDrop_10();
  }

  function animateIntersectDrop_18(a) {
    fc = animateIntersectDrop_10, _fc = animateIntersectDrop_15, _err = a;
    return animateIntersectDrop_7();
  }

  function animateIntersectDrop_19(a) {
    fc = animateIntersectDrop_10, _fc = animateIntersectDrop_11, r = a;
    return animateIntersectDrop_7();
  }
}

function highlightIntersectDrag(input) {
  var dummy,
      last,
      i,
      highlightIntersectDrag = M.asyncGenerator(_highlightIntersectDrag),
      loop,
      fc,
      r,
      err;
  highlightIntersectDrag.$exit = highlightIntersectDrag_7;
  highlightIntersectDrag.handle = highlightIntersectDrag_8;
  highlightIntersectDrag.step = highlightIntersectDrag_1;
  return highlightIntersectDrag.unwrap;

  function highlightIntersectDrag_1() {
    try {
      dummy = void 0;
      last = void 0;
      return highlightIntersectDrag_2();
    } catch (ex) {
      return highlightIntersectDrag_8(ex);
    }
  }

  function highlightIntersectDrag_2() {
    highlightIntersectDrag.$exit = highlightIntersectDrag_11;
    highlightIntersectDrag.handle = highlightIntersectDrag_10;

    try {
      loop = M.iteratorM(input);
      return highlightIntersectDrag_3();
    } catch (ex) {
      return highlightIntersectDrag_10(ex);
    }
  }

  function highlightIntersectDrag_3() {
    try {
      highlightIntersectDrag.step = highlightIntersectDrag_4;
      return Promise.resolve(loop.step()).then(highlightIntersectDrag_4, highlightIntersectDrag_10);
    } catch (ex) {
      return highlightIntersectDrag_10(ex);
    }
  }

  function highlightIntersectDrag_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragging" && i.over && i.intersect && i.intersect.parentNode === i.over) {
          if (last !== i.intersect) {
            last = i.intersect;
            if (!dummy) {
              dummy = document.getElementById("poshl");
              if (!dummy) {
                dummy = document.createElement("div");
                dummy.id = "poshl";
              }
            }
            i.over.insertBefore(dummy, i.intersect);
            dummy.style.height = "10px";
          }
        } else {
          if (dummy) {
            if (dummy.parentNode) {
              dummy.parentNode.removeChild(dummy);
            }dummy = null;
            last = null;
          }
        }highlightIntersectDrag.step = highlightIntersectDrag_3;
        highlightIntersectDrag.value = i;
        return highlightIntersectDrag;
      } else {
        fc = highlightIntersectDrag_6;
        return highlightIntersectDrag_5();
      }
    } catch (ex) {
      return highlightIntersectDrag_10(ex);
    }
  }

  function highlightIntersectDrag_5() {
    highlightIntersectDrag.$exit = highlightIntersectDrag_7;
    highlightIntersectDrag.handle = highlightIntersectDrag_8;

    try {
      if (loop.exit) {
        highlightIntersectDrag.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return highlightIntersectDrag_8(ex);
    }
  }

  function highlightIntersectDrag_6() {
    return highlightIntersectDrag.pure(r);
  }

  function highlightIntersectDrag_7(r) {
    highlightIntersectDrag.$exit = highlightIntersectDrag_7;
    highlightIntersectDrag.handle = highlightIntersectDrag_8;
    return highlightIntersectDrag.pure(r);
  }

  function highlightIntersectDrag_8(e) {
    return highlightIntersectDrag.raise(e);
  }

  function highlightIntersectDrag_9() {
    try {
      return highlightIntersectDrag.raise(err);
    } catch (ex) {
      return highlightIntersectDrag_8(ex);
    }
  }

  function highlightIntersectDrag_10(a) {
    fc = highlightIntersectDrag_9, err = a;
    return highlightIntersectDrag_5();
  }

  function highlightIntersectDrag_11(a) {
    fc = highlightIntersectDrag_6, r = a;
    return highlightIntersectDrag_5();
  }
}

function setIntersectProperty(input) {
  var i,
      setIntersectProperty = M.asyncGenerator(_setIntersectProperty),
      loop,
      fc,
      r,
      err;
  setIntersectProperty.$exit = setIntersectProperty_6;
  setIntersectProperty.handle = setIntersectProperty_7;
  setIntersectProperty.step = setIntersectProperty_1;
  return setIntersectProperty.unwrap;

  function setIntersectProperty_1() {
    setIntersectProperty.$exit = setIntersectProperty_10;
    setIntersectProperty.handle = setIntersectProperty_9;

    try {
      loop = M.iteratorM(input);
      return setIntersectProperty_2();
    } catch (ex) {
      return setIntersectProperty_9(ex);
    }
  }

  function setIntersectProperty_2() {
    try {
      setIntersectProperty.step = setIntersectProperty_3;
      return Promise.resolve(loop.step()).then(setIntersectProperty_3, setIntersectProperty_9);
    } catch (ex) {
      return setIntersectProperty_9(ex);
    }
  }

  function setIntersectProperty_3(c) {
    var a, b, d;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        var f;
        i = loop.value;
        d = (f = M.asyncGeneratorFunction(i => {
          var el,
              children,
              x,
              ctx = M.asyncGenerator(f);
          ctx.$exit = f_3;
          ctx.handle = f_4;
          ctx.step = f_1;
          return ctx.unwrap;

          function f_1() {
            var a;

            try {
              el = void 0;

              if (i.y && i.element && i.over && i.over.classList.contains("list")) {
                children = [...i.over.childNodes].filter(i => i.classList && i.classList.contains("draggable")).map(i => ({ el: i, box: i.getBoundingClientRect() })).sort((a, b) => a.box.top - a.box.top);
                x = children.findIndex(j => j.box.top + j.box.height / 2 > i.y);
                ctx.step = f_2;
                ctx.value = _extends({}, i, { intersect: x === -1 ? null : children[x].el || null });
                return ctx;
              } else {
                a = i;
                ctx.step = f_2;
                ctx.value = a;
                return ctx;
              }
            } catch (ex) {
              return f_4(ex);
            }
          }

          function f_2() {
            return ctx.pure();
          }

          function f_3(r) {
            ctx.$exit = f_3;
            ctx.handle = f_4;
            return ctx.pure(r);
          }

          function f_4(e) {
            return ctx.raise(e);
          }
        }))(i);
        setIntersectProperty.step = setIntersectProperty_2;
        return setIntersectProperty.delegate(d);
      } else {
        fc = setIntersectProperty_5;
        return setIntersectProperty_4();
      }
    } catch (ex) {
      return setIntersectProperty_9(ex);
    }
  }

  function setIntersectProperty_4() {
    setIntersectProperty.$exit = setIntersectProperty_6;
    setIntersectProperty.handle = setIntersectProperty_7;

    try {
      if (loop.exit) {
        setIntersectProperty.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return setIntersectProperty_7(ex);
    }
  }

  function setIntersectProperty_5() {
    return setIntersectProperty.pure(r);
  }

  function setIntersectProperty_6(r) {
    setIntersectProperty.$exit = setIntersectProperty_6;
    setIntersectProperty.handle = setIntersectProperty_7;
    return setIntersectProperty.pure(r);
  }

  function setIntersectProperty_7(e) {
    return setIntersectProperty.raise(e);
  }

  function setIntersectProperty_8() {
    try {
      return setIntersectProperty.raise(err);
    } catch (ex) {
      return setIntersectProperty_7(ex);
    }
  }

  function setIntersectProperty_9(a) {
    fc = setIntersectProperty_8, err = a;
    return setIntersectProperty_4();
  }

  function setIntersectProperty_10(a) {
    fc = setIntersectProperty_5, r = a;
    return setIntersectProperty_4();
  }
}

function selectMark(input) {
  var selectMark,
      i,
      items,
      item,
      itemBox,
      selectMark1 = M.asyncGenerator(_selectMark),
      loop,
      fc,
      r,
      err;
  selectMark1.$exit = selectMark_8;
  selectMark1.handle = selectMark_9;
  selectMark1.step = selectMark_1;
  return selectMark1.unwrap;

  function selectMark_1() {
    try {
      selectMark = void 0;
      return selectMark_2();
    } catch (ex) {
      return selectMark_9(ex);
    }
  }

  function selectMark_2() {
    selectMark1.$exit = selectMark_12;
    selectMark1.handle = selectMark_11;

    try {
      loop = M.iteratorM(input);
      return selectMark_3();
    } catch (ex) {
      return selectMark_11(ex);
    }
  }

  function selectMark_3() {
    try {
      selectMark1.step = selectMark_4;
      return Promise.resolve(loop.step()).then(selectMark_4, selectMark_11);
    } catch (ex) {
      return selectMark_11(ex);
    }
  }

  function selectMark_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        selectMark1.step = selectMark_5;
        selectMark1.value = i;
        return selectMark1;
      } else {
        fc = selectMark_7;
        return selectMark_6();
      }
    } catch (ex) {
      return selectMark_11(ex);
    }
  }

  function selectMark_5() {
    try {
      switch (i.type) {
        case "select":
        case "selecting":
          {
            if (i.type === "select" && selectMark) {
              selectMark.style.display = "none";
            } else {
              if (!selectMark) {
                selectMark = document.createElement("div");
                selectMark.classList.add("selection");
                document.body.appendChild(selectMark);
              }
              selectMark.style.top = `${i.top + window.pageYOffset}px`;
              selectMark.style.left = `${i.left + window.pageXOffset}px`;
              selectMark.style.width = `${i.width}px`;
              selectMark.style.height = `${i.height}px`;
              selectMark.style.display = "block";
            }
            items = document.getElementsByClassName("draggable");

            for (item of items) {
              itemBox = item.getBoundingClientRect();

              item.classList.toggle("selected", itemBox.top > i.top && itemBox.left > i.left && itemBox.bottom < i.bottom && itemBox.right < i.right);
            }
            break;
          }
      }
      return selectMark_3();
    } catch (ex) {
      return selectMark_11(ex);
    }
  }

  function selectMark_6() {
    selectMark1.$exit = selectMark_8;
    selectMark1.handle = selectMark_9;

    try {
      if (loop.exit) {
        selectMark1.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return selectMark_9(ex);
    }
  }

  function selectMark_7() {
    return selectMark1.pure(r);
  }

  function selectMark_8(r) {
    selectMark1.$exit = selectMark_8;
    selectMark1.handle = selectMark_9;
    return selectMark1.pure(r);
  }

  function selectMark_9(e) {
    return selectMark1.raise(e);
  }

  function selectMark_10() {
    try {
      return selectMark1.raise(err);
    } catch (ex) {
      return selectMark_9(ex);
    }
  }

  function selectMark_11(a) {
    fc = selectMark_10, err = a;
    return selectMark_6();
  }

  function selectMark_12(a) {
    fc = selectMark_7, r = a;
    return selectMark_6();
  }
}

function makeSelectActions(input) {
  var source,
      i,
      j,
      makeSelectActions = M.asyncGenerator(_makeSelectActions),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  makeSelectActions.$exit = makeSelectActions_14;
  makeSelectActions.handle = makeSelectActions_15;
  makeSelectActions.step = makeSelectActions_1;
  return makeSelectActions.unwrap;

  function makeSelectActions_1() {
    try {
      source = share(input);
      return makeSelectActions_2();
    } catch (ex) {
      return makeSelectActions_15(ex);
    }
  }

  function makeSelectActions_2() {
    makeSelectActions.$exit = makeSelectActions_19;
    makeSelectActions.handle = makeSelectActions_18;

    try {
      loop = M.iteratorM(source);
      return makeSelectActions_3();
    } catch (ex) {
      return makeSelectActions_18(ex);
    }
  }

  function makeSelectActions_3() {
    try {
      makeSelectActions.step = makeSelectActions_4;
      return Promise.resolve(loop.step()).then(makeSelectActions_4, makeSelectActions_18);
    } catch (ex) {
      return makeSelectActions_18(ex);
    }
  }

  function makeSelectActions_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        makeSelectActions.step = makeSelectActions_5;
        makeSelectActions.value = i;
        return makeSelectActions;
      } else {
        _fc = makeSelectActions_13;
        return makeSelectActions_12();
      }
    } catch (ex) {
      return makeSelectActions_18(ex);
    }
  }

  function makeSelectActions_5() {
    try {
      if (i.type === "pointerdown") {
        i.preventDefault();
        makeSelectActions.step = makeSelectActions_6;
        makeSelectActions.value = { type: "selectstart", x: i.x, y: i.y };
        return makeSelectActions;
      } else {
        return makeSelectActions_3();
      }
    } catch (ex) {
      return makeSelectActions_18(ex);
    }
  }

  function makeSelectActions_6() {
    makeSelectActions.$exit = makeSelectActions_21;
    makeSelectActions.handle = makeSelectActions_20;

    try {
      _loop = M.iteratorM(source);
      return makeSelectActions_7();
    } catch (ex) {
      return makeSelectActions_20(ex);
    }
  }

  function makeSelectActions_7() {
    try {
      makeSelectActions.step = makeSelectActions_8;
      return Promise.resolve(_loop.step()).then(makeSelectActions_8, makeSelectActions_20);
    } catch (ex) {
      return makeSelectActions_20(ex);
    }
  }

  function makeSelectActions_8(c) {
    var a, b;

    try {
      b = _loop = c;
      a = b.done;

      if (!a) {
        j = _loop.value;
        makeSelectActions.step = makeSelectActions_9;
        makeSelectActions.value = j;
        return makeSelectActions;
      } else {
        fc = makeSelectActions_3;
        return makeSelectActions_11();
      }
    } catch (ex) {
      return makeSelectActions_20(ex);
    }
  }

  function makeSelectActions_9() {
    try {
      if (j.type === "pointerup" || j.type === "pointermove") {
        j.preventDefault();
        makeSelectActions.step = makeSelectActions_10;
        makeSelectActions.value = { type: j.type === "pointerup" ? "select" : "selecting",
          left: Math.min(i.x, j.x), top: Math.min(i.y, j.y),
          right: Math.max(i.x, j.x), bottom: Math.max(i.y, j.y),
          width: Math.abs(i.x - j.x), height: Math.abs(i.y - j.y) };
        return makeSelectActions;
      } else {
        return makeSelectActions_7();
      }
    } catch (ex) {
      return makeSelectActions_20(ex);
    }
  }

  function makeSelectActions_10() {
    try {
      if (j.type === "pointerup") {
        fc = makeSelectActions_3;
        return makeSelectActions_11();
      } else {
        return makeSelectActions_7();
      }
    } catch (ex) {
      return makeSelectActions_20(ex);
    }
  }

  function makeSelectActions_11() {
    makeSelectActions.$exit = makeSelectActions_19;
    makeSelectActions.handle = makeSelectActions_18;

    try {
      if (_loop.exit) {
        makeSelectActions.step = fc;
        err = _err;
        return Promise.resolve(_loop.exit()).then(fc, makeSelectActions_18);
      } else {
        err = _err;
        return fc();
      }
    } catch (ex) {
      return makeSelectActions_18(ex);
    }
  }

  function makeSelectActions_12() {
    makeSelectActions.$exit = makeSelectActions_14;
    makeSelectActions.handle = makeSelectActions_15;

    try {
      if (loop.exit) {
        makeSelectActions.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return makeSelectActions_15(ex);
    }
  }

  function makeSelectActions_13() {
    return makeSelectActions.pure(r);
  }

  function makeSelectActions_14(r) {
    makeSelectActions.$exit = makeSelectActions_14;
    makeSelectActions.handle = makeSelectActions_15;
    return makeSelectActions.pure(r);
  }

  function makeSelectActions_15(e) {
    return makeSelectActions.raise(e);
  }

  function makeSelectActions_16() {
    try {
      return makeSelectActions.raise(err);
    } catch (ex) {
      return makeSelectActions_15(ex);
    }
  }

  function makeSelectActions_17() {
    try {
      return makeSelectActions.raise(_err);
    } catch (ex) {
      return makeSelectActions_15(ex);
    }
  }

  function makeSelectActions_18(a) {
    _fc = makeSelectActions_16, err = a;
    return makeSelectActions_12();
  }

  function makeSelectActions_19(a) {
    _fc = makeSelectActions_13, r = a;
    return makeSelectActions_12();
  }

  function makeSelectActions_20(a) {
    fc = makeSelectActions_12, _fc = makeSelectActions_17, _err = a;
    return makeSelectActions_11();
  }

  function makeSelectActions_21(a) {
    fc = makeSelectActions_12, _fc = makeSelectActions_13, r = a;
    return makeSelectActions_11();
  }
}

function propagateSelection(input) {
  var i,
      j,
      propagateSelection = M.asyncGenerator(_propagateSelection),
      loop,
      _loop,
      fc,
      _fc,
      r,
      err,
      _err;

  propagateSelection.$exit = propagateSelection_9;
  propagateSelection.handle = propagateSelection_10;
  propagateSelection.step = propagateSelection_1;
  return propagateSelection.unwrap;

  function propagateSelection_1() {
    propagateSelection.$exit = propagateSelection_14;
    propagateSelection.handle = propagateSelection_13;

    try {
      loop = M.iteratorM(input);
      return propagateSelection_2();
    } catch (ex) {
      return propagateSelection_13(ex);
    }
  }

  function propagateSelection_2() {
    try {
      propagateSelection.step = propagateSelection_3;
      return Promise.resolve(loop.step()).then(propagateSelection_3, propagateSelection_13);
    } catch (ex) {
      return propagateSelection_13(ex);
    }
  }

  function propagateSelection_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.element && i.element.classList.contains("selected")) {
          return propagateSelection_4();
        } else {
          propagateSelection.step = propagateSelection_2;
          propagateSelection.value = i;
          return propagateSelection;
        }
      } else {
        _fc = propagateSelection_8;
        return propagateSelection_7();
      }
    } catch (ex) {
      return propagateSelection_13(ex);
    }
  }

  function propagateSelection_4() {
    propagateSelection.$exit = propagateSelection_16;
    propagateSelection.handle = propagateSelection_15;

    try {
      _loop = M.iterator([...document.getElementsByClassName("selected")]);
      return propagateSelection_5();
    } catch (ex) {
      return propagateSelection_15(ex);
    }
  }

  function propagateSelection_5() {
    try {
      if (!(_loop = _loop.step()).done) {
        j = _loop.value;
        propagateSelection.step = propagateSelection_5;
        propagateSelection.value = _extends({}, i, { element: j });
        return propagateSelection;
      } else {
        fc = propagateSelection_2;
        return propagateSelection_6();
      }
    } catch (ex) {
      return propagateSelection_15(ex);
    }
  }

  function propagateSelection_6() {
    propagateSelection.$exit = propagateSelection_14;
    propagateSelection.handle = propagateSelection_13;

    try {
      if (_loop.exit) {
        _loop.exit();
      }

      err = _err;
      return fc();
    } catch (ex) {
      return propagateSelection_13(ex);
    }
  }

  function propagateSelection_7(a) {
    propagateSelection.$exit = propagateSelection_9;
    propagateSelection.handle = propagateSelection_10;

    try {
      if (loop.exit) {
        propagateSelection.step = _fc;
        return Promise.resolve(loop.exit()).then(_fc);
      } else {
        return _fc();
      }
    } catch (ex) {
      return propagateSelection_10(ex);
    }
  }

  function propagateSelection_8() {
    return propagateSelection.pure(r);
  }

  function propagateSelection_9(r) {
    propagateSelection.$exit = propagateSelection_9;
    propagateSelection.handle = propagateSelection_10;
    return propagateSelection.pure(r);
  }

  function propagateSelection_10(e) {
    return propagateSelection.raise(e);
  }

  function propagateSelection_11() {
    try {
      return propagateSelection.raise(err);
    } catch (ex) {
      return propagateSelection_10(ex);
    }
  }

  function propagateSelection_12() {
    try {
      return propagateSelection.raise(_err);
    } catch (ex) {
      return propagateSelection_10(ex);
    }
  }

  function propagateSelection_13(a) {
    _fc = propagateSelection_11, err = a;
    return propagateSelection_7();
  }

  function propagateSelection_14(a) {
    _fc = propagateSelection_8, r = a;
    return propagateSelection_7();
  }

  function propagateSelection_15(a) {
    fc = propagateSelection_7, _fc = propagateSelection_12, _err = a;
    return propagateSelection_6();
  }

  function propagateSelection_16(a) {
    fc = propagateSelection_7, _fc = propagateSelection_8, r = a;
    return propagateSelection_6();
  }
}

function inertiaStart(input) {
  var vx,
      vy,
      last,
      i,
      v,
      x,
      y,
      acc,
      maxAcc,
      ax,
      ay,
      t,
      ct,
      dt,
      nvx,
      nvy,
      _dt,
      inertiaStart = M.asyncGenerator(_inertiaStart),
      loop,
      fc,
      r,
      err;

  inertiaStart.$exit = inertiaStart_12;
  inertiaStart.handle = inertiaStart_13;
  inertiaStart.step = inertiaStart_1;
  return inertiaStart.unwrap;

  function inertiaStart_1() {
    try {
      vx = 0;
      vy = 0;
      last = void 0;
      return inertiaStart_2();
    } catch (ex) {
      return inertiaStart_13(ex);
    }
  }

  function inertiaStart_2() {
    inertiaStart.$exit = inertiaStart_16;
    inertiaStart.handle = inertiaStart_15;

    try {
      loop = M.iteratorM(input);
      return inertiaStart_3();
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_3() {
    try {
      inertiaStart.step = inertiaStart_4;
      return Promise.resolve(loop.step()).then(inertiaStart_4, inertiaStart_15);
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.element && i.element.classList.contains("inert")) {
          i.time = performance.now();
          if (i.type === "drop") {
            if (vx || vy) {
              v = Math.sqrt(vx * vx + vy * vy);

              if (v > 0.00001) {
                x = i.x;
                y = i.y;
                acc = 0.01;
                maxAcc = 0.009;
                ax = vx * acc / v;
                ay = vy * acc / v;

                if (Math.abs(ax) > maxAcc) {
                  ax = Math.sign(ax) * maxAcc;
                }if (Math.abs(ay) > maxAcc) {
                  ay = Math.sign(ay) * maxAcc;
                }t = i.time;
                return inertiaStart_5();
              } else {
                return inertiaStart_8();
              }
            } else {
              return inertiaStart_8();
            }
          } else {
            if (i.type === "dragging") {
              if (last) {
                _dt = i.time - last.time;

                vx = (i.x - last.x) / _dt;
                vy = (i.y - last.y) / _dt;
              }
              last = i;
            } else {
              last = null;
              vx = vy = 0;
            }
            return inertiaStart_9();
          }
        } else {
          return inertiaStart_9();
        }
      } else {
        fc = inertiaStart_11;
        return inertiaStart_10();
      }
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_5() {
    try {
      inertiaStart.step = inertiaStart_6;
      return Promise.resolve(new Promise(window.requestAnimationFrame)).then(inertiaStart_6, inertiaStart_15);
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_6(a) {
    try {
      ct = a;
      dt = ct - t;

      t = ct;
      x += vx * dt;
      y += vy * dt;
      nvx = vx - ax * dt;
      nvy = vy - ay * dt;

      vx = Math.sign(vx) === Math.sign(nvx) ? nvx : 0;
      vy = Math.sign(vy) === Math.sign(nvy) ? nvy : 0;
      inertiaStart.step = inertiaStart_7;
      inertiaStart.value = _extends({}, i, { type: "dragging", x, y, kind: "inertia" });
      return inertiaStart;
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_7() {
    try {
      if (vx === 0 && vy === 0) {
        return inertiaStart_8();
      } else {
        return inertiaStart_5();
      }
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_8() {
    try {
      last = null;
      vx = vy = 0;
      return inertiaStart_9();
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_9() {
    try {
      inertiaStart.step = inertiaStart_3;
      inertiaStart.value = i;
      return inertiaStart;
    } catch (ex) {
      return inertiaStart_15(ex);
    }
  }

  function inertiaStart_10() {
    inertiaStart.$exit = inertiaStart_12;
    inertiaStart.handle = inertiaStart_13;

    try {
      if (loop.exit) {
        inertiaStart.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return inertiaStart_13(ex);
    }
  }

  function inertiaStart_11() {
    return inertiaStart.pure(r);
  }

  function inertiaStart_12(r) {
    inertiaStart.$exit = inertiaStart_12;
    inertiaStart.handle = inertiaStart_13;
    return inertiaStart.pure(r);
  }

  function inertiaStart_13(e) {
    return inertiaStart.raise(e);
  }

  function inertiaStart_14() {
    try {
      return inertiaStart.raise(err);
    } catch (ex) {
      return inertiaStart_13(ex);
    }
  }

  function inertiaStart_15(a) {
    fc = inertiaStart_14, err = a;
    return inertiaStart_10();
  }

  function inertiaStart_16(a) {
    fc = inertiaStart_11, r = a;
    return inertiaStart_10();
  }
}

function inertiaIntercept(input) {
  var source,
      i,
      inertiaIntercept = M.asyncGenerator(_inertiaIntercept),
      loop,
      fc,
      r,
      err;
  inertiaIntercept.$exit = inertiaIntercept_8;
  inertiaIntercept.handle = inertiaIntercept_9;
  inertiaIntercept.step = inertiaIntercept_1;
  return inertiaIntercept.unwrap;

  function inertiaIntercept_1() {
    try {
      source = share(input);
      return inertiaIntercept_2();
    } catch (ex) {
      return inertiaIntercept_9(ex);
    }
  }

  function inertiaIntercept_2() {
    inertiaIntercept.$exit = inertiaIntercept_12;
    inertiaIntercept.handle = inertiaIntercept_11;

    try {
      loop = M.iteratorM(source);
      return inertiaIntercept_3();
    } catch (ex) {
      return inertiaIntercept_11(ex);
    }
  }

  function inertiaIntercept_3() {
    try {
      inertiaIntercept.step = inertiaIntercept_4;
      return Promise.resolve(loop.step()).then(inertiaIntercept_4, inertiaIntercept_11);
    } catch (ex) {
      return inertiaIntercept_11(ex);
    }
  }

  function inertiaIntercept_4(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;

        if (i.type === "dragging" && i.kind === "inertia" && i.over && i.over.classList.contains("inertia-intercept")) {
          inertiaIntercept.step = inertiaIntercept_5;
          inertiaIntercept.value = _extends({}, i, { type: "drop" });
          return inertiaIntercept;
        } else {
          inertiaIntercept.step = inertiaIntercept_3;
          inertiaIntercept.value = i;
          return inertiaIntercept;
        }
      } else {
        fc = inertiaIntercept_7;
        return inertiaIntercept_6();
      }
    } catch (ex) {
      return inertiaIntercept_11(ex);
    }
  }

  function inertiaIntercept_5() {
    try {
      fc = inertiaIntercept_7;
      return inertiaIntercept_6();
    } catch (ex) {
      return inertiaIntercept_11(ex);
    }
  }

  function inertiaIntercept_6() {
    inertiaIntercept.$exit = inertiaIntercept_8;
    inertiaIntercept.handle = inertiaIntercept_9;

    try {
      if (loop.exit) {
        inertiaIntercept.step = fc;
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return inertiaIntercept_9(ex);
    }
  }

  function inertiaIntercept_7() {
    return inertiaIntercept.pure(r);
  }

  function inertiaIntercept_8(r) {
    inertiaIntercept.$exit = inertiaIntercept_8;
    inertiaIntercept.handle = inertiaIntercept_9;
    return inertiaIntercept.pure(r);
  }

  function inertiaIntercept_9(e) {
    return inertiaIntercept.raise(e);
  }

  function inertiaIntercept_10() {
    try {
      return inertiaIntercept.raise(err);
    } catch (ex) {
      return inertiaIntercept_9(ex);
    }
  }

  function inertiaIntercept_11(a) {
    fc = inertiaIntercept_10, err = a;
    return inertiaIntercept_6();
  }

  function inertiaIntercept_12(a) {
    fc = inertiaIntercept_7, r = a;
    return inertiaIntercept_6();
  }
}

function anim(delay = 100) {
  var start,
      stop,
      step,
      cur,
      anim = M.asyncGenerator(_anim);
  anim.$exit = anim_4;
  anim.handle = anim_5;
  anim.step = anim_1;
  return anim.unwrap;

  function anim_1() {
    try {
      start = performance.now();
      stop = start + delay;
      step = 1 / delay;
      cur = void 0;
      return anim_2();
    } catch (ex) {
      return anim_5(ex);
    }
  }

  function anim_2() {
    try {
      anim.step = anim_3;
      return Promise.resolve(new Promise(window.requestAnimationFrame)).then(anim_3);
    } catch (ex) {
      return anim_5(ex);
    }
  }

  function anim_3(b) {
    var a;

    try {
      a = cur = b;

      if (a <= stop) {
        anim.step = anim_2;
        anim.value = step * (cur - start);
        return anim;
      } else {
        return anim.pure();
      }
    } catch (ex) {
      return anim_5(ex);
    }
  }

  function anim_4(r) {
    anim.$exit = anim_4;
    anim.handle = anim_5;
    return anim.pure(r);
  }

  function anim_5(e) {
    return anim.raise(e);
  }
}

let callback;
const queue = [];
function send(event) {
  if (!queue.length && callback) callback();
  queue.push(event);
}

function produce() {
  var produce = M.asyncGenerator(_produce);
  produce.$exit = produce_2;
  produce.handle = produce_3;
  produce.step = produce_1;
  return produce.unwrap;

  function produce_1() {
    var a;

    try {
      if (queue.length) {
        a = queue.shift();
        produce.step = produce_1;
        produce.value = a;
        return produce;
      } else {
        produce.step = produce_1;
        return Promise.resolve(new Promise(i => callback = i)).then(produce_1);
      }
    } catch (ex) {
      return produce_3(ex);
    }
  }

  function produce_2(r) {
    produce.$exit = produce_2;
    produce.handle = produce_3;
    return produce.pure(r);
  }

  function produce_3(e) {
    return produce.raise(e);
  }
}

function consume(input) {
  var i,
      consume = M.async(_consume),
      loop,
      fc,
      fe,
      err;

  try {
    return consume_1();
  } catch (ex) {
    return consume_6(ex);
  }

  function consume_1() {
    try {
      loop = M.iteratorM(input);
      return consume_2();
    } catch (ex) {
      return consume_8(ex);
    }
  }

  function consume_2() {
    try {
      return Promise.resolve(loop.step()).then(consume_3, consume_8);
    } catch (ex) {
      return consume_8(ex);
    }
  }

  function consume_3(c) {
    var a, b;

    try {
      b = loop = c;
      a = b.done;

      if (!a) {
        i = loop.value;
        return consume_2();
      } else {
        fc = consume_5, fe = consume_6;
        return consume_4();
      }
    } catch (ex) {
      return consume_8(ex);
    }
  }

  function consume_4() {
    try {
      if (loop.exit) {
        return Promise.resolve(loop.exit()).then(fc);
      } else {
        return fc();
      }
    } catch (ex) {
      return consume_6(ex);
    }
  }

  function consume_5() {
    return Promise.resolve();
  }

  function consume_6(e) {
    return Promise.reject(e);
  }

  function consume_7() {
    try {
      return Promise.reject(err);
    } catch (ex) {
      return consume_6(ex);
    }
  }

  function consume_8(a) {
    fc = consume_7, fe = consume_6, err = a;
    return consume_4();
  }
}

if (POINTER_EVENTS) {
  document.addEventListener("pointermove", send, false);
  document.addEventListener("pointerdown", send, false);
  document.addEventListener("pointerup", send, false);
} else {
  document.addEventListener("mousemove", send, false);
  document.addEventListener("mousedown", send, false);
  document.addEventListener("mouseup", send, false);
  document.addEventListener("touchstart", send, false);
  document.addEventListener("touchend", send, false);
  document.addEventListener("touchcancel", send, false);
  document.addEventListener("touchmove", send, false);
}

function share(iterable) {
  const iterator = iterable[Symbol.asyncIterator]();
  return {
    next(value) {
      return iterator.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

consume(main(produce()));

},{"@effectful/es-inline-rt":1}]},{},[2]);
