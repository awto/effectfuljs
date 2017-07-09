function a_1(a_v, _a_v) {
  a_v.a = 0;
  return M.jMB2(eff(2, a_v.a), a_2, a_v, _a_v);
}

function a_2(a, a_v, _a_v) {
  _a_v.loop = M.iterator(a);
  return a_3(a_v);
}

function a_3(a_v) {
  var _a_v;

  _a_v = {
    i: undefined,
    j: undefined,
    k: undefined,
    loop: undefined
  };
  if (_a_v.loop = _a_v.loop()) return a_4(a_v, _a_v);else {
    return eff(8, a_v.a, a_v.p);
  }
}

function a_4(a_v, _a_v) {
  _a_v.i = _a_v.loop.value;
  return M.jM2(eff(3, a_v.a, a_v.a), a_5, a_v, _a_v);
}

function b_1(b_v, a_v, _a_v) {
  b_v.k1 = 10;
  _a_v.j++;
  a_v.a++;
  _a_v.i++;
  b_v.k1++, a_v.p++;
  return M.jM3(eff(5, a_v.a, _a_v.i, b_v.k1, a_v.p), b_2, b_v, a_v, _a_v);
}

function b_2(b_v, a_v, _a_v) {
  return eff(6, a_v.a, _a_v.i, b_v.k, a_v.p);
}

function a_5(a_v, _a_v) {
  _a_v.j = _a_v.i + 1;
  _a_v.k = _a_v.i + 1;
  _a_v.i++;
  return M.jM2(eff(function b(a_v, _a_v, b_v, k) {
    var b_v;
    b_v = {
      k,
      b: undefined,
      k1: undefined
    };
    return M.jM3(eff(4, a_v.a, _a_v.j, b_v.k++, a_v.p), b_1, b_v, a_v, _a_v);
  }), a_6, a_v, _a_v);
}

function a_6(a_v, _a_v) {
  return M.jRM1(eff(7, a_v.a, _a_v.i, _a_v.j), a_3, a_v);
}

function a(p) {
  var a_v;
  a_v = {
    p,
    a: undefined
  };
  return M.jM2(eff(1), a_1, a_v, _a_v);
}