'use strict';

function addLater_1(deferred) {
  process.nextTick(function () {
    return deferred.resolve(a + b);
  });
  return M.pure(deferred.promise);
}

function _1(done) {
  return M.jMB(done.async(), _2);
}

function _2(done) {
  return _3();
}

function _3() {
  return M.run(QM, function () {
    return M.jMB(addLater(1, 2), _1);

    function _1(a) {
      return a.mapply(function ($dm$b) {
        result = $dm$b;
        return M.jMB(expect(result), _1);

        function _1(a) {
          try {
            return M.jME(a.to.equal(3), _2, _3);
          } catch (e) {
            return _3(e, undefined);
          }
        }

        function _2() {
          var done;

          try {
            return M.jME(done(), M.pure, _3);
          } catch (e) {
            return _3(e, done);
          }
        }

        function _3(ex, done) {
          var err;
          err = ex;
          return done(err);
        }
      });
    }
  });
}

function __1() {
  return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
    var throwErrorLater;

    throwErrorLater = function throwErrorLater() {
      return M.jMB(Q.defer(), _1);

      function _1(deferred) {
        process.nextTick(function () {
          return deferred.reject(new Error('promise rejected'));
        });
        return M.pure(deferred.promise);
      }
    };

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
              return _1();

              function _1() {
                var err;

                try {
                  return M.jMBE(expect(err.message), _2, _4);
                } catch (e) {
                  return _4(e, undefined);
                }
              }

              function _2(a) {
                try {
                  return M.jME(a.to.equal('promise rejected'), _3, _4);
                } catch (e) {
                  return _4(e, undefined);
                }
              }

              function _3() {
                var done;

                try {
                  return M.jME(done(), _5, _4);
                } catch (e) {
                  return _4(e, done);
                }
              }

              function _4(ex, done) {
                var expectErr;
                expectErr = ex;
                return M.jM(done(expectErr), _5);
              }

              function _5() {
                var $dm$root;
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
  }), __2);
}

function __2() {
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
        return M.jMB(1 + 2, _1);

        function _1(a) {
          return a.mapply(function ($dm$b) {
            _result = $dm$b;
            return M.jMB(expect(_result), _1);

            function _1(a) {
              try {
                return M.jME(a.to.equal(3), _2, _3);
              } catch (e) {
                return _3(e, undefined);
              }
            }

            function _2() {
              var done;

              try {
                return M.jME(done(), M.pure, _3);
              } catch (e) {
                return _3(e, done);
              }
            }

            function _3(ex, done) {
              var err;
              err = ex;
              return done(err);
            }
          });
        }
      });
    }
  });
}

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.jM(it('should yield fiber until promise is resolved', function (done) {
    var addLater;

    addLater = function addLater(a, b) {
      return M.jMB(Q.defer(), addLater_1);
    };

    if (done.async) return _1(done);else return _3();
  }), __1);
});