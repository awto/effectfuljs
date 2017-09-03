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

  function _3(a) {
    if (a === true) {
      return M.j(b1(), _4);
    } else {
      return M.pure();
    }
  }

  function _4() {
    if (v) return _5();else return _6();
  }

  function _5() {
    return M.j(e(), _6);
  }

  function _6() {
    return M.jR(upd(), _2);
  }
}