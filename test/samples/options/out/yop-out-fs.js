'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    function addLater(a, b) {
      return M.jMB(Q.defer(), _1);

      function _1(deferred) {
        process.nextTick(function () {
          return deferred.resolve(a + b);
        });
        return M.pure(deferred.promise);
      }
    }

    if (done.async) return _1(done);else return _3();

    function _1(done) {
      return M.jMB(done.async(), _2);
    }

    function _2(done) {
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
            return M.jMB1(expect(result), _1, done);

            function _1(a, done) {
              try {
                return M.jM1E(a.to.equal(3), _2, done, _3);
              } catch (e) {
                return _3(e, done);
              }
            }

            function _2(done) {
              try {
                return M.jME(done(), M.pure, _3);
              } catch (e) {
                return _3(e, done);
              }
            }

            function _3(ex, done) {
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
        return M.jMB(Q.defer(), _1);

        function _1(deferred) {
          process.nextTick(function () {
            return deferred.reject(new Error('promise rejected'));
          });
          return M.pure(deferred.promise);
        }
      }

      if (done.async) return _1(done);else return _3();

      function _1(done) {
        return M.jMB(done.async(), _2);
      }

      function _2(done) {
        return _3();
      }

      function _3() {
        return M.run(QM, function () {
          return M.scope(function ($dm$root) {
            return M.jMB(throwErrorLater(), _1);

            function _1(a) {
              return M.jMB(a.mhandle(function (err) {
                var expectErr;
                return _1(done);

                function _1(done) {
                  try {
                    return M.jMB1E(expect(err.message), _2, done, _4);
                  } catch (e) {
                    return _4(e, done);
                  }
                }

                function _2(a, done) {
                  try {
                    return M.jM1E(a.to.equal('promise rejected'), _3, done, _4);
                  } catch (e) {
                    return _4(e, done);
                  }
                }

                function _3(done) {
                  try {
                    return M.jME(done(), _5, _4);
                  } catch (e) {
                    return _4(e, done);
                  }
                }

                function _4(ex, done) {
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
      if (done.async) return _1(done);else return _3();

      function _1(done) {
        return M.jMB(done.async(), _2);
      }

      function _2(done) {
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
              return M.jMB1(expect(result), _1, done);

              function _1(a, done) {
                try {
                  return M.jM1E(a.to.equal(3), _2, done, _3);
                } catch (e) {
                  return _3(e, done);
                }
              }

              function _2(done) {
                try {
                  return M.jME(done(), M.pure, _3);
                } catch (e) {
                  return _3(e, done);
                }
              }

              function _3(ex, done) {
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