function a() {
  var i;
  i = 0;
  return M.jM(eff1(i), _1);

  function _1() {
    return M.jM(eff2(i++), _2);
  }

  function _2() {
    if (i) return _3();else {
      return M.jM(eff3(i++), _4);
    }
  }

  function _3() {
    i++;
    return _4();
  }

  function _4() {
    return eff4(i++);
  }
}