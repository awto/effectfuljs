function a() {
  eff(1);
  eff(2);
  return eff(3);
}

function b() {
  eff(1);
  return M.chainBH(eff(2), _1, _3);

  function _1() {
    eff(3);
    return M.chainBH(eff(4), _2, _3);
  }

  function _2() {
    return M.pure(5);
  }

  function _3(e) {
    return M.raise(e);
  }
}