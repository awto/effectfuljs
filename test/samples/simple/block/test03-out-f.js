function a() {
  var i;
  return M.jM(eff0(), _1);

  function _1() {
    i = 0;
    i++;
    return M.jM(eff1(i), _2);
  }

  function _2() {
    if (t) return _3();else {
      return eff3(i);
    }
  }

  function _3() {
    return eff2(i);
  }
}