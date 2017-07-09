function a_1(p) {
  var a;
  a = 0;
  return M.jMB2(eff(2, a), a_2, p, a);
}

function a_2(b, p, a) {
  var loop;
  loop = M.iterator(b);
  return a_3(p, a, loop);
}

function a_3(p, a, loop) {
  if (loop = loop()) return a_4(p, a, loop);else {
    return eff(8, a, p);
  }
}

function a_4(p, a, loop) {
  var i;
  i = loop.value;
  return M.jM4(eff(3, a, a), a_5, p, a, i, loop);
}

function b_1(p, a, i, j, k) {
  var _k;

  _k = 10;
  j++;
  a++;
  i++;
  _k++, p++;
  return M.jM4(eff(5, a, i, _k, p), b_2, p, a, i, k);
}

function b_2(p, a, i, k) {
  return eff(6, a, i, k, p);
}

function a_5(p, a, i, loop) {
  var j, k;
  j = i + 1;
  k = i + 1;
  i++;
  return M.jM5(eff(function b(a, j, p, i, k) {
    return M.jM5(eff(4, a, j, k++, p), b_1, p, a, i, j, k);
  }), a_6, p, a, i, j, loop);
}

function a_6(p, a, i, j, loop) {
  return M.jRM3(eff(7, a, i, j), a_3, p, a, loop);
}

function a(p) {
  return M.jM1(eff(1), a_1, p);
}