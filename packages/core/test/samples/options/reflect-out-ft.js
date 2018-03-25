import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
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
    return M.scope(_f_1);
  }).done();
}

function a_1(a) {
  return M.chain(eff("a"), a_2);
}

function a_2(a) {
  return M.chain(M.reflect(monadish), a_3);
}

function a_3(a) {
  return M.chain(eff(1), a_4);
}

function a_4(a) {
  return M.chain(M.reflect(monadish + 2), a_5);
}

function f_1(ctx) {
  return M.chain(eff(1), f_2);
}

function f_2(ctx) {
  return M.chain(eff(2), f_3);
}

function f_3(ctx) {}

function a_5(a) {
  return M.chain(M.reify(function () {
    var ctx = M.context();
    return M.scope(f_1);
  }), a_6);
}

function a_6(a, b) {
  console.log(b);
}

function _f_1(ctx) {
  return M.chain(ctx._b._addLater(1, 2), _f_2);
}

function _f_2(ctx, a) {
  ctx._result = a;

  try {
    expect(ctx._result).to.equal(3);
    done();
  } catch (err) {
    done(err);
  }
}