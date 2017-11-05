export var IteratorPrototype = {}

export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  IteratorPrototype[Symbol.iterator] = function () { return this }

import {Symbol} from "./symbol"

/** wraps lean iterator into ES iterator, the name is to conform ES standard */
export var Generator

/** wraps generator function to adapt its object model for ES conformance */
export var generatorFunction

/** a function to convert lean iterator to ES iterator */
export var esIterator

if (process.env.EJS_NO_ES_ITERATORS) {
  Generator = function Generator() {}
} else {
  Generator = function Generator(lean) {
    this.state = lean
  }
  
  var Gp = Generator.prototype = Object.create(IteratorPrototype)
  
  if (!process.env.EJS_NO_ES_OBJECT_MODEL) {
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    GeneratorFunctionPrototype.prototype = Gp
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[Symbol.toString] =
    GeneratorFunction.displayName = "GeneratorFunction";
    generatorFunction = function generatorFunction(fun) {
      Object.setPrototypeOf(fun, GeneratorFunctionPrototype)
      fun.prototype = Object.create(Gp)
      return fun
    }
  }
  
  Gp[Symbol.leanIterator] = function() {
    return this.state
  }
  
  Gp.next = function esFromLeanNext(v) {
    var next = this.state = this.state.step(v)
    return {value:next.value,done:next.done}
  }
  
  Gp.throw = function esFromLeanThrow(e) {
    var next = this.state = this.state.handle(e)
    return {value:next.value,done:next.done}
  }
  
  Gp.return = function esFromLeanReturn(v) {
    var next = this.state = this.state.exit(v)
    return {value:next.value,done:next.done}
  }

  esIterator = function esIterator(lean) {
    return lean[Symbol.iterator] ? lean : new Generator(lean)
  }
}

