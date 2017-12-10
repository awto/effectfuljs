import {iterator as iterSym,
        invertedIterator as invertedIterSym} from "./symbol"

export var LeanIteratorPrototype = {}

LeanIteratorPrototype[iterSym] = function () { return this }

export var iterator

if (process.env.EJS_NO_ES_ITERATORS) {
  iterator = function iterator(cont) {
    return cont[iterSym]()
  }
} else {
  function LeanIterator(iter) {
    this.iter = iter[Symbol.iterator]()
    this.done = false
    if (process.env.EJS_DELEGATE_FOR_OF)
      this.$ = this
  }

  var LIp = LeanIterator.prototype = Object.create(LeanIteratorPrototype)

  LIp[Symbol.iterator] = function() { return this.iter }

  LIp.step = function step(v) {
    var next = this.iter.next(v)
    if (next.done)
      return this.pure(next.value)
    this.value = next.value
    return this
  }

  LIp.yld = function(v) {
    this.value = v
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

  if (process.env.EJS_DELEGATE_FOR_OF) {
    LIp.regForOf = function(yld,done) {
      var self = this
      this.step = this.$step = function delegate(v) {
        var next = self.iter.next(v)
        if (next.done)
          done(next.value)
        else
          yld(next.value)
      }
      return this
    }
    LIp.regYldStar = function(dest) {
      var step = dest.$.$step, handle = dest.$.$handle, iter = this.iter
      dest.$.$step = delegateStep
      dest.$.$handle = function delegateHandle(e) {
        var next
        if (!iter.throw) {
          if (iter.return) {
            try {
              iter.return()
              } catch(e) {
                handle(e)
                return
              }
          }
          handle(new TypeError("iterator does not have a throw method"))
          return
        }
        try {
          next = iter.throw(e)
        } catch(e) {
          handle(e)
          return 
        }
        if (next.done)
          step(next.value)
        else
          dest.yld(next.value)
      }
      dest.$.$exit = function delegateExit(value) {
        if (!iter.return) {
          step(value)
          return 
        }
        try {
          next = iter.return(value)
        } catch (e) {
          handle(e)
          return
        }
        var next = iter.return(value)
        if (next.done)
          step(next.value)
        else
          dest.yld(next.value)
      }
      delegateStep()
      function delegateStep(v) {
        var next = iter.next(v)
        if (next.done)
          step(next.value)
        else
          dest.yld(next.value)
      }      
    }
    LIp.$step = LIp.step 
  }

  iterator = function iterator(cont) {
    return cont[iterSym] ? cont[iterSym]() : new LeanIterator(cont)
  }
}

