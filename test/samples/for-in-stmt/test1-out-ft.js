function a_1(a, a_v) {
  a_v.loop = M.forInIterator(a);
  return a_2(a_v);
}

function a_2(a_v) {
  if (a_v.loop = a_v.loop()) return a_3(a_v);else return M.pure();
}

function a_3(a_v) {
  a_v.i = a_v.loop.value;
  return M.jM1R(eff(a_v.i), a_2, a_v);
}

function b_1(a, b_v, _b_v) {
  _b_v.loop = M.forInIterator(a);
  return b_2(b_v);
}

function b_2(b_v) {
  var _b_v;

  _b_v = {
    loop: undefined
  };
  if (_b_v.loop = _b_v.loop()) return b_3(b_v, _b_v);else return M.pure();
}

function b_3(b_v, _b_v) {
  b_v.i = _b_v.loop.value;
  return M.jM1R(eff(b_v.i), b_2, b_v);
}

function c_1(a, c_v) {
  c_v.loop = M.forInIterator(a);
  return c_2(c_v);
}

function c_2(c_v) {
  if (c_v.loop = c_v.loop()) return c_3(c_v);else return M.pure();
}

function c_3(c_v) {
  c_v.i = c_v.loop.value;
  return M.jM1R(eff(c_v.i), c_2, c_v);
}

function d_1(a, d_v) {
  for (d_v.i in a) {
    console.log(d_v.i);
  }

  return M.pure();
}

function e_1(e_v) {
  if (e_v.loop = e_v.loop()) return e_2(e_v);else return M.pure();
}

function e_2(e_v) {
  e_v.i = e_v.loop.value;
  return M.jM1R(eff(e_v.i), e_1, e_v);
}

function g_1(g_v) {
  return M.jMB1(eff(2), g_2, g_v);
}

function g_2(a, g_v) {
  g_v.loop = M.forInIterator(a);
  return g_3(g_v);
}

function g_3(g_v) {
  if (g_v.loop = g_v.loop()) {
    g_v.i = g_v.loop.value;
    return M.jMB1(eff(g_v.i), g_4, g_v);
  } else return g_6();
}

function g_4(a, g_v) {
  if (a) return g_3(g_v);else {
    return M.jMB1(effB(g_v.i), g_5, g_v);
  }
}

function g_5(a, g_v) {
  if (a) return g_6();else {
    return M.jM1R(eff('c'), g_3, g_v);
  }
}

function g_6() {
  return eff('z');
}

function h_1(h_v, _h_v, h_v1) {
  h_v1.loop = M.forInIterator(obj);
  return h_2(h_v, _h_v);
}

function h_2(h_v, _h_v) {
  var h_v1;
  h_v1 = {
    loop: undefined
  };

  if (h_v1.loop = h_v1.loop()) {
    h_v.j = h_v1.loop.value;
    console.log('j');
    return M.jM2(effA(h_v.j), h_3, h_v, _h_v);
  } else return h_12();
}

function h_3(h_v, _h_v) {
  return M.jMB2(eff(h_v.j), h_4, h_v, _h_v);
}

function h_4(a, h_v, _h_v) {
  _h_v.loop = M.forInIterator(a);
  return h_5(h_v);
}

function h_5(h_v) {
  var _h_v;

  _h_v = {
    i: undefined,
    loop: undefined
  };

  if (_h_v.loop = _h_v.loop()) {
    _h_v.i = _h_v.loop.value;
    console.log('b');
    return M.jM2(eff('b'), h_6, h_v, _h_v);
  } else return h_11(h_v, _h_v);
}

function h_6(h_v, _h_v) {
  return M.jMB2(eff(_h_v.i + h_v.j), h_7, h_v, _h_v);
}

function h_7(a, h_v, _h_v) {
  if (a) return h_2(h_v, _h_v);else {
    return M.jMB2(effB(_h_v.i + h_v.j), h_8, h_v, _h_v);
  }
}

function h_8(a, h_v, _h_v) {
  if (a) return h_12();else {
    return M.jMB2(eff(_h_v.i), h_9, h_v, _h_v);
  }
}

function h_9(a, h_v, _h_v) {
  if (a) return h_5(h_v);else {
    return M.jMB2(effB(_h_v.i), h_10, h_v, _h_v);
  }
}

function h_10(a, h_v, _h_v) {
  if (a) return h_11(h_v, _h_v);else {
    return M.jM1R(eff('c'), h_5, h_v);
  }
}

function h_11(h_v, _h_v) {
  return M.jM2R(effB(h_v.j), h_2, h_v, _h_v);
}

function h_12() {
  return eff('z');
}

function a() {
  return M.jMB1(eff(2), a_1, a_v);
}

function b() {
  var b_v;
  b_v = {
    i: undefined
  };
  return M.jMB2(eff(2), b_1, b_v, _b_v);
}

function c() {
  return M.jMB1(eff(2), c_1, c_v);
}

function d() {
  return M.jMB1(eff(2), d_1, d_v);
}

function e() {
  e_v.loop = M.forInIterator(obj);
  return e_1(e_v);
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  return M.jM1(eff('a'), g_1, g_v);
}

function h() {
  var h_v;
  h_v = {
    j: undefined
  };
  return M.jM3(eff('a'), h_1, h_v, _h_v, h_v1);
}