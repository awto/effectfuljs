function a() {
  try {
    return M.jH(eff(1), _2, _1);
  } catch (e) {
    return _1(e);
  }

  function _1(e) {
    console.log(e);
    return _2();
  }

  function _2() {
    return M.pure();
  }
}