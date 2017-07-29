function _1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.jMB(eff(i), _2, j, len, ref);
  } else return M.pure();
}

function _2(a, j, len, ref) {
  if (a) return _3(j, len, ref);else return _3(j, len, ref);
}

function _3(j, len, ref) {
  j++;
  return M.jR(_1, j, len, ref);
}

function __1() {
  var i;
  i = 0;
  return __2(i);
}

function __2(i) {
  if (i < 3) return __3(i);else {
    return eff('ai');
  }
}

function __3(i) {
  return M.jM(eff('bi:', i), _4, i);
}

function _4(i) {
  i++;
  return M.jR(__2, i);
}

function _11() {
  var i;
  i = 0;
  return _21(i);
}

function _21(i) {
  if (i < 3) return _31(i);else {
    return eff('ai');
  }
}

function _31(i) {
  return M.jM(eff('bi:', i), __4, i);
}

function __4(i) {
  i++;
  return M.jR(_21, i);
}

function _12() {
  var i;
  i = 0;
  return _22(i);
}

function _22(i) {
  if (i < 3) {
    return M.jM(eff('bj:' + i), _32, i);
  } else return _8();
}

function _32(i) {
  var j;
  j = 0;
  return _41(i, j);
}

function _41(i, j) {
  if (j < 40) return _5(i, j);else {
    return M.jM(eff('aj:' + i), _7, i);
  }
}

function _5(i, j) {
  if (j === 10) return _7(i);else {
    if (j === 30) return _8();else {
      return M.jM(eff(i + j), _6, i, j);
    }
  }
}

function _6(i, j) {
  j += 10;
  return M.jR(_41, i, j);
}

function _7(i) {
  i++;
  return M.jR(_22, i);
}

function _8() {
  return eff('ai');
}

function a_1() {
  var i;
  i = 0;
  return a_2(i);
}

function a_2(i) {
  if (i < 3) return a_3(i);else {
    return eff('a');
  }
}

function a_3(i) {
  if (i === 2) {
    console.log(i);
  }

  return M.jM(eff(i), a_4, i);
}

function a_4(i) {
  i++;
  return M.jR(a_2, i);
}

function a1_1() {
  var i, j;
  i = 0;
  j = 10;
  return a1_2(i, j);
}

function a1_2(i, j) {
  if (i < 3) return a1_3(i, j);else {
    return effRes(i, j);
  }
}

function a1_3(i, j) {
  if (i === 2) {
    console.log(i, j);
  }

  return M.jM(eff(i, j), a1_4, i, j);
}

function a1_4(i, j) {
  i++, j += 2;
  return M.jR(a1_2, i, j);
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.jRM(eff(i), b_1);
}

function b_2() {
  return eff('a');
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) return c_2();else {
    return M.jRM(eff(i), c_1);
  }
}

function c_2() {
  return M.pure(10);
}

function c_3() {
  return eff('a');
}

function d_1(result, i) {
  if (i < 10) return d_2(result, i);else {
    return eff(result);
  }
}

function d_2(result, i) {
  return M.jMB(eff(result, i), d_3, i);
}

function d_3(result, i) {
  i++;
  return M.jR(d_1, result, i);
}

function e_1(i) {
  if (i < 10) return e_2(i);else {
    return eff();
  }
}

function e_2(i) {
  return M.jMB(eff(i), e_3, i);
}

function e_3(result, i) {
  i++;
  return M.jR(e_1, i);
}

function f_1(result, i) {
  if (i < 10) return f_2(i);else {
    return eff(result);
  }
}

function f_2(i) {
  return M.jMB(eff(i), f_3, i);
}

function f_3(result, i) {
  i++;
  return M.jR(f_1, result, i);
}

function c2_1(c2_v) {
  if (c2_v.i < 10) return c2_2(c2_v);else {
    return eff(c2_v.result);
  }
}

function c2_2(c2_v) {
  return M.jMB(eff(function cc() {
    var c2_v, a, b;
    b = c2_v.i++;
    a = c2_v.result += b;
    return eff(a);
  }), c2_3, c2_v);
}

function c2_3(a, c2_v) {
  c2_v.result[c2_v.i] = a;
  return M.jR(c2_1, c2_v);
}

function _c2_1(c2_v) {
  if (c2_v.i < 10) return _c2_2(c2_v);else {
    return eff(c2_v.result);
  }
}

function _c2_2(c2_v) {
  var a;
  a = c2_v.i++;
  return M.jMB(function cc(j) {
    var c2_v, a, b;
    b = c2_v.i += j;
    a = c2_v.result += b;
    return eff(a);
  }(a), _c2_3, c2_v);
}

function _c2_3(a, c2_v) {
  return M.jMB(eff(a), c2_4, c2_v);
}

function c2_4(a, c2_v) {
  c2_v.result[c2_v.i] = a;
  return M.jR(_c2_1, c2_v);
}

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);
});

(function () {
  return M.jM(eff('bi'), __1);
});

(function () {
  return M.jM(eff('bi'), _11);
});

(function () {
  return M.jM(eff('bi'), _12);
});

function a() {
  return M.jM(eff('b'), a_1);
}

;

function a1() {
  return M.jM(eff('b'), a1_1);
}

function b() {
  return M.jM(eff('b'), b_1);
}

function c() {
  return M.jM(eff('b'), c_1);
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
  var c1_v = {
    result: undefined,
    i: undefined
  };
  c1_v.result = [];

  for (c1_v.i = 0; c1_v.i < 10;) {
    c1_v.result[c1_v.i] = function cc() {
      var c1_v, a, b;
      b = c1_v.i++;
      a = c1_v.result += b;
      return eff(a);
    };
  }

  return eff(c1_v.result);
}

function c2() {
  var c2_v = {
    result: undefined,
    i: undefined
  };
  c2_v.result = [];
  c2_v.i = 0;
  return c2_1(c2_v);
}

function _c2() {
  var c2_v = {
    result: undefined,
    i: undefined
  };
  c2_v.result = [];
  c2_v.i = 0;
  return _c2_1(c2_v);
}