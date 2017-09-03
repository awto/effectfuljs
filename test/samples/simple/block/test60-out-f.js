function a() {
  var i;
  return M.jB(read1(), _1);

  function _1(a) {
    i = a;
    return M.j(eff(i), _2);
  }

  function _2() {
    return M.j(write(i), _3);
  }

  function _3() {
    return M.pure();
  }
}