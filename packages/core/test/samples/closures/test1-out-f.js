function a() {
  var i,
      k,
      b = function b() {
    var j;
    j = i;
    return M.chainBH(eff(2, j), _1, _3);

    function _1() {
      return M.chainBH(eff(3, i), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  };

  i = 0;
  k = 0;
  return M.chainBH(eff(1, i, k), _1, _4);

  function _1() {
    k++;
    return M.chainBH(eff(4, i, k), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(5, i, k), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}