function a(p) {
  var a,
      i,
      b = i => {
    var j,
        k,
        b = function b(k) {
      var _k, c;

      c = k++;
      return M.j(eff(4, a, j, c, p), _1);

      function _1() {
        _k = 10;
        j++;
        a++;
        i++;
        _k++, p++;
        return M.j(eff(5, a, i, _k, p), _2);
      }

      function _2() {
        return M.j(eff(6, a, i, k, p), _3);
      }

      function _3() {
        return M.pure();
      }
    };

    return M.j(eff(3, a, a), _1);

    function _1() {
      j = i + 1;
      k = i + 1;
      i++;
      return M.j(eff(b), _2);
    }

    function _2() {
      return M.j(eff(7, a, i, j), _3);
    }

    function _3() {
      return M.pure();
    }
  };

  return M.j(eff(1), _1, b);

  function _1(b) {
    a = 0;
    return M.jB(eff(2, a), _2, b);
  }

  function _2(c, b) {
    var loop, a;
    a = M.iterator(c);
    loop = a;
    return _3(loop, b);
  }

  function _3(loop, b) {
    var c, d;
    d = loop.incr();
    c = loop = d;
    if (!c.done) return _4(loop, b);else {
      return M.j(eff(8, a, p), _5);
    }
  }

  function _4(loop, b) {
    i = loop.value;
    return M.jR(b(i), _3, loop, b);
  }

  function _5() {
    return M.pure();
  }
}