function a() {
  var i, k, b;

  b = function b() {
    var j;
    j = i;
    return M.jM(eff(2, j), _1);

    function _1() {
      return eff(3, i);
    }
  };

  i = 0;
  k = 0;
  return M.jM(eff(1, i, k), _1, k);

  function _1(k) {
    k++;
    return M.jM(eff(4, i, k), _2, k);
  }

  function _2(k) {
    return eff(5, i, k);
  }
}