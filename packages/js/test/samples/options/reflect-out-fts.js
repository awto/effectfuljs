function a() {
  return M.chain(eff('a'), a_1, a_6);
}

function b() {
  var b = {};

  function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  }

  M.reify(function () {
    var ctx = M.context();
    return M.chain(ctx._addLater(1, 2), _f_1, f_2);
  }).done();
}

function a_1() {
  return M.chain(M.reflect(monadish), a_2, a_6);
}

function a_2() {
  return M.chain(eff(1), a_3, a_6);
}

function a_3() {
  return M.chain(M.reflect(monadish + 2), a_4, a_6);
}

function f_1() {
  return M.chain(eff(2), _f_2, f_3);
}

function _f_2() {
  return M.pure();
}

function f_3(e) {
  return M.raise(e);
}

function a_4() {
  return M.chain(M.reify(function () {
    return M.chain(eff(1), f_1, f_3);
  }), a_5, a_6);
}

function a_5(a) {
  console.log(a);
  return M.pure();
}

function a_6(e) {
  return M.raise(e);
}

function _f_1(ctx, a) {
  ctx._result = a;

  try {
    expect(ctx._result).to.equal(3);
    done();
  } catch (err) {
    done(err);
  }

  return M.pure();
}

function f_2(ctx, e) {
  return M.raise(e);
}