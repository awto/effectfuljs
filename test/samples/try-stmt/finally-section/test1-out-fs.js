function a() {
  return M.jB(eff('in body'), _1);

  function _1(a) {
    if (a) return _2();else return _3(_4);
  }

  function _2() {
    return _3(_5);
  }

  function _3(cb) {
    return M.j(eff('in `finally`'), cb);
  }

  function _4() {
    return M.j(eff('after `finally`'), _5);
  }

  function _5() {
    return M.pure();
  }
}