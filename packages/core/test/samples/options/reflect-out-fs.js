import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff('a'), _1, _6);

  function _1() {
    return M.chainBH(M.reflect(monadish), _2, _6);
  }

  function _2() {
    return M.chainBH(eff(1), _3, _6);
  }

  function _3() {
    return M.chainBH(M.reflect(monadish + 2), _4, _6);
  }

  function _4() {
    return M.chainBH(M.reify(function () {
      return M.chainBH(eff(1), _1, _3);

      function _1() {
        return M.chainBH(eff(2), _2, _3);
      }

      function _2() {
        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    }), _5, _6);
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}

function b() {
  var addLater = function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  };

  M.reify(function () {
    var result;
    return M.chainBH(addLater(1, 2), _1, _2);

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

    function _2(e) {
      return M.raise(e);
    }
  }).done();
}