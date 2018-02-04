import {iterator as iterSym, delegateIterator as delegateSym} from "./symbol"

export var LeanIteratorPrototype = {}

LeanIteratorPrototype[iterSym] = function () { return this }

export var iterator, delegate, DelegateWrap

if (process.env.EJS_NO_ES_ITERATORS) {
  iterator = function iterator(cont) {
    return cont[iterSym]()
  }
} else {
  function LeanIterator(iter) {
    this.iter = iter[Symbol.iterator]()
    this.done = false
  }

  var LIp = LeanIterator.prototype = Object.create(LeanIteratorPrototype)

  LIp[Symbol.iterator] = function() { return this.iter }

  if (process.env.EJS_DELEGATE_FOR_OF) {

    DelegateWrap = function DelegateWrap(inner,dst,y,r,rstep,iyld) {
      this.$running = false
      this.unwrap = dst.unwrap
      this.$s = this
      this.$i = this.$e = dst
      this.$y = y
      this.$r = r
      this.$rstep = rstep
      this.$iyld = iyld
      this.inner = inner
    }
    
    var DWp = DelegateWrap.prototype
    
    DWp.step = DWp.$step = function(v) {
      var inner = this.inner
      inner = this.inner = inner.step(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$yld(inner.value)
      }
    }
    
    DWp.handle = DWp.$handle = function(v) {
      var inner = this.inner
      inner = this.inner = inner.handle(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$yld(inner.value)
      }
    }
    
    DWp.exit = DWp.$exit = function(v) {
      var inner = this.inner
      if (!inner.exit) {
        this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(inner.value)
      }
      inner = this.inner = inner.exit(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$yld(inner.value)
      }
    }
    delegate = function delegate(cont,y,r,rstep,iyld) {
      return cont[delegateSym] ? cont[delegateSym](this,y,r,rstep,iyld)
        : cont[iterSym] ? new DelegateWrap(cont[iterSym](),this,y,r,rstep,iyld)
        : new LeanDelegateIterator(cont[Symbol.iterator](),this,y,r,rstep,iyld)
    }

    /* wraps ES iteratos 
     * (could DelegateWrap instead, but avoiding double allocations
     */
    function LeanDelegateIterator(iter,dst,y,r,rstep,iyld) {
      this.$running = false
      this.unwrap = dst.unwrap
      this.$s = this
      this.$i = this.$e = dst
      this.$y = y
      this.$r = r
      this.$rstep = rstep
      this.$iyld = iyld
      this.inner = iter
    }

    const LDIp = LeanDelegateIterator.prototype
    
    LDIp.step = LDIp.$step = function step(v) {
      var next = this.inner.next(v)
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
	      return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$yld(next.value)
    }
    LDIp.handle = LDIp.$handle = function handle(e) {
      var iter = this.inner, next
      if (!iter.throw) {
        if (iter.return) {
          try {
            iter.return()
          } catch(e) {
            return this.$r.$handle(e)
          }
        }
        return this.$r.$handle(new TypeError("iterator does not have a throw method"))
      }
      try {
        next = this.inner.throw(e)
      } catch(e) {
        return this.$r.$handle(e)
      }
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$yld(next.value)
    }
    
    LDIp.exit = LDIp.$exit = function exit(value) {
      var iter = this.inner, next
      if (!iter.return) {
	      this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
	      return this.$r.$res(value)
      }
      try {
        next = iter.return(value)
      } catch (e) {
        return this.$r.$handle(e)
      }
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$yld = this.$iyld
        return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$yld(next.value)
    }
    
  }
  
  LIp.step = LIp.$step = function step(v) {
    var next = this.iter.next(v)
    if (next.done)
      return this.pure(next.value)
    this.value = next.value
    return this
  }

  
  LIp.pure = function pure(value) {
    this.value = value
    this.done = true
    return this
  }
  
  LIp.raise = function raise(ex) {
    this.value = void 0
    this.done = true
    throw ex
  }

  LIp[iterSym] = function() { return this }
  
  LIp.handle = function handle(e) {
    var iter = this.iter, next
    if (!iter.throw) {
      if (iter.return) {
        try {
          iter.return()
        } catch(e) {
          return this.raise(e)
        }
      }
      return this.raise(new TypeError("iterator does not have a throw method"))
    }
    try {
      next = this.iter.throw(e)
    } catch(e) {
      return this.raise(e)
    }
    return next.done ? this.pure(next.value) : this.yld(next.value) 
  }
  
  LIp.exit = function exit(value) {
    var iter = this.iter, next
    if (!iter.return)
      return this.pure(value)
    try {
      next = iter.return(value)
    } catch (e) {
      return this.raise(e)
    }
    return next.done ? this.pure(next.value) : this.yld(next.value) 
  }

  iterator = function iterator(cont) {
    return cont[iterSym] ? cont[iterSym]() : new LeanIterator(cont)
  }
}
