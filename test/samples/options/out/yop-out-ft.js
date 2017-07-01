'use strict';

function addLater_1(a, addLater_v) {
  addLater_v.deferred = a;
  process.nextTick(function () {
    return addLater_v.deferred.resolve(addLater_v.a + addLater_v.b);
  });
  return M.pure(addLater_v.deferred.promise);
}

function _11(_v1) {
  return M.jMB1(_v1.done.async(), __2, _v1);
}

function __2(a, _v1) {
  _v1.done = a;
  return __3();
}

function _1(a, _v, _v1) {
  try {
    return M.jM2E(a.to.equal(3), _2, _v, _v1, _3);
  } catch (e) {
    return _3(e, _v, _v1);
  }
}

function _2(_v, _v1) {
  try {
    return M.jME(_v1.done(), M.pure, _3);
  } catch (e) {
    return _3(e, _v, _v1);
  }
}

function _3(ex, _v, _v1) {
  _v.err = ex;
  return _v1.done(_v.err);
}

function __1(a) {
  return a.mapply(function ($dm$b) {
    var _v;

    _v = {
      $dm$b,
      err: undefined
    };
    __v.result = _v.$dm$b;
    return M.jMB2(expect(__v.result), _1, _v, _v1);
  });
}

function __3() {
  return M.run(QM, function () {
    var __v;

    __v = {
      result: undefined
    };
    return M.jMB(_v1.addLater(1, 2), __1);
  });
}

function throwErrorLater_1(a, throwErrorLater_v) {
  throwErrorLater_v.deferred = a;
  process.nextTick(function () {
    return throwErrorLater_v.deferred.reject(new Error('promise rejected'));
  });
  return M.pure(throwErrorLater_v.deferred.promise);
}

function _14(_v3) {
  return M.jMB1(_v3.done.async(), _23, _v3);
}

function _23(a, _v3) {
  _v3.done = a;
  return _32();
}

function _12(a, _v, _v2, _v3) {
  try {
    return M.jM3E(a.to.equal('promise rejected'), _21, _v, _v2, _v3, _31);
  } catch (e) {
    return _31(e, _v, _v2, _v3);
  }
}

function _21(_v, _v2, _v3) {
  try {
    return M.jM1E(_v3.done(), _4, _v2, _31);
  } catch (e) {
    return _31(e, _v, _v2, _v3);
  }
}

function _31(ex, _v, _v2, _v3) {
  _v.expectErr = ex;
  return M.jM1(_v3.done(_v.expectErr), _4, _v2);
}

function _4(_v2) {
  return _v2.$dm$root.brk();
}

function _13(a) {
  return M.jMB(a.mhandle(function (err) {
    var _v;

    _v = {
      err,
      expectErr: undefined
    };
    return M.jMB3(expect(_v.err.message), _12, _v, _v2, _v3);
  }), _22);
}

function _22(a) {
  return a.mapply(function () {
    return _v3.done(new Error('yop should have thrown reason from rejected promise'));
  });
}

function _32() {
  return M.run(QM, function () {
    return M.scope(function ($dm$root) {
      var _v2;

      _v2 = {
        $dm$root
      };
      return M.jMB(_v3.throwErrorLater(), _13);
    });
  });
}

function _18() {
  return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
    var _v3;

    _v3 = {
      done,
      throwErrorLater: undefined
    };

    _v3.throwErrorLater = function throwErrorLater() {
      var throwErrorLater_v;
      throwErrorLater_v = {
        deferred: undefined
      };
      return M.jMB1(Q.defer(), throwErrorLater_1, throwErrorLater_v);
    };

    if (_v3.done.async) return _14(_v3);else return _32();
  }), _26);
}

function _17(_v5) {
  return M.jMB1(_v5.done.async(), _25, _v5);
}

function _25(a, _v5) {
  _v5.done = a;
  return _34();
}

function _15(a, _v, _v5) {
  try {
    return M.jM2E(a.to.equal(3), _24, _v, _v5, _33);
  } catch (e) {
    return _33(e, _v, _v5);
  }
}

function _24(_v, _v5) {
  try {
    return M.jME(_v5.done(), M.pure, _33);
  } catch (e) {
    return _33(e, _v, _v5);
  }
}

function _33(ex, _v, _v5) {
  _v.err = ex;
  return _v5.done(_v.err);
}

function _16(a) {
  return a.mapply(function ($dm$b) {
    var _v;

    _v = {
      $dm$b,
      err: undefined
    };
    _v4.result = _v.$dm$b;
    return M.jMB2(expect(_v4.result), _15, _v, _v5);
  });
}

function _34() {
  return M.run(QM, function () {
    var _v4;

    _v4 = {
      result: undefined
    };
    return M.jMB(1 + 2, _16);
  });
}

function _26() {
  return it('should work just fine with passed a value instead of a promise', function (done) {
    var _v5;

    _v5 = {
      done
    };
    if (_v5.done.async) return _17(_v5);else return _34();
  });
}

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    var _v1;

    _v1 = {
      done,
      addLater: undefined
    };

    _v1.addLater = function addLater(a, b) {
      var addLater_v;
      addLater_v = {
        a,
        b,
        deferred: undefined
      };
      return M.jMB1(Q.defer(), addLater_1, addLater_v);
    };

    if (_v1.done.async) return _11(_v1);else return __3();
  }), _18);
});