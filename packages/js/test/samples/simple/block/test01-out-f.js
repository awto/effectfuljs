function a() {
  var j;
  j = 0;
  return M.chain(eff(j), _1, _5);

  function _1() {
    var a;
    a = j++;
    return M.chain(eff(a), _2, _5);
  }

  function _2() {
    return M.chain(eff2(j), _3, _5);
  }

  function _3() {
    var a;
    a = j++;
    return M.chain(eff3(a), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}