function a() {
  var r;

  if (true) {
    1 + 1;
  }

  return M.chainBH(M.pure(), _1, _2);

  function _1(r) {
    return M.pure(r);
  }

  function _2(e) {
    return M.raise(e);
  }
}