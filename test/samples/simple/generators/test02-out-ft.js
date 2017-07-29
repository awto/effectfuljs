function f1_1(ctx) {
  return ctx.yldMB(a1, f1_2);
}

function f1_2(ctx, a) {
  var b3_v = ctx._b3_v;
  b3_v.a3 = a;
  return ctx.pure();
}

function f2_1(ctx) {
  return ctx.yldMB(a1, f2_2);
}

function f2_2(ctx, a) {
  var b3_v = ctx._b3_v;
  b3_v.a3 = a;
  return ctx.yldMB(a1, f2_3);
}

function f2_3(ctx, a) {
  var b3_v = ctx._b3_v;
  b3_v.a3 = a;
  return ctx.pure();
}

function _f2_1(ctx) {
  var a_v = ctx._a_v;
  return ctx.yldMB(a_v.a5, _f2_2);
}

function _f2_2(ctx, a) {
  return ctx._2 = a, ctx.yldMB(a4, _f2_3);
}

function _f2_3(ctx, b) {
  var a = ctx._2;
  return ctx._2 = undefined, ctx.yldMB(a + b, f2_4);
}

function f2_4(ctx, a) {
  var a_v = ctx._a_v;
  a_v.a3 = a;
  return ctx.pure();
}

function a_1(ctx) {
  var f2,
      f3,
      a_v = ctx._a_v,
      _top_v = ctx._top_v;

  f2 = function f2() {
    var ctx = M.context();
    return ctx.scope(_f2_1);
  };

  f3 = function f3() {
    var _a_v = a_v,
        _top_v = top_v;
    _a_v.a3 = 11;
    _top_v.a6 += 4;
  };

  _top_v.a1 += 2;
  return ctx._f2 = f2, ctx._f3 = f3, ctx.yldMB(_top_v.a1, a_2);
}

function a_2(ctx, a) {
  var _top_v = ctx._top_v;
  return ctx._top_v = undefined, ctx._3 = a, ctx.yldMB(_top_v.a2, a_3);
}

function a_3(ctx, b) {
  var a = ctx._3;
  return ctx._3 = undefined, ctx.yldMB(a + b, a_4);
}

function a_4(ctx, a) {
  var a_v = ctx._a_v;
  a_v.a3 = a;
  return ctx.yldMB(a_v.a3, a_5);
}

function a_5(ctx, a) {
  return ctx._7 = a, ctx.yldMB(a4, a_6);
}

function a_6(ctx, b) {
  var a = ctx._7;
  return ctx._7 = undefined, ctx.yldMB(a + b, a_7);
}

function _f1_1(ctx) {
  var top_v = ctx._top_v,
      a_v = ctx._a_v;
  top_v.a7 += 2;
  a_v.a8 += 3;
  return ctx.yldMB(top_v.a1, _f1_2);
}

function _f1_2(ctx, a) {
  var top_v = ctx._top_v;
  return ctx._top_v = undefined, ctx._4 = a, ctx.yldMB(top_v.a2, f1_3);
}

function f1_3(ctx, b) {
  var a = ctx._4;
  return ctx._4 = undefined, ctx.yldMB(a + b, f1_4);
}

function f1_4(ctx, b) {
  var a_v = ctx._a_v,
      a;
  a = a_v.a3 = b;
  return ctx.pure(a);
}

function a_7(ctx, a) {
  var f1,
      f2 = ctx._f2,
      f3 = ctx._f3,
      a_v = ctx._a_v;
  a_v.a5 = a;

  f1 = function f1() {
    var ctx = M.context();
    return ctx.scope(_f1_1);
  };

  return ctx.pure([f1, f2, f3]);
}

function b1_1(ctx) {
  return ctx.yldMB(a1, b1_2);
}

function f1_11(ctx) {
  return ctx.yldMB(a1, f1_21);
}

function f1_21(ctx, b) {
  var b1_v = ctx._b1_v,
      a;
  a = b1_v.a3 = b;
  return ctx.pure(a);
}

function b1_2(ctx, a) {
  var f1,
      b1_v = ctx._b1_v;
  b1_v.a3 = a;

  f1 = function f1() {
    var ctx = M.context();
    return ctx.scope(f1_11);
  };

  return ctx.pure(f1);
}

function b2_1(ctx) {
  return ctx.yldMB(a1, b2_2);
}

function b2_2(ctx, a) {
  var f1,
      b2_v = ctx._b2_v;
  b2_v.a3 = a;

  f1 = function f1() {
    var _b2_v = b2_v;
    _b2_v.a3 = a1;
  };

  return ctx.pure(f1);
}

function b_1(ctx) {
  var a, b;
  b = top();
  a = b();
  return ctx.yldStarMB(a, b_2);
}

function b_2(ctx, f) {
  return ctx._f = f, ctx.yldStarM(f[0], b_3);
}

function b_3(ctx) {
  var f = ctx._f;
  return ctx.yldStarM(f[1], b_4);
}

function b_4(ctx) {
  var f = ctx._f;
  return ctx.yldStarM(f[2], ctx.pure);
}

var a1, a2, a4;

function b3(a3) {
  var f1,
      f2,
      b3_v = {
    a3
  };

  f1 = function f1() {
    var ctx = M.context();
    return ctx.scope(f1_1);
  };

  f2 = function f2() {
    var ctx = M.context();
    return ctx.scope(f2_1);
  };

  return f1;
}

function top(a1, a6) {
  var a3,
      top_v = {
    a1,
    a6,
    a2: undefined,
    a7: undefined
  };

  function a(a8) {
    var a_v = {
      a8,
      a3: undefined,
      a5: undefined
    },
        ctx = M.context();
    return ctx._a_v = a_v, ctx.scope(a_1);
  }

  function b(a1) {
    var _top_v = top_v;
    a1 += _top_v.a2;
    _top_v.a6 += a3;
  }

  top_v.a2 = 10;
  top_v.a7 = 11;
  a3 = 12;
  return [a, b];
}

function b1() {
  var b1_v = {
    a3: undefined
  },
      ctx = M.context();
  return ctx._b1_v = b1_v, ctx.scope(b1_1);
}

function b2() {
  var b2_v = {
    a3: undefined
  },
      ctx = M.context();
  return ctx._b2_v = b2_v, ctx.scope(b2_1);
}

function b() {
  var ctx = M.context();
  return ctx.scope(b_1);
}