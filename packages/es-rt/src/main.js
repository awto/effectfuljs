import "./arrayIterator"
export {forInIterator} from "./forInIterator"
export {iterator} from "./leanIterator"
export {generatorFunction,Generator,generator,esIterator} from "./generator"
export {asyncFunction,async,Async} from "./async"
export {iteratorM} from "./leanAsyncIterator"
export {asyncGenerator,AsyncGenerator,asyncGeneratorFunction,esAsyncIterator}
  from "./asyncGenerator"

// TODO: move to (info) file
export var opts = {
  inline: !!process.env.EJS_INLINE,
  iteratorMethods: !!process.env.EJS_LEAN_METHOD_ITERATORS,
  objectModel: !process.env.EJS_NO_ES_OBJECT_MODEL,
  checkRunning: !process.env.EJS_NO_ES_CHECK_GENERATOR_RUNNING,
  unwrapAsync: !process.env.EJS_NO_UNWRAP_ASYNC_ITERATOR,
  localSymbols: !!process.env.EJS_LOCAL_SYMBOLS,
  defunct: !!process.env.EJS_DEFUNCT,
  delegateForOf: !!process.env.EJS_DELEGATE_FOR_OF,
  delegateYieldStar: !!process.env.EJS_DELEGATE_YIELD_STAR
}

