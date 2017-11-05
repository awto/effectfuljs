/**
 * lean iterator for JS array
 */
import {LeanIteratorPrototype} from "./leanIterator"
import {Symbol} from "./symbol"

function ArrayLeanIterator(arr) {
  this.arr = arr
  this.x = 0
  this.done = arr.length === 0
  this.value = void 0
  this.$sub = void 0
}

ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype)

ArrayLeanIterator.prototype.step = function step() {
  if (this.x >= this.arr.length)
    return this.pure()
  this.value = this.arr[this.x++]
  return this
}

ArrayLeanIterator.prototype.raise = function pure(ex) {
  this.value = void 0
  this.done = true
  throw ex
}

ArrayLeanIterator.prototype.pure = function pure(value) {
  this.value = value
  this.done = true
  return this
}

ArrayLeanIterator.prototype.exit = function exit() {
  this.value = void 0
  this.done = true
  return this
}

ArrayLeanIterator.prototype.handle = function handle(e) {
  return this.exit()
}

ArrayLeanIterator.prototype.next = function next() {
  this.step()
  return this
}

ArrayLeanIterator.prototype.next = function next() {
  this.step()
  return {value: this.value, done: this.done }
}

Array.prototype[Symbol.leanIterator] = function() {
  return new ArrayLeanIterator(this)
}

