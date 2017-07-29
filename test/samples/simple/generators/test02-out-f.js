var a1;
var a2;
var a4;

function b3(a3) {
  var f1 = function f1() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.yldMB(a1, _2);
    }

    function _2(ctx, a) {
      a3 = a;
      return ctx.pure();
    }
  };

  var f2 = function f2() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.yldMB(a1, _2);
    }

    function _2(ctx, a) {
      a3 = a;
      return ctx.yldMB(a1, _3);
    }

    function _3(ctx, a) {
      a3 = a;
      return ctx.pure();
    }
  };

  return f1;
}

function top(a1, a6) {
  var a2 = 10,
      a7 = 11,
      a3 = 12;

  function a(a8) {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      var f2, f3;

      f2 = function f2() {
        var ctx = M.context();
        return ctx.scope(_1);

        function _1(ctx) {
          return ctx.yldMB(a5, _2);
        }

        function _2(ctx, a) {
          return ctx._2 = a, ctx.yldMB(a4, _3);
        }

        function _3(ctx, b) {
          var a = ctx._2;
          return ctx._2 = undefined, ctx.yldMB(a + b, _4);
        }

        function _4(ctx, a) {
          _a3 = a;
          return ctx.pure();
        }
      };

      f3 = function f3() {
        _a3 = 11;
        a6 += 4;
      };

      a1 += 2;
      return ctx._f2 = f2, ctx._f3 = f3, ctx.yldMB(a1, _2);
    }

    function _2(ctx, a) {
      return ctx._3 = a, ctx.yldMB(a2, _3);
    }

    function _3(ctx, b) {
      var a = ctx._3;
      return ctx._3 = undefined, ctx.yldMB(a + b, _4);
    }

    function _4(ctx, a) {
      _a3 = a;
      return ctx.yldMB(_a3, _5);
    }

    function _5(ctx, a) {
      return ctx._7 = a, ctx.yldMB(a4, _6);
    }

    function _6(ctx, b) {
      var a = ctx._7;
      return ctx._7 = undefined, ctx.yldMB(a + b, _7);
    }

    function _7(ctx, a) {
      var f1,
          f2 = ctx._f2,
          f3 = ctx._f3;
      a5 = a;

      f1 = function f1() {
        var ctx = M.context();
        return ctx.scope(_1);

        function _1(ctx) {
          a7 += 2;
          a8 += 3;
          return ctx.yldMB(a1, _2);
        }

        function _2(ctx, a) {
          return ctx._4 = a, ctx.yldMB(a2, _3);
        }

        function _3(ctx, b) {
          var a = ctx._4;
          return ctx._4 = undefined, ctx.yldMB(a + b, _4);
        }

        function _4(ctx, b) {
          var a;
          a = _a3 = b;
          return ctx.pure(a);
        }
      };

      return ctx.pure([f1, f2, f3]);
    }
  }

  function b(a1) {
    a1 += a2;
    a6 += a3;
  }

  return [a, b];
}

function b1() {
  var ctx = M.context();
  return ctx.scope(_1);

  function _1(ctx) {
    return ctx.yldMB(a1, _2);
  }

  function _2(ctx, a) {
    var f1;
    a3 = a;

    f1 = function f1() {
      var ctx = M.context();
      return ctx.scope(_1);

      function _1(ctx) {
        return ctx.yldMB(a1, _2);
      }

      function _2(ctx, b) {
        var a;
        a = a3 = b;
        return ctx.pure(a);
      }
    };

    return ctx.pure(f1);
  }
}

function b2() {
  var ctx = M.context();
  return ctx.scope(_1);

  function _1(ctx) {
    return ctx.yldMB(a1, _2);
  }

  function _2(ctx, a) {
    var f1;
    a31 = a;

    f1 = function f1() {
      a31 = a1;
    };

    return ctx.pure(f1);
  }
}

function b() {
  var ctx = M.context();
  return ctx.scope(_1);

  function _1(ctx) {
    var a, b;
    b = top();
    a = b();
    return ctx.yldStarMB(a, _2);
  }

  function _2(ctx, f) {
    return ctx._f = f, ctx.yldStarM(f[0], _3);
  }

  function _3(ctx) {
    var f = ctx._f;
    return ctx.yldStarM(f[1], _4);
  }

  function _4(ctx) {
    var f = ctx._f;
    return ctx.yldStarM(f[2], ctx.pure);
  }
}