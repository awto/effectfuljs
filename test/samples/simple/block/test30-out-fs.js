function a() {
  function b(i) {
    return M.jM2(eff1(i, j), _1, j, i);

    function _1(j, i) {
      i++, j++;
      return eff2(i, j);
    }
  }

  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff3(i, j), _1, i, j);

  function _1(i, j) {
    var b;
    i++, j--;
    return M.jM2(b(i), _2, i, j);
  }

  function _2(i, j) {
    i--, j++;
    return eff4(i, j);
  }
}