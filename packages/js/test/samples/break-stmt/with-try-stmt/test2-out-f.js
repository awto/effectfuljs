// *- when it is the last statement
(function () {
  var e, ex;
  return M.pure();

  function _1() {
    e = ex;
    return M.chain(eff(3), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(a) {
    ex = a;
    return M.jump(_1, _3);
  }
});