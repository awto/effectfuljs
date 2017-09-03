function a() {
  var i;
  i = 0;
  return M.j(eff0(i), _1, i);

  function _1(i) {
    i++;
    return M.j(eff1(i), _2, i);
  }

  function _2(i) {
    return M.j(eff1(i), _3, i);
  }

  function _3(i) {
    i++;
    return M.j(eff1(i), _4);
  }

  function _4() {
    return M.pure();
  }
}