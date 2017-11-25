function a() {
  var pat;
  return M.chainBH(eff(1), _1, _5);

  function _1(a) {
    pat = a;
    return M.chainBH(check(1), _2, _5);
  }

  function _2(a) {
    if (pat === a) {
      return M.chainBH(effB(1), _4, _5);
    } else {
      return M.chainBH(check(2), _3, _5);
    }
  }

  function _3(a) {
    if (pat === a) {
      return M.chainBH(effB(2), _4, _5);
    } else {
      return M.chainBH(effB(3), _4, _5);
    }
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}