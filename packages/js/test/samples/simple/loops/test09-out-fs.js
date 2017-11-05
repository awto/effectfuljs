function a() {
  var i;
  return M.chain(init(), _1, _5);

  function _1(a) {
    i = a;
    return M.jump(_2, _5);
  }

  function _2() {
    return M.chain(check(), _3, _5);
  }

  function _3(b) {
    if (b === true) {
      if (a) {
        return M.chain(eff(1), _4, _5);
      } else {
        return M.jump(_4, _5);
      }
    } else {
      return M.pure();
    }
  }

  function _4() {
    return M.repeat(upd(), _2, _5);
  }

  function _5(e) {
    return M.raise(e);
  }
}