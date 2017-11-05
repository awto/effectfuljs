/**
 * exports Symbols to get lean iterators from containers at runtime
 * 
 * if option LEAN_ITERATOR_SYMBOL_GLOBAL is set it will use global 
 * symbols, so no 2 implementation can exist in a single process
 */

var Sym = process.env.EJS_LOCAL_SYMBOLS
      ? { leanIterator: Symbol("Effectful.leanIterator"),
          leanAsyncIterator: Symbol("Effectful.leanAsyncIterator") }
      : { leanIterator: Symbol.for("Effectful.leanIterator"),
          leanAsyncIterator: Symbol.for("Effectful.leanAsyncIterator") }

Sym.iterator = Symbol.iterator

if (!process.env.EJS_NO_ES_ITERATORS && !Symbol.asyncIterator)
  Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator")

Sym.asyncIterator = Symbol.asyncIterator
if (!process.env.EJS_NO_ES_OBJECT_MODEL)
  Sym.toString = Symbol.toString

if (!process.env.EJS_LOCAL_SYMBOLS) {
  Symbol.leanIterator = Sym.leanIterator
  Symbol.leanAsyncIterator = Sym.leanAsyncIterator
}

export {Sym as Symbol}

