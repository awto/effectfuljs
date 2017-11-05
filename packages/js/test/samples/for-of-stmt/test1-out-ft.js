function a() {
  var a = M.context();
  a._loop = M.iterator(some);
  return M.jump(a_1, a_5);
}

function b() {
  var b = M.context();
  return M.chain(eff('d'), b_1, b_6);
}

function c() {
  var c = M.context();
  c._loop = M.iterator(some);
  return M.jump(c_1, c_8);
}

function d() {
  var d = M.context();
  d._loop = M.iterator(some);
  return M.jump(d_1, d_5);
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}

function a_1(a) {
  if (!(a._loop = a._loop.step()).done) {
    a._i = a._loop.value;
    return M.jump(a_2, a_6);
  } else {
    return M.chain(eff(2), a_4, a_5);
  }
}

function a_2(a) {
  return M.repeat(eff(1), a_1, a_5);
}

function a_3(a) {
  a._e = a._ex;

  if (a._loop.exit) {
    a._loop.exit();
  }

  throw a._e;
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a, b) {
  a._ex = b;
  return M.jump(a_3, a_5);
}

function b_1(b, c) {
  var a;
  a = M.iterator(c);
  b._loop = a;
  return M.jump(b_2, b_6);
}

function b_2(b) {
  if (!(b._loop = b._loop.step()).done) {
    b._i = b._loop.value;
    return M.jump(b_3, b_7);
  } else {
    return M.chain(eff(b._i), b_5, b_6);
  }
}

function b_3(b) {
  return M.repeat(eff(b._i), b_2, b_6);
}

function b_4(b) {
  b._e = b._ex;

  if (b._loop.exit) {
    b._loop.exit();
  }

  throw b._e;
}

function b_5(b) {
  return M.pure();
}

function b_6(b, e) {
  return M.raise(e);
}

function b_7(b, a) {
  b._ex = a;
  return M.jump(b_4, b_6);
}

function c_1(c) {
  if (!(c._loop = c._loop.step()).done) {
    c._i = c._loop.value;
    return M.jump(c_2, c_9);
  } else {
    return M.chain(eff(c._i, c._j), c_7, c_8);
  }
}

function c_2(c) {
  c._loop1 = M.iterator(other);
  return M.jump(c_3, c_9);
}

function c_3(c) {
  if (!(c._loop1 = c._loop1.step()).done) {
    c._j = c._loop1.value;
    return M.jump(c_4, c_10);
  } else {
    return M.jump(c_1, c_8);
  }
}

function c_4(c) {
  return M.repeat(eff(c._i, c._j), c_3, c_9);
}

function c_5(c) {
  c._e = c._ex;

  if (c._loop1.exit) {
    c._loop1.exit();
  }

  throw c._e;
}

function c_6(c) {
  c._e1 = c._ex1;

  if (c._loop.exit) {
    c._loop.exit();
  }

  throw c._e1;
}

function c_7(c) {
  return M.pure();
}

function c_8(c, e) {
  return M.raise(e);
}

function c_9(c, a) {
  c._ex1 = a;
  return M.jump(c_6, c_8);
}

function c_10(c, a) {
  c._ex = a;
  return M.jump(c_5, c_9);
}

function d_1(d) {
  if (!(d._loop = d._loop.step()).done) {
    d._i = d._loop.value;
    return M.jump(d_2, d_6);
  } else {
    return M.chain(eff(2), d_4, d_5);
  }
}

function d_2(d) {
  return M.repeat(eff(1), d_1, d_5);
}

function d_3(d) {
  d._e = d._ex;

  if (d._loop.exit) {
    d._loop.exit();
  }

  throw d._e;
}

function d_4(d) {
  return M.pure();
}

function d_5(d, e) {
  return M.raise(e);
}

function d_6(d, a) {
  d._ex = a;
  return M.jump(d_3, d_5);
}