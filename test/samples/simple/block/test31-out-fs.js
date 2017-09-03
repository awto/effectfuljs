function a() {
  var i,
      j,
      b = function b(i, k) {
    var z;
    z = 0;
    return M.j(eff2(i, j, k, z), _1, i, k, z);

    function _1(i, k, z) {
      i++, j++, k++, z++;
      return M.j(eff3(i, j, k, z), _2, i, k, z);
    }

    function _2(i, k, z) {
      return M.j(eff4(i, j, k, z), _3);
    }

    function _3() {
      return M.pure();
    }
  };

  i = 0;
  j = 0;
  return M.j(eff1(i, j), _1, i);

  function _1(i) {
    i++, j++;
    return M.j(b(i, j), _2, i);
  }

  function _2(i) {
    i++, j++;
    return M.j(eff5(i, j), _3, i);
  }

  function _3(i) {
    return M.j(eff6(i, j), _4);
  }

  function _4() {
    return M.pure();
  }
}