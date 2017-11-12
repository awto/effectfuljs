'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  var ctx = M.context();
  return M.scope(f_112, f_52);
});

function addLater_1(_addLater) {
  return M.chain(Q.defer(), addLater_2, addLater_3);
}

function f_11(ctx) {
  var a;
  a = ctx._addLater._deferred;
  return M.chain(a.resolve(ctx._addLater._a + ctx._addLater._b), f_212, f_311);
}

function f_212(ctx) {
  return M.pure();
}

function f_311(ctx, e) {
  return M.raise(e);
}

function addLater_2(_addLater, a) {
  _addLater._deferred = a;
  process.nextTick(function () {
    var ctx = M.context();
    ctx._addLater = _addLater;
    return M.scope(f_11, f_311);
  });
  return M.pure(_addLater._deferred.promise);
}

function addLater_3(_addLater, e) {
  return M.raise(e);
}

function f_12(_ctx) {
  var a;

  if (_ctx._done.async) {
    a = _ctx._done;
    return M.chain(a.async(), f_21, f_56);
  } else {
    return M.jump(_f_3, f_56);
  }
}

function f_21(_ctx, a) {
  _ctx._done = a;
  return M.jump(_f_3, f_56);
}

function _f_1(ctx) {
  return M.chain(ctx._f._addLater(1, 2), _f_2, f_48);
}

function f_1(_ctx) {
  _ctx._f1._result = _ctx._$dm$b;
  return M.jump(f_2, f_8);
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
  return M.chain(a(), f_61, f_71);
}

function f_5(_ctx) {
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

function f_8(_ctx, a) {
  _ctx._ex = a;
  return M.jump(f_5, f_71);
}

function _f_2(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._$dm$b = $dm$b;
    return M.scope(f_1, f_71);
  }), f_312, f_48);
}

function f_312(ctx, r) {
  return M.pure(r);
}

function f_48(ctx, e) {
  return M.raise(e);
}

function _f_3(_ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    ctx._f = _ctx;
    return M.scope(_f_1, f_48);
  }), f_47, f_56);
}

function f_47(_ctx) {
  return M.pure();
}

function f_56(_ctx, e) {
  return M.raise(e);
}

function f_112(ctx) {
  return M.chain(it('should yield fiber until promise is resolved', function (done) {
    var _ctx = M.context();

    _ctx._addLater = function addLater(a, b) {
      var _addLater = M.context();

      _addLater._a = a;
      _addLater._b = b;
      return M.scope(addLater_1, addLater_3);
    };

    _ctx._done = done;
    return M.scope(f_12, f_56);
  }), f_28, f_52);
}

function throwErrorLater_1(_throwErrorLater) {
  return M.chain(Q.defer(), throwErrorLater_2, throwErrorLater_3);
}

function f_17(ctx) {
  var a;
  a = ctx._throwErrorLater._deferred;
  return M.chain(a.reject(new Error('promise rejected')), f_29, f_38);
}

function f_29(ctx) {
  return M.pure();
}

function f_38(ctx, e) {
  return M.raise(e);
}

function throwErrorLater_2(_throwErrorLater, a) {
  _throwErrorLater._deferred = a;
  process.nextTick(function () {
    var ctx = M.context();
    ctx._throwErrorLater = _throwErrorLater;
    return M.scope(f_17, f_38);
  });
  return M.pure(_throwErrorLater._deferred.promise);
}

function throwErrorLater_3(_throwErrorLater, e) {
  return M.raise(e);
}

function f_18(ctx) {
  var a;

  if (ctx._done.async) {
    a = ctx._done;
    return M.chain(a.async(), f_24, f_54);
  } else {
    return M.jump(f_33, f_54);
  }
}

function f_24(ctx, a) {
  ctx._done = a;
  return M.jump(f_33, f_54);
}

function f_15(ctx) {
  return M.chain(ctx._f._throwErrorLater(), f_23, f_55);
}

function f_13(_ctx) {
  var a;
  a = _ctx._err.message;
  return M.chain(expect(a), f_22, _f_8);
}

function f_22(_ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal('promise rejected'), f_31, _f_8);
}

function f_31(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(), _f_5, _f_7);
}

function _f_4(_ctx) {
  var a;
  _ctx._expectErr = _ctx._ex;
  a = _ctx._f._done;
  return M.chain(a(_ctx._expectErr), _f_5, _f_7);
}

function _f_5(_ctx) {
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
  return M.jump(_f_4, _f_7);
}

function f_23(ctx, a) {
  return M.chain(a.mhandle(function (err) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._err = err;
    return M.scope(f_13, _f_8);
  }), f_32, f_55);
}

function f_14(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(new Error('yop should have thrown reason from rejected promise')), f_211, f_310);
}

function f_211(_ctx) {
  return M.pure();
}

function f_310(_ctx, e) {
  return M.raise(e);
}

function f_32(ctx, a) {
  return M.chain(a.mapply(function () {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    return M.scope(f_14, f_310);
  }), f_46, f_55);
}

function f_46(ctx, r) {
  return M.pure(r);
}

function f_55(ctx, e) {
  return M.raise(e);
}

function f_16(_ctx) {
  return M.chain(M.scope(function ($dm$root) {
    var ctx = M.context();
    ctx._f = _ctx._f;
    ctx._$dm$root = $dm$root;
    return M.scope(f_15, f_55);
  }), f_210, f_39);
}

function f_210(_ctx, r) {
  return M.pure(r);
}

function f_39(_ctx, e) {
  return M.raise(e);
}

function f_33(ctx) {
  return M.chain(M.run(QM, function () {
    var _ctx = M.context();

    _ctx._f = ctx;
    return M.scope(f_16, f_39);
  }), f_45, f_54);
}

function f_45(ctx) {
  return M.pure();
}

function f_54(ctx, e) {
  return M.raise(e);
}

function f_28(ctx) {
  return M.chain(it('should throw reasons from rejected promises into fiber', function (done) {
    var ctx = M.context();

    ctx._throwErrorLater = function throwErrorLater() {
      var _throwErrorLater = M.context();

      return M.scope(throwErrorLater_1, throwErrorLater_3);
    };

    ctx._done = done;
    return M.scope(f_18, f_54);
  }), f_36, f_52);
}

function f_111(_ctx) {
  var a;

  if (_ctx._done.async) {
    a = _ctx._done;
    return M.chain(a.async(), f_27, f_53);
  } else {
    return M.jump(f_35, f_53);
  }
}

function f_27(_ctx, a) {
  _ctx._done = a;
  return M.jump(f_35, f_53);
}

function f_110(ctx) {
  return M.chain(1 + 2, f_26, f_44);
}

function f_19(_ctx) {
  _ctx._f1._result = _ctx._$dm$b;
  return M.jump(f_25, f_81);
}

function f_25(_ctx) {
  var a;
  a = _ctx._f1._result;
  return M.chain(expect(a), f_34, f_81);
}

function f_34(_ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal(3), f_41, f_81);
}

function f_41(_ctx) {
  var a;
  a = _ctx._f._done;
  return M.chain(a(), f_6, f_7);
}

function f_51(_ctx) {
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

function f_81(_ctx, a) {
  _ctx._ex = a;
  return M.jump(f_51, f_7);
}

function f_26(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var _ctx = M.context();

    _ctx._f = ctx._f;
    _ctx._f1 = ctx;
    _ctx._$dm$b = $dm$b;
    return M.scope(f_19, f_7);
  }), f_37, f_44);
}

function f_37(ctx, r) {
  return M.pure(r);
}

function f_44(ctx, e) {
  return M.raise(e);
}

function f_35(_ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    ctx._f = _ctx;
    return M.scope(f_110, f_44);
  }), f_43, f_53);
}

function f_43(_ctx) {
  return M.pure();
}

function f_53(_ctx, e) {
  return M.raise(e);
}

function f_36(ctx) {
  return M.chain(it('should work just fine with passed a value instead of a promise', function (done) {
    var _ctx = M.context();

    _ctx._done = done;
    return M.scope(f_111, f_53);
  }), f_42, f_52);
}

function f_42(ctx) {
  return M.pure();
}

function f_52(ctx, e) {
  return M.raise(e);
}