function a_1(loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a_2(loop);else {
    return eff(2);
  }
}

function a_2(loop) {
  var i;
  i = loop.value;
  return M.jRM(eff(1), a_1, loop);
}

function b_1(b) {
  var loop, a;
  a = M.iterator(b);
  loop = a;
  return b_2(undefined, loop);
}

function b_2(i, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return b_3(loop);else {
    return eff(i);
  }
}

function b_3(loop) {
  var i;
  i = loop.value;
  return M.jRM(eff(i), b_2, i, loop);
}

function c_1(i, j, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return c_2(j, loop);else {
    return eff(i, j);
  }
}

function c_2(j, loop) {
  var i, _loop;

  i = loop.value;
  _loop = M.iterator(other);
  return c_3(i, j, loop, _loop);
}

function c_3(i, j, loop, _loop) {
  var a, b;
  b = _loop.step();
  a = _loop = b;
  if (!a.done) return c_4(i, loop, _loop);else return c_1(i, j, loop);
}

function c_4(i, loop, _loop) {
  var j;
  j = _loop.value;
  return M.jRM(eff(i, j), c_3, i, j, loop, _loop);
}

function d_1(loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return d_2(loop);else {
    return eff(2);
  }
}

function d_2(loop) {
  var i;
  i = loop.value;
  return M.jRM(eff(1), d_1, loop);
}

function a() {
  var loop;
  loop = M.iterator(some);
  return a_1(loop);
}

function b() {
  return M.jMB(eff('d'), b_1);
}

function c() {
  var loop;
  loop = M.iterator(some);
  return c_1(undefined, undefined, loop);
}

function d() {
  var loop;
  loop = M.iterator(some);
  return d_1(loop);
}

function p() {
  var i;

  for (i of some) {
    console.log(1);
  }

  console.log(2);
}