'use strict';

M = require('@effectfuljs/core');
Q = require('Q');
QM = require('@effectfuljs/promise')(Q);
describe('yop', function () {
  return M.chain(it('should yield fiber until promise is resolved', function (done) {
    var addLater = function addLater(a, b) {
      var deferred, r;
      return M.chain(Q.defer(), _1, _2);

      function _1(c) {
        deferred = c;
        process.nextTick(function () {
          var c;
          c = deferred;
          return M.chain(c.resolve(a + b), _1, _2);

          function _1() {
            return M.pure();
          }

          function _2(e) {
            return M.raise(e);
          }
        });
        return M.pure(deferred.promise);
      }

      function _2(e) {
        return M.raise(e);
      }
    },
        a;

    if (done.async) {
      a = done;
      return M.chain(a.async(), _1, _4);
    } else {
      return M.jump(_2, _4);
    }

    function _1(a) {
      done = a;
      return M.jump(_2, _4);
    }

    function _2() {
      return M.chain(M.run(QM, function () {
        var result, r;
        return M.chain(addLater(1, 2), _1, _3);

        function _1(a) {
          return M.chain(a.mapply(function ($dm$b) {
            var err, ex;
            result = $dm$b;
            return M.jump(_1, _7);

            function _1() {
              var a;
              a = result;
              return M.chain(expect(a), _2, _7);
            }

            function _2(b) {
              var a;
              a = b.to;
              return M.chain(a.equal(3), _3, _7);
            }

            function _3() {
              var a;
              a = done;
              return M.chain(a(), _5, _6);
            }

            function _4() {
              var a;
              err = ex;
              a = done;
              return M.chain(a(err), _5, _6);
            }

            function _5() {
              return M.pure();
            }

            function _6(e) {
              return M.raise(e);
            }

            function _7(a) {
              ex = a;
              return M.jump(_4, _6);
            }
          }), _2, _3);
        }

        function _2(r) {
          return M.pure(r);
        }

        function _3(e) {
          return M.raise(e);
        }
      }), _3, _4);
    }

    function _3() {
      return M.pure();
    }

    function _4(e) {
      return M.raise(e);
    }
  }), _1, _4);

  function _1() {
    return M.chain(it('should throw reasons from rejected promises into fiber', function (done) {
      var throwErrorLater = function throwErrorLater() {
        var deferred, r;
        return M.chain(Q.defer(), _1, _2);

        function _1(a) {
          deferred = a;
          process.nextTick(function () {
            var a;
            a = deferred;
            return M.chain(a.reject(new Error('promise rejected')), _1, _2);

            function _1() {
              return M.pure();
            }

            function _2(e) {
              return M.raise(e);
            }
          });
          return M.pure(deferred.promise);
        }

        function _2(e) {
          return M.raise(e);
        }
      },
          a;

      if (done.async) {
        a = done;
        return M.chain(a.async(), _1, _4);
      } else {
        return M.jump(_2, _4);
      }

      function _1(a) {
        done = a;
        return M.jump(_2, _4);
      }

      function _2() {
        return M.chain(M.run(QM, function () {
          var r;
          return M.chain(M.scope(function ($dm$root) {
            var r;
            return M.chain(throwErrorLater(), _1, _4);

            function _1(a) {
              return M.chain(a.mhandle(function (err) {
                var expectErr, ex, r;
                return M.jump(_1, _8);

                function _1() {
                  var a;
                  a = err.message;
                  return M.chain(expect(a), _2, _8);
                }

                function _2(b) {
                  var a;
                  a = b.to;
                  return M.chain(a.equal('promise rejected'), _3, _8);
                }

                function _3() {
                  var a;
                  a = done;
                  return M.chain(a(), _5, _7);
                }

                function _4() {
                  var a;
                  expectErr = ex;
                  a = done;
                  return M.chain(a(expectErr), _5, _7);
                }

                function _5() {
                  return M.chain($dm$root.brk(), _6, _7);
                }

                function _6(r) {
                  return M.pure(r);
                }

                function _7(e) {
                  return M.raise(e);
                }

                function _8(a) {
                  ex = a;
                  return M.jump(_4, _7);
                }
              }), _2, _4);
            }

            function _2(a) {
              return M.chain(a.mapply(function () {
                var a;
                a = done;
                return M.chain(a(new Error('yop should have thrown reason from rejected promise')), _1, _2);

                function _1() {
                  return M.pure();
                }

                function _2(e) {
                  return M.raise(e);
                }
              }), _3, _4);
            }

            function _3(r) {
              return M.pure(r);
            }

            function _4(e) {
              return M.raise(e);
            }
          }), _1, _2);

          function _1(r) {
            return M.pure(r);
          }

          function _2(e) {
            return M.raise(e);
          }
        }), _3, _4);
      }

      function _3() {
        return M.pure();
      }

      function _4(e) {
        return M.raise(e);
      }
    }), _2, _4);
  }

  function _2() {
    return M.chain(it('should work just fine with passed a value instead of a promise', function (done) {
      var a;

      if (done.async) {
        a = done;
        return M.chain(a.async(), _1, _4);
      } else {
        return M.jump(_2, _4);
      }

      function _1(a) {
        done = a;
        return M.jump(_2, _4);
      }

      function _2() {
        return M.chain(M.run(QM, function () {
          var result, r;
          return M.chain(1 + 2, _1, _3);

          function _1(a) {
            return M.chain(a.mapply(function ($dm$b) {
              var err, ex;
              result = $dm$b;
              return M.jump(_1, _7);

              function _1() {
                var a;
                a = result;
                return M.chain(expect(a), _2, _7);
              }

              function _2(b) {
                var a;
                a = b.to;
                return M.chain(a.equal(3), _3, _7);
              }

              function _3() {
                var a;
                a = done;
                return M.chain(a(), _5, _6);
              }

              function _4() {
                var a;
                err = ex;
                a = done;
                return M.chain(a(err), _5, _6);
              }

              function _5() {
                return M.pure();
              }

              function _6(e) {
                return M.raise(e);
              }

              function _7(a) {
                ex = a;
                return M.jump(_4, _6);
              }
            }), _2, _3);
          }

          function _2(r) {
            return M.pure(r);
          }

          function _3(e) {
            return M.raise(e);
          }
        }), _3, _4);
      }

      function _3() {
        return M.pure();
      }

      function _4(e) {
        return M.raise(e);
      }
    }), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
});