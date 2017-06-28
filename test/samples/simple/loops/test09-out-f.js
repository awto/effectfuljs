function a() {
  var i;
  return M.jMB(init(), _1);

  function _1(i) {
    return _2();
  }

  function _2() {
    return M.jMB(check(), _3);
  }

  function _3(b) {
    if (b === true) {
      if (a) return _4();else return _5();
    } else return M.pure();
  }

  function _4() {
    return M.jM(eff(1), _5);
  }

  function _5() {
    return M.jMR(upd(), _2);
  }
}