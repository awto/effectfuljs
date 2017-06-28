function a() {
  var i, j;

  function b(i) {
    return M.jM(eff1(i, j), _1);

    function _1() {
      i++, j++;
      return eff2(i, j);
    }
  }

  i = 0;
  j = 0;
  return M.jM(eff3(i, j), _1);

  function _1() {
    i++, j--;
    return M.jM(b(i), _2);
  }

  function _2() {
    i--, j++;
    return eff4(i, j);
  }
}