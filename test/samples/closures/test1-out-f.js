function a() {
  var i, k;

  function b() {
    var j;
    j = i;
    return M.jM(eff(2, j), _1);

    function _1() {
      return eff(3, i);
    }
  }

  i = 0;
  k = 0;
  return M.jM(eff(1, i, k), _1);

  function _1() {
    k++;
    return M.jM(eff(4, i, k), _2);
  }

  function _2() {
    return eff(5, i, k);
  }
}