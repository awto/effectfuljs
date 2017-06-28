function a() {
  var a, i, j, k, loop;
  return M.jM(eff(1), _1);

  function _1() {
    a = 0;
    return M.jMB(eff(2, a), _2);
  }

  function _2(a) {
    loop = M.iterator(a);
    return _3();
  }

  function _3() {
    if (loop = loop()) return _4();else {
      return eff(6, a);
    }
  }

  function _4() {
    i = loop.value;
    return M.jM(eff(3, a, a), _5);
  }

  function _5() {
    j = i + 1;
    k = i + 1;
    i++;

    (function b() {
      return M.jM(eff(4, a, j), _1);

      function _1() {
        j++;
        a++;
        i++;
        return eff(4, a, i);
      }
    });

    return M.jMR(eff(5, a, i, j), _3);
  }
}