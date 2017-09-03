'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  var a = function (done) {
    var addLater = function addLater(a, b) {
      var addLater_v = {
        a,
        b,
        deferred: undefined
      },
          c = function () {
        var _addLater_v = addLater_v;
        return M.j(_addLater_v.deferred.resolve(_addLater_v.a + _addLater_v.b), _7);
      };

      return M.jB(Q.defer(), addLater_1, addLater_v, c);
    },
        _v1 = {
      done,
      addLater: addLater
    },
        a = function () {
      var __v = {
        result: undefined
      },
          a = function ($dm$b) {
        var _v = {
          $dm$b,
          err: undefined
        },
            _v2 = __v,
            _v3 = _v1;
        _v2.result = _v.$dm$b;
        return _1(_v, _v2, _v3);
      },
          _v = _v1;

      return M.jB(_v.addLater(1, 2), _6, a);
    };

    if (_v1.done.async) return _8(_v1, a);else return _10(a);
  },
      b = function (done) {
    var throwErrorLater = function throwErrorLater() {
      var throwErrorLater_v = {
        deferred: undefined
      },
          a = function () {
        var _throwErrorLater_v = throwErrorLater_v;
        return M.j(_throwErrorLater_v.deferred.reject(new Error('promise rejected')), _19);
      };

      return M.jB(Q.defer(), throwErrorLater_1, throwErrorLater_v, a);
    },
        _v1 = {
      done,
      throwErrorLater: throwErrorLater
    },
        a = function () {
      var a = function ($dm$root) {
        var __v = {
          $dm$root
        },
            a = function (err) {
          var _v = {
            err,
            expectErr: undefined
          },
              _v2 = _v1,
              _v3 = __v;

          try {
            return M.jBH(expect(_v.err.message), _12, _14, _v, _v2, _v3);
          } catch (ex) {
            return _14(ex, _v, _v2, _v3);
          }
        },
            b = function () {
          var _v = _v1;
          return M.j(_v.done(new Error('yop should have thrown reason from rejected promise')), _16);
        },
            _v = _v1;

        return M.jB(_v.throwErrorLater(), _17, a, b);
      };

      return M.scope(a);
    };

    if (_v1.done.async) return _20(_v1, a);else return _22(a);
  },
      c = function (done) {
    var _v1 = {
      done
    },
        a = function () {
      var __v = {
        result: undefined
      },
          a = function ($dm$b) {
        var _v = {
          $dm$b,
          err: undefined
        },
            _v2 = __v,
            _v3 = _v1;
        _v2.result = _v.$dm$b;
        return _24(_v, _v2, _v3);
      };

      return M.jB(1 + 2, _29, a);
    };

    if (_v1.done.async) return _30(_v1, a);else return _32(a);
  };

  return M.j(it('should yield fiber until promise is resolved', a), _34, b, c);
});

function _7() {
  return M.pure();
}

function addLater_1(a, addLater_v, c) {
  addLater_v.deferred = a;
  process.nextTick(c);
  return M.pure(addLater_v.deferred.promise);
}

function _1(_v, _v2, _v3) {
  try {
    return M.jBH(expect(_v2.result), _2, _4, _v, _v3);
  } catch (ex) {
    return _4(ex, _v, _v3);
  }
}

function _2(a, _v, _v3) {
  try {
    return M.jH(a.to.equal(3), _3, _4, _v, _v3);
  } catch (ex) {
    return _4(ex, _v, _v3);
  }
}

function _3(_v, _v3) {
  try {
    return M.jH(_v3.done(), _5, _4, _v, _v3);
  } catch (ex) {
    return _4(ex, _v, _v3);
  }
}

function _4(ex, _v, _v3) {
  _v.err = ex;
  return M.j(_v3.done(_v.err), _5, _v, _v3);
}

function _5(_v, _v3) {
  return M.pure();
}

function _6(b, a) {
  return b.mapply(a);
}

function _8(_v1, a) {
  return M.jB(_v1.done.async(), _9, _v1, a);
}

function _9(b, _v1, a) {
  _v1.done = b;
  return _10(a);
}

function _10(a) {
  return M.j(M.run(QM, a), _11);
}

function _11() {
  return M.pure();
}

function _19() {
  return M.pure();
}

function throwErrorLater_1(b, throwErrorLater_v, a) {
  throwErrorLater_v.deferred = b;
  process.nextTick(a);
  return M.pure(throwErrorLater_v.deferred.promise);
}

function _12(a, _v, _v2, _v3) {
  try {
    return M.jH(a.to.equal('promise rejected'), _13, _14, _v, _v2, _v3);
  } catch (ex) {
    return _14(ex, _v, _v2, _v3);
  }
}

function _13(_v, _v2, _v3) {
  try {
    return M.jH(_v2.done(), _15, _14, _v, _v2, _v3);
  } catch (ex) {
    return _14(ex, _v, _v2, _v3);
  }
}

function _14(ex, _v, _v2, _v3) {
  _v.expectErr = ex;
  return M.j(_v2.done(_v.expectErr), _15, _v, _v2, _v3);
}

function _15(_v, _v2, _v3) {
  return _v3.$dm$root.brk();
}

function _16() {
  return M.pure();
}

function _17(c, a, b) {
  return M.jB(c.mhandle(a), _18, b);
}

function _18(a, b) {
  return a.mapply(b);
}

function _20(_v1, a) {
  return M.jB(_v1.done.async(), _21, _v1, a);
}

function _21(b, _v1, a) {
  _v1.done = b;
  return _22(a);
}

function _22(a) {
  return M.j(M.run(QM, a), _23);
}

function _23() {
  return M.pure();
}

function _24(_v, _v2, _v3) {
  try {
    return M.jBH(expect(_v2.result), _25, _27, _v, _v3);
  } catch (ex) {
    return _27(ex, _v, _v3);
  }
}

function _25(a, _v, _v3) {
  try {
    return M.jH(a.to.equal(3), _26, _27, _v, _v3);
  } catch (ex) {
    return _27(ex, _v, _v3);
  }
}

function _26(_v, _v3) {
  try {
    return M.jH(_v3.done(), _28, _27, _v, _v3);
  } catch (ex) {
    return _27(ex, _v, _v3);
  }
}

function _27(ex, _v, _v3) {
  _v.err = ex;
  return M.j(_v3.done(_v.err), _28, _v, _v3);
}

function _28(_v, _v3) {
  return M.pure();
}

function _29(b, a) {
  return b.mapply(a);
}

function _30(_v1, a) {
  return M.jB(_v1.done.async(), _31, _v1, a);
}

function _31(b, _v1, a) {
  _v1.done = b;
  return _32(a);
}

function _32(a) {
  return M.j(M.run(QM, a), _33);
}

function _33() {
  return M.pure();
}

function _34(b, c) {
  return M.j(it('should throw reasons from rejected promises into fiber', b), _35, c);
}

function _35(c) {
  return M.j(it('should work just fine with passed a value instead of a promise', c), _36);
}

function _36() {
  return M.pure();
}