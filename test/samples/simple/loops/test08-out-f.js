function a() {
  var i;
  return M.jMB(init(), _1);

  function _1(a) {
    i = a;
    return _2();
  }

  function _2() {
    return M.jMB(check(), _3);
  }

  function _3(a) {
    if (a === true) {
      return M.jM(b1(), _4);
    } else return M.pure();
  }

  function _4() {
    if (v) return _5();else return _6();
  }

  function _5() {
    return M.jM(e(), _6);
  }

  function _6() {
    return M.jMR(upd(), _2);
  }
}