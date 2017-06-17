function a() {
  var j;
  i = 0;
  j = 0;
  return M.jM1(eff1(i, j), _1, i);

  function _1(i) {
    i++, j++;
    return M.jM1(function b(i, k) {
      z = 0;
      return M.jM1(eff2(i, j, k, z), _1, z);

      function _1(z) {
        i++, j++, k++, z++;
        return M.jM1(eff3(i, j, k, z), _2, z);
      }

      function _2(z) {
        return eff4(i, j, k, z);
      }
    }(i, j), _2, i);
  }

  function _2(i) {
    i++, j++;
    return M.jM1(eff5(i, j), _3, i);
  }

  function _3(i) {
    return eff6(i, j);
  }
}