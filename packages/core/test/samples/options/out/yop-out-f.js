"use strict";

import * as M from "@effectful/core";
M = require("@effectfuljs/core");
Q = require("Q");
QM = require("@effectfuljs/promise")(Q);
describe("yop", function () {
  return M.chain(it("should yield fiber until promise is resolved", function (done) {
    var addLater = function addLater(a, b) {
      var deferred, r;
      return M.chain(Q.defer(), _1);

      function _1(c) {
        deferred = c;
        process.nextTick(function () {
          var c;
          c = deferred;
          return M.chain(c.resolve(a + b), _1);

          function _1() {}
        });
        return deferred.promise;
      }
    },
        a;

    if (done.async) {
      a = done;
      return M.chain(a.async(), _1);
    } else {
      return M.jump(void 0, _2);
    }

    function _1(a) {
      done = a;
      return M.jump(void 0, _2);
    }

    function _2() {
      return M.chain(M.run(QM, function () {
        var result, a, r;
        a = addLater;
        return M.chain(a(1, 2), _1);

        function _1(a) {
          return a.mapply(function ($dm$b) {
            var err, ex;
            result = $dm$b;
            return M.jump(void 0, _1, _6);

            function _1() {
              var a;
              a = result;
              return M.chain(expect(a), _2, _6);
            }

            function _2(b) {
              var a;
              a = b.to;
              return M.chain(a.equal(3), _3, _6);
            }

            function _3() {
              var a;
              a = done;
              return M.chain(a(), _5);
            }

            function _4() {
              var a;
              err = ex;
              a = done;
              return M.chain(a(err), _5);
            }

            function _5() {}

            function _6(a) {
              ex = a;
              return M.jump(void 0, _4);
            }
          });
        }
      }), _3);
    }

    function _3() {}
  }), _1);

  function _1() {
    return M.chain(it("should throw reasons from rejected promises into fiber", function (done) {
      var throwErrorLater = function throwErrorLater() {
        var deferred, r;
        return M.chain(Q.defer(), _1);

        function _1(a) {
          deferred = a;
          process.nextTick(function () {
            var a;
            a = deferred;
            return M.chain(a.reject(new Error("promise rejected")), _1);

            function _1() {}
          });
          return deferred.promise;
        }
      },
          a;

      if (done.async) {
        a = done;
        return M.chain(a.async(), _1);
      } else {
        return M.jump(void 0, _2);
      }

      function _1(a) {
        done = a;
        return M.jump(void 0, _2);
      }

      function _2() {
        return M.chain(M.run(QM, function () {
          var r;
          return M.scope(function ($dm$root) {
            var a, r;
            a = throwErrorLater;
            return M.chain(a(), _1);

            function _1(a) {
              return M.chain(a.mhandle(function (err) {
                var expectErr, ex, r;
                return M.jump(void 0, _1, _6);

                function _1() {
                  var a;
                  a = err.message;
                  return M.chain(expect(a), _2, _6);
                }

                function _2(b) {
                  var a;
                  a = b.to;
                  return M.chain(a.equal("promise rejected"), _3, _6);
                }

                function _3() {
                  var a;
                  a = done;
                  return M.chain(a(), _5);
                }

                function _4() {
                  var a;
                  expectErr = ex;
                  a = done;
                  return M.chain(a(expectErr), _5);
                }

                function _5() {
                  return $dm$root.brk();
                }

                function _6(a) {
                  ex = a;
                  return M.jump(void 0, _4);
                }
              }), _2);
            }

            function _2(a) {
              return a.mapply(function () {
                var a;
                a = done;
                return M.chain(a(new Error("yop should have thrown reason from rejected promise")), _1);

                function _1() {}
              });
            }
          });
        }), _3);
      }

      function _3() {}
    }), _2);
  }

  function _2() {
    return M.chain(it("should work just fine with passed a value instead of a promise", function (done) {
      var a;

      if (done.async) {
        a = done;
        return M.chain(a.async(), _1);
      } else {
        return M.jump(void 0, _2);
      }

      function _1(a) {
        done = a;
        return M.jump(void 0, _2);
      }

      function _2() {
        return M.chain(M.run(QM, function () {
          var result, r;
          return M.chain(1 + 2, _1);

          function _1(a) {
            return a.mapply(function ($dm$b) {
              var err, ex;
              result = $dm$b;
              return M.jump(void 0, _1, _6);

              function _1() {
                var a;
                a = result;
                return M.chain(expect(a), _2, _6);
              }

              function _2(b) {
                var a;
                a = b.to;
                return M.chain(a.equal(3), _3, _6);
              }

              function _3() {
                var a;
                a = done;
                return M.chain(a(), _5);
              }

              function _4() {
                var a;
                err = ex;
                a = done;
                return M.chain(a(err), _5);
              }

              function _5() {}

              function _6(a) {
                ex = a;
                return M.jump(void 0, _4);
              }
            });
          }
        }), _3);
      }

      function _3() {}
    }), _3);
  }

  function _3() {}
});