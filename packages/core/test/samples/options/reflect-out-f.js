import * as M from "@effectful/core";
function a() {
  return M.chain(eff("a"), _1);
  function _1() {
    return M.chain(M.reflect(monadish), _2);
  }
  function _2() {
    return M.chain(eff(1), _3);
  }
  function _3() {
    return M.chain(M.reflect(monadish + 2), _4);
  }
  function _4() {
    return M.chain(M.reify(function () {
      return M.chain(eff(1), _1);
      function _1() {
        return M.chain(eff(2), _2);
      }
      function _2() {}
    }), _5);
  }
  function _5(a) {
    console.log(a);
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
    var result, a;
    a = addLater;
    return M.chain(a(1, 2), _1);
    function _1(a) {
      result = a;
      try {
        expect(result).to.equal(3);
        done();
      } catch (err) {
        done(err);
      }
    }
  }).done();
}