
/** converts closure object to a function */
function func(clos) {
  return function() {
    return clos.apply(this, arguments)
  }
}

/** converts first algument from closure object to a function */
function lift1(fun) {
  return function(cb) {
    if (!cb)
      return fun.apply(this, arguments)
    return fun.apply(
      this, [func(cb)].concat(Array.prototype.splice.call(arguments,1)))
  }
}

Array.prototype.forEach = function(fn, thisArgs) {
  var len = this.length, i
  for(i = 0; i < len; ++i)
    fn.call(thisArgs, this[i], i, this)
}

Array.prototype.filter = function filter(fn, thisArg) {
  var res = [], i, len = this.length, v
  for(i = 0; i < len; ++i) {
    v = this[i]
    if (fn.call(thisArg, v, i, this))
      res.push(v)
  }
  return res
}

Array.prototype.findIndex = function findIndex(fn, thisArg) {
  var res = [], i, len = this.length
  for(i = 0; i < len; ++i) {
    if (fn.call(thisArg, this[i], i, this))
      return i
  }
  return -1
}

Array.prototype.find = function find(fn, thisArg) {
  var res = [], i, len = this.length, v
  for(i = 0; i < len; ++i) {
    v = this[i]
    if (fn.call(thisArg, v, i, this))
      return v
  }
}

Array.prototype.sort = lift1(Array.prototype.sort)
Array.prototype.reduce = lift1(Array.prototype.reduce)
Array.prototype.reduceRight = lift1(Array.prototype.reduceRight)
Array.prototype.some = lift1(Array.prototype.some)
Array.prototype.every = lift1(Array.prototype.every)

Set.prototype.forEach = lift1(Set.prototype.forEach)
Map.prototype.forEach = lift1(Set.prototype.forEach)


function Bind(inner, args) {
  this.inner = inner
  this.args = args
}

closure(Bind, function bind() {
  var arr = []
  arr.push.apply(arr, this.args)
  arr.push.apply(arr, arguments)
  return this.inner.apply(this.inner,arr)
})

function bind() {
  return new Bind(this, arguments)
}

function apply(self, args) {
  var arr = [self]
  arr.push.apply(arr, args)
  return this.call.apply(this, arr)
}

function constrImpl(func, args) {
  var arr = [this]
  arr.push.apply(arr, args)
  func.call.apply(func, arr)
}

function constr() {
  return new constrImpl(this, arguments)
}

function closure(constructor,call) {
  var proto = constructor.prototype
  proto.call = call
  proto.length = call.length - 1
  proto.bind = bind
  proto.apply = apply
  proto.constr = constr
}




