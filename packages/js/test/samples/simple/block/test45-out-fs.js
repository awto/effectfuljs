function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff5(a), _1, _4, i);

  function _1(i) {
    var a;

    if (ee) {
      a = i++;
      return M.chain(eff7(a), _2, _4, i);
    } else {
      return M.jump(_2, _4, i);
    }
  }

  function _2(i) {
    return M.chain(eff8(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}