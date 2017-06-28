function a_1() {
  var a;
  a = 0;
  return M.jMB1(eff(2, a), a_2, a);
}

function a_2(b, a) {
  var loop;
  loop = M.iterator(b);
  return a_3(a, loop);
}

function a_3(a, loop) {
  if (loop = loop()) return a_4(a, loop);else {
    return eff(6, a);
  }
}

function a_4(a, loop) {
  var i;
  i = loop.value;
  return M.jM3(eff(3, a, a), a_5, a, i, loop);
}

function a_5(a, i, loop) {
  var j, k;
  j = i + 1;
  k = i + 1;
  i++;

  (function b() {
    return M.jM2(eff(4, a, j), _1, a, j);

    function _1(a, j) {
      var i;
      j++;
      a++;
      i++;
      return eff(4, a, i);
    }
  });

  return M.jM2R(eff(5, a, i, j), a_3, a, loop);
}

function a() {
  return M.jM(eff(1), a_1);
}