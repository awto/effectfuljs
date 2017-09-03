function a() {
  var a_v = {
    i: undefined
  },
      loop;
  loop = M.iterator(some);
  return a_1(a_v, loop);
}

function b() {
  var b_v = {
    i: undefined
  };
  return M.jB(eff('d'), b_1, b_v);
}

function c() {
  var c_v = {
    i: undefined,
    j: undefined
  },
      loop;
  loop = M.iterator(some);
  return c_1(c_v, loop);
}

function d() {
  var d_v = {
    i: undefined
  },
      loop;
  loop = M.iterator(some);
  return d_1(d_v, loop);
}

function p() {
  var p_v = {
    i: undefined
  };

  for (p_v.i of some) {
    console.log(1);
  }

  console.log(2);
  return;
}

function a_1(a_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return a_2(a_v, loop);else {
    return M.j(eff(2), a_3);
  }
}

function a_2(a_v, loop) {
  a_v.i = loop.value;
  return M.jR(eff(1), a_1, a_v, loop);
}

function a_3() {
  return M.pure();
}

function b_1(b, b_v) {
  var loop, a;
  a = M.iterator(b);
  loop = a;
  return b_2(b_v, loop);
}

function b_2(b_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return b_3(b_v, loop);else {
    return M.j(eff(b_v.i), b_4);
  }
}

function b_3(b_v, loop) {
  b_v.i = loop.value;
  return M.jR(eff(b_v.i), b_2, b_v, loop);
}

function b_4() {
  return M.pure();
}

function c_1(c_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return c_2(c_v, loop);else {
    return M.j(eff(c_v.i, c_v.j), c_5);
  }
}

function c_2(c_v, loop) {
  var _loop;

  c_v.i = loop.value;
  _loop = M.iterator(other);
  return c_3(c_v, loop, _loop);
}

function c_3(c_v, loop, _loop) {
  var a, b;
  b = _loop.incr();
  a = _loop = b;
  if (!a.done) return c_4(c_v, loop, _loop);else return c_1(c_v, loop);
}

function c_4(c_v, loop, _loop) {
  c_v.j = _loop.value;
  return M.jR(eff(c_v.i, c_v.j), c_3, c_v, loop, _loop);
}

function c_5() {
  return M.pure();
}

function d_1(d_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return d_2(d_v, loop);else {
    return M.j(eff(2), d_3);
  }
}

function d_2(d_v, loop) {
  d_v.i = loop.value;
  return M.jR(eff(1), d_1, d_v, loop);
}

function d_3() {
  return M.pure();
}