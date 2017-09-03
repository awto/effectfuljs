function a() {
  var i;
  i = 0;
  return M.j(eff1(i), _1, i);

  function _1(i) {
    i++;
    return M.j(eff2(i), _2);
  }

  function _2() {
    return M.pure();
  }
}