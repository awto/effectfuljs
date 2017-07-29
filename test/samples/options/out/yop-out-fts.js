'use strict';

function addLater_1(deferred, a, b) {
  var deferred;
  process.nextTick(function () {
    return deferred.resolve(a + b);
  });
  return M.pure(deferred.promise);
}

function _11(done, addLater) {
  return M.jMB(done.async(), __2, addLater);
}

function __2(done, addLater) {
  return __3(addLater);
}

function _1(a, done) {
  try {
    return M.jME(a.to.equal(3), _2, done, _3);
  } catch (e) {
    return _3(done);
  }
}

function _2(done) {
  try {
    return M.jME(done(), M.pure, _3);
  } catch (e) {
    return _3(done);
  }
}

function _3(done) {
  var err;
  err = ex;
  return done(err);
}

function __1(a, _v) {
  var done;
  return a.mapply(function ($dm$b) {
    var _v;

    _v.result = $dm$b;
    return M.jMB(expect(_v.result), _1, done);
  });
}

function __3(addLater) {
  return M.run(QM, function () {
    var _v = {
      result: undefined
    };
    return M.jMB(addLater(1, 2), __1, _v);
  });
}

function throwErrorLater_1(deferred) {
  var deferred;
  process.nextTick(function () {
    return deferred.reject(new Error('promise rejected'));
  });
  return M.pure(deferred.promise);
}

function _14(done) {
  return M.jMB(done.async(), _23);
}

function _23(done) {
  return _32();
}

function _12(done, $dm$root, err) {
  try {
    return M.jMBE(expect(err.message), _21, done, $dm$root, _4);
  } catch (e) {
    return _4(done, $dm$root);
  }
}

function _21(a, done, $dm$root) {
  try {
    return M.jME(a.to.equal('promise rejected'), _31, done, $dm$root, _4);
  } catch (e) {
    return _4(done, $dm$root);
  }
}

function _31(done, $dm$root) {
  try {
    return M.jME(done(), _5, $dm$root, _4);
  } catch (e) {
    return _4(done, $dm$root);
  }
}

function _4(done, $dm$root) {
  var expectErr;
  expectErr = _ex;
  return M.jM(done(expectErr), _5, $dm$root);
}

function _5($dm$root) {
  return $dm$root.brk();
}

function _13(a, $dm$root) {
  var done;
  return M.jMB(a.mhandle(function (err) {
    return _12(done, $dm$root, err);
  }), _22, done);
}

function _22(a, done) {
  return a.mapply(function () {
    return done(new Error('yop should have thrown reason from rejected promise'));
  });
}

function _32() {
  return M.run(QM, function () {
    var throwErrorLater;
    return M.scope(function ($dm$root) {
      return M.jMB(throwErrorLater(), _13, $dm$root);
    });
  });
}

function _18() {
  return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
    var throwErrorLater;

    throwErrorLater = function throwErrorLater() {
      return M.jMB(Q.defer(), throwErrorLater_1);
    };

    if (done.async) return _14(done);else return _32();
  }), _26);
}

function _17(done) {
  return M.jMB(done.async(), _25);
}

function _25(done) {
  return _34();
}

function _15(a, done) {
  try {
    return M.jME(a.to.equal(3), _24, done, _33);
  } catch (e) {
    return _33(done);
  }
}

function _24(done) {
  try {
    return M.jME(done(), M.pure, _33);
  } catch (e) {
    return _33(done);
  }
}

function _33(done) {
  var err;
  err = ex1;
  return done(err);
}

function _16(a, _v) {
  var done;
  return a.mapply(function ($dm$b) {
    var _v;

    _v.result = $dm$b;
    return M.jMB(expect(_v.result), _15, done);
  });
}

function _34() {
  return M.run(QM, function () {
    var _v = {
      result: undefined
    };
    return M.jMB(1 + 2, _16, _v);
  });
}

function _26() {
  return it('should work just fine with passed a value instead of a promise', function (done) {
    if (done.async) return _17(done);else return _34();
  });
}

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    var addLater;

    addLater = function addLater(a, b) {
      return M.jMB(Q.defer(), addLater_1, a, b);
    };

    if (done.async) return _11(done, addLater);else return __3(addLater);
  }), _18);
});