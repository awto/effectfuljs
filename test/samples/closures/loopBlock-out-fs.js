function a() {
  return M.jM(eff(1), _1);

  function _1() {
    var a;
    a = 0;
    return M.jMB1(eff(2, a), _2, a);
  }

  function _2(b, a) {
    var loop;
    loop = M.iterator(b);
    return _3(a, loop);
  }

  function _3(a, loop) {
    if (loop = loop()) return _4(a, loop);else {
      return eff(6, a);
    }
  }

  function _4(a, loop) {
    var i;
    i = loop.value;
    return M.jM3(eff(3, a, a), _5, a, i, loop);
  }

  function _5(a, i, loop) {
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

    return M.jM2R(eff(5, a, i, j), _3, a, loop);
  }
}