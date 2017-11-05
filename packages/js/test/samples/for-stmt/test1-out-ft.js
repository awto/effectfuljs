(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_1, f_43);
});

(function () {
  var ctx = M.context();
  return M.chain(eff('bi'), _f_1, f_51);
});

(function () {
  var ctx = M.context();
  return M.chain(eff('bi'), f_11, _f_5);
});

(function () {
  var ctx = M.context();
  return M.chain(eff('bi'), f_12, f_9);
});

function a() {
  var a = M.context();
  return M.chain(eff('b'), a_1, a_5);
}

;

function a1() {
  var a1 = M.context();
  return M.chain(eff('b'), a1_1, a1_5);
}

function b() {
  var b = M.context();
  return M.chain(eff('b'), b_1, b_2);
}

function c() {
  var c = M.context();
  return M.chain(eff('b'), c_1, c_2);
}

function d() {
  var d = M.context();
  d._result = 0;
  d._i = 0;
  return M.jump(d_1, d_4);
}

function e() {
  var e = M.context();
  e._result = 0;
  e._i = 0;
  return M.jump(e_1, e_4);
}

function f() {
  var f = M.context();
  f._result = 0;
  f._i = 0;
  return M.jump(f_13, _f_4);
}

function c1() {
  var c1 = M.context(),
      a;
  c1._result = [];

  for (c1._i = 0; c1._i < 10;) {
    (i => {
      var ctx = {};
      ctx._i = i;

      ctx._result[ctx._i] = function cc() {
        var _cc = M.context(),
            a;

        a = _cc._result += _cc._i++;
        return M.chain(eff(a), cc_11, cc_21);
      };
    })(c1._i);
  }

  a = c1._result;
  return M.chain(eff(a), c1_1, c1_2);
}

function c2() {
  var c2 = M.context();
  c2._result = [];
  c2._i = 0;
  return M.jump(c2_1, _c2_3);
}

function c2() {
  var c2 = M.context();
  c2._result = [];
  c2._i = 0;
  return M.jump(_c2_1, c2_3);
}

function f_1(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chain(eff(ctx._i), f_2, f_43);
  } else {
    return M.pure();
  }
}

function f_2(ctx, a) {
  if (a) {
    return M.jump(f_3, f_43);
  } else {
    return M.jump(f_3, f_43);
  }
}

function f_3(ctx) {
  ctx._j++;
  return M.repeat(f_1, f_43);
}

function f_43(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  ctx._i = 0;
  return M.jump(_f_2, f_51);
}

function _f_2(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff('bi:', ctx._i), _f_3, f_51);
  } else {
    return M.chain(eff('ai'), f_42, f_51);
  }
}

function _f_3(ctx) {
  ctx._i++;
  return M.repeat(_f_2, f_51);
}

function f_42(ctx) {
  return M.pure();
}

function f_51(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  ctx._i = 0;
  return M.jump(f_21, _f_5);
}

function f_21(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff('bi:', ctx._i), f_31, _f_5);
  } else {
    return M.chain(eff('ai'), f_41, _f_5);
  }
}

function f_31(ctx) {
  ctx._i++;
  return M.repeat(f_21, _f_5);
}

function f_41(ctx) {
  return M.pure();
}

function _f_5(ctx, e) {
  return M.raise(e);
}

function f_12(ctx) {
  ctx._i = 0;
  return M.jump(f_22, f_9);
}

function f_22(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff('bj:' + ctx._i), f_32, f_9);
  } else {
    return M.jump(f_7, f_9);
  }
}

function f_32(ctx) {
  ctx._j = 0;
  return M.jump(f_4, f_9);
}

function f_4(ctx) {
  if (ctx._j < 40) {
    if (ctx._j === 10) {
      return M.jump(f_6, f_9);
    } else {
      if (ctx._j === 30) {
        return M.jump(f_7, f_9);
      } else {
        return M.chain(eff(ctx._i + ctx._j), f_5, f_9);
      }
    }
  } else {
    return M.chain(eff('aj:' + ctx._i), f_6, f_9);
  }
}

function f_5(ctx) {
  ctx._j += 10;
  return M.repeat(f_4, f_9);
}

function f_6(ctx) {
  ctx._i++;
  return M.repeat(f_22, f_9);
}

function f_7(ctx) {
  return M.chain(eff('ai'), f_8, f_9);
}

function f_8(ctx) {
  return M.pure();
}

function f_9(ctx, e) {
  return M.raise(e);
}

function a_1(a) {
  a._i = 0;
  return M.jump(a_2, a_5);
}

function a_2(a) {
  if (a._i < 3) {
    if (a._i === 2) {
      console.log(a._i);
    }

    return M.chain(eff(a._i), a_3, a_5);
  } else {
    return M.chain(eff('a'), a_4, a_5);
  }
}

function a_3(a) {
  a._i++;
  return M.repeat(a_2, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a1_1(a1) {
  a1._i = 0;
  a1._j = 10;
  return M.jump(a1_2, a1_5);
}

function a1_2(a1) {
  if (a1._i < 3) {
    if (a1._i === 2) {
      console.log(a1._i, a1._j);
    }

    return M.chain(eff(a1._i, a1._j), a1_3, a1_5);
  } else {
    return M.chain(effRes(a1._i, a1._j), a1_4, a1_5);
  }
}

function a1_3(a1) {
  a1._i++, a1._j += 2;
  return M.repeat(a1_2, a1_5);
}

function a1_4(a1) {
  return M.pure();
}

function a1_5(a1, e) {
  return M.raise(e);
}

function b_1(b) {
  if (i === 2) {
    console.log(i);
  }

  return M.repeat(eff(i), b_1, b_2);
}

function b_2(b, e) {
  return M.raise(e);
}

function c_1(c) {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) {
    return M.pure(10);
  } else {
    return M.repeat(eff(i), c_1, c_2);
  }
}

function c_2(c, e) {
  return M.raise(e);
}

function d_1(d) {
  if (d._i < 10) {
    return M.chain(eff(d._result, d._i), d_2, d_4);
  } else {
    return M.chain(eff(d._result), d_3, d_4);
  }
}

function d_2(d, a) {
  d._result = a;
  d._i++;
  return M.repeat(d_1, d_4);
}

function d_3(d) {
  return M.pure();
}

function d_4(d, e) {
  return M.raise(e);
}

function e_1(e) {
  if (e._i < 10) {
    return M.chain(eff(e._i), e_2, e_4);
  } else {
    return M.chain(eff(), e_3, e_4);
  }
}

function e_2(e, a) {
  e._result = a;
  e._i++;
  return M.repeat(e_1, e_4);
}

function e_3(e) {
  return M.pure();
}

function e_4(e, _e) {
  return M.raise(_e);
}

function f_13(f) {
  if (f._i < 10) {
    return M.chain(eff(f._i), f_23, _f_4);
  } else {
    return M.chain(eff(f._result), f_34, _f_4);
  }
}

function f_23(f, a) {
  f._result = a;
  f._i++;
  return M.repeat(f_13, _f_4);
}

function f_34(f) {
  return M.pure();
}

function _f_4(f, e) {
  return M.raise(e);
}

function cc_11(_cc) {
  return M.pure();
}

function cc_21(_cc, e) {
  return M.raise(e);
}

function c1_1(c1) {
  return M.pure();
}

function c1_2(c1, e) {
  return M.raise(e);
}

function _cc_1(_cc) {
  return M.pure();
}

function _cc_2(_cc, e) {
  return M.raise(e);
}

function f_14(ctx, a) {
  ctx._result[ctx._i] = a;
  return M.pure();
}

function f_25(ctx, e) {
  return M.raise(e);
}

function c2_1(c2) {
  var a;

  if (c2._i < 10) {
    return M.repeat((i => {
      var ctx = M.context();
      ctx._i = i;
      return M.chain(eff(function cc() {
        var _cc = M.context(),
            a;

        a = _cc._result += _cc._i++;
        return M.chain(eff(a), _cc_1, _cc_2);
      }), f_14, f_25);
    })(c2._i), c2_1, _c2_3);
  } else {
    a = c2._result;
    return M.chain(eff(a), _c2_2, _c2_3);
  }
}

function _c2_2(c2) {
  return M.pure();
}

function _c2_3(c2, e) {
  return M.raise(e);
}

function cc_1(_cc) {
  return M.pure();
}

function cc_2(_cc, e) {
  return M.raise(e);
}

function f_15(ctx, a) {
  return M.chain(eff(a), f_24, f_33);
}

function f_24(ctx, a) {
  ctx._result[ctx._i] = a;
  return M.pure();
}

function f_33(ctx, e) {
  return M.raise(e);
}

function _c2_1(c2) {
  var a;

  if (c2._i < 10) {
    return M.repeat((i => {
      var ctx = M.context(),
          a;
      ctx._i = i;
      a = ctx._i++;
      return M.chain(function cc(j) {
        var _cc = M.context(),
            a;

        _cc._j = j;
        a = _cc._result += _cc._i += _cc._j;
        return M.chain(eff(a), cc_1, cc_2);
      }(a), f_15, f_33);
    })(c2._i), _c2_1, c2_3);
  } else {
    a = c2._result;
    return M.chain(eff(a), c2_2, c2_3);
  }
}

function c2_2(c2) {
  return M.pure();
}

function c2_3(c2, e) {
  return M.raise(e);
}