function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff1(i, j), _1, i, j);

  function _1(i, j) {
    i++, j++;
    return M.jM2(function b(j, i, k) {
      var z;
      z = 0;
      return M.jM4(eff2(i, j, k, z), _1, j, i, k, z);

      function _1(j, i, k, z) {
        i++, j++, k++, z++;
        return M.jM4(eff3(i, j, k, z), _2, j, i, k, z);
      }

      function _2(j, i, k, z) {
        return eff4(i, j, k, z);
      }
    }(j, i, j), _2, i, j);
  }

  function _2(i, j) {
    i++, j++;
    return M.jM2(eff5(i, j), _3, i, j);
  }

  function _3(i, j) {
    return eff6(i, j);
  }
}