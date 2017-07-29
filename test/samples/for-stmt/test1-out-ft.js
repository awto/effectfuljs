function _1(_v) {
  if (_v.j < _v.len) {
    _v.i = _v.ref[_v.j];
    return M.jMB(eff(_v.i), _2, _v);
  } else return M.pure();
}

function _2(a, _v) {
  if (a) return _3(_v);else return _3(_v);
}

function _3(_v) {
  _v.j++;
  return M.jR(_1, _v);
}

function __1(_v) {
  _v.i = 0;
  return __2(_v);
}

function __2(_v) {
  if (_v.i < 3) return __3(_v);else {
    return eff('ai');
  }
}

function __3(_v) {
  return M.jM(eff('bi:', _v.i), _4, _v);
}

function _4(_v) {
  _v.i++;
  return M.jR(__2, _v);
}

function _11(_v) {
  _v.i = 0;
  return _21(_v);
}

function _21(_v) {
  if (_v.i < 3) return _31(_v);else {
    return eff('ai');
  }
}

function _31(_v) {
  return M.jM(eff('bi:', _v.i), __4, _v);
}

function __4(_v) {
  _v.i++;
  return M.jR(_21, _v);
}

function _12(_v) {
  _v.i = 0;
  return _22(_v);
}

function _22(_v) {
  if (_v.i < 3) {
    return M.jM(eff('bj:' + _v.i), _32, _v);
  } else return _8();
}

function _32(_v) {
  _v.j = 0;
  return _41(_v);
}

function _41(_v) {
  if (_v.j < 40) return _5(_v);else {
    return M.jM(eff('aj:' + _v.i), _7, _v);
  }
}

function _5(_v) {
  if (_v.j === 10) return _7(_v);else {
    if (_v.j === 30) return _8();else {
      return M.jM(eff(_v.i + _v.j), _6, _v);
    }
  }
}

function _6(_v) {
  _v.j += 10;
  return M.jR(_41, _v);
}

function _7(_v) {
  _v.i++;
  return M.jR(_22, _v);
}

function _8() {
  return eff('ai');
}

function a_1(a_v) {
  a_v.i = 0;
  return a_2(a_v);
}

function a_2(a_v) {
  if (a_v.i < 3) return a_3(a_v);else {
    return eff('a');
  }
}

function a_3(a_v) {
  if (a_v.i === 2) {
    console.log(a_v.i);
  }

  return M.jM(eff(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  a_v.i++;
  return M.jR(a_2, a_v);
}

function a1_1(a1_v) {
  a1_v.i = 0;
  a1_v.j = 10;
  return a1_2(a1_v);
}

function a1_2(a1_v) {
  if (a1_v.i < 3) return a1_3(a1_v);else {
    return effRes(a1_v.i, a1_v.j);
  }
}

function a1_3(a1_v) {
  if (a1_v.i === 2) {
    console.log(a1_v.i, a1_v.j);
  }

  return M.jM(eff(a1_v.i, a1_v.j), a1_4, a1_v);
}

function a1_4(a1_v) {
  a1_v.i++, a1_v.j += 2;
  return M.jR(a1_2, a1_v);
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

function d_1(d_v) {
  if (d_v.i < 10) return d_2(d_v);else {
    return eff(d_v.result);
  }
}

function d_2(d_v) {
  return M.jMB(eff(d_v.result, d_v.i), d_3, d_v);
}

function d_3(a, d_v) {
  d_v.result = a;
  d_v.i++;
  return M.jR(d_1, d_v);
}

function e_1(e_v) {
  if (e_v.i < 10) return e_2(e_v);else {
    return eff();
  }
}

function e_2(e_v) {
  return M.jMB(eff(e_v.i), e_3, e_v);
}

function e_3(a, e_v) {
  e_v.result = a;
  e_v.i++;
  return M.jR(e_1, e_v);
}

function f_1(f_v) {
  if (f_v.i < 10) return f_2(f_v);else {
    return eff(f_v.result);
  }
}

function f_2(f_v) {
  return M.jMB(eff(f_v.i), f_3, f_v);
}

function f_3(a, f_v) {
  f_v.result = a;
  f_v.i++;
  return M.jR(f_1, f_v);
}

function c2_1(c2_v) {
  if (c2_v.i < 10) return c2_2(c2_v);else {
    return eff(c2_v.result);
  }
}

function c2_2(c2_v) {
  return M.jMB(eff(function cc() {
    var cc_v = {
      cc: undefined
    },
        c2_v,
        a,
        b;
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
  var cc_v, a;
  a = c2_v.i++;
  return M.jMB(function cc(j) {
    var cc_v = {
      j,
      cc: undefined
    },
        c2_v,
        a,
        b;
    b = c2_v.i += cc_v.j;
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
  return M.jM(eff('bi'), __1, _v);
});

(function () {
  var _v = {
    i: undefined
  };
  return M.jM(eff('bi'), _11, _v);
});

(function () {
  var _v = {
    i: undefined,
    j: undefined
  };
  return M.jM(eff('bi'), _12, _v);
});

function a() {
  var a_v = {
    i: undefined
  };
  return M.jM(eff('b'), a_1, a_v);
}

;

function a1() {
  var a1_v = {
    i: undefined,
    j: undefined
  };
  return M.jM(eff('b'), a1_1, a1_v);
}

function b() {
  return M.jM(eff('b'), b_1);
}

function c() {
  return M.jM(eff('b'), c_1);
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
  };
  c1_v.result = [];

  for (c1_v.i = 0; c1_v.i < 10;) {
    c1_v.result[c1_v.i] = function cc() {
      var cc_v = {
        cc: undefined
      },
          c1_v,
          a,
          b;
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