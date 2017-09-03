function a() {
  var i,
      j,
      b = function b(i, k) {
    var z;
    z = 0;
    return M.j(eff2(i, j, k, z), _1);

    function _1() {
      i++, j++, k++, z++;
      return M.j(eff3(i, j, k, z), _2);
    }

    function _2() {
      return M.j(eff4(i, j, k, z), _3);
    }

    function _3() {
      return M.pure();
    }
  };

  i = 0;
  j = 0;
  return M.j(eff1(i, j), _1);

  function _1() {
    i++, j++;
    return M.j(b(i, j), _2);
  }

  function _2() {
    i++, j++;
    return M.j(eff5(i, j), _3);
  }

  function _3() {
    return M.j(eff6(i, j), _4);
  }

  function _4() {
    return M.pure();
  }
}