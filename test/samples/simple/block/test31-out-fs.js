function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff1(i, j), _1, i);

  function _1(i) {
    i++, j++;
    return M.jM(function b(i, k) {
      var z;
      z = 0;
      return M.jM(eff2(i, j, k, z), _1, i, k, z);

      function _1(i, k, z) {
        i++, j++, k++, z++;
        return M.jM(eff3(i, j, k, z), _2, i, k, z);
      }

      function _2(i, k, z) {
        return eff4(i, j, k, z);
      }
    }(i, j), _2, i);
  }

  function _2(i) {
    i++, j++;
    return M.jM(eff5(i, j), _3, i);
  }

  function _3(i) {
    return eff6(i, j);
  }
}