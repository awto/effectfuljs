function a() {
  var i;
  i = 0;
  return M.j(eff1(i), _1);

  function _1() {
    i++;
    return M.j(eff2(i), _2);
  }

  function _2() {
    return M.pure();
  }
}