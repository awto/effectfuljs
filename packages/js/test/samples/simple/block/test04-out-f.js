function a() {
  var i;
  return M.chain(eff0(), _1, _6);

  function _1() {
    i = 0;
    i++;
    return M.chain(eff1(i), _2, _6);
  }

  function _2() {
    if (t) {
      return M.chain(eff2(i), _3, _6);
    } else {
      return M.chain(eff3(i), _4, _6);
    }
  }

  function _3() {
    i++;
    return M.chain(eff4(i), _4, _6);
  }

  function _4() {
    return M.chain(eff5(i), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}