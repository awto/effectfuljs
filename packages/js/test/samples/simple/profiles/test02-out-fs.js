function e() {
  return M.chain(eff1(), _1, _3);

  function _1() {
    return M.chain(eff2(), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}