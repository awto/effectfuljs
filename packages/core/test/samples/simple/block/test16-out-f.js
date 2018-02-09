function a() {
  var i;
  i = 0;
  i++;
  return M.chainBH(eff1(i), _1, _4);

  function _1() {
    return M.chainBH(eff(i), _2, _4);
  }

  function _2() {
    {
      i++;
    }
    return M.chainBH(eff2(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}