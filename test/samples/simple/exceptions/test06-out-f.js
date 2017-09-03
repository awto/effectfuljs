function a() {
  var e;

  try {
    return M.jH(eff(1), _3, _1);
  } catch (ex) {
    return _1(ex);
  }

  function _1(ex) {
    e = ex;
    console.log(e, 1);
    return M.j(eff(2), _2);
  }

  function _2() {
    console.log(e, 2);
    return _3();
  }

  function _3() {
    return M.pure();
  }
}