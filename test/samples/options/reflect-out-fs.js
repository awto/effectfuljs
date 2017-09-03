function a() {
  var a = function () {
    return M.j(eff(1), _1);

    function _1() {
      return M.j(eff(2), _2);
    }

    function _2() {
      return M.pure();
    }
  };

  return M.j(eff('a'), _1, a);

  function _1(a) {
    return M.j(M.reflect(monadish), _2, a);
  }

  function _2(a) {
    return M.j(eff(1), _3, a);
  }

  function _3(a) {
    return M.j(M.reflect(monadish + 2), _4, a);
  }

  function _4(a) {
    return M.jB(M.reify(a), _5);
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }
}

function b() {
  M.reify(function () {
    var result;
    return M.jB(addLater(1, 2), _1);

    function _1(a) {
      result = a;

      try {
        expect(result).to.equal(3);
        done();
      } catch (err) {
        done(err);
      }

      return M.pure();
    }
  }).done();

  function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
      return;
    });
    return deferred.promise;
  }

  return;
}