'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    function addLater(a, b) {
      var deferred;
      return M.jMB(Q.defer(), _1);

      function _1(c) {
        deferred = c;
        process.nextTick(function () {
          return deferred.resolve(a + b);
        });
        return M.pure(deferred.promise);
      }
    }

    if (done.async) return _1();else return _3();

    function _1() {
      return M.jMB(done.async(), _2);
    }

    function _2(a) {
      done = a;
      return _3();
    }

    function _3() {
      return M.run(QM, function () {
        var result;
        return M.jMB(addLater(1, 2), _1);

        function _1(a) {
          return a.mapply(function ($dm$b) {
            var err;
            result = $dm$b;
            return M.jMB(expect(result), _1);

            function _1(a) {
              try {
                return M.jME(a.to.equal(3), _2, _3);
              } catch (e) {
                return _3(e);
              }
            }

            function _2() {
              try {
                return M.jME(done(), M.pure, _3);
              } catch (e) {
                return _3(e);
              }
            }

            function _3(ex) {
              err = ex;
              return done(err);
            }
          });
        }
      });
    }
  }), _1);

  function _1() {
    return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
      function throwErrorLater() {
        var deferred;
        return M.jMB(Q.defer(), _1);

        function _1(a) {
          deferred = a;
          process.nextTick(function () {
            return deferred.reject(new Error('promise rejected'));
          });
          return M.pure(deferred.promise);
        }
      }

      if (done.async) return _1();else return _3();

      function _1() {
        return M.jMB(done.async(), _2);
      }

      function _2(a) {
        done = a;
        return _3();
      }

      function _3() {
        return M.run(QM, function () {
          return M.scope(function ($dm$root) {
            return M.jMB(throwErrorLater(), _1);

            function _1(a) {
              return M.jMB(a.mhandle(function (err) {
                var expectErr;
                return _1();

                function _1() {
                  try {
                    return M.jMBE(expect(err.message), _2, _4);
                  } catch (e) {
                    return _4(e);
                  }
                }

                function _2(a) {
                  try {
                    return M.jME(a.to.equal('promise rejected'), _3, _4);
                  } catch (e) {
                    return _4(e);
                  }
                }

                function _3() {
                  try {
                    return M.jME(done(), _5, _4);
                  } catch (e) {
                    return _4(e);
                  }
                }

                function _4(ex) {
                  expectErr = ex;
                  return M.jM(done(expectErr), _5);
                }

                function _5() {
                  return $dm$root.brk();
                }
              }), _2);
            }

            function _2(a) {
              return a.mapply(function () {
                return done(new Error('yop should have thrown reason from rejected promise'));
              });
            }
          });
        });
      }
    }), _2);
  }

  function _2() {
    return it('should work just fine with passed a value instead of a promise', function (done) {
      if (done.async) return _1();else return _3();

      function _1() {
        return M.jMB(done.async(), _2);
      }

      function _2(a) {
        done = a;
        return _3();
      }

      function _3() {
        return M.run(QM, function () {
          var result;
          return M.jMB(1 + 2, _1);

          function _1(a) {
            return a.mapply(function ($dm$b) {
              var err;
              result = $dm$b;
              return M.jMB(expect(result), _1);

              function _1(a) {
                try {
                  return M.jME(a.to.equal(3), _2, _3);
                } catch (e) {
                  return _3(e);
                }
              }

              function _2() {
                try {
                  return M.jME(done(), M.pure, _3);
                } catch (e) {
                  return _3(e);
                }
              }

              function _3(ex) {
                err = ex;
                return done(err);
              }
            });
          }
        });
      }
    });
  }
});