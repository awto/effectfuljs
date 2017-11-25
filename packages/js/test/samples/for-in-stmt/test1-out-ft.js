function a() {
  var a = M.context();
  return M.scopeH(a_1, a_4);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_4);
}

function c() {
  var c = M.context();
  return M.scopeH(c_1, c_4);
}

function d() {
  var d = M.context();
  return M.scopeH(d_1, d_3);
}

function e() {
  var e = M.context();
  return M.scopeH(e_1, e_3);
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var g = M.context();
  return M.scopeH(g_1, g_9);
}

function h() {
  var h = M.context();
  return M.scopeH(h_1, h_15);
}

function a_1(a) {
  return M.chainBH(eff(2), a_2, a_4);
}

function a_2(a, c) {
  var b;
  b = M.forInIterator(c);
  a._loop = b;
  return M.jumpH(a_3, a_4);
}

function a_3(a) {
  if (!(a._loop = a._loop.step()).done) {
    a._i = a._loop.value;
    return M.chainBH(eff(a._i), a_3, a_4);
  } else {
    return M.pure();
  }
}

function a_4(a, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chainBH(eff(2), b_2, b_4);
}

function b_2(b, c) {
  var a;
  a = M.forInIterator(c);
  b._loop = a;
  return M.jumpH(b_3, b_4);
}

function b_3(b) {
  if (!(b._loop = b._loop.step()).done) {
    b._i = b._loop.value;
    return M.chainBH(eff(b._i), b_3, b_4);
  } else {
    return M.pure();
  }
}

function b_4(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chainBH(eff(2), c_2, c_4);
}

function c_2(c, b) {
  var a;
  a = M.forInIterator(b);
  c._loop = a;
  return M.jumpH(c_3, c_4);
}

function c_3(c) {
  if (!(c._loop = c._loop.step()).done) {
    c._i = c._loop.value;
    return M.chainBH(eff(c._i), c_3, c_4);
  } else {
    return M.pure();
  }
}

function c_4(c, e) {
  return M.raise(e);
}

function d_1(d) {
  return M.chainBH(eff(2), d_2, d_3);
}

function d_2(d, a) {
  for (d._i in a) {
    console.log(d._i);
  }

  return M.pure();
}

function d_3(d, e) {
  return M.raise(e);
}

function e_1(e) {
  e._loop = M.forInIterator(obj);
  return M.jumpH(e_2, e_3);
}

function e_2(e) {
  if (!(e._loop = e._loop.step()).done) {
    e._i = e._loop.value;
    return M.chainBH(eff(e._i), e_2, e_3);
  } else {
    return M.pure();
  }
}

function e_3(e, _e) {
  return M.raise(_e);
}

function g_1(g) {
  return M.chainBH(eff('a'), g_2, g_9);
}

function g_2(g) {
  return M.chainBH(eff(2), g_3, g_9);
}

function g_3(g, b) {
  var a;
  a = M.forInIterator(b);
  g._loop = a;
  return M.jumpH(g_4, g_9);
}

function g_4(g) {
  if (!(g._loop = g._loop.step()).done) {
    g._i = g._loop.value;
    return M.chainBH(eff(g._i), g_5, g_9);
  } else {
    return M.jumpH(g_7, g_9);
  }
}

function g_5(g, a) {
  if (a) {
    return M.jumpRH(g_4, g_9);
  } else {
    return M.chainBH(effB(g._i), g_6, g_9);
  }
}

function g_6(g, a) {
  if (a) {
    return M.jumpH(g_7, g_9);
  } else {
    return M.chainBH(eff('c'), g_4, g_9);
  }
}

function g_7(g) {
  return M.chainBH(eff('z'), g_8, g_9);
}

function g_8(g) {
  return M.pure();
}

function g_9(g, e) {
  return M.raise(e);
}

function h_1(h) {
  return M.chainBH(eff('a'), h_2, h_15);
}

function h_2(h) {
  h._loop = M.forInIterator(obj);
  return M.jumpH(h_3, h_15);
}

function h_3(h) {
  if (!(h._loop = h._loop.step()).done) {
    h._j = h._loop.value;
    console.log('j');
    return M.chainBH(effA(h._j), h_4, h_15);
  } else {
    return M.jumpH(h_13, h_15);
  }
}

function h_4(h) {
  return M.chainBH(eff(h._j), h_5, h_15);
}

function h_5(h, b) {
  var a;
  a = M.forInIterator(b);
  h._loop1 = a;
  return M.jumpRH(h_6, h_15);
}

function h_6(h) {
  if (!(h._loop1 = h._loop1.step()).done) {
    h._i = h._loop1.value;
    console.log('b');
    return M.chainBH(eff('b'), h_7, h_15);
  } else {
    return M.jumpH(h_12, h_15);
  }
}

function h_7(h) {
  return M.chainBH(eff(h._i + h._j), h_8, h_15);
}

function h_8(h, a) {
  if (a) {
    return M.jumpH(h_3, h_15);
  } else {
    return M.chainBH(effB(h._i + h._j), h_9, h_15);
  }
}

function h_9(h, a) {
  if (a) {
    return M.jumpH(h_13, h_15);
  } else {
    return M.chainBH(eff(h._i), h_10, h_15);
  }
}

function h_10(h, a) {
  if (a) {
    return M.jumpRH(h_6, h_15);
  } else {
    return M.chainBH(effB(h._i), h_11, h_15);
  }
}

function h_11(h, a) {
  if (a) {
    return M.jumpH(h_12, h_15);
  } else {
    return M.chainBH(eff('c'), h_6, h_15);
  }
}

function h_12(h) {
  return M.chainBH(effB(h._j), h_3, h_15);
}

function h_13(h) {
  return M.chainBH(eff('z'), h_14, h_15);
}

function h_14(h) {
  return M.pure();
}

function h_15(h, e) {
  return M.raise(e);
}