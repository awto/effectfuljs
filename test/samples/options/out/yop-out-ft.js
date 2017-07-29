'use strict';

function addLater_1(a, addLater_v) {
  addLater_v.deferred = a;
  process.nextTick(function () {
    var addLater_v;
    return addLater_v.deferred.resolve(addLater_v.a + addLater_v.b);
  });
  return M.pure(addLater_v.deferred.promise);
}

function _11(_v1) {
  return M.jMB(_v1.done.async(), __2, _v1);
}

function __2(a, _v1) {
  _v1.done = a;
  return __3(_v1);
}

function _1(a, _v) {
  try {
    return M.jME(a.to.equal(3), _2, _v, _3);
  } catch (e) {
    return _3(_v, undefined);
  }
}

function _2(_v) {
  var __v;

  try {
    return M.jME(__v.done(), M.pure, _3);
  } catch (e) {
    return _3(_v, __v);
  }
}

function _3(_v, __v) {
  _v.err = ex;
  return __v.done(_v.err);
}

function __1(a, __v, _v1) {
  var _v;

  return a.mapply(function ($dm$b) {
    var _v = {
      $dm$b,
      err: undefined
    },
        __v;

    __v.result = _v.$dm$b;
    return M.jMB(expect(__v.result), _1, _v);
  });
}

function __3(_v1) {
  return M.run(QM, function () {
    var __v = {
      result: undefined
    },
        _v;

    return M.jMB(_v.addLater(1, 2), __1, __v, _v1);
  });
}

function throwErrorLater_1(a, throwErrorLater_v) {
  throwErrorLater_v.deferred = a;
  process.nextTick(function () {
    var throwErrorLater_v;
    return throwErrorLater_v.deferred.reject(new Error('promise rejected'));
  });
  return M.pure(throwErrorLater_v.deferred.promise);
}

function _14(_v1) {
  return M.jMB(_v1.done.async(), _23, _v1);
}

function _23(a, _v1) {
  _v1.done = a;
  return _32();
}

function _12(_v) {
  try {
    return M.jMBE(expect(_v.err.message), _21, _v, _4);
  } catch (e) {
    return _4(_v, undefined);
  }
}

function _21(a, _v) {
  try {
    return M.jME(a.to.equal('promise rejected'), _31, _v, _4);
  } catch (e) {
    return _4(_v, undefined);
  }
}

function _31(_v) {
  var __v;

  try {
    return M.jME(__v.done(), _5, _4);
  } catch (e) {
    return _4(_v, __v);
  }
}

function _4(_v, __v) {
  _v.expectErr = _ex;
  return M.jM(__v.done(_v.expectErr), _5);
}

function _5() {
  var _v;

  return _v.$dm$root.brk();
}

function _13(a, __v, _v1) {
  var _v;

  return M.jMB(a.mhandle(function (err) {
    var _v = {
      err,
      expectErr: undefined
    };
    return _12(_v);
  }), _22, _v1);
}

function _22(a, _v1) {
  return a.mapply(function () {
    var _v;

    return _v.done(new Error('yop should have thrown reason from rejected promise'));
  });
}

function _32() {
  return M.run(QM, function () {
    var _v1;

    return M.scope(function ($dm$root) {
      var __v = {
        $dm$root
      },
          _v;

      return M.jMB(_v.throwErrorLater(), _13, __v, _v1);
    });
  });
}

function _18() {
  var _v1;

  return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
    var throwErrorLater_v,
        _v1 = {
      done,
      throwErrorLater: undefined
    };

    _v1.throwErrorLater = function throwErrorLater() {
      var throwErrorLater_v = {
        deferred: undefined
      };
      return M.jMB(Q.defer(), throwErrorLater_1, throwErrorLater_v);
    };

    if (_v1.done.async) return _14(_v1);else return _32();
  }), _26);
}

function _17(_v1) {
  return M.jMB(_v1.done.async(), _25, _v1);
}

function _25(a, _v1) {
  _v1.done = a;
  return _34();
}

function _15(a, _v) {
  try {
    return M.jME(a.to.equal(3), _24, _v, _33);
  } catch (e) {
    return _33(_v, undefined);
  }
}

function _24(_v) {
  var __v;

  try {
    return M.jME(__v.done(), M.pure, _33);
  } catch (e) {
    return _33(_v, __v);
  }
}

function _33(_v, __v) {
  _v.err = ex1;
  return __v.done(_v.err);
}

function _16(a, __v) {
  var _v, _v1;

  return a.mapply(function ($dm$b) {
    var _v = {
      $dm$b,
      err: undefined
    },
        __v;

    __v.result = _v.$dm$b;
    return M.jMB(expect(__v.result), _15, _v);
  });
}

function _34() {
  return M.run(QM, function () {
    var __v = {
      result: undefined
    };
    return M.jMB(1 + 2, _16, __v);
  });
}

function _26() {
  var _v1;

  return it('should work just fine with passed a value instead of a promise', function (done) {
    var _v1 = {
      done
    };
    if (_v1.done.async) return _17(_v1);else return _34();
  });
}

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  var _v1;

  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    var addLater_v,
        _v1 = {
      done,
      addLater: undefined
    };

    _v1.addLater = function addLater(a, b) {
      var addLater_v = {
        a,
        b,
        deferred: undefined
      };
      return M.jMB(Q.defer(), addLater_1, addLater_v);
    };

    if (_v1.done.async) return _11(_v1);else return __3(_v1);
  }), _18);
});