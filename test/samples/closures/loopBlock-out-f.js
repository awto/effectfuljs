function a(p) {
  var a, i, j, k;
  return M.jM(eff(1), _1);

  function _1() {
    a = 0;
    return M.jMB(eff(2, a), _2);
  }

  function _2(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return _3(loop);
  }

  function _3(loop) {
    var b, c;
    c = loop.step();
    b = loop = c;
    if (!b.done) return _4(loop);else {
      return eff(8, a, p);
    }
  }

  function _4(loop) {
    i = loop.value;
    return M.jM(eff(3, a, a), _5, loop);
  }

  function _5(loop) {
    j = i + 1;
    k = i + 1;
    i++;
    return M.jM(eff(function b(k) {
      var _k, c;

      c = k++;
      return M.jM(eff(4, a, j, c, p), _1);

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
    }), _6, loop);
  }

  function _6(loop) {
    return M.jRM(eff(7, a, i, j), _3, loop);
  }
}