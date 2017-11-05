function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff0(a), _1, _5, i);

  function _1(i) {
    return M.chain(eff1(i), _2, _5, i);
  }

  function _2(i) {
    i += 1;
    return M.chain(eff2(2), _3, _5, i);
  }

  function _3(i) {
    var a;
    a = i += 2;
    return M.chain(eff3(a), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}