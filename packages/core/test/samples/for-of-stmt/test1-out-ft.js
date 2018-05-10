import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
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

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}

function a_1(a) {
  a._loop = M.iterator(some);
  return M.jump(void 0, a_2, a_8);
}

function a_2(a) {
  var i;

  if (!(a._loop = a._loop.step()).done) {
    i = a._loop.value;
    return M.chain(eff(1), a_2, a_8);
  } else {
    a._fc = a_4, a._fe = a_6;
    return M.jump(void 0, a_3);
  }
}

function a_3(a) {
  var b, c;

  if (a._loop.exit) {
    a._loop.exit();
  }

  b = a._fc, c = a._fe, a._loop = null, a._fc = null, a._fe = null;
  return M.jump(void 0, b, c);
}

function a_4(a) {
  return M.chain(eff(2), a_5, a_6);
}

function a_5(a) {}

function a_6(a, e) {
  return M.raise(e);
}

function a_7(a) {
  return M.raise(a._err1);
}

function a_8(a, b) {
  a._fc = a_7, a._fe = a_6, a._err1 = b;
  return M.jump(void 0, a_3);
}

function b_1(b) {
  return M.chain(eff("d"), b_2);
}

function b_2(b, c) {
  var a;
  a = M.iterator(c);
  b._loop = a;
  return M.jump(void 0, b_3, b_9);
}

function b_3(b) {
  if (!(b._loop = b._loop.step()).done) {
    b._i = b._loop.value;
    return M.chain(eff(b._i), b_3, b_9);
  } else {
    b._fc = b_5, b._fe = b_7;
    return M.jump(void 0, b_4);
  }
}

function b_4(b) {
  var a, c;

  if (b._loop.exit) {
    b._loop.exit();
  }

  a = b._fc, c = b._fe, b._loop = null, b._fc = null, b._fe = null;
  return M.jump(void 0, a, c);
}

function b_5(b) {
  var a;
  a = b._i, b._i = null;
  return M.chain(eff(a), b_6, b_7);
}

function b_6(b) {}

function b_7(b, e) {
  return M.raise(e);
}

function b_8(b) {
  return M.raise(b._err1);
}

function b_9(b, a) {
  b._fc = b_8, b._fe = b_7, b._err1 = a;
  return M.jump(void 0, b_4);
}

function c_1(c) {
  c._loop = M.iterator(some);
  return M.jump(void 0, c_2, c_11);
}

function c_2(c) {
  if (!(c._loop = c._loop.step()).done) {
    c._i = c._loop.value;
    c._loop1 = M.iterator(other);
    return M.jump(void 0, c_3, c_12);
  } else {
    c._fc1 = c_6, c._fe1 = c_8, c._loop1 = null;
    return M.jump(void 0, c_5);
  }
}

function c_3(c) {
  if (!(c._loop1 = c._loop1.step()).done) {
    c._j = c._loop1.value;
    return M.chain(eff(c._i, c._j), c_3, c_12);
  } else {
    c._fc = c_2, c._fe = c_11;
    return M.jump(void 0, c_4, c_11);
  }
}

function c_4(c) {
  var a, b;

  if (c._loop1.exit) {
    c._loop1.exit();
  }

  c._err1 = c._err2, a = c._fc, b = c._fe, c._fc = null, c._fe = null;
  return M.jump(void 0, a, b);
}

function c_5(c) {
  var a, b;

  if (c._loop.exit) {
    c._loop.exit();
  }

  a = c._fc1, b = c._fe1, c._loop = null, c._fc1 = null, c._fe1 = null;
  return M.jump(void 0, a, b);
}

function c_6(c) {
  var a, b;
  a = c._i, b = c._j, c._i = null, c._j = null;
  return M.chain(eff(a, b), c_7, c_8);
}

function c_7(c) {}

function c_8(c, e) {
  return M.raise(e);
}

function c_9(c) {
  return M.raise(c._err1);
}

function c_10(c) {
  return M.raise(c._err2);
}

function c_11(c, a) {
  c._fc1 = c_9, c._fe1 = c_8, c._err1 = a;
  return M.jump(void 0, c_5);
}

function c_12(c, a) {
  c._fc = c_5, c._fe = c_8, c._fc1 = c_10, c._fe1 = c_8, c._err2 = a;
  return M.jump(void 0, c_4, c_11);
}

function d_1(d) {
  d._loop = M.iterator(some);
  return M.jump(void 0, d_2, d_8);
}

function d_2(d) {
  var i;

  if (!(d._loop = d._loop.step()).done) {
    i = d._loop.value;
    return M.chain(eff(1), d_2, d_8);
  } else {
    d._fc = d_4, d._fe = d_6;
    return M.jump(void 0, d_3);
  }
}

function d_3(d) {
  var a, b;

  if (d._loop.exit) {
    d._loop.exit();
  }

  a = d._fc, b = d._fe, d._loop = null, d._fc = null, d._fe = null;
  return M.jump(void 0, a, b);
}

function d_4(d) {
  return M.chain(eff(2), d_5, d_6);
}

function d_5(d) {}

function d_6(d, e) {
  return M.raise(e);
}

function d_7(d) {
  return M.raise(d._err1);
}

function d_8(d, a) {
  d._fc = d_7, d._fe = d_6, d._err1 = a;
  return M.jump(void 0, d_3);
}