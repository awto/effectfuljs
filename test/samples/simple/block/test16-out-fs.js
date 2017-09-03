function a() {
  var i;
  i = 0;
  i++;
  return M.j(eff1(i), _1, i);

  function _1(i) {
    return M.j(eff(i), _2, i);
  }

  function _2(i) {
    {
      i++;
    }
    return M.j(eff2(i), _3);
  }

  function _3() {
    return M.pure();
  }
}