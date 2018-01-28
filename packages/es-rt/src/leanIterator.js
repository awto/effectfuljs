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

    DelegateWrap = function DelegateWrap(inner,dst,y,r,rstep,istep) {
      this.inner = inner
      this.$s = this
      this.$i = this.$e = dst
      this.$y = y
      this.$r = r
      this.$rstep = rstep
      this.$istep = istep
      this.unwrap = dst.unwrap
    }
    
    var DWp = DelegateWrap.prototype
    
    DWp.step = DWp.$step = function(v) {
      var inner = this.inner
      inner = this.inner = inner.step(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$step = this.$istep
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$step(inner.value)
      }
    }
    
    DWp.handle = DWp.$handle = function(v) {
      var inner = this.inner
      inner = this.inner = inner.handle(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$step = this.$istep
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$step(inner.value)
      }
    }
    
    DWp.exit = DWp.$exit = function(v) {
      var inner = this.inner
      inner = this.inner = inner.exit(v)
      if (inner.done) {
        this.$r.$res = this.$rstep, this.$i.$step = this.$istep
        return this.$r.$res(inner.value)
      } else {
        this.unwrap.$t = this
        return this.$y.$step(inner.value)
      }
    }
    delegate = function delegate(cont,y,r,rstep,istep) {
      return cont[delegateSym] ? cont[delegateSym](this,y,r,rstep,istep)
        : cont[iterSym] ? new DelegateWrap(cont[iterSym](),this,y,r,rstep,istep)
        : new LeanDelegateIterator(cont[Symbol.iterator](),this,y,r,rstep,istep)
    }

    /* wraps ES iteratos 
     * (could DelegateWrap instead, but avoiding double allocations
     */
    function LeanDelegateIterator(iter,dst,y,r,rstep,istep) {
      this.iter = iter[Symbol.iterator]()
      this.done = false
      this.$s = this
      this.$i = this.$e = dst
      this.$y = y
      this.$r = r
      this.$rstep = rstep
      this.$istep = istep
      this.unwrap = dst.unwrap
    }

    const LDIp = LeanDelegateIterator.prototype
    
    LDIp.step = LDIp.$step = function step(v) {
      var next = this.iter.next(v)
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$step = this.$istep
	      return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$step(next.value)
    }
    LDIp.handle = LDIp.$handle = function handle(e) {
      var iter = this.iter, next
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
        next = this.iter.throw(e)
      } catch(e) {
        return this.$r.$handle(e)
      }
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$step = this.$istep
        return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$step(next.value)
    }
    
    LDIp.exit = LDIp.$exit = function exit(value) {
      var iter = this.iter, next
      if (!iter.return) {
	      this.$r.$res = this.$rstep, this.$i.$step = this.$istep
	      return this.$r.$res(value)
      }
      try {
        next = iter.return(value)
      } catch (e) {
        return this.$r.$handle(e)
      }
      if (next.done) {
	      this.$r.$res = this.$rstep, this.$i.$step = this.$istep
        return this.$r.$res(next.value)
      }
      this.unwrap.$t = this
      return this.$y.$step(next.value)
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
