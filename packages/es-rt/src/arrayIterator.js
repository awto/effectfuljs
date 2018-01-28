/**
 * lean iterator for JS array
 */
import {LeanIteratorPrototype} from "./leanIterator"
import {Generator} from "./esIterator"
import {iterator as iterSym, delegateIterator as delegateSym} from "./symbol"

function ArrayLeanIterator(arr) {
  this.arr = arr
  this.x = 0
  this.done = arr.length === 0
  this.value = void 0
}

var ALIp = ArrayLeanIterator.prototype = Object.create(LeanIteratorPrototype)

if (process.env.EJS_DELEGATE_FOR_OF) {
  function ArrayLeanDelegateIterator(arr,dst,y,r,rstep,istep) {
    this.arr = arr
    this.x = 0
    this.done = arr.length === 0
    this.$s = this
    this.$i = this.$e = dst
    this.$y = y
    this.$r = r
    this.$rstep = rstep
    this.$istep = istep
    this.unwrap = dst.unwrap
  }
  var ALDIp = ArrayLeanDelegateIterator.prototype
  ALDIp.step = ALDIp.$step = function() {
    if (this.x >= this.arr.length) {
      this.$r.$res = this.$rstep, this.$i.$step = this.$istep
      return this.$r.$res()
    }
    this.unwrap.$t = this
    return this.$y.$step(this.arr[this.x++])
  }
  ALDIp.exit = ALDIp.$exit = function() {
    this.done = true
    this.$r.$res = this.$rstep, this.$i.$step = this.$istep
    this.x = this.arr.lenth
    return this.$r.$res()
  }
  ALDIp[iterSym] = function() {
    return Object.create(ALIp,{arr:this.arr,x:this.x,done:this.done})
  }
  ALIp[delegateSym] = ALDIp[delegateSym] = function(dst,y,r,rstep,istep) {
    var res = new ArrayLeanDelegateIterator(this.arr,dst,y,r,rstep,istep)
    res.x = this.x
    res.done = this.done
    return res
  }
  ALIp.step = ALIp.$step = function() {
    if (this.x >= this.arr.length) {
      this.done = true
      this.value = void 0
    } else
      this.value = this.arr[this.x++]
    return this
  }
  Array.prototype[delegateSym] = function(dst,y,r,rstep,istep) {
    return new ArrayLeanDelegateIterator(this,dst,y,r,rstep,istep)
  }
  Array.prototype[iterSym] = function() {
    return new ArrayLeanIterator(this)
  }
  Array.prototype[delegateSym] = function(dst,y,r,rstep,istep) {
    return new ArrayLeanDelegateIterator(this,dst,y,r,rstep,istep)
  }
} else {
  ALIp.step = function step() {
    if (this.x >= this.arr.length)
      return this.pure()
    this.value = this.arr[this.x++]
    return this
  }
  Array.prototype[iterSym] = function() {
    return new ArrayLeanIterator(this)
  }
}

ALIp[iterSym] = function() { return this }

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
  return {value: this.value, done: this.done }
}


