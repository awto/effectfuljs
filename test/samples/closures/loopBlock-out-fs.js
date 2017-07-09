function a(p) {
  var k;
  return M.jM1(eff(1), _1, p);

  function _1(p) {
    var a;
    a = 0;
    return M.jMB2(eff(2, a), _2, p, a);
  }

  function _2(b, p, a) {
    var loop;
    loop = M.iterator(b);
    return _3(p, a, loop);
  }

  function _3(p, a, loop) {
    if (loop = loop()) return _4(p, a, loop);else {
      return eff(8, a, p);
    }
  }

  function _4(p, a, loop) {
    var i;
    i = loop.value;
    return M.jM4(eff(3, a, a), _5, p, a, i, loop);
  }

  function _5(p, a, i, loop) {
    var j;
    j = i + 1;
    k = i + 1;
    i++;
    return M.jM5(eff(function b(a, j, p, i, k) {
      return M.jM5(eff(4, a, j, k++, p), _1, p, a, i, j, k);

      function _1(p, a, i, j, k) {
        var _k;

        _k = 10;
        j++;
        a++;
        i++;
        _k++, p++;
        return M.jM4(eff(5, a, i, _k, p), _2, p, a, i, k);
      }

      function _2(p, a, i, k) {
        return eff(6, a, i, k, p);
      }
    }), _6, p, a, i, j, loop);
  }

  function _6(p, a, i, j, loop) {
    return M.jRM3(eff(7, a, i, j), _3, p, a, loop);
  }
}