function a() {
  var i;
  i = 0;
  i++;
  return M.j(eff1(i), _1, i);

  function _1(i) {
    if (t) return _2(i);else {
      return M.j(eff3(i), _3);
    }
  }

  function _2(i) {
    return M.j(eff2(i), _3);
  }

  function _3() {
    return M.pure();
  }
}