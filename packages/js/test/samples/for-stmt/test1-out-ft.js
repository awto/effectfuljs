(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_5);
});

(function () {
  var ctx = M.context();
  return M.scopeH(_f_1, f_6);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_11, _f_6);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_12, f_10);
});

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

;

function a1() {
  var a1 = M.context();
  return M.scopeH(a1_1, a1_6);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_3);
}

function c() {
  var c = M.context();
  return M.scopeH(c_1, c_3);
}

function d() {
  var d = M.context();
  return M.scopeH(d_1, d_5);
}

function e() {
  var e = M.context();
  return M.scopeH(e_1, e_5);
}

function f() {
  var f = M.context();
  return M.scopeH(f_13, f_53);
}

function c1() {
  var c1 = M.context();
  return M.scopeH(c1_1, c1_3);
}

function c2() {
  var c2 = M.context();
  return M.scopeH(c2_1, c2_4);
}

function c2() {
  var c2 = M.context();
  return M.scopeH(_c2_1, _c2_4);
}

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpH(f_2, f_5);
}

function f_2(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chainBH(eff(ctx._i), f_3, f_5);
  } else {
    return M.pure();
  }
}

function f_3(ctx, a) {
  if (a) {
    return M.jumpRH(f_4, f_5);
  } else {
    return M.jumpRH(f_4, f_5);
  }
}

function f_4(ctx) {
  ctx._j++;
  return M.jumpRH(f_2, f_5);
}

function f_5(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  return M.chainBH(eff('bi'), _f_2, f_6);
}

function _f_2(ctx) {
  ctx._i = 0;
  return M.jumpH(_f_3, f_6);
}

function _f_3(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff('bi:', ctx._i), _f_4, f_6);
  } else {
    return M.chainBH(eff('ai'), _f_5, f_6);
  }
}

function _f_4(ctx) {
  ctx._i++;
  return M.jumpRH(_f_3, f_6);
}

function _f_5(ctx) {
  return M.pure();
}

function f_6(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  return M.chainBH(eff('bi'), f_21, _f_6);
}

function f_21(ctx) {
  ctx._i = 0;
  return M.jumpH(f_31, _f_6);
}

function f_31(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff('bi:', ctx._i), f_41, _f_6);
  } else {
    return M.chainBH(eff('ai'), f_51, _f_6);
  }
}

function f_41(ctx) {
  ctx._i++;
  return M.jumpRH(f_31, _f_6);
}

function f_51(ctx) {
  return M.pure();
}

function _f_6(ctx, e) {
  return M.raise(e);
}

function f_12(ctx) {
  return M.chainBH(eff('bi'), f_22, f_10);
}

function f_22(ctx) {
  ctx._i = 0;
  return M.jumpH(f_32, f_10);
}

function f_32(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff('bj:' + ctx._i), f_42, f_10);
  } else {
    return M.jumpH(f_8, f_10);
  }
}

function f_42(ctx) {
  ctx._j = 0;
  return M.jumpRH(f_52, f_10);
}

function f_52(ctx) {
  if (ctx._j < 40) {
    if (ctx._j === 10) {
      return M.jumpH(f_7, f_10);
    } else {
      if (ctx._j === 30) {
        return M.jumpH(f_8, f_10);
      } else {
        return M.chainBH(eff(ctx._i + ctx._j), f_61, f_10);
      }
    }
  } else {
    return M.chainBH(eff('aj:' + ctx._i), f_7, f_10);
  }
}

function f_61(ctx) {
  ctx._j += 10;
  return M.jumpRH(f_52, f_10);
}

function f_7(ctx) {
  ctx._i++;
  return M.jumpRH(f_32, f_10);
}

function f_8(ctx) {
  return M.chainBH(eff('ai'), f_9, f_10);
}

function f_9(ctx) {
  return M.pure();
}

function f_10(ctx, e) {
  return M.raise(e);
}

function a_1(a) {
  return M.chainBH(eff('b'), a_2, a_6);
}

function a_2(a) {
  a._i = 0;
  return M.jumpH(a_3, a_6);
}

function a_3(a) {
  if (a._i < 3) {
    if (a._i === 2) {
      console.log(a._i);
    }

    return M.chainBH(eff(a._i), a_4, a_6);
  } else {
    return M.chainBH(eff('a'), a_5, a_6);
  }
}

function a_4(a) {
  a._i++;
  return M.jumpRH(a_3, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}

function a1_1(a1) {
  return M.chainBH(eff('b'), a1_2, a1_6);
}

function a1_2(a1) {
  a1._i = 0;
  a1._j = 10;
  return M.jumpH(a1_3, a1_6);
}

function a1_3(a1) {
  if (a1._i < 3) {
    if (a1._i === 2) {
      console.log(a1._i, a1._j);
    }

    return M.chainBH(eff(a1._i, a1._j), a1_4, a1_6);
  } else {
    return M.chainBH(effRes(a1._i, a1._j), a1_5, a1_6);
  }
}

function a1_4(a1) {
  a1._i++, a1._j += 2;
  return M.jumpRH(a1_3, a1_6);
}

function a1_5(a1) {
  return M.pure();
}

function a1_6(a1, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chainBH(eff('b'), b_2, b_3);
}

function b_2(b) {
  if (i === 2) {
    console.log(i);
  }

  return M.chainBH(eff(i), b_2, b_3);
}

function b_3(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chainBH(eff('b'), c_2, c_3);
}

function c_2(c) {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) {
    return M.pure(10);
  } else {
    return M.chainBH(eff(i), c_2, c_3);
  }
}

function c_3(c, e) {
  return M.raise(e);
}

function d_1(d) {
  d._result = 0;
  d._i = 0;
  return M.jumpH(d_2, d_5);
}

function d_2(d) {
  if (d._i < 10) {
    return M.chainBH(eff(d._result, d._i), d_3, d_5);
  } else {
    return M.chainBH(eff(d._result), d_4, d_5);
  }
}

function d_3(d, a) {
  d._result = a;
  d._i++;
  return M.jumpRH(d_2, d_5);
}

function d_4(d) {
  return M.pure();
}

function d_5(d, e) {
  return M.raise(e);
}

function e_1(e) {
  e._result = 0;
  e._i = 0;
  return M.jumpH(e_2, e_5);
}

function e_2(e) {
  if (e._i < 10) {
    return M.chainBH(eff(e._i), e_3, e_5);
  } else {
    return M.chainBH(eff(), e_4, e_5);
  }
}

function e_3(e, a) {
  e._result = a;
  e._i++;
  return M.jumpRH(e_2, e_5);
}

function e_4(e) {
  return M.pure();
}

function e_5(e, _e) {
  return M.raise(_e);
}

function f_13(f) {
  f._result = 0;
  f._i = 0;
  return M.jumpH(f_23, f_53);
}

function f_23(f) {
  if (f._i < 10) {
    return M.chainBH(eff(f._i), f_33, f_53);
  } else {
    return M.chainBH(eff(f._result), f_43, f_53);
  }
}

function f_33(f, a) {
  f._result = a;
  f._i++;
  return M.jumpRH(f_23, f_53);
}

function f_43(f) {
  return M.pure();
}

function f_53(f, e) {
  return M.raise(e);
}

function cc_1(_cc) {
  var a;
  a = _cc._c1._result += _cc._f._i++;
  return M.chainBH(eff(a), cc_2, cc_3);
}

function cc_2(_cc) {
  return M.pure();
}

function cc_3(_cc, e) {
  return M.raise(e);
}

function c1_1(c1) {
  var a;
  c1._result = [];

  for (c1._i = 0; c1._i < 10;) {
    (i => {
      var ctx = {},
          _c1 = c1;
      ctx._i = i;

      _c1._result[ctx._i] = function cc() {
        var _cc = M.context();

        _cc._c1 = _c1;
        _cc._f = ctx;
        return M.scopeH(cc_1, cc_3);
      };
    })(c1._i);
  }

  a = c1._result;
  return M.chainBH(eff(a), c1_2, c1_3);
}

function c1_2(c1) {
  return M.pure();
}

function c1_3(c1, e) {
  return M.raise(e);
}

function c2_1(c2) {
  c2._result = [];
  c2._i = 0;
  return M.jumpH(c2_2, c2_4);
}

function _cc_1(_cc) {
  var a;
  a = _cc._c2._result += _cc._f._i++;
  return M.chainBH(eff(a), _cc_2, _cc_3);
}

function _cc_2(_cc) {
  return M.pure();
}

function _cc_3(_cc, e) {
  return M.raise(e);
}

function f_14(ctx) {
  return M.chainBH(eff(function cc() {
    var _cc = M.context();

    _cc._c2 = ctx._c2;
    _cc._f = ctx;
    return M.scopeH(_cc_1, _cc_3);
  }), f_24, f_34);
}

function f_24(ctx, a) {
  ctx._c2._result[ctx._i] = a;
  return M.pure();
}

function f_34(ctx, e) {
  return M.raise(e);
}

function c2_2(c2) {
  var a;

  if (c2._i < 10) {
    return M.chainBH((i => {
      var ctx = M.context();
      ctx._c2 = c2;
      ctx._i = i;
      return M.scopeH(f_14, f_34);
    })(c2._i), c2_2, c2_4);
  } else {
    a = c2._result;
    return M.chainBH(eff(a), c2_3, c2_4);
  }
}

function c2_3(c2) {
  return M.pure();
}

function c2_4(c2, e) {
  return M.raise(e);
}

function _c2_1(c2) {
  c2._result = [];
  c2._i = 0;
  return M.jumpH(_c2_2, _c2_4);
}

function cc_11(_cc) {
  var a;
  a = _cc._c2._result += _cc._f._i += _cc._j;
  return M.chainBH(eff(a), cc_21, cc_31);
}

function cc_21(_cc) {
  return M.pure();
}

function cc_31(_cc, e) {
  return M.raise(e);
}

function f_15(ctx) {
  var a;
  a = ctx._i++;
  return M.chainBH(function cc(j) {
    var _cc = M.context();

    _cc._c2 = ctx._c2;
    _cc._f = ctx;
    _cc._j = j;
    return M.scopeH(cc_11, cc_31);
  }(a), f_25, f_44);
}

function f_25(ctx, a) {
  return M.chainBH(eff(a), f_35, f_44);
}

function f_35(ctx, a) {
  ctx._c2._result[ctx._i] = a;
  return M.pure();
}

function f_44(ctx, e) {
  return M.raise(e);
}

function _c2_2(c2) {
  var a;

  if (c2._i < 10) {
    return M.chainBH((i => {
      var ctx = M.context();
      ctx._c2 = c2;
      ctx._i = i;
      return M.scopeH(f_15, f_44);
    })(c2._i), _c2_2, _c2_4);
  } else {
    a = c2._result;
    return M.chainBH(eff(a), _c2_3, _c2_4);
  }
}

function _c2_3(c2) {
  return M.pure();
}

function _c2_4(c2, e) {
  return M.raise(e);
}