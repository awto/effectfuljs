function a_1(a_v, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a_2(a_v, loop);else {
    return eff(2);
  }
}

function a_2(a_v, loop) {
  a_v.i = loop.value;
  return M.jRM(eff(1), a_1, a_v, loop);
}

function b_1(b, b_v) {
  var loop, a;
  a = M.iterator(b);
  loop = a;
  return b_2(b_v, loop);
}

function b_2(b_v, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return b_3(b_v, loop);else {
    return eff(b_v.i);
  }
}

function b_3(b_v, loop) {
  b_v.i = loop.value;
  return M.jRM(eff(b_v.i), b_2, b_v, loop);
}

function c_1(c_v, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return c_2(c_v, loop);else {
    return eff(c_v.i, c_v.j);
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
  b = _loop.step();
  a = _loop = b;
  if (!a.done) return c_4(c_v, loop, _loop);else return c_1(c_v, loop);
}

function c_4(c_v, loop, _loop) {
  c_v.j = _loop.value;
  return M.jRM(eff(c_v.i, c_v.j), c_3, c_v, loop, _loop);
}

function d_1(d_v, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return d_2(d_v, loop);else {
    return eff(2);
  }
}

function d_2(d_v, loop) {
  d_v.i = loop.value;
  return M.jRM(eff(1), d_1, d_v, loop);
}

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
  return M.jMB(eff('d'), b_1, b_v);
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
  for (p_v.i of some) {
    console.log(1);
  }

  console.log(2);
}