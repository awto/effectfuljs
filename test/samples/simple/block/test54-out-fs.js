function a() {
  var i;
  i = 0;
  return M.j(eff(1), _1, i);

  function _1(i) {
    i++;
    return M.j(eff(2), _2);
  }

  function _2() {
    return M.pure();
  }
}