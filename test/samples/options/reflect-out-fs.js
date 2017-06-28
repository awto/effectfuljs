function a() {
  return M.jM(eff('a'), _1);

  function _1() {
    return M.jM(M.reflect(monadish), _2);
  }

  function _2() {
    return M.jM(eff(1), _3);
  }

  function _3() {
    return M.jM(M.reflect(monadish + 2), _4);
  }

  function _4() {
    console.log(M.reify(function () {
      return M.jM(eff(1), _1);

      function _1() {
        return eff(2);
      }
    }));
    return M.pure();
  }
}

function b() {
  M.reify(function () {
    var result = M(addLater(1, 2));

    try {
      expect(result).to.equal(3);
      done();
    } catch (err) {
      done(err);
    }
  }).done();

  function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  }
}