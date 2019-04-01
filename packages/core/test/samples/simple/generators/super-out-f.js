import * as M from "@effectful/core";

function aa() {
  var A, B, r;
  return M.scope(_1);

  function _1() {
    A = class A {
      method() {
        var r;
        return M.scope(_1);

        function _1() {
          return M.pure("from A");
        }

        function _2(r) {
          return M.pure(r);
        }
      }

      static smethod() {
        var r;
        return M.scope(_1);

        function _1() {
          return M.pure("static from A");
        }

        function _2(r) {
          return M.pure(r);
        }
      }

    };
    B = class B extends A {
      method() {
        var _this = this,
            r;

        return M.scope(_1);

        function _1() {
          var a;
          a = Object.getPrototypeOf(B.prototype).method.call(_this);
          return M.chain(a, _2);
        }

        function _2(a) {
          return M.pure("from B " + a);
        }

        function _3(r) {
          return M.pure(r);
        }
      }

      static smethod() {
        var _this = this,
            r;

        return M.scope(_1);

        function _1() {
          var a;
          a = Object.getPrototypeOf(B.prototype).method.call(_this);
          return M.chain(a, _2);
        }

        function _2(a) {
          return M.pure("static from B " + a);
        }

        function _3(r) {
          return M.pure(r);
        }
      }

    };
    return M.pure();
  }

  function _2(r) {
    return M.pure(r);
  }
}