function a() {
  var i;
  return M.jB(init(), _1);

  function _1(a) {
    i = a;
    return _2();
  }

  function _2() {
    return M.jB(check(), _3);
  }

  function _3(b) {
    if (b === true) {
      if (a) return _4();else return _5();
    } else {
      return M.pure();
    }
  }

  function _4() {
    return M.j(eff(1), _5);
  }

  function _5() {
    return M.jR(upd(), _2);
  }
}