import {iterator as iterSym, delegateIterator as delegateSym} from "./symbol"
import {DelegateWrap} from "./leanIterator"

export var IteratorPrototype = {}

export var AsyncIteratorPrototype = {}

if (!process.env.EJS_NO_ES_ITERATORS)
  IteratorPrototype[Symbol.iterator] = function () { return this }

/** wraps lean iterator into ES iterator, the name is to conform ES standard */
export var Generator

/** wraps generator function to adapt its object model for ES conformance */
export var generatorFunction

/** a function to convert lean iterator to ES iterator */
export var esIterator

var Gp

if (process.env.EJS_DELEGATE_FOR_OF) {
  Generator = function Generator(u) {
    this.value = u.value
    this.done = u.done
    this.$running = false
    this.unwrap = this
    this.$t = u
  }

  Gp = Generator.prototype = Object.create(IteratorPrototype)

  Gp.$step = Gp.$yld = function(value) {
    this.value = value
    return this
  }
  
  function trampoline(t) {
    if (!process.env.EJS_NO_TRAMPOLINE) {
      while (t.$running) {
        t.$running = false
        t = t.$step()
      }
    }
  }
  
  Gp.step = function(value) {
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.$step(value)
    else
      trampoline(this.$t.$step(value))
    return this
  }
  
  Gp.handle = function(error) {
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.$handle(error)
    else
      trampoline(this.$t.$handle(error))
    return this
  }

  Gp.$exit = function(value) {
    this.done = true
    this.value = value
    return this
  }

  Gp.exit = function(value) {
    var t = this.$t
    this.$t = this
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.$exit(value)
    else
      trampoline(this.$t.$exit(value))
    return this
  }

  Gp.$raise = Gp.$handle = function(ex) {
    this.$t = this
    this.value = void 0
    this.done = true
    throw ex
  }

  Gp[Symbol.iterator] = Gp[iterSym] = function() {
    return this
  }

  Gp[delegateSym] = function(dst,y,r,rstep,iyld) {
    return new DelegateWrap(this,dst,y,r,rstep,iyld)
  }

  Gp.next = function(value) {
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.$step(value)
    else
      trampoline(this.$t.$step(value))
    return {value:this.value, done: this.done}
  }

  Gp.return = function(value) {
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.exit(value)
    else
      trampoline(this.$t.exit(value))
    return {value:this.value, done: this.done}
  }

  Gp.throw = function(error) {
    if (process.env.EJS_NO_TRAMPOLINE)
      this.$t.$handle(error)
    else
      trampoline(this.$t.$handle(error))
    return {value:this.value, done: this.done}
  }
} else if (process.env.EJS_NO_ES_ITERATORS) {
  Generator = function Generator() {}
} else {
  Generator = function Generator(lean) {
    this.$t = lean
  }
  
  Gp = Generator.prototype = Object.create(IteratorPrototype)
  
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
  
  Gp[iterSym] = function() { return this.$t }

  Gp.next = function esFromLeanNext(v) {
    var next = this.$t.step(v)
    this.$t = next
    return {value:next.value,done:next.done}
  }
  
  Gp.throw = function esFromLeanThrow(e) {
    var next = this.$t = this.$t.handle(e)
    return {value:next.value,done:next.done}
  }
  
  Gp.return = function esFromLeanReturn(v) {
    var next = this.$t = this.$t.exit(v)
    return {value:next.value,done:next.done}
  }

  esIterator = function esIterator(lean) {
    return lean[Symbol.iterator] ? lean : new Generator(lean)
  }
}

