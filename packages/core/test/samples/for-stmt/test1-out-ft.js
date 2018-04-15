import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

(function () {
  var ctx = M.context();
  return M.scope(_f_1);
});

(function () {
  var ctx = M.context();
  return M.scope(f_11);
});

(function () {
  var ctx = M.context();
  return M.scope(f_12);
});

function a() {
  var a = M.context();
  return M.scope(a_1);
}

;

function a1() {
  var a1 = M.context();
  return M.scope(a1_1);
}

function b() {
  var b = M.context();
  return M.scope(b_1);
}

function c() {
  var c = M.context();
  return M.scope(c_1);
}

function d() {
  var d = M.context();
  return M.scope(d_1);
}

function e() {
  var e = M.context();
  return M.scope(e_1);
}

function f() {
  var f = M.context();
  return M.scope(f_13);
}

function c1() {
  var c1 = M.context();
  return M.scope(c1_1);
}

function c2() {
  var c2 = M.context();
  return M.scope(c2_1);
}

function c2() {
  var c2 = M.context();
  return M.scope(_c2_1);
}

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, f_2);
}

function f_2(ctx) {
  var i;

  if (ctx._j < ctx._len) {
    i = ctx._ref[ctx._j];
    return M.chain(eff(i), f_3);
  }
}

function f_3(ctx, a) {
  if (a) {
    return M.jump(void 0, f_4);
  } else {
    return M.jump(void 0, f_4);
  }
}

function f_4(ctx) {
  ctx._j++;
  return M.jump(void 0, f_2);
}

function _f_1(ctx) {
  return M.chain(eff("bi"), _f_2);
}

function _f_2(ctx) {
  ctx._i = 0;
  return M.jump(void 0, _f_3);
}

function _f_3(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff("bi:", ctx._i), _f_4);
  } else {
    return M.chain(eff("ai"), f_5);
  }
}

function _f_4(ctx) {
  ctx._i++;
  return M.jump(void 0, _f_3);
}

function f_5(ctx) {}

function f_11(ctx) {
  return M.chain(eff("bi"), f_21);
}

function f_21(ctx) {
  ctx._i = 0;
  return M.jump(void 0, f_31);
}

function f_31(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff("bi:", ctx._i), f_41);
  } else {
    return M.chain(eff("ai"), _f_5);
  }
}

function f_41(ctx) {
  ctx._i++;
  return M.jump(void 0, f_31);
}

function _f_5(ctx) {}

function f_12(ctx) {
  return M.chain(eff("bi"), f_22);
}

function f_22(ctx) {
  ctx._i = 0;
  return M.jump(void 0, f_32);
}

function f_32(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff("bj:" + ctx._i), f_42);
  } else {
    return M.jump(void 0, f_8);
  }
}

function f_42(ctx) {
  ctx._j = 0;
  return M.jump(void 0, f_51);
}

function f_51(ctx) {
  if (ctx._j < 40) {
    if (ctx._j === 10) {
      return M.jump(void 0, f_7);
    } else {
      if (ctx._j === 30) {
        return M.jump(void 0, f_8);
      } else {
        return M.chain(eff(ctx._i + ctx._j), f_6);
      }
    }
  } else {
    return M.chain(eff("aj:" + ctx._i), f_7);
  }
}

function f_6(ctx) {
  ctx._j += 10;
  return M.jump(void 0, f_51);
}

function f_7(ctx) {
  ctx._i++;
  return M.jump(void 0, f_32);
}

function f_8(ctx) {
  return M.chain(eff("ai"), f_9);
}

function f_9(ctx) {}

function a_1(a) {
  return M.chain(eff("b"), a_2);
}

function a_2(a) {
  a._i = 0;
  return M.jump(void 0, a_3);
}

function a_3(a) {
  if (a._i < 3) {
    if (a._i === 2) {
      console.log(a._i);
    }

    return M.chain(eff(a._i), a_4);
  } else {
    return M.chain(eff("a"), a_5);
  }
}

function a_4(a) {
  a._i++;
  return M.jump(void 0, a_3);
}

function a_5(a) {}

function a1_1(a1) {
  return M.chain(eff("b"), a1_2);
}

function a1_2(a1) {
  a1._i = 0;
  a1._j = 10;
  return M.jump(void 0, a1_3);
}

function a1_3(a1) {
  if (a1._i < 3) {
    if (a1._i === 2) {
      console.log(a1._i, a1._j);
    }

    return M.chain(eff(a1._i, a1._j), a1_4);
  } else {
    return M.chain(effRes(a1._i, a1._j), a1_5);
  }
}

function a1_4(a1) {
  a1._i++, a1._j += 2;
  return M.jump(void 0, a1_3);
}

function a1_5(a1) {}

function b_1(b) {
  return M.chain(eff("b"), b_2);
}

function b_2(b) {
  if (i === 2) {
    console.log(i);
  }

  return M.chain(eff(i), b_2);
}

function c_1(c) {
  return M.chain(eff("b"), c_2);
}

function c_2(c) {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) {
    return 10;
  } else {
    return M.chain(eff(i), c_2);
  }
}

function d_1(d) {
  d._result = 0;
  d._i = 0;
  return M.jump(void 0, d_2);
}

function d_2(d) {
  if (d._i < 10) {
    return M.chain(eff(d._result, d._i), d_3);
  } else {
    return M.chain(eff(d._result), d_4);
  }
}

function d_3(d, a) {
  d._result = a;
  d._i++;
  return M.jump(void 0, d_2);
}

function d_4(d) {}

function e_1(e) {
  e._result = 0;
  e._i = 0;
  return M.jump(void 0, e_2);
}

function e_2(e) {
  if (e._i < 10) {
    return M.chain(eff(e._i), e_3);
  } else {
    return M.chain(eff(), e_4);
  }
}

function e_3(e, a) {
  e._result = a;
  e._i++;
  return M.jump(void 0, e_2);
}

function e_4(e) {}

function f_13(f) {
  f._result = 0;
  f._i = 0;
  return M.jump(void 0, f_23);
}

function f_23(f) {
  if (f._i < 10) {
    return M.chain(eff(f._i), f_33);
  } else {
    return M.chain(eff(f._result), f_43);
  }
}

function f_33(f, a) {
  f._result = a;
  f._i++;
  return M.jump(void 0, f_23);
}

function f_43(f) {}

function cc_1(_cc) {
  var a;
  a = _cc._c1._result += _cc._f._i++;
  return M.chain(eff(a), cc_2);
}

function cc_2(_cc) {}

function c1_1(c1) {
  var i, a;
  c1._result = [];

  for (i = 0; i < 10;) {
    (i => {
      var ctx = {},
          _c1 = c1;
      ctx._i = i;

      _c1._result[ctx._i] = function cc() {
        var _cc = M.context();

        _cc._c1 = _c1;
        _cc._f = ctx;
        return M.scope(cc_1);
      };
    })(i);
  }

  a = c1._result;
  return M.chain(eff(a), c1_2);
}

function c1_2(c1) {}

function c2_1(c2) {
  c2._result = [];
  c2._i = 0;
  return M.jump(void 0, c2_2);
}

function _cc_1(_cc) {
  var a;
  a = _cc._c2._result += _cc._f._i++;
  return M.chain(eff(a), _cc_2);
}

function _cc_2(_cc) {}

function f_14(ctx) {
  return M.chain(eff(function cc() {
    var _cc = M.context();

    _cc._c2 = ctx._c2;
    _cc._f = ctx;
    return M.scope(_cc_1);
  }), f_24);
}

function f_24(ctx, a) {
  ctx._c2._result[ctx._i] = a;
}

function c2_2(c2) {
  var a;

  if (c2._i < 10) {
    return M.chain((i => {
      var ctx = M.context();
      ctx._c2 = c2;
      ctx._i = i;
      return M.scope(f_14);
    })(c2._i), c2_2);
  } else {
    a = c2._result;
    return M.chain(eff(a), c2_3);
  }
}

function c2_3(c2) {}

function _c2_1(c2) {
  c2._result = [];
  c2._i = 0;
  return M.jump(void 0, _c2_2);
}

function cc_11(_cc) {
  var a;
  a = _cc._c2._result += _cc._f._i += _cc._j;
  return M.chain(eff(a), cc_21);
}

function cc_21(_cc) {}

function f_15(ctx) {
  var a;
  a = ctx._i++;
  return M.chain(function cc(j) {
    var _cc = M.context();

    _cc._c2 = ctx._c2;
    _cc._f = ctx;
    _cc._j = j;
    return M.scope(cc_11);
  }(a), f_25);
}

function f_25(ctx, a) {
  return M.chain(eff(a), f_34);
}

function f_34(ctx, a) {
  ctx._c2._result[ctx._i] = a;
}

function _c2_2(c2) {
  var a;

  if (c2._i < 10) {
    return M.chain((i => {
      var ctx = M.context();
      ctx._c2 = c2;
      ctx._i = i;
      return M.scope(f_15);
    })(c2._i), _c2_2);
  } else {
    a = c2._result;
    return M.chain(eff(a), _c2_3);
  }
}

function _c2_3(c2) {}