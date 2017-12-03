import {asyncIterator as asyncIterSym} from "./symbol"
import {AsyncGenerator} from "./esAsyncIterator"
import {iterator} from "./leanIterator"
import {forInIterator} from "./forInIterator"
import {LeanGenerator,makeDelegateYld,defaultStep} from "./generator"
import {iteratorM,UnwrapWrapper} from "./leanAsyncIterator"
import {Async} from "./async"

var makeLean = process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR
    ? function() { return new LeanAsyncGenerator() }
    : function() { return new UnwrapWrapper(new LeanAsyncGenerator()) }

export var asyncGenerator =
  !process.env.EJS_NO_ES_OBJECT_MODEL ? function asyncGenerator(caller) {
    var res = new LeanAsyncGenerator(),
        esProto = caller && caller.prototype instanceof AsyncGenerator
        ? caller.prototype
        : AsyncGenerator.prototype,
        unwrap = res.unwrap = Object.create(esProto)
    unwrap.state = process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR
      ? res
      : new UnwrapWrapper(res)
    unwrap.queue = []
    unwrap.busy = null
    return res
  } : !process.env.EJS_NO_ES_ITERATORS ? function asyncGenerator() {
    var res = new LeanAsyncGenerator()
    res.unwrap = new AsyncGenerator(
      process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR
        ? res
        : new UnwrapWrapper(res))
    return res
  } : function asyncGenerator() {
    return new LeanAsyncGenerator()
  }

function LeanAsyncGenerator() {
  this.$state = void 0
  this.done = false
}

var LAGp = LeanAsyncGenerator.prototype

var LGp = LeanGenerator.prototype
if (!process.env.EJS_INLINE) {
  var Ap = Async.prototype
  LAGp.scope = LGp.scope
  LAGp.yldStar = LGp.yldStar
  LAGp.chain = Ap.chain
  LAGp.jump = LGp.jump
  LAGp.yld = LGp.yld
  if (process.env.EJS_DEFUNCT)
    LAGp.$step = LGp.$step
  if (process.env.EJS_LEAN_METHOD_ITERATORS) {
    LAGp.iterator = iterator
    LAGp.forInIterator = forInIterator
    LAGp.iteratorM = iteratorM
  }
} else if (process.env.EJS_DEFUNCT) {
  LAGp.chain = Async.prototype.chain
}

LAGp[asyncIterSym] = LAGp[Symbol.asyncIterator] = function() { return this }
if (process.env.EJS_DEFUNCT)
  LAGp.runStep = LGp.runStep

LAGp.step = defaultStep

LAGp.exit = LGp.exit
LAGp.handle = LGp.handle
LAGp.pure = LGp.pure
LAGp.raise = LGp.raise

LAGp.delegateYld = makeDelegateYld(iteratorM)


