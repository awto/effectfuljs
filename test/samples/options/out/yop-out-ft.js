'use strict';

function addLater_1(a, ref_2) {
  ref_2.deferred = a;
  process.nextTick(function () {
    var ref_1 = {
      ref_2: ref_2
    };
    return ref_1.ref_2.deferred.resolve(ref_1.ref_2.a + ref_1.ref_2.b);
  });
  return M.pure(ref_2.deferred.promise);
}

function _1(ref_3) {
  return M.jMB1(ref_3.done.async(), _2, ref_3);
}

function _2(a, ref_3) {
  ref_3.done = a;
  return _3(ref_3);
}

function _3(ref_3) {
  return M.run(QM, function () {
    var ref_2 = {
      result: undefined,
      ref_3: ref_3
    };
    return M.jMB1(ref_2.ref_3.addLater(1, 2), _1, ref_2);

    function _1(a, ref_2) {
      return a.mapply(function ($dm$b) {
        var ref_1 = {
          err: undefined,
          ref_2: ref_2,
          ref_3: ref_3
        };
        ref_1.ref_2.result = ref_1.$dm$b;
        return M.jMB1(expect(ref_1.ref_2.result), _1, ref_1);

        function _1(a, ref_1) {
          try {
            return M.jM1E(a.to.equal(3), _2, ref_1, _3);
          } catch (e) {
            return _3(e, ref_1);
          }
        }

        function _2(ref_1) {
          try {
            return M.jME(ref_1.ref_3.done(), M.pure, _3);
          } catch (e) {
            return _3(e, ref_1);
          }
        }

        function _3(ex, ref_1) {
          ref_1.err = ex;
          return ref_1.ref_3.done(ref_1.err);
        }
      });
    }
  });
}

function __1() {
  return M.jM(it('should throw reasons from rejected promises into fiber', function (done) {
    var ref_2 = {
      throwErrorLater: undefined
    };

    ref_2.throwErrorLater = function throwErrorLater() {
      var ref_2 = {
        _deferred: undefined
      };
      return M.jMB1(Q.defer(), _1, ref_2);

      function _1(a, ref_2) {
        ref_2._deferred = a;
        process.nextTick(function () {
          var ref_1 = {
            ref_2: ref_2
          };
          return ref_1.ref_2._deferred.reject(new Error('promise rejected'));
        });
        return M.pure(ref_2._deferred.promise);
      }
    };

    if (ref_2.done.async) return _1(ref_2);else return _3(ref_2);

    function _1(ref_2) {
      return M.jMB1(ref_2.done.async(), _2, ref_2);
    }

    function _2(a, ref_2) {
      ref_2.done = a;
      return _3(ref_2);
    }

    function _3(ref_2) {
      return M.run(QM, function () {
        return M.scope(function ($dm$root) {
          var ref_3 = {
            ref_2: ref_2
          };
          return M.jMB1(ref_3.ref_2.throwErrorLater(), _1, ref_3);

          function _1(a, ref_3) {
            return M.jMB1(a.mhandle(function (err) {
              var ref_1 = {
                expectErr: undefined,
                ref_2: ref_2,
                ref_3: ref_3
              };
              return _1(ref_1);

              function _1(ref_1) {
                try {
                  return M.jMB1E(expect(ref_1.err.message), _2, ref_1, _4);
                } catch (e) {
                  return _4(e, ref_1);
                }
              }

              function _2(a, ref_1) {
                try {
                  return M.jM1E(a.to.equal('promise rejected'), _3, ref_1, _4);
                } catch (e) {
                  return _4(e, ref_1);
                }
              }

              function _3(ref_1) {
                try {
                  return M.jM1E(ref_1.ref_2.done(), _5, ref_1, _4);
                } catch (e) {
                  return _4(e, ref_1);
                }
              }

              function _4(ex, ref_1) {
                ref_1.expectErr = ex;
                return M.jM1(ref_1.ref_2.done(ref_1.expectErr), _5, ref_1);
              }

              function _5(ref_1) {
                return ref_1.ref_3.$dm$root.brk();
              }
            }), _2, ref_3);
          }

          function _2(a, ref_3) {
            return a.mapply(function () {
              var ref_1 = {
                ref_2: ref_2
              };
              return ref_1.ref_2.done(new Error('yop should have thrown reason from rejected promise'));
            });
          }
        });
      });
    }
  }), __2);
}

function __2() {
  return it('should work just fine with passed a value instead of a promise', function (done) {
    if (ref_3.done.async) return _1(ref_3);else return _3(ref_3);

    function _1(ref_3) {
      return M.jMB1(ref_3.done.async(), _2, ref_3);
    }

    function _2(a, ref_3) {
      ref_3.done = a;
      return _3(ref_3);
    }

    function _3(ref_3) {
      return M.run(QM, function () {
        var ref_2 = {
          _result: undefined
        };
        return M.jMB1(1 + 2, _1, ref_2);

        function _1(a, ref_2) {
          return a.mapply(function ($dm$b) {
            var ref_1 = {
              _err: undefined,
              ref_2: ref_2,
              ref_3: ref_3
            };
            ref_1.ref_2._result = ref_1.$dm$b;
            return M.jMB1(expect(ref_1.ref_2._result), _1, ref_1);

            function _1(a, ref_1) {
              try {
                return M.jM1E(a.to.equal(3), _2, ref_1, _3);
              } catch (e) {
                return _3(e, ref_1);
              }
            }

            function _2(ref_1) {
              try {
                return M.jME(ref_1.ref_3.done(), M.pure, _3);
              } catch (e) {
                return _3(e, ref_1);
              }
            }

            function _3(ex, ref_1) {
              ref_1._err = ex;
              return ref_1.ref_3.done(ref_1._err);
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
    var ref_3 = {
      addLater: undefined
    };

    ref_3.addLater = function addLater(a, b) {
      var ref_2 = {
        deferred: undefined
      };
      return M.jMB1(Q.defer(), addLater_1, ref_2);
    };

    if (ref_3.done.async) return _1(ref_3);else return _3(ref_3);
  }), __1);
});