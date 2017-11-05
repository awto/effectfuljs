function a() {
  var i;
  i = 0;
  return M.chain(eff(1), _1, _3, i);

  function _1(i) {
    i++;
    return M.chain(eff(2), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}