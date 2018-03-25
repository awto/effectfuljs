import * as M from "@effectful/core";

function aa() {
  var A = class A {
    method() {
      var r;
      return M.scope(_1);

      function _1() {
        return M.pure("from A");
      }
    }

    static smethod() {
      var r;
      return M.scope(_1);

      function _1() {
        return M.pure("static from A");
      }
    }

  },
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
    }

  };
  return M.scope(_1);

  function _1() {
    return M.pure();
  }
}