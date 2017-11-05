function a() {
  var a = M.context(),
      loop;
  loop = M.iterator(some);
  return M.jump(a_1, a_5, loop);
}

function b() {
  var b = M.context();
  return M.chain(eff('d'), b_1, b_6);
}

function c() {
  var c = M.context(),
      loop1;
  loop1 = M.iterator(some);
  return M.jump(c_1, c_8, loop1);
}

function d() {
  var d = M.context(),
      loop3;
  loop3 = M.iterator(some);
  return M.jump(d_1, d_5, loop3);
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}

function a_1(a, loop) {
  if (!(loop = loop.step()).done) {
    a._i = loop.value;
    return M.jump(a_2, a_6, loop);
  } else {
    return M.chain(eff(2), a_4, a_5);
  }
}

function a_2(a, loop) {
  return M.repeat(eff(1), a_1, a_5, loop);
}

function a_3(a, ex) {
  e = ex;

  if (loop.exit) {
    loop.exit();
  }

  throw e;
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a, b) {
  return M.jump(a_3, a_5, b);
}

function b_1(b, c) {
  var _loop, a;

  a = M.iterator(c);
  _loop = a;
  return M.jump(b_2, b_6, _loop);
}

function b_2(b, _loop) {
  if (!(_loop = _loop.step()).done) {
    b._i = _loop.value;
    return M.jump(b_3, b_7, _loop);
  } else {
    return M.chain(eff(b._i), b_5, b_6);
  }
}

function b_3(b, _loop) {
  return M.repeat(eff(b._i), b_2, b_6, _loop);
}

function b_4(b, ex) {
  e = ex;

  if (_loop.exit) {
    _loop.exit();
  }

  throw e;
}

function b_5(b) {
  return M.pure();
}

function b_6(b, e) {
  return M.raise(e);
}

function b_7(b, a) {
  return M.jump(b_4, b_6, a);
}

function c_1(c, loop1) {
  if (!(loop1 = loop1.step()).done) {
    c._i = loop1.value;
    return M.jump(c_2, c_9, loop1);
  } else {
    return M.chain(eff(c._i, c._j), c_7, c_8);
  }
}

function c_2(c, loop1) {
  var loop2;
  loop2 = M.iterator(other);
  return M.jump(c_3, c_9, loop1, loop2);
}

function c_3(c, loop1, loop2) {
  if (!(loop2 = loop2.step()).done) {
    c._j = loop2.value;
    return M.jump(c_4, c_10, loop1, loop2);
  } else {
    return M.jump(c_1, c_8, loop1);
  }
}

function c_4(c, loop1, loop2) {
  return M.repeat(eff(c._i, c._j), c_3, c_9, loop1, loop2);
}

function c_5(c, ex) {
  e = ex;

  if (loop2.exit) {
    loop2.exit();
  }

  throw e;
}

function c_6(c, ex) {
  e = ex;

  if (loop1.exit) {
    loop1.exit();
  }

  throw e;
}

function c_7(c) {
  return M.pure();
}

function c_8(c, e) {
  return M.raise(e);
}

function c_9(c, a) {
  return M.jump(c_6, c_8, a);
}

function c_10(c, a) {
  return M.jump(c_5, c_9, a);
}

function d_1(d, loop3) {
  if (!(loop3 = loop3.step()).done) {
    d._i = loop3.value;
    return M.jump(d_2, d_6, loop3);
  } else {
    return M.chain(eff(2), d_4, d_5);
  }
}

function d_2(d, loop3) {
  return M.repeat(eff(1), d_1, d_5, loop3);
}

function d_3(d, ex) {
  e = ex;

  if (loop3.exit) {
    loop3.exit();
  }

  throw e;
}

function d_4(d) {
  return M.pure();
}

function d_5(d, e) {
  return M.raise(e);
}

function d_6(d, a) {
  return M.jump(d_3, d_5, a);
}