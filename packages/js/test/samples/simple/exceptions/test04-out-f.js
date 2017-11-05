function a() {
  var e, ex;
  return M.jump(_1, _5);

  function _1() {
    return M.chain(eff(1), _3, _4);
  }

  function _2() {
    e = ex;
    console.log(e);
    return M.pure();
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(a) {
    ex = a;
    return M.jump(_2, _4);
  }
}