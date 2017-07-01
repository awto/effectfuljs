function a_1(a_v) {
  if (a_v.loop = a_v.loop()) return a_2(a_v);else {
    return eff(2);
  }
}

function a_2(a_v) {
  a_v.i = a_v.loop.value;
  return M.jM1R(eff(1), a_1, a_v);
}

function b_1(a, b_v) {
  b_v.loop = M.iterator(a);
  return b_2(b_v);
}

function b_2(b_v) {
  if (b_v.loop = b_v.loop()) return b_3(b_v);else {
    return eff(b_v.i);
  }
}

function b_3(b_v) {
  b_v.i = b_v.loop.value;
  return M.jM1R(eff(b_v.i), b_2, b_v);
}

function c_1(c_v, _c_v) {
  if (c_v.loop = c_v.loop()) return c_2(c_v, _c_v);else {
    return eff(c_v.i, _c_v.j);
  }
}

function c_2(c_v, _c_v) {
  c_v.i = c_v.loop.value;
  _c_v.loop = M.iterator(other);
  return c_3(c_v, _c_v);
}

function c_3(c_v, _c_v) {
  if (_c_v.loop = _c_v.loop()) return c_4(c_v, _c_v);else return c_1(c_v, _c_v);
}

function c_4(c_v, _c_v) {
  _c_v.j = _c_v.loop.value;
  return M.jM2R(eff(c_v.i, _c_v.j), c_3, c_v, _c_v);
}

function d_1(d_v) {
  if (d_v.loop = d_v.loop()) return d_2(d_v);else {
    return eff(2);
  }
}

function d_2(d_v) {
  d_v.i = d_v.loop.value;
  return M.jM1R(eff(1), d_1, d_v);
}

function a() {
  a_v.loop = M.iterator(some);
  return a_1(a_v);
}

function b() {
  return M.jMB1(eff('d'), b_1, b_v);
}

function c() {
  c_v.loop = M.iterator(some);
  return c_1(c_v, _c_v);
}

function d() {
  d_v.loop = M.iterator(some);
  return d_1(d_v);
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}