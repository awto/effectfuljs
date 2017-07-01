function _1(_v) {
  if (_v.j < _v.len) {
    _v.i = _v.ref[_v.j];
    return M.jMB1(eff(_v.i), _2, _v);
  } else return M.pure();
}

function _2(a, _v) {
  if (a) return _3(_v);else return _3(_v);
}

function _3(_v) {
  _v.j++;
  return M.jNR(_1, _v);
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

  return M.jM1(eff(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  a_v.i++;
  return M.jNR(a_2, a_v);
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

  return M.jM1(eff(a1_v.i, a1_v.j), a1_4, a1_v);
}

function a1_4(a1_v) {
  a1_v.i++, a1_v.j += 2;
  return M.jNR(a1_2, a1_v);
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.jMR(eff(i), b_1);
}

function b_2() {
  return eff('a');
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) return c_2();else {
    return M.jMR(eff(i), c_1);
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
  return M.jMB1(eff(d_v.result, d_v.i), d_3, d_v);
}

function d_3(a, d_v) {
  d_v.result = a;
  d_v.i++;
  return M.jNR(d_1, d_v);
}

function e_1(e_v) {
  if (e_v.i < 10) return e_2(e_v);else {
    return eff();
  }
}

function e_2(e_v) {
  return M.jMB1(eff(e_v.i), e_3, e_v);
}

function e_3(a, e_v) {
  e_v.result = a;
  e_v.i++;
  return M.jNR(e_1, e_v);
}

function f_1(f_v) {
  if (f_v.i < 10) return f_2(f_v);else {
    return eff(f_v.result);
  }
}

function f_2(f_v) {
  return M.jMB1(eff(f_v.i), f_3, f_v);
}

function f_3(a, f_v) {
  f_v.result = a;
  f_v.i++;
  return M.jNR(f_1, f_v);
}

(function () {
  var _v;

  _v = {
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
  console.log('bi');

  for (var i = 0; i < 3; i++) {
    console.log('bi:', i);
  }

  console.log('ai');
});

(function () {
  console.log('bi');

  lab: for (var i = 0; i < 3; i++) {
    console.log('bj:' + i);

    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      console.log(i + j);
    }

    console.log('aj:' + i);
  }

  console.log('ai');
});

function a() {
  return M.jM1(eff('b'), a_1, a_v);
}

;

function a1() {
  return M.jM1(eff('b'), a1_1, a1_v);
}

function b() {
  return M.jM(eff('b'), b_1);
}

function c() {
  return M.jM(eff('b'), c_1);
}

function d() {
  var d_v;
  d_v = {
    result: undefined,
    i: undefined
  };
  d_v.result = 0;
  d_v.i = 0;
  return d_1(d_v);
}

function e() {
  var e_v;
  e_v = {
    result: undefined,
    i: undefined
  };
  e_v.result = 0;
  e_v.i = 0;
  return e_1(e_v);
}

function f() {
  var f_v;
  f_v = {
    result: undefined,
    i: undefined
  };
  f_v.result = 0;
  f_v.i = 0;
  return f_1(f_v);
}