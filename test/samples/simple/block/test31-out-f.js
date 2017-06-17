function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff1(i, j), _1);

  function _1() {
    i++, j++;
    return M.jM(function b(i, k) {
      var z;
      z = 0;
      return M.jM(eff2(i, j, k, z), _1);

      function _1() {
        i++, j++, k++, z++;
        return M.jM(eff3(i, j, k, z), _2);
      }

      function _2() {
        return eff4(i, j, k, z);
      }
    }(i, j), _2);
  }

  function _2() {
    i++, j++;
    return M.jM(eff5(i, j), _3);
  }

  function _3() {
    return eff6(i, j);
  }
}