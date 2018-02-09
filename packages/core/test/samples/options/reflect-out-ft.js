import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_7);
}

function b() {
  var b = {};

  b._addLater = function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  };

  M.reify(function () {
    var ctx = M.context();
    ctx._b = b;
    return M.scopeH(_f_1, _f_3);
  }).done();
}

function a_1(a) {
  return M.chainBH(eff('a'), a_2, a_7);
}

function a_2(a) {
  return M.chainBH(M.reflect(monadish), a_3, a_7);
}

function a_3(a) {
  return M.chainBH(eff(1), a_4, a_7);
}

function a_4(a) {
  return M.chainBH(M.reflect(monadish + 2), a_5, a_7);
}

function f_1(ctx) {
  return M.chainBH(eff(1), f_2, f_4);
}

function f_2(ctx) {
  return M.chainBH(eff(2), f_3, f_4);
}

function f_3(ctx) {
  return M.pure();
}

function f_4(ctx, e) {
  return M.raise(e);
}

function a_5(a) {
  return M.chainBH(M.reify(function () {
    var ctx = M.context();
    return M.scopeH(f_1, f_4);
  }), a_6, a_7);
}

function a_6(a, b) {
  console.log(b);
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  return M.chainBH(ctx._b._addLater(1, 2), _f_2, _f_3);
}

function _f_2(ctx, a) {
  ctx._result = a;

  try {
    expect(ctx._result).to.equal(3);
    done();
  } catch (err) {
    done(err);
  }

  return M.pure();
}

function _f_3(ctx, e) {
  return M.raise(e);
}