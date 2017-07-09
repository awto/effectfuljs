function a_1(a) {
  var loop;
  loop = M.forInIterator(a);
  return a_2(loop);
}

function a_2(loop) {
  if (loop = loop()) return a_3(loop);else return M.pure();
}

function a_3(loop) {
  var i;
  i = loop.value;
  return M.jRM1(eff(i), a_2, loop);
}

function b_1(a) {
  var loop;
  loop = M.forInIterator(a);
  return b_2(loop);
}

function b_2(loop) {
  if (loop = loop()) return b_3(loop);else return M.pure();
}

function b_3(loop) {
  var i;
  i = loop.value;
  return M.jRM1(eff(i), b_2, loop);
}

function c_1(a) {
  var loop;
  loop = M.forInIterator(a);
  return c_2(loop);
}

function c_2(loop) {
  if (loop = loop()) return c_3(loop);else return M.pure();
}

function c_3(loop) {
  var i;
  i = loop.value;
  return M.jRM1(eff(i), c_2, loop);
}

function d_1(a) {
  var i;

  for (i in a) {
    console.log(i);
  }

  return M.pure();
}

function e_1(loop) {
  if (loop = loop()) return e_2(loop);else return M.pure();
}

function e_2(loop) {
  var i;
  i = loop.value;
  return M.jRM1(eff(i), e_1, loop);
}

function g_1() {
  return M.jMB(eff(2), g_2);
}

function g_2(a) {
  var loop;
  loop = M.forInIterator(a);
  return g_3(loop);
}

function g_3(loop) {
  var i;

  if (loop = loop()) {
    i = loop.value;
    return M.jMB2(eff(i), g_4, i, loop);
  } else return g_6();
}

function g_4(a, i, loop) {
  if (a) return g_3(loop);else {
    return M.jMB1(effB(i), g_5, loop);
  }
}

function g_5(a, loop) {
  if (a) return g_6();else {
    return M.jRM1(eff('c'), g_3, loop);
  }
}

function g_6() {
  return eff('z');
}

function h_1() {
  var loop;
  loop = M.forInIterator(obj);
  return h_2(loop);
}

function h_2(loop) {
  var j;

  if (loop = loop()) {
    j = loop.value;
    console.log('j');
    return M.jM2(effA(j), h_3, j, loop);
  } else return h_12();
}

function h_3(j, loop) {
  return M.jMB2(eff(j), h_4, j, loop);
}

function h_4(a, j, loop) {
  var _loop;

  _loop = M.forInIterator(a);
  return h_5(j, loop, _loop);
}

function h_5(j, loop, _loop) {
  var i;

  if (_loop = _loop()) {
    i = _loop.value;
    console.log('b');
    return M.jM4(eff('b'), h_6, j, i, loop, _loop);
  } else return h_11(j, loop);
}

function h_6(j, i, loop, _loop) {
  return M.jMB4(eff(i + j), h_7, j, i, loop, _loop);
}

function h_7(a, j, i, loop, _loop) {
  if (a) return h_2(loop);else {
    return M.jMB4(effB(i + j), h_8, j, i, loop, _loop);
  }
}

function h_8(a, j, i, loop, _loop) {
  if (a) return h_12();else {
    return M.jMB4(eff(i), h_9, j, i, loop, _loop);
  }
}

function h_9(a, j, i, loop, _loop) {
  if (a) return h_5(j, loop, _loop);else {
    return M.jMB3(effB(i), h_10, j, loop, _loop);
  }
}

function h_10(a, j, loop, _loop) {
  if (a) return h_11(j, loop);else {
    return M.jRM3(eff('c'), h_5, j, loop, _loop);
  }
}

function h_11(j, loop) {
  return M.jRM1(effB(j), h_2, loop);
}

function h_12() {
  return eff('z');
}

function a() {
  return M.jMB(eff(2), a_1);
}

function b() {
  return M.jMB(eff(2), b_1);
}

function c() {
  return M.jMB(eff(2), c_1);
}

function d() {
  return M.jMB(eff(2), d_1);
}

function e() {
  var loop;
  loop = M.forInIterator(obj);
  return e_1(loop);
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  return M.jM(eff('a'), g_1);
}

function h() {
  return M.jM(eff('a'), h_1);
}