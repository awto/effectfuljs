(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);
});

(function () {
  return M.j(eff('bi'), _4);
});

(function () {
  return M.j(eff('bi'), _9);
});

(function () {
  return M.j(eff('bi'), _14);
});

function a() {
  return M.j(eff('b'), a_1);
}

;

function a1() {
  return M.j(eff('b'), a1_1);
}

function b() {
  return M.j(eff('b'), b_1);
}

function c() {
  return M.j(eff('b'), c_1);
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return d_1(result, i);
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return e_1(i);
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return f_1(result, i);
}

function c1() {
  var i,
      c1_v = {
    result: undefined
  },
      a = i => {
    var _v = {
      i
    },
        cc = function cc() {
      var cc_v = {
        cc: undefined
      },
          _c1_v = c1_v,
          __v = _v,
          a,
          b;
      b = __v.i++;
      a = _c1_v.result += b;
      return M.j(eff(a), cc_1);
    },
        _c1_v = c1_v;

    _c1_v.result[_v.i] = cc;
    return;
  };

  c1_v.result = [];

  for (i = 0; i < 10;) {
    a(i);
  }

  return M.j(eff(c1_v.result), c1_1);
}

function c2() {
  var i,
      c2_v = {
    result: undefined
  },
      a = i => {
    var _v = {
      i
    },
        cc = function cc() {
      var cc_v = {
        cc: undefined
      },
          _c2_v = c2_v,
          __v = _v,
          a,
          b;
      b = __v.i++;
      a = _c2_v.result += b;
      return M.j(eff(a), _cc_1);
    },
        _c2_v = c2_v;

    return M.jB(eff(cc), _23, _v, _c2_v);
  };

  c2_v.result = [];
  i = 0;
  return c2_1(i, c2_v, a);
}

function _c2() {
  var i,
      c2_v = {
    result: undefined
  },
      a = i => {
    var _v = {
      i
    },
        cc = function cc(j) {
      var cc_v = {
        j,
        cc: undefined
      },
          _c2_v = c2_v,
          __v = _v,
          a,
          b;
      b = __v.i += cc_v.j;
      a = _c2_v.result += b;
      return M.j(eff(a), cc_11);
    },
        _c2_v = c2_v,
        a;

    a = _v.i++;
    return M.jB(cc(a), _24, _v, _c2_v);
  };

  c2_v.result = [];
  i = 0;
  return _c2_1(i, c2_v, a);
}

function _1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.jB(eff(i), _2, j, len, ref);
  } else {
    return M.pure();
  }
}

function _2(a, j, len, ref) {
  if (a) return _3(j, len, ref);else return _3(j, len, ref);
}

function _3(j, len, ref) {
  j++;
  return M.jR(_1, j, len, ref);
}

function _4() {
  var i;
  i = 0;
  return _5(i);
}

function _5(i) {
  if (i < 3) return _6(i);else {
    return M.j(eff('ai'), _8);
  }
}

function _6(i) {
  return M.j(eff('bi:', i), _7, i);
}

function _7(i) {
  i++;
  return M.jR(_5, i);
}

function _8() {
  return M.pure();
}

function _9() {
  var i;
  i = 0;
  return _10(i);
}

function _10(i) {
  if (i < 3) return _11(i);else {
    return M.j(eff('ai'), _13);
  }
}

function _11(i) {
  return M.j(eff('bi:', i), _12, i);
}

function _12(i) {
  i++;
  return M.jR(_10, i);
}

function _13() {
  return M.pure();
}

function _14() {
  var i;
  i = 0;
  return _15(i);
}

function _15(i) {
  if (i < 3) {
    return M.j(eff('bj:' + i), _16, i);
  } else return _21();
}

function _16(i) {
  var j;
  j = 0;
  return _17(i, j);
}

function _17(i, j) {
  if (j < 40) return _18(i, j);else {
    return M.j(eff('aj:' + i), _20, i);
  }
}

function _18(i, j) {
  if (j === 10) return _20(i);else {
    if (j === 30) return _21();else {
      return M.j(eff(i + j), _19, i, j);
    }
  }
}

function _19(i, j) {
  j += 10;
  return M.jR(_17, i, j);
}

function _20(i) {
  i++;
  return M.jR(_15, i);
}

function _21() {
  return M.j(eff('ai'), _22);
}

function _22() {
  return M.pure();
}

function a_1() {
  var i;
  i = 0;
  return a_2(i);
}

function a_2(i) {
  if (i < 3) return a_3(i);else {
    return M.j(eff('a'), a_5);
  }
}

function a_3(i) {
  if (i === 2) {
    console.log(i);
  }

  return M.j(eff(i), a_4, i);
}

function a_4(i) {
  i++;
  return M.jR(a_2, i);
}

function a_5() {
  return M.pure();
}

function a1_1() {
  var i, j;
  i = 0;
  j = 10;
  return a1_2(i, j);
}

function a1_2(i, j) {
  if (i < 3) return a1_3(i, j);else {
    return M.j(effRes(i, j), a1_5);
  }
}

function a1_3(i, j) {
  if (i === 2) {
    console.log(i, j);
  }

  return M.j(eff(i, j), a1_4, i, j);
}

function a1_4(i, j) {
  i++, j += 2;
  return M.jR(a1_2, i, j);
}

function a1_5() {
  return M.pure();
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.jR(eff(i), b_1);
}

function b_2() {
  return M.j(eff('a'), b_3);
}

function b_3() {
  return M.pure();
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) return c_2();else {
    return M.jR(eff(i), c_1);
  }
}

function c_2() {
  return M.pure(10);
}

function c_3() {
  return M.j(eff('a'), c_4);
}

function c_4() {
  return M.pure();
}

function d_1(result, i) {
  if (i < 10) return d_2(result, i);else {
    return M.j(eff(result), d_4);
  }
}

function d_2(result, i) {
  return M.jB(eff(result, i), d_3, i);
}

function d_3(result, i) {
  i++;
  return M.jR(d_1, result, i);
}

function d_4() {
  return M.pure();
}

function e_1(i) {
  if (i < 10) return e_2(i);else {
    return M.j(eff(), e_4);
  }
}

function e_2(i) {
  return M.jB(eff(i), e_3, i);
}

function e_3(result, i) {
  i++;
  return M.jR(e_1, i);
}

function e_4() {
  return M.pure();
}

function f_1(result, i) {
  if (i < 10) return f_2(i);else {
    return M.j(eff(result), f_4);
  }
}

function f_2(i) {
  return M.jB(eff(i), f_3, i);
}

function f_3(result, i) {
  i++;
  return M.jR(f_1, result, i);
}

function f_4() {
  return M.pure();
}

function cc_1() {
  return M.pure();
}

function c1_1() {
  return M.pure();
}

function _cc_1() {
  return M.pure();
}

function _23(a, _v, _c2_v) {
  _c2_v.result[_v.i] = a;
  return M.pure();
}

function c2_1(i, c2_v, a) {
  if (i < 10) return c2_2(i, c2_v, a);else {
    return M.j(eff(c2_v.result), c2_3);
  }
}

function c2_2(i, c2_v, a) {
  return M.jR(a(i), c2_1, i, c2_v, a);
}

function c2_3() {
  return M.pure();
}

function cc_11() {
  return M.pure();
}

function _24(a, _v, _c2_v) {
  return M.jB(eff(a), _25, _v, _c2_v);
}

function _25(a, _v, _c2_v) {
  _c2_v.result[_v.i] = a;
  return M.pure();
}

function _c2_1(i, c2_v, a) {
  if (i < 10) return _c2_2(i, c2_v, a);else {
    return M.j(eff(c2_v.result), _c2_3);
  }
}

function _c2_2(i, c2_v, a) {
  return M.jR(a(i), _c2_1, i, c2_v, a);
}

function _c2_3() {
  return M.pure();
}