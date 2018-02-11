'use strict';

import * as M from '@effectful/core';
M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  var ctx = M.context();
  return M.scope(f_112, f_56);
});

function addLater_1(addLater) {
  return M.chain(Q.defer(), addLater_2, addLater_3);
}

function f_11(ctx) {
  var a;
  a = ctx._addLater._deferred;
  return M.chain(a.resolve(ctx._addLater._a + ctx._addLater._b), f_21, f_31);
}

function f_21(ctx) {
  return M.pure();
}

function f_31(ctx, e) {
  return M.raise(e);
}

function addLater_2(addLater, a) {
  addLater._deferred = a;
  process.nextTick(function () {
    var ctx = M.context();
    ctx._addLater = addLater;
    return M.scope(f_11, f_31);
  });
  return M.pure(addLater._deferred.promise);
}

function addLater_3(addLater, e) {
  return M.raise(e);
}

function f_12(_ctx) {
  var a;

  if (_ctx._done.async) {
    a = _ctx._done;
    return M.chain(a.async(), f_22, _f_5);
  } else {
    return M.jump(void 0, f_32, _f_5);
  }
}

function f_22(_ctx, a) {
  _ctx._done = a;
  return M.jump(void 0, f_32, _f_5);
}

function _f_1(ctx) {
  return M.chain(ctx._f._addLater(1, 2), _f_2, _f_4);
}

function f_1(_ctx) {
  _ctx._f1._result = _ctx._$dm$b;
  return M.jump(void 0, f_2, f_8);
}

function f_2(_ctx) {
  var a;
  a = _ctx._f1._result;
  return M.chain(expect(a), f_3, f_8);
}

function f_3(_ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal(3), f_4, f_8);
}

function f_4(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(), f_6, f_7);
}

function f_5(_ctx) {
  var a;
  _ctx._err = _ctx._ex;
  a = _ctx._f._done;
  return M.chain(a(_ctx._err), f_6, f_7);
}

function f_6(_ctx) {
  return M.pure();
}

function f_7(_ctx, e) {
  return M.raise(e);
}

function f_8(_ctx, a) {
  _ctx._ex = a;
  return M.jump(void 0, f_5, f_7);
}

function _f_2(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._$dm$b = $dm$b;
    return M.scope(f_1, f_7);
  }), _f_3, _f_4);
}

function _f_3(ctx, r) {
  return M.pure(r);
}

function _f_4(ctx, e) {
  return M.raise(e);
}

function f_32(_ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    ctx._f = _ctx;
    return M.scope(_f_1, _f_4);
  }), f_41, _f_5);
}

function f_41(_ctx) {
  return M.pure();
}

function _f_5(_ctx, e) {
  return M.raise(e);
}

function f_112(ctx) {
  return M.chain(it('should yield fiber until promise is resolved', function (done) {
    var _ctx = M.context();

    _ctx._addLater = function _addLater(a, b) {
      var addLater = M.context();
      addLater._a = a;
      addLater._b = b;
      return M.scope(addLater_1, addLater_3);
    };

    _ctx._done = done;
    return M.scope(f_12, _f_5);
  }), f_212, f_56);
}

function throwErrorLater_1(throwErrorLater) {
  return M.chain(Q.defer(), throwErrorLater_2, throwErrorLater_3);
}

function f_17(ctx) {
  var a;
  a = ctx._throwErrorLater._deferred;
  return M.chain(a.reject(new Error('promise rejected')), f_27, f_37);
}

function f_27(ctx) {
  return M.pure();
}

function f_37(ctx, e) {
  return M.raise(e);
}

function throwErrorLater_2(throwErrorLater, a) {
  throwErrorLater._deferred = a;
  process.nextTick(function () {
    var ctx = M.context();
    ctx._throwErrorLater = throwErrorLater;
    return M.scope(f_17, f_37);
  });
  return M.pure(throwErrorLater._deferred.promise);
}

function throwErrorLater_3(throwErrorLater, e) {
  return M.raise(e);
}

function f_18(ctx) {
  var a;

  if (ctx._done.async) {
    a = ctx._done;
    return M.chain(a.async(), f_28, f_53);
  } else {
    return M.jump(void 0, f_38, f_53);
  }
}

function f_28(ctx, a) {
  ctx._done = a;
  return M.jump(void 0, f_38, f_53);
}

function f_15(ctx) {
  return M.chain(ctx._f._throwErrorLater(), f_25, f_52);
}

function f_13(_ctx) {
  var a;
  a = _ctx._err.message;
  return M.chain(expect(a), f_23, _f_8);
}

function f_23(_ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal('promise rejected'), f_33, _f_8);
}

function f_33(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(), f_51, _f_7);
}

function f_42(_ctx) {
  var a;
  _ctx._expectErr = _ctx._ex;
  a = _ctx._f._done;
  return M.chain(a(_ctx._expectErr), f_51, _f_7);
}

function f_51(_ctx) {
  return M.chain(_ctx._f1._$dm$root.brk(), _f_6, _f_7);
}

function _f_6(_ctx, r) {
  return M.pure(r);
}

function _f_7(_ctx, e) {
  return M.raise(e);
}

function _f_8(_ctx, a) {
  _ctx._ex = a;
  return M.jump(void 0, f_42, _f_7);
}

function f_25(ctx, a) {
  return M.chain(a.mhandle(function (err) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._err = err;
    return M.scope(f_13, _f_8);
  }), f_35, f_52);
}

function f_14(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(new Error('yop should have thrown reason from rejected promise')), f_24, f_34);
}

function f_24(_ctx) {
  return M.pure();
}

function f_34(_ctx, e) {
  return M.raise(e);
}

function f_35(ctx, a) {
  return M.chain(a.mapply(function () {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    return M.scope(f_14, f_34);
  }), f_43, f_52);
}

function f_43(ctx, r) {
  return M.pure(r);
}

function f_52(ctx, e) {
  return M.raise(e);
}

function f_16(_ctx) {
  return M.chain(M.scope(function ($dm$root) {
    var ctx = M.context();
    ctx._f = _ctx._f;
    ctx._$dm$root = $dm$root;
    return M.scope(f_15, f_52);
  }), f_26, f_36);
}

function f_26(_ctx, r) {
  return M.pure(r);
}

function f_36(_ctx, e) {
  return M.raise(e);
}

function f_38(ctx) {
  return M.chain(M.run(QM, function () {
    var _ctx = M.context();

    _ctx._f = ctx;
    return M.scope(f_16, f_36);
  }), f_44, f_53);
}

function f_44(ctx) {
  return M.pure();
}

function f_53(ctx, e) {
  return M.raise(e);
}

function f_212(ctx) {
  return M.chain(it('should throw reasons from rejected promises into fiber', function (done) {
    var ctx = M.context();

    ctx._throwErrorLater = function _throwErrorLater() {
      var throwErrorLater = M.context();
      return M.scope(throwErrorLater_1, throwErrorLater_3);
    };

    ctx._done = done;
    return M.scope(f_18, f_53);
  }), f_312, f_56);
}

function f_111(_ctx) {
  var a;

  if (_ctx._done.async) {
    a = _ctx._done;
    return M.chain(a.async(), f_211, f_55);
  } else {
    return M.jump(void 0, f_311, f_55);
  }
}

function f_211(_ctx, a) {
  _ctx._done = a;
  return M.jump(void 0, f_311, f_55);
}

function f_110(ctx) {
  return M.chain(1 + 2, f_210, f_46);
}

function f_19(_ctx) {
  _ctx._f1._result = _ctx._$dm$b;
  return M.jump(void 0, f_29, f_81);
}

function f_29(_ctx) {
  var a;
  a = _ctx._f1._result;
  return M.chain(expect(a), f_39, f_81);
}

function f_39(_ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal(3), f_45, f_81);
}

function f_45(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(), f_61, f_71);
}

function f_54(_ctx) {
  var a;
  _ctx._err = _ctx._ex;
  a = _ctx._f._done;
  return M.chain(a(_ctx._err), f_61, f_71);
}

function f_61(_ctx) {
  return M.pure();
}

function f_71(_ctx, e) {
  return M.raise(e);
}

function f_81(_ctx, a) {
  _ctx._ex = a;
  return M.jump(void 0, f_54, f_71);
}

function f_210(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._$dm$b = $dm$b;
    return M.scope(f_19, f_71);
  }), f_310, f_46);
}

function f_310(ctx, r) {
  return M.pure(r);
}

function f_46(ctx, e) {
  return M.raise(e);
}

function f_311(_ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    ctx._f = _ctx;
    return M.scope(f_110, f_46);
  }), f_47, f_55);
}

function f_47(_ctx) {
  return M.pure();
}

function f_55(_ctx, e) {
  return M.raise(e);
}

function f_312(ctx) {
  return M.chain(it('should work just fine with passed a value instead of a promise', function (done) {
    var _ctx = M.context();

    _ctx._done = done;
    return M.scope(f_111, f_55);
  }), f_48, f_56);
}

function f_48(ctx) {
  return M.pure();
}

function f_56(ctx, e) {
  return M.raise(e);
}