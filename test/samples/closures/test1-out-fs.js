function a() {
  function b() {
    var j;
    j = i;
    return M.jM1(eff(2, j), _1, i);

    function _1(i) {
      return eff(3, i);
    }
  }

  var i, k;
  i = 0;
  k = 0;
  return M.jM2(eff(1, i, k), _1, i, k);

  function _1(i, k) {
    k++;
    return M.jM2(eff(4, i, k), _2, i, k);
  }

  function _2(i, k) {
    return eff(5, i, k);
  }
}