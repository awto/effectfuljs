function a() {
  var i, j;
  return M.jMB(init(), _1);

  function _1(a) {
    i = a;
    return _2();
  }

  function _2() {
    return M.jMB(check(), _3);
  }

  function _3(a) {
    if (a === true) {
      return M.jMB(initJ(), _4);
    } else return M.pure();
  }

  function _4(a) {
    j = a;
    return _5();
  }

  function _5() {
    return M.jMB(checkJ(), _6);
  }

  function _6(a) {
    if (a === true) {
      if (i === j) {
        return M.jRM(updJ(), _5);
      } else return _7();
    } else return _7();
  }

  function _7() {
    return M.jRM(upd(), _2);
  }
}