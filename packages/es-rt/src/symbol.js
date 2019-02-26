/**
 * exports Symbols to get lean iterators from containers at runtime
 * 
 * if option EJS_LOCAL_SYMBOLS is set it will use local  symbols, 
 * so different implementations are possible in a single process
 */

export var iterator = process.env.EJS_LOCAL_SYMBOLS
  ? Symbol("Effectful.iterator")
  : Symbol.for("Effectful.iterator")

if (!process.env.EJS_NO_ES_ITERATORS && !Symbol.asyncIterator)
  Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator")

export var cancel = process.env.EJS_LOCAL_SYMBOLS
  ? Symbol("Effectful.cancel")
  : Symbol.for("Effectful.cancel")

if (!process.env.EJS_LOCAL_SYMBOLS) {
  Symbol.effectfulIterator = iterator
  Symbol.effectfulCancel = cancel
}
