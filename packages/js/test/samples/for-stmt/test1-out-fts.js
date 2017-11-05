(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(f_1, f_43, j, len, ref);
});

(function () {
  return M.chain(eff('bi'), _f_1, f_51);
});

(function () {
  return M.chain(eff('bi'), f_11, _f_5);
});

(function () {
  return M.chain(eff('bi'), f_12, f_9);
});

function a() {
  return M.chain(eff('b'), a_1, a_5);
}

;

function a1() {
  return M.chain(eff('b'), a1_1, a1_5);
}

function b() {
  return M.chain(eff('b'), b_1, b_2);
}

function c() {
  return M.chain(eff('b'), c_1, c_2);
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(d_1, d_4, result, i);
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(e_1, e_4, i);
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(f_13, _f_4, result, i);
}

function c1() {
  var i,
      c1 = M.context(),
      a;
  c1._result = [];

  for (i = 0; i < 10;) {
    (i => {
      var ctx = {};
      ctx._i = i;

      ctx._result[ctx._i] = function cc() {
        var _cc = M.context(),
            a;

        a = _cc._result += _cc._i++;
        return M.chain(eff(a), cc_11, cc_21);
      };
    })(i);
  }

  a = c1._result;
  return M.chain(eff(a), c1_1, c1_2);
}

function c2() {
  var i,
      c2 = M.context();
  c2._result = [];
  i = 0;
  return M.jump(c2_1, _c2_3, i);
}

function c2() {
  var i,
      c2 = M.context();
  c2._result = [];
  i = 0;
  return M.jump(_c2_1, c2_3, i);
}

function f_1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.chain(eff(i), f_2, f_43, j, len, ref);
  } else {
    return M.pure();
  }
}

function f_2(a, j, len, ref) {
  if (a) {
    return M.jump(f_3, f_43, j, len, ref);
  } else {
    return M.jump(f_3, f_43, j, len, ref);
  }
}

function f_3(j, len, ref) {
  j++;
  return M.repeat(f_1, f_43, j, len, ref);
}

function f_43(e) {
  return M.raise(e);
}

function _f_1() {
  var i;
  i = 0;
  return M.jump(_f_2, f_51, i);
}

function _f_2(i) {
  if (i < 3) {
    return M.chain(eff('bi:', i), _f_3, f_51, i);
  } else {
    return M.chain(eff('ai'), f_42, f_51);
  }
}

function _f_3(i) {
  i++;
  return M.repeat(_f_2, f_51, i);
}

function f_42() {
  return M.pure();
}

function f_51(e) {
  return M.raise(e);
}

function f_11() {
  var i;
  i = 0;
  return M.jump(f_21, _f_5, i);
}

function f_21(i) {
  if (i < 3) {
    return M.chain(eff('bi:', i), f_31, _f_5, i);
  } else {
    return M.chain(eff('ai'), f_41, _f_5);
  }
}

function f_31(i) {
  i++;
  return M.repeat(f_21, _f_5, i);
}

function f_41() {
  return M.pure();
}

function _f_5(e) {
  return M.raise(e);
}

function f_12() {
  var i;
  i = 0;
  return M.jump(f_22, f_9, i);
}

function f_22(i) {
  if (i < 3) {
    return M.chain(eff('bj:' + i), f_32, f_9, i);
  } else {
    return M.jump(f_7, f_9);
  }
}

function f_32(i) {
  var j;
  j = 0;
  return M.jump(f_4, f_9, i, j);
}

function f_4(i, j) {
  if (j < 40) {
    if (j === 10) {
      return M.jump(f_6, f_9, i);
    } else {
      if (j === 30) {
        return M.jump(f_7, f_9);
      } else {
        return M.chain(eff(i + j), f_5, f_9, i, j);
      }
    }
  } else {
    return M.chain(eff('aj:' + i), f_6, f_9, i);
  }
}

function f_5(i, j) {
  j += 10;
  return M.repeat(f_4, f_9, i, j);
}

function f_6(i) {
  i++;
  return M.repeat(f_22, f_9, i);
}

function f_7() {
  return M.chain(eff('ai'), f_8, f_9);
}

function f_8() {
  return M.pure();
}

function f_9(e) {
  return M.raise(e);
}

function a_1() {
  var i;
  i = 0;
  return M.jump(a_2, a_5, i);
}

function a_2(i) {
  if (i < 3) {
    if (i === 2) {
      console.log(i);
    }

    return M.chain(eff(i), a_3, a_5, i);
  } else {
    return M.chain(eff('a'), a_4, a_5);
  }
}

function a_3(i) {
  i++;
  return M.repeat(a_2, a_5, i);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}

function a1_1() {
  var i, j;
  i = 0;
  j = 10;
  return M.jump(a1_2, a1_5, i, j);
}

function a1_2(i, j) {
  if (i < 3) {
    if (i === 2) {
      console.log(i, j);
    }

    return M.chain(eff(i, j), a1_3, a1_5, i, j);
  } else {
    return M.chain(effRes(i, j), a1_4, a1_5);
  }
}

function a1_3(i, j) {
  i++, j += 2;
  return M.repeat(a1_2, a1_5, i, j);
}

function a1_4() {
  return M.pure();
}

function a1_5(e) {
  return M.raise(e);
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.repeat(eff(i), b_1, b_2);
}

function b_2(e) {
  return M.raise(e);
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) {
    return M.pure(10);
  } else {
    return M.repeat(eff(i), c_1, c_2);
  }
}

function c_2(e) {
  return M.raise(e);
}

function d_1(result, i) {
  if (i < 10) {
    return M.chain(eff(result, i), d_2, d_4, i);
  } else {
    return M.chain(eff(result), d_3, d_4);
  }
}

function d_2(a, i) {
  var result;
  result = a;
  i++;
  return M.repeat(d_1, d_4, result, i);
}

function d_3() {
  return M.pure();
}

function d_4(e) {
  return M.raise(e);
}

function e_1(i) {
  if (i < 10) {
    return M.chain(eff(i), e_2, e_4, i);
  } else {
    return M.chain(eff(), e_3, e_4);
  }
}

function e_2(a, i) {
  var result;
  result = a;
  i++;
  return M.repeat(e_1, e_4, i);
}

function e_3() {
  return M.pure();
}

function e_4(e) {
  return M.raise(e);
}

function f_13(result, i) {
  if (i < 10) {
    return M.chain(eff(i), f_23, _f_4, i);
  } else {
    return M.chain(eff(result), f_34, _f_4);
  }
}

function f_23(a, i) {
  var result;
  result = a;
  i++;
  return M.repeat(f_13, _f_4, result, i);
}

function f_34() {
  return M.pure();
}

function _f_4(e) {
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

function c2_1(c2, i) {
  var a;

  if (i < 10) {
    return M.repeat((i => {
      var ctx = M.context();
      ctx._i = i;
      return M.chain(eff(function cc() {
        var _cc = M.context(),
            a;

        a = _cc._result += _cc._i++;
        return M.chain(eff(a), _cc_1, _cc_2);
      }), f_14, f_25);
    })(i), c2_1, _c2_3, i);
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

function _c2_1(c2, i) {
  var a;

  if (i < 10) {
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
    })(i), _c2_1, c2_3, i);
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