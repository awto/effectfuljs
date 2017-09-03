(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.j = 0, _v.len = _v.ref.length;
  return _1(_v);
});

(function () {
  var _v = {
    i: undefined
  };
  return M.j(eff('bi'), _4, _v);
});

(function () {
  var _v = {
    i: undefined
  };
  return M.j(eff('bi'), _9, _v);
});

(function () {
  var _v = {
    i: undefined,
    j: undefined
  };
  return M.j(eff('bi'), _14, _v);
});

function a() {
  var a_v = {
    i: undefined
  };
  return M.j(eff('b'), a_1, a_v);
}

;

function a1() {
  var a1_v = {
    i: undefined,
    j: undefined
  };
  return M.j(eff('b'), a1_1, a1_v);
}

function b() {
  return M.j(eff('b'), b_1);
}

function c() {
  return M.j(eff('b'), c_1);
}

function d() {
  var d_v = {
    result: undefined,
    i: undefined
  };
  d_v.result = 0;
  d_v.i = 0;
  return d_1(d_v);
}

function e() {
  var e_v = {
    result: undefined,
    i: undefined
  };
  e_v.result = 0;
  e_v.i = 0;
  return e_1(e_v);
}

function f() {
  var f_v = {
    result: undefined,
    i: undefined
  };
  f_v.result = 0;
  f_v.i = 0;
  return f_1(f_v);
}

function c1() {
  var c1_v = {
    result: undefined,
    i: undefined
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

  for (c1_v.i = 0; c1_v.i < 10;) {
    a(c1_v.i);
  }

  return M.j(eff(c1_v.result), c1_1);
}

function c2() {
  var c2_v = {
    result: undefined,
    i: undefined
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
  c2_v.i = 0;
  return c2_1(c2_v, a);
}

function _c2() {
  var c2_v = {
    result: undefined,
    i: undefined
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
  c2_v.i = 0;
  return _c2_1(c2_v, a);
}

function _1(_v) {
  if (_v.j < _v.len) {
    _v.i = _v.ref[_v.j];
    return M.jB(eff(_v.i), _2, _v);
  } else {
    return M.pure();
  }
}

function _2(a, _v) {
  if (a) return _3(_v);else return _3(_v);
}

function _3(_v) {
  _v.j++;
  return M.jR(_1, _v);
}

function _4(_v) {
  _v.i = 0;
  return _5(_v);
}

function _5(_v) {
  if (_v.i < 3) return _6(_v);else {
    return M.j(eff('ai'), _8);
  }
}

function _6(_v) {
  return M.j(eff('bi:', _v.i), _7, _v);
}

function _7(_v) {
  _v.i++;
  return M.jR(_5, _v);
}

function _8() {
  return M.pure();
}

function _9(_v) {
  _v.i = 0;
  return _10(_v);
}

function _10(_v) {
  if (_v.i < 3) return _11(_v);else {
    return M.j(eff('ai'), _13);
  }
}

function _11(_v) {
  return M.j(eff('bi:', _v.i), _12, _v);
}

function _12(_v) {
  _v.i++;
  return M.jR(_10, _v);
}

function _13() {
  return M.pure();
}

function _14(_v) {
  _v.i = 0;
  return _15(_v);
}

function _15(_v) {
  if (_v.i < 3) {
    return M.j(eff('bj:' + _v.i), _16, _v);
  } else return _21();
}

function _16(_v) {
  _v.j = 0;
  return _17(_v);
}

function _17(_v) {
  if (_v.j < 40) return _18(_v);else {
    return M.j(eff('aj:' + _v.i), _20, _v);
  }
}

function _18(_v) {
  if (_v.j === 10) return _20(_v);else {
    if (_v.j === 30) return _21();else {
      return M.j(eff(_v.i + _v.j), _19, _v);
    }
  }
}

function _19(_v) {
  _v.j += 10;
  return M.jR(_17, _v);
}

function _20(_v) {
  _v.i++;
  return M.jR(_15, _v);
}

function _21() {
  return M.j(eff('ai'), _22);
}

function _22() {
  return M.pure();
}

function a_1(a_v) {
  a_v.i = 0;
  return a_2(a_v);
}

function a_2(a_v) {
  if (a_v.i < 3) return a_3(a_v);else {
    return M.j(eff('a'), a_5);
  }
}

function a_3(a_v) {
  if (a_v.i === 2) {
    console.log(a_v.i);
  }

  return M.j(eff(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  a_v.i++;
  return M.jR(a_2, a_v);
}

function a_5() {
  return M.pure();
}

function a1_1(a1_v) {
  a1_v.i = 0;
  a1_v.j = 10;
  return a1_2(a1_v);
}

function a1_2(a1_v) {
  if (a1_v.i < 3) return a1_3(a1_v);else {
    return M.j(effRes(a1_v.i, a1_v.j), a1_5);
  }
}

function a1_3(a1_v) {
  if (a1_v.i === 2) {
    console.log(a1_v.i, a1_v.j);
  }

  return M.j(eff(a1_v.i, a1_v.j), a1_4, a1_v);
}

function a1_4(a1_v) {
  a1_v.i++, a1_v.j += 2;
  return M.jR(a1_2, a1_v);
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

function d_1(d_v) {
  if (d_v.i < 10) return d_2(d_v);else {
    return M.j(eff(d_v.result), d_4);
  }
}

function d_2(d_v) {
  return M.jB(eff(d_v.result, d_v.i), d_3, d_v);
}

function d_3(a, d_v) {
  d_v.result = a;
  d_v.i++;
  return M.jR(d_1, d_v);
}

function d_4() {
  return M.pure();
}

function e_1(e_v) {
  if (e_v.i < 10) return e_2(e_v);else {
    return M.j(eff(), e_4);
  }
}

function e_2(e_v) {
  return M.jB(eff(e_v.i), e_3, e_v);
}

function e_3(a, e_v) {
  e_v.result = a;
  e_v.i++;
  return M.jR(e_1, e_v);
}

function e_4() {
  return M.pure();
}

function f_1(f_v) {
  if (f_v.i < 10) return f_2(f_v);else {
    return M.j(eff(f_v.result), f_4);
  }
}

function f_2(f_v) {
  return M.jB(eff(f_v.i), f_3, f_v);
}

function f_3(a, f_v) {
  f_v.result = a;
  f_v.i++;
  return M.jR(f_1, f_v);
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

function c2_1(c2_v, a) {
  if (c2_v.i < 10) return c2_2(c2_v, a);else {
    return M.j(eff(c2_v.result), c2_3);
  }
}

function c2_2(c2_v, a) {
  return M.jR(a(c2_v.i), c2_1, c2_v, a);
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

function _c2_1(c2_v, a) {
  if (c2_v.i < 10) return _c2_2(c2_v, a);else {
    return M.j(eff(c2_v.result), _c2_3);
  }
}

function _c2_2(c2_v, a) {
  return M.jR(a(c2_v.i), _c2_1, c2_v, a);
}

function _c2_3() {
  return M.pure();
}