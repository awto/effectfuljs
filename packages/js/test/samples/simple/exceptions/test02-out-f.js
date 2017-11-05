function a() {
  return M.chain(eff(1), _1, _2);

  function _1(a) {
    throw a;
  }

  function _2(e) {
    return M.raise(e);
  }
}