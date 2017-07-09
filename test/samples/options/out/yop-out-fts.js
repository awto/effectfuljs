'use strict';

function addLater_1(deferred) {
  process.nextTick(function () {
    return deferred.resolve(a + b);
  });
  return M.pure(deferred.promise);
}

function _11(done) {
  return M.jMB(done.async(), __2);
}

function __2(done) {
  return __3();
}

function _1(a, done) {
  try {
    return M.jM1E(a.to.equal(3), _2, done, _3);
  } catch (e) {
    return _3(e, done);
  }
}

function _2(done) {
  try {
    return M.jME(done(), M.pure, _3);
  } catch (e) {
    return _3(e, done);
  }
}

function _3(ex, done) {
  var err;
  err = ex;
  return done(err);
}

function __1(a) {
  return a.mapply(function ($dm$b) {
    _v.result = $dm$b;
    return M.jMB1(expect(_v.result), _1, done);
  });
}

function __3() {
  return M.run(QM, function () {
    var _v;

    _v = {
      result: undefined
    };
    return M.jMB(addLater(1, 2), __1);
  });
}

function throwErrorLater_1(deferred) {
  process.nextTick(function () {
    return deferred.reject(new Error('promise rejected'));
  });
  return M.pure(deferred.promise);
}

function _14(_done) {
  return M.jMB(_done.async(), _23);
}

function _23(_done) {
  return _32();
}

function _12(_done, $dm$root, err) {
  try {
    return M.jMB2E(expect(err.message), _21, _done, $dm$root, _4);
  } catch (e) {
    return _4(e, _done, $dm$root);
  }
}

function _21(a, _done, $dm$root) {
  try {
    return M.jM2E(a.to.equal('promise rejected'), _31, _done, $dm$root, _4);
  } catch (e) {
    return _4(e, _done, $dm$root);
  }
}

function _31(_done, $dm$root) {
  try {
    return M.jM1E(_done(), _5, $dm$root, _4);
  } catch (e) {
    return _4(e, _done, $dm$root);
  }
}

function _4(ex, _done, $dm$root) {
  var expectErr;
  expectErr = ex;
  return M.jM1(_done(expectErr), _5, $dm$root);
}

function _5($dm$root) {
  return $dm$root.brk();
}

function _13(a) {
  return M.jMB(a.mhandle(function (err) {
    return _12(_done, $dm$root, err);
  }), _22);
}

function _22(a) {
  return a.mapply(function () {
    return _done(new Error('yop should have thrown reason from rejected promise'));
  });
}

function _32() {
  return M.run(QM, function () {
    return M.scope(function ($dm$root) {
      return M.jMB(throwErrorLater(), _13);
    });
  });
}

function _18() {
  return M.jM(it('should throw reasons from rejected promises into fiber', function (_done) {
    var throwErrorLater;

    throwErrorLater = function throwErrorLater() {
      return M.jMB(Q.defer(), throwErrorLater_1);
    };

    if (_done.async) return _14(_done);else return _32();
  }), _26);
}

function _17(done1) {
  return M.jMB(done1.async(), _25);
}

function _25(done1) {
  return _34();
}

function _15(a, done1) {
  try {
    return M.jM1E(a.to.equal(3), _24, done1, _33);
  } catch (e) {
    return _33(e, done1);
  }
}

function _24(done1) {
  try {
    return M.jME(done1(), M.pure, _33);
  } catch (e) {
    return _33(e, done1);
  }
}

function _33(ex, done1) {
  var err;
  err = ex;
  return done1(err);
}

function _16(a) {
  return a.mapply(function ($dm$b) {
    __v.result = $dm$b;
    return M.jMB1(expect(__v.result), _15, done1);
  });
}

function _34() {
  return M.run(QM, function () {
    var __v;

    __v = {
      result: undefined
    };
    return M.jMB(1 + 2, _16);
  });
}

function _26() {
  return it('should work just fine with passed a value instead of a promise', function (done1) {
    if (done1.async) return _17(done1);else return _34();
  });
}

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    var addLater;

    addLater = function addLater(a, b) {
      return M.jMB(Q.defer(), addLater_1);
    };

    if (done.async) return _11(done);else return __3();
  }), _18);
});