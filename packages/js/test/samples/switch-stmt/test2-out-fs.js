function a() {
  return M.chain(eff(1), _1, _5);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(check(1), _2, _5, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(effB(1), _4, _5);
    } else {
      return M.chain(check(2), _3, _5, pat);
    }
  }

  function _3(a, pat) {
    if (pat === a) {
      return M.chain(effB(2), _4, _5);
    } else {
      return M.chain(effB(3), _4, _5);
    }
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}