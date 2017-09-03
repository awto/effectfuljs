function a() {
  var i,
      j,
      b = function b(i) {
    return M.j(eff1(i, j), _1, i);

    function _1(i) {
      i++, j++;
      return M.j(eff2(i, j), _2);
    }

    function _2() {
      return M.pure();
    }
  };

  i = 0;
  j = 0;
  return M.j(eff3(i, j), _1, i);

  function _1(i) {
    i++, j--;
    return M.j(b(i), _2, i);
  }

  function _2(i) {
    i--, j++;
    return M.j(eff4(i, j), _3);
  }

  function _3() {
    return M.pure();
  }
}