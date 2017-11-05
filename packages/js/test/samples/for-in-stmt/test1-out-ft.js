function a() {
  var a = M.context();
  return M.chain(eff(2), a_1, a_3);
}

function b() {
  var b = M.context();
  return M.chain(eff(2), b_1, b_3);
}

function c() {
  var c = M.context();
  return M.chain(eff(2), c_1, c_3);
}

function d() {
  var d = M.context();
  return M.chain(eff(2), d_1, d_2);
}

function e() {
  var e = M.context();
  e._loop = M.forInIterator(obj);
  return M.jump(e_1, e_2);
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var g = M.context();
  return M.chain(eff('a'), g_1, g_8);
}

function h() {
  var h = M.context();
  return M.chain(eff('a'), h_1, h_14);
}

function a_1(a, c) {
  var b;
  b = M.forInIterator(c);
  a._loop = b;
  return M.jump(a_2, a_3);
}

function a_2(a) {
  if (!(a._loop = a._loop.step()).done) {
    a._i = a._loop.value;
    return M.repeat(eff(a._i), a_2, a_3);
  } else {
    return M.pure();
  }
}

function a_3(a, e) {
  return M.raise(e);
}

function b_1(b, c) {
  var a;
  a = M.forInIterator(c);
  b._loop = a;
  return M.jump(b_2, b_3);
}

function b_2(b) {
  if (!(b._loop = b._loop.step()).done) {
    b._i = b._loop.value;
    return M.repeat(eff(b._i), b_2, b_3);
  } else {
    return M.pure();
  }
}

function b_3(b, e) {
  return M.raise(e);
}

function c_1(c, b) {
  var a;
  a = M.forInIterator(b);
  c._loop = a;
  return M.jump(c_2, c_3);
}

function c_2(c) {
  if (!(c._loop = c._loop.step()).done) {
    c._i = c._loop.value;
    return M.repeat(eff(c._i), c_2, c_3);
  } else {
    return M.pure();
  }
}

function c_3(c, e) {
  return M.raise(e);
}

function d_1(d, a) {
  for (d._i in a) {
    console.log(d._i);
  }

  return M.pure();
}

function d_2(d, e) {
  return M.raise(e);
}

function e_1(e) {
  if (!(e._loop = e._loop.step()).done) {
    e._i = e._loop.value;
    return M.repeat(eff(e._i), e_1, e_2);
  } else {
    return M.pure();
  }
}

function e_2(e, _e) {
  return M.raise(_e);
}

function g_1(g) {
  return M.chain(eff(2), g_2, g_8);
}

function g_2(g, b) {
  var a;
  a = M.forInIterator(b);
  g._loop = a;
  return M.jump(g_3, g_8);
}

function g_3(g) {
  if (!(g._loop = g._loop.step()).done) {
    g._i = g._loop.value;
    return M.chain(eff(g._i), g_4, g_8);
  } else {
    return M.jump(g_6, g_8);
  }
}

function g_4(g, a) {
  if (a) {
    return M.jump(g_3, g_8);
  } else {
    return M.chain(effB(g._i), g_5, g_8);
  }
}

function g_5(g, a) {
  if (a) {
    return M.jump(g_6, g_8);
  } else {
    return M.repeat(eff('c'), g_3, g_8);
  }
}

function g_6(g) {
  return M.chain(eff('z'), g_7, g_8);
}

function g_7(g) {
  return M.pure();
}

function g_8(g, e) {
  return M.raise(e);
}

function h_1(h) {
  h._loop = M.forInIterator(obj);
  return M.jump(h_2, h_14);
}

function h_2(h) {
  if (!(h._loop = h._loop.step()).done) {
    h._j = h._loop.value;
    console.log('j');
    return M.chain(effA(h._j), h_3, h_14);
  } else {
    return M.jump(h_12, h_14);
  }
}

function h_3(h) {
  return M.chain(eff(h._j), h_4, h_14);
}

function h_4(h, b) {
  var a;
  a = M.forInIterator(b);
  h._loop1 = a;
  return M.jump(h_5, h_14);
}

function h_5(h) {
  if (!(h._loop1 = h._loop1.step()).done) {
    h._i = h._loop1.value;
    console.log('b');
    return M.chain(eff('b'), h_6, h_14);
  } else {
    return M.jump(h_11, h_14);
  }
}

function h_6(h) {
  return M.chain(eff(h._i + h._j), h_7, h_14);
}

function h_7(h, a) {
  if (a) {
    return M.jump(h_2, h_14);
  } else {
    return M.chain(effB(h._i + h._j), h_8, h_14);
  }
}

function h_8(h, a) {
  if (a) {
    return M.jump(h_12, h_14);
  } else {
    return M.chain(eff(h._i), h_9, h_14);
  }
}

function h_9(h, a) {
  if (a) {
    return M.jump(h_5, h_14);
  } else {
    return M.chain(effB(h._i), h_10, h_14);
  }
}

function h_10(h, a) {
  if (a) {
    return M.jump(h_11, h_14);
  } else {
    return M.repeat(eff('c'), h_5, h_14);
  }
}

function h_11(h) {
  return M.repeat(effB(h._j), h_2, h_14);
}

function h_12(h) {
  return M.chain(eff('z'), h_13, h_14);
}

function h_13(h) {
  return M.pure();
}

function h_14(h, e) {
  return M.raise(e);
}