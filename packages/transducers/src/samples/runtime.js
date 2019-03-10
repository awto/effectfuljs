var LAZY = false;
exports.e$y$make = LAZY
  ? function make(fun) {
      var res = function(buf) {
        var res;
        if (buf == null) {
          buf = [];
          res = fun(buf);
          return res;
        }
        return fun(buf);
      };

      res.fun = fun;
      res.eagerGen = true;
      res[Symbol.iterator] = function() {
        var x = 0,
          buf = [],
          ret = fun(buf),
          len = buf.length;
        buf.length = len;
        return {
          _debOrig: res,
          next: function() {
            return x === len
              ? { done: true, value: ret }
              : { done: false, value: buf[x++] };
          }
        };
      };
      return res;
    }
  : function make(fun) {
      var buf = [],
        ret = fun(buf),
        len = buf.length,
        res = {};
      res.arrBuf = buf;
      res.ret = ret;
      res.fun = fun;
      //  res.eagerGen = true;
      res[Symbol.iterator] = function() {
        var x = 0;
        return {
          _debOrig: res,
          next: function() {
            return x === len
              ? { done: true, value: ret }
              : { done: false, value: buf[x++] };
          }
        };
      };
      return res;
    };

exports.e$y$star = function yieldStar(buf, e) {
  var i, x, v, len, ret;
  if (e.eagerGen) return e.fun(buf);
  if (e.arrBuf != null) {
    ret = e.ret;
    e = e.arrBuf;
  }
  x = buf.length;
  if (Array.isArray(e)) {
    len = e.length;
    buf.length = buf.length + len;
    for (i = 0; i < len; ++i) buf[x + i] = e[i];
    return ret;
  }
  i = e[Symbol.iterator]();
  for (v = i.next(); !v.done; v = i.next()) {
    buf[x++] = v.value;
  }
  return v.value;
};

exports.e$y = function yieldPush(iter, v) {
  iter[iter.length] = v;
};
