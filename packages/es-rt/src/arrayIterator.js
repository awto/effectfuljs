/**
 * lean iterator for JS array
 */
import {LeanIteratorPrototype} from "./leanIterator"
import {iterator as iterSym, delegateIterator as diSym} from "./symbol"

function ArrayLeanIterator(arr) {
  this.arr = arr
  this.x = 0
  this.done = arr.length === 0
  this.value = void 0
  this.$sub = void 0
}

var ALIp = ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype)

if (process.env.EJS_DELEGATE_ITERATOR) {
  ALIp[diSym] = function(yld,raise,pure) {
    this.yld = yld
    this.raise = raise
    this.pure = pure
    return this
  }
  ALIp.step = function step() {
    return this.x >= this.arr.length
      ? this.pure()
      : this.yld(this.arr[this.x++])
  }
} else {
  ALIp.step = function step() {
    if (this.x >= this.arr.length)
      return this.pure()
    this.value = this.arr[this.x++]
    return this
  }
}

ALIp.yld = function(v) {
  this.value = v
  return this
}

ALIp.raise = function pure(ex) {
  this.value = void 0
  this.done = true
  throw ex
}

ALIp.pure = function pure(value) {
  this.value = value
  this.done = true
  return this
}

ALIp.exit = function exit() {
  this.value = void 0
  this.done = true
  return this
}

ALIp.handle = function handle(e) {
  return this.exit()
}

ALIp.next = function next() {
  this.step()
  return this
}

ALIp.next = function next() {
  this.step()
  return {value: this.value, done: this.done }
}

Array.prototype[iterSym] = function() {
  return new ArrayLeanIterator(this)
}

if (process.env.EJS_DELEGATE_ITERATOR)
  Array.prototype[diSym] =  Array.prototype[iterSym]
