import * as M from '@effectful/core';

function aa() {
  var A = class A {
    method() {
      return M.scope(_1);

      function _1() {
        return M.pure('from A');
      }
    }

    static smethod() {
      return M.scope(_1);

      function _1() {
        return M.pure('static from A');
      }
    }

  },
      B = class B extends A {
    method() {
      var _this = this;

      return M.scope(_1, _this);

      function _1(b, _this) {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chain(a, _2);
      }

      function _2(a) {
        return M.pure('from B ' + a);
      }
    }

    static smethod() {
      var _this = this;

      return M.scope(_1, _this);

      function _1(b, _this) {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chain(a, _2);
      }

      function _2(a) {
        return M.pure('static from B ' + a);
      }
    }

  };
  return M.scope(_1);

  function _1() {
    return M.pure();
  }
}