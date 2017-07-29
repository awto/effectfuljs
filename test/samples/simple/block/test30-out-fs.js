function a() {
  var i, j, b;

  b = function b(i) {
    return M.jM(eff1(i, j), _1, i);

    function _1(i) {
      i++, j++;
      return eff2(i, j);
    }
  };

  i = 0;
  j = 0;
  return M.jM(eff3(i, j), _1, i);

  function _1(i) {
    i++, j--;
    return M.jM(b(i), _2, i);
  }

  function _2(i) {
    i--, j++;
    return eff4(i, j);
  }
}