function a() {
  var i;
  i = 0;
  return M.j(eff0(i), _1);

  function _1() {
    i++;
    return M.j(eff1(i), _2);
  }

  function _2() {
    return M.j(eff1(i), _3);
  }

  function _3() {
    i++;
    return M.j(eff1(i), _4);
  }

  function _4() {
    return M.pure();
  }
}