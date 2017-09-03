function a() {
  try {
    return M.jH(eff(1), _2, _1, _3);
  } catch (e) {
    return _1(e, undefined);
  }

  function _1(e, cb) {
    console.log(e);
    return _2(_3);
  }

  function _2(cb) {
    console.log('fin');
    return cb();
  }

  function _3() {
    return M.pure();
  }
}