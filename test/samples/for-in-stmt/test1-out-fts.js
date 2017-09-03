function a() {
  var a_v = {
    i: undefined
  };
  return M.jB(eff(2), a_1, a_v);
}

function b() {
  var b_v = {
    i: undefined
  };
  return M.jB(eff(2), b_1, b_v);
}

function c() {
  var c_v = {
    i: undefined
  };
  return M.jB(eff(2), c_1, c_v);
}

function d() {
  var d_v = {
    i: undefined
  };
  return M.jB(eff(2), d_1, d_v);
}

function e() {
  var e_v = {
    i: undefined
  },
      loop;
  loop = M.forInIterator(obj);
  return e_1(e_v, loop);
}

function f() {
  var f_v = {
    i: undefined
  };

  for (f_v.i in obj) {
    console.log(f_v.i);
  }

  return;
}

function g() {
  var g_v = {
    i: undefined
  };
  return M.j(eff('a'), g_1, g_v);
}

function h() {
  var h_v = {
    j: undefined,
    i: undefined
  };
  return M.j(eff('a'), h_1, h_v);
}

function a_1(b, a_v) {
  var loop, a;
  a = M.forInIterator(b);
  loop = a;
  return a_2(a_v, loop);
}

function a_2(a_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return a_3(a_v, loop);else {
    return M.pure();
  }
}

function a_3(a_v, loop) {
  a_v.i = loop.value;
  return M.jR(eff(a_v.i), a_2, a_v, loop);
}

function b_1(b, b_v) {
  var loop, a;
  a = M.forInIterator(b);
  loop = a;
  return b_2(b_v, loop);
}

function b_2(b_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return b_3(b_v, loop);else {
    return M.pure();
  }
}

function b_3(b_v, loop) {
  b_v.i = loop.value;
  return M.jR(eff(b_v.i), b_2, b_v, loop);
}

function c_1(b, c_v) {
  var loop, a;
  a = M.forInIterator(b);
  loop = a;
  return c_2(c_v, loop);
}

function c_2(c_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return c_3(c_v, loop);else {
    return M.pure();
  }
}

function c_3(c_v, loop) {
  c_v.i = loop.value;
  return M.jR(eff(c_v.i), c_2, c_v, loop);
}

function d_1(a, d_v) {
  for (d_v.i in a) {
    console.log(d_v.i);
  }

  return M.pure();
}

function e_1(e_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return e_2(e_v, loop);else {
    return M.pure();
  }
}

function e_2(e_v, loop) {
  e_v.i = loop.value;
  return M.jR(eff(e_v.i), e_1, e_v, loop);
}

function g_1(g_v) {
  return M.jB(eff(2), g_2, g_v);
}

function g_2(b, g_v) {
  var loop, a;
  a = M.forInIterator(b);
  loop = a;
  return g_3(g_v, loop);
}

function g_3(g_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;

  if (!a.done) {
    g_v.i = loop.value;
    return M.jB(eff(g_v.i), g_4, g_v, loop);
  } else return g_6();
}

function g_4(a, g_v, loop) {
  if (a) return g_3(g_v, loop);else {
    return M.jB(effB(g_v.i), g_5, g_v, loop);
  }
}

function g_5(a, g_v, loop) {
  if (a) return g_6();else {
    return M.jR(eff('c'), g_3, g_v, loop);
  }
}

function g_6() {
  return M.j(eff('z'), g_7);
}

function g_7() {
  return M.pure();
}

function h_1(h_v) {
  var loop;
  loop = M.forInIterator(obj);
  return h_2(h_v, loop);
}

function h_2(h_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;

  if (!a.done) {
    h_v.j = loop.value;
    console.log('j');
    return M.j(effA(h_v.j), h_3, h_v, loop);
  } else return h_12();
}

function h_3(h_v, loop) {
  return M.jB(eff(h_v.j), h_4, h_v, loop);
}

function h_4(b, h_v, loop) {
  var _loop, a;

  a = M.forInIterator(b);
  _loop = a;
  return h_5(h_v, loop, _loop);
}

function h_5(h_v, loop, _loop) {
  var a, b;
  b = _loop.incr();
  a = _loop = b;

  if (!a.done) {
    h_v.i = _loop.value;
    console.log('b');
    return M.j(eff('b'), h_6, h_v, loop, _loop);
  } else return h_11(h_v, loop);
}

function h_6(h_v, loop, _loop) {
  return M.jB(eff(h_v.i + h_v.j), h_7, h_v, loop, _loop);
}

function h_7(a, h_v, loop, _loop) {
  if (a) return h_2(h_v, loop);else {
    return M.jB(effB(h_v.i + h_v.j), h_8, h_v, loop, _loop);
  }
}

function h_8(a, h_v, loop, _loop) {
  if (a) return h_12();else {
    return M.jB(eff(h_v.i), h_9, h_v, loop, _loop);
  }
}

function h_9(a, h_v, loop, _loop) {
  if (a) return h_5(h_v, loop, _loop);else {
    return M.jB(effB(h_v.i), h_10, h_v, loop, _loop);
  }
}

function h_10(a, h_v, loop, _loop) {
  if (a) return h_11(h_v, loop);else {
    return M.jR(eff('c'), h_5, h_v, loop, _loop);
  }
}

function h_11(h_v, loop) {
  return M.jR(effB(h_v.j), h_2, h_v, loop);
}

function h_12() {
  return M.j(eff('z'), h_13);
}

function h_13() {
  return M.pure();
}