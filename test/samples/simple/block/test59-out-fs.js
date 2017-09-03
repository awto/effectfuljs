function a() {
  var i;
  i = 0;
  return M.jB(read1(), _1);

  function _1(i) {
    return M.j(eff(i), _2, i);
  }

  function _2(i) {
    return M.j(write(i), _3);
  }

  function _3() {
    return M.pure();
  }
}