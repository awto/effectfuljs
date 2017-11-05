function a() {
  return M.chain(eff1(), _1, _9);

  function _1() {
    if (a1) {
      return M.chain(eff2(), _2, _9);
    } else {
      return M.jump(_2, _9);
    }
  }

  function _2() {
    return M.chain(eff3(), _3, _9);
  }

  function _3() {
    if (a2) {
      return M.chain(eff4(), _4, _9);
    } else {
      return M.jump(_4, _9);
    }
  }

  function _4() {
    return M.chain(eff5(), _5, _9);
  }

  function _5() {
    if (a3) {
      return M.chain(eff6(), _6, _9);
    } else {
      return M.jump(_6, _9);
    }
  }

  function _6() {
    return M.chain(eff7(), _7, _9);
  }

  function _7() {
    if (a4) {
      return M.chain(eff8(), _8, _9);
    } else {
      return M.pure();
    }
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
}