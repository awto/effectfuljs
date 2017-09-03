function a() {
  var i;
  i = 0;
  return M.j(eff(1), _1);

  function _1() {
    i++;
    return M.j(eff(2), _2);
  }

  function _2() {
    return M.pure();
  }
}