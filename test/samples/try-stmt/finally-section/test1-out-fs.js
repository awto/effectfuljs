function a() {
  return M.jMB(eff('in body'), _1);

  function _1(a) {
    if (a) return _2(M.pure);else return _2(_3);
  }

  function _2(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _3() {
    return eff('after `finally`');
  }
}