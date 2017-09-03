function a() {
  var i, j;
  return M.jB(init(), _1);

  function _1(a) {
    i = a;
    return _2();
  }

  function _2() {
    return M.jB(check(), _3);
  }

  function _3(a) {
    if (a === true) {
      return M.jB(initJ(), _4);
    } else {
      return M.pure();
    }
  }

  function _4(a) {
    j = a;
    return _5();
  }

  function _5() {
    return M.jB(checkJ(), _6);
  }

  function _6(a) {
    if (a === true) {
      if (i === j) {
        return M.jR(updJ(), _5);
      } else return _7();
    } else return _7();
  }

  function _7() {
    return M.jR(upd(), _2);
  }
}