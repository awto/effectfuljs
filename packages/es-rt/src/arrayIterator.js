/**
 * lean iterator for JS array
 */
import {LeanIteratorPrototype} from "./leanIterator"
import {iterator as iterSym} from "./symbol"

function ArrayLeanIterator(arr) {
  this.arr = arr
  this.x = 0
  this.done = arr.length === 0
  this.value = void 0
  if (process.env.EJS_DELEGATE_FOR_OF)
    this.$ = this
}

var ALIp = ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype)

ALIp.deb_DEL = process.env.EJS_DELEGATE_FOR_OF

ALIp.step = function step() {
  if (this.x >= this.arr.length)
    return this.pure()
  this.value = this.arr[this.x++]
  return this
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

if (process.env.EJS_DELEGATE_FOR_OF) {
  ALIp.regForOf = function(yld,step) {
    var self = this
    this.step = this.$step = function delegateStep() {
      if (self.x >= self.arr.length)
        return step()
      return yld(self.arr[self.x++])
    }
    return this
  }
  ALIp.regYldStar = function(dest) {
    var step = dest.$.$step, self = this
    dest.$.$step = delegateStep
    delegateStep()
    function delegateStep() {
      if (self.x >= self.arr.length)
        step()
      else {
        dest.yld(self.arr[self.x++])
      }
    }
  }
  ALIp.$step = ALIp.step
}


Array.prototype[iterSym] = function() {
  return new ArrayLeanIterator(this)
}
