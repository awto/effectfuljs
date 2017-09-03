'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  var a = function (done) {
    var addLater = function addLater(a, b) {
      var deferred,
          c = function () {
        return M.j(deferred.resolve(a + b), _1);

        function _1() {
          return M.pure();
        }
      };

      return M.jB(Q.defer(), _1, c);

      function _1(a, c) {
        deferred = a;
        process.nextTick(c);
        return M.pure(deferred.promise);
      }
    },
        a = function () {
      var result,
          a = function ($dm$b) {
        var err;
        result = $dm$b;
        return _1();

        function _1() {
          try {
            return M.jBH(expect(result), _2, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _2(a) {
          try {
            return M.jH(a.to.equal(3), _3, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _3() {
          try {
            return M.jH(done(), _5, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _4(ex) {
          err = ex;
          return M.j(done(err), _5);
        }

        function _5() {
          return M.pure();
        }
      };

      return M.jB(addLater(1, 2), _1, a);

      function _1(b, a) {
        return b.mapply(a);
      }
    };

    if (done.async) return _1(a);else return _3(a);

    function _1(a) {
      return M.jB(done.async(), _2, a);
    }

    function _2(b, a) {
      done = b;
      return _3(a);
    }

    function _3(a) {
      return M.j(M.run(QM, a), _4);
    }

    function _4() {
      return M.pure();
    }
  },
      b = function (done) {
    var throwErrorLater = function throwErrorLater() {
      var deferred,
          a = function () {
        return M.j(deferred.reject(new Error('promise rejected')), _1);

        function _1() {
          return M.pure();
        }
      };

      return M.jB(Q.defer(), _1, a);

      function _1(b, a) {
        deferred = b;
        process.nextTick(a);
        return M.pure(deferred.promise);
      }
    },
        a = function () {
      var a = function ($dm$root) {
        var a = function (err) {
          var expectErr;

          try {
            return M.jBH(expect(err.message), _1, _3);
          } catch (ex) {
            return _3(ex);
          }

          function _1(a) {
            try {
              return M.jH(a.to.equal('promise rejected'), _2, _3);
            } catch (ex) {
              return _3(ex);
            }
          }

          function _2() {
            try {
              return M.jH(done(), _4, _3);
            } catch (ex) {
              return _3(ex);
            }
          }

          function _3(ex) {
            expectErr = ex;
            return M.j(done(expectErr), _4);
          }

          function _4() {
            return $dm$root.brk();
          }
        },
            b = function () {
          return M.j(done(new Error('yop should have thrown reason from rejected promise')), _1);

          function _1() {
            return M.pure();
          }
        };

        return M.jB(throwErrorLater(), _1, a, b);

        function _1(c, a, b) {
          return M.jB(c.mhandle(a), _2, b);
        }

        function _2(a, b) {
          return a.mapply(b);
        }
      };

      return M.scope(a);
    };

    if (done.async) return _1(a);else return _3(a);

    function _1(a) {
      return M.jB(done.async(), _2, a);
    }

    function _2(b, a) {
      done = b;
      return _3(a);
    }

    function _3(a) {
      return M.j(M.run(QM, a), _4);
    }

    function _4() {
      return M.pure();
    }
  },
      c = function (done) {
    var a = function () {
      var result,
          a = function ($dm$b) {
        var err;
        result = $dm$b;
        return _1();

        function _1() {
          try {
            return M.jBH(expect(result), _2, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _2(a) {
          try {
            return M.jH(a.to.equal(3), _3, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _3() {
          try {
            return M.jH(done(), _5, _4);
          } catch (ex) {
            return _4(ex);
          }
        }

        function _4(ex) {
          err = ex;
          return M.j(done(err), _5);
        }

        function _5() {
          return M.pure();
        }
      };

      return M.jB(1 + 2, _1, a);

      function _1(b, a) {
        return b.mapply(a);
      }
    };

    if (done.async) return _1(a);else return _3(a);

    function _1(a) {
      return M.jB(done.async(), _2, a);
    }

    function _2(b, a) {
      done = b;
      return _3(a);
    }

    function _3(a) {
      return M.j(M.run(QM, a), _4);
    }

    function _4() {
      return M.pure();
    }
  };

  return M.j(it('should yield fiber until promise is resolved', a), _1, b, c);

  function _1(b, c) {
    return M.j(it('should throw reasons from rejected promises into fiber', b), _2, c);
  }

  function _2(c) {
    return M.j(it('should work just fine with passed a value instead of a promise', c), _3);
  }

  function _3() {
    return M.pure();
  }
});