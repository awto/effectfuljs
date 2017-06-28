function a_1(loop) {
  if (loop = loop()) return a_2(loop);else {
    return eff(2);
  }
}

function a_2(loop) {
  var i;
  i = loop.value;
  return M.jM1R(eff(1), a_1, loop);
}

function b_1(a) {
  var loop;
  loop = M.iterator(a);
  return b_2(undefined, loop);
}

function b_2(i, loop) {
  if (loop = loop()) return b_3(loop);else {
    return eff(i);
  }
}

function b_3(loop) {
  var i;
  i = loop.value;
  return M.jM2R(eff(i), b_2, i, loop);
}

function c_1(i, j, loop) {
  if (loop = loop()) return c_2(j, loop);else {
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
  if (_loop = _loop()) return c_4(i, loop, _loop);else return c_1(i, j, loop);
}

function c_4(i, loop, _loop) {
  var j;
  j = _loop.value;
  return M.jM4R(eff(i, j), c_3, i, j, loop, _loop);
}

function d_1(loop) {
  if (loop = loop()) return d_2(loop);else {
    return eff(2);
  }
}

function d_2(loop) {
  var i;
  i = loop.value;
  return M.jM1R(eff(1), d_1, loop);
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
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}