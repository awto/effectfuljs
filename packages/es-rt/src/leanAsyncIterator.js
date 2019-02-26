import {cancel as cancelSym} from "./symbol"

export function AsyncIterator() {} 
var AsyncIteratorPrototype = AsyncIterator.prototype

AsyncIteratorPrototype[Symbol.asyncIterator] = function () { return this }

/** if `yield` argument is a promise it will be resolved (demanded by ECMAScript) */
export var UnwrapWrapper

/** queue for `next/throw/return` demanded by ECMAScript */
export var QueueWrapper

/** function returning lean async iterator for async iterable object */
export var iteratorM = function asyncIterator(cont) {
  return cont[Symbol.asyncIterator] ? cont[Symbol.asyncIterator]() : cont[Symbol.iterator](cont)
}

export function cancel(promise) {
  if (promise && promise[cancelSym])
    return promise[cancelSym]()
  return Promise.resolve()
}

export function ignore(promise) {
  return Promise.resolve(promise).then(function(){})
}

