(function () {
  return M.jump(_1, _8);

  function _1() {
    return M.chain(eff(1), _2, _8);
  }

  function _2(a) {
    if (a) {
      return M.jump(_1, _8);
    } else {
      return M.chain(eff(2), _3, _8);
    }
  }

  function _3(a) {
    if (a) {
      return M.jump(_6, _8);
    } else {
      return M.chain(eff(3), _4, _8);
    }
  }

  function _4() {
    return M.chain(eff(4), _5, _8);
  }

  function _5(a) {
    if (!a) {
      return M.jump(_6, _8);
    } else {
      return M.jump(_1, _8);
    }
  }

  function _6() {
    return M.chain(eff(5), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
});