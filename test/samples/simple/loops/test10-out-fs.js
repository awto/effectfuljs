function a() {
  return M.jMB(init(), _1);

  function _1(i) {
    return _2(i);
  }

  function _2(i) {
    return M.jMB1(check(), _3, i);
  }

  function _3(a, i) {
    if (a === true) {
      return M.jMB1(initJ(), _4, i);
    } else return M.pure();
  }

  function _4(j, i) {
    return _5(i, j);
  }

  function _5(i, j) {
    return M.jMB2(checkJ(), _6, i, j);
  }

  function _6(a, i, j) {
    if (a === true) {
      if (i === j) {
        return M.jM2R(updJ(), _5, i, j);
      } else return _7(i);
    } else return _7(i);
  }

  function _7(i) {
    return M.jM1R(upd(), _2, i);
  }
}