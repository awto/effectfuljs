function a() {
  var i, j;
  return M.chain(init(), _1, _8);

  function _1(a) {
    i = a;
    return M.jump(_2, _8);
  }

  function _2() {
    return M.chain(check(), _3, _8);
  }

  function _3(a) {
    if (a === true) {
      return M.chain(initJ(), _4, _8);
    } else {
      return M.pure();
    }
  }

  function _4(a) {
    j = a;
    return M.jump(_5, _8);
  }

  function _5() {
    return M.chain(checkJ(), _6, _8);
  }

  function _6(a) {
    if (a === true) {
      if (i === j) {
        return M.repeat(updJ(), _5, _8);
      } else {
        return M.jump(_7, _8);
      }
    } else {
      return M.jump(_7, _8);
    }
  }

  function _7() {
    return M.repeat(upd(), _2, _8);
  }

  function _8(e) {
    return M.raise(e);
  }
}