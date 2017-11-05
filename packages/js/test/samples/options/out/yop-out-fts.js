'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.chain(it('should yield fiber until promise is resolved', function (done) {
    var ctx = M.context(),
        a;

    function addLater(a, b) {
      var addLater = M.context();
      addLater._a = a;
      addLater._b = b;
      return M.chain(Q.defer(), addLater_1, addLater_2);
    }

    ctx._done = done;

    if (ctx._done.async) {
      a = ctx._done;
      return M.chain(a.async(), f_11, f_46);
    } else {
      return M.jump(_f_2, f_46);
    }
  }), f_18, f_42);
});

function f_112() {
  return M.pure();
}

function f_211(e) {
  return M.raise(e);
}

function addLater_1(addLater, c) {
  addLater._deferred = c;
  process.nextTick(function () {
    var c;
    c = deferred;
    return M.chain(c.resolve(a + b), f_112, f_211);
  });
  return M.pure(addLater._deferred.promise);
}

function addLater_2(addLater, e) {
  return M.raise(e);
}

function f_11(ctx, a) {
  ctx._done = a;
  return M.jump(_f_2, f_46);
}

function f_1(ctx) {
  var a;
  a = ctx._result;
  return M.chain(expect(a), f_2, _f_7);
}

function f_2(ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal(3), f_3, _f_7);
}

function f_3(ctx) {
  var a;
  a = ctx._done;
  return M.chain(a(), f_51, f_61);
}

function f_4(ctx, ex) {
  var a;
  ctx._err = ex;
  a = ctx._done;
  return M.chain(a(ctx._err), f_51, f_61);
}

function f_51(ctx) {
  return M.pure();
}

function f_61(ctx, e) {
  return M.raise(e);
}

function _f_7(ctx, a) {
  return M.jump(f_4, f_61, a);
}

function _f_1(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var ctx = M.context();
    ctx._$dm$b = $dm$b;
    ctx._result = ctx._$dm$b;
    return M.jump(f_1, _f_7);
  }), f_212, f_38);
}

function f_212(ctx, r) {
  return M.pure(r);
}

function f_38(ctx, e) {
  return M.raise(e);
}

function _f_2(ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    return M.chain(ctx._addLater(1, 2), _f_1, f_38);
  }), f_37, f_46);
}

function f_37(ctx) {
  return M.pure();
}

function f_46(ctx, e) {
  return M.raise(e);
}

function f_19() {
  return M.pure();
}

function f_28(e) {
  return M.raise(e);
}

function throwErrorLater_1(throwErrorLater, a) {
  throwErrorLater._deferred = a;
  process.nextTick(function () {
    var a;
    a = deferred;
    return M.chain(a.reject(new Error('promise rejected')), f_19, f_28);
  });
  return M.pure(throwErrorLater._deferred.promise);
}

function throwErrorLater_2(throwErrorLater, e) {
  return M.raise(e);
}

function f_14(ctx, a) {
  ctx._done = a;
  return M.jump(f_23, f_44);
}

function f_12(ctx) {
  var a;
  a = ctx._err.message;
  return M.chain(expect(a), f_21, f_8);
}

function f_21(ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal('promise rejected'), _f_3, f_8);
}

function _f_3(ctx) {
  var a;
  a = ctx._done;
  return M.chain(a(), f_5, f_7);
}

function _f_4(ctx, ex) {
  var a;
  ctx._expectErr = ex;
  a = ctx._done;
  return M.chain(a(ctx._expectErr), f_5, f_7);
}

function f_5(ctx) {
  return M.chain(ctx._$dm$root.brk(), _f_6, f_7);
}

function _f_6(ctx, r) {
  return M.pure(r);
}

function f_7(ctx, e) {
  return M.raise(e);
}

function f_8(ctx, a) {
  return M.jump(_f_4, f_7, a);
}

function f_13(ctx, a) {
  return M.chain(a.mhandle(function (err) {
    var ctx = M.context();
    ctx._err = err;
    return M.jump(f_12, f_8);
  }), f_22, f_45);
}

function f_111() {
  return M.pure();
}

function f_210(e) {
  return M.raise(e);
}

function f_22(ctx, a) {
  return M.chain(a.mapply(function () {
    var a;
    a = done;
    return M.chain(a(new Error('yop should have thrown reason from rejected promise')), f_111, f_210);
  }), f_36, f_45);
}

function f_36(ctx, r) {
  return M.pure(r);
}

function f_45(ctx, e) {
  return M.raise(e);
}

function f_110(r) {
  return M.pure(r);
}

function f_29(e) {
  return M.raise(e);
}

function f_23(ctx) {
  return M.chain(M.run(QM, function () {
    return M.chain(M.scope(function ($dm$root) {
      var ctx = M.context();
      ctx._$dm$root = $dm$root;
      return M.chain(ctx._throwErrorLater(), f_13, f_45);
    }), f_110, f_29);
  }), f_35, f_44);
}

function f_35(ctx) {
  return M.pure();
}

function f_44(ctx, e) {
  return M.raise(e);
}

function f_18() {
  return M.chain(it('should throw reasons from rejected promises into fiber', function (done) {
    var ctx = M.context(),
        a;

    function throwErrorLater() {
      var throwErrorLater = M.context();
      return M.chain(Q.defer(), throwErrorLater_1, throwErrorLater_2);
    }

    ctx._done = done;

    if (ctx._done.async) {
      a = ctx._done;
      return M.chain(a.async(), f_14, f_44);
    } else {
      return M.jump(f_23, f_44);
    }
  }), f_26, f_42);
}

function f_17(ctx, a) {
  ctx._done = a;
  return M.jump(f_25, f_43);
}

function f_15(ctx) {
  var a;
  a = ctx._result;
  return M.chain(expect(a), f_24, f_71);
}

function f_24(ctx, b) {
  var a;
  a = b.to;
  return M.chain(a.equal(3), f_31, f_71);
}

function f_31(ctx) {
  var a;
  a = ctx._done;
  return M.chain(a(), _f_5, f_6);
}

function f_41(ctx, ex) {
  var a;
  ctx._err = ex;
  a = ctx._done;
  return M.chain(a(ctx._err), _f_5, f_6);
}

function _f_5(ctx) {
  return M.pure();
}

function f_6(ctx, e) {
  return M.raise(e);
}

function f_71(ctx, a) {
  return M.jump(f_41, f_6, a);
}

function f_16(ctx, a) {
  return M.chain(a.mapply(function ($dm$b) {
    var ctx = M.context();
    ctx._$dm$b = $dm$b;
    ctx._result = ctx._$dm$b;
    return M.jump(f_15, f_71);
  }), f_27, f_34);
}

function f_27(ctx, r) {
  return M.pure(r);
}

function f_34(ctx, e) {
  return M.raise(e);
}

function f_25(ctx) {
  return M.chain(M.run(QM, function () {
    var ctx = M.context();
    return M.chain(1 + 2, f_16, f_34);
  }), f_33, f_43);
}

function f_33(ctx) {
  return M.pure();
}

function f_43(ctx, e) {
  return M.raise(e);
}

function f_26() {
  return M.chain(it('should work just fine with passed a value instead of a promise', function (done) {
    var ctx = M.context(),
        a;
    ctx._done = done;

    if (ctx._done.async) {
      a = ctx._done;
      return M.chain(a.async(), f_17, f_43);
    } else {
      return M.jump(f_25, f_43);
    }
  }), f_32, f_42);
}

function f_32() {
  return M.pure();
}

function f_42(e) {
  return M.raise(e);
}