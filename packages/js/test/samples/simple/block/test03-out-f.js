function a() {
  var i;
  return M.chain(eff0(), _1, _4);

  function _1() {
    i = 0;
    i++;
    return M.chain(eff1(i), _2, _4);
  }

  function _2() {
    if (t) {
      return M.chain(eff2(i), _3, _4);
    } else {
      return M.chain(eff3(i), _3, _4);
    }
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}