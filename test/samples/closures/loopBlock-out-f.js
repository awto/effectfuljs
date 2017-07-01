function a(p) {
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
      return eff(8, a, p);
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
    return M.jM(eff(function b(k) {
      var _k;

      return M.jM(eff(4, a, j, k++, p), _1);

      function _1() {
        _k = 10;
        j++;
        a++;
        i++;
        _k++, p++;
        return M.jM(eff(5, a, i, _k, p), _2);
      }

      function _2() {
        return eff(6, a, i, k, p);
      }
    }), _6);
  }

  function _6() {
    return M.jMR(eff(7, a, i, j), _3);
  }
}