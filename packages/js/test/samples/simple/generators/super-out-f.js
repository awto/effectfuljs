function aa() {
  class A {
    method() {
      var r;
      return M.scope(_1, _2);

      function _1() {
        return M.pure('from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

    static smethod() {
      var r;
      return M.scope(_1, _2);

      function _1() {
        return M.pure('static from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

  }

  class B extends A {
    method() {
      var _this = this,
          r;

      return M.scope(_1, _3);

      function _1() {
        var a;
        a = Object.getPrototypeOf(Object.getPrototypeOf(_this)).method.call(_this);
        return M.chain(M.chain(a), _2, _3);
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

      return M.scope(_1, _3);

      function _1() {
        var a;
        a = Object.getPrototypeOf(_this).method.call(_this);
        return M.chain(M.chain(a), _2, _3);
      }

      function _2(a) {
        return M.pure('static from B ' + a);
      }

      function _3(e) {
        return M.raise(e);
      }
    }

  }

  return M.scope(_1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}