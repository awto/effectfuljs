function a_1() {
  return M.jM(M.reflect(monadish), a_2);
}

function a_2() {
  return M.jM(eff(1), a_3);
}

function a_3() {
  return M.jM(M.reflect(monadish + 2), a_4);
}

function _1() {
  return eff(2);
}

function a_4() {
  console.log(M.reify(function () {
    return M.jM(eff(1), _1);
  }));
  return M.pure();
}

function __1(result) {
  var err;

  try {
    expect(result).to.equal(3);
    done();
  } catch (err) {
    done(err);
  }

  return M.pure();
}

function a() {
  return M.jM(eff('a'), a_1);
}

function b() {
  M.reify(function () {
    return M.jMB(addLater(1, 2), __1);
  }).done();

  function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  }
}