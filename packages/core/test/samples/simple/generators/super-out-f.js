import * as M from '@effectful/core';

function aa() {
  var A = class A {
    method() {
      var r;
      return M.scopeH(_1, _2);

      function _1() {
        return M.pure('from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

    static smethod() {
      var r;
      return M.scopeH(_1, _2);

      function _1() {
        return M.pure('static from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

  },
      B = class B extends A {
    method() {
      var _this = this,
          r;

      return M.scopeH(_1, _3);

      function _1() {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chainBH(M.chain(a), _2, _3);
      }

      function _2(a) {
        return M.pure('from B ' + a);
      }

      function _3(e) {
        return M.raise(e);
      }
    }

    static smethod() {
      var _this = this,
          r;

      return M.scopeH(_1, _3);

      function _1() {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chainBH(M.chain(a), _2, _3);
      }

      function _2(a) {
        return M.pure('static from B ' + a);
      }

      function _3(e) {
        return M.raise(e);
      }
    }

  };
  return M.scopeH(_1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}