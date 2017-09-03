function a() {
  var i,
      k,
      b = function b() {
    var j;
    j = i;
    return M.j(eff(2, j), _1);

    function _1() {
      return M.j(eff(3, i), _2);
    }

    function _2() {
      return M.pure();
    }
  };

  i = 0;
  k = 0;
  return M.j(eff(1, i, k), _1);

  function _1() {
    k++;
    return M.j(eff(4, i, k), _2);
  }

  function _2() {
    return M.j(eff(5, i, k), _3);
  }

  function _3() {
    return M.pure();
  }
}