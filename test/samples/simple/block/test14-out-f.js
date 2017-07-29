function a() {
  var i;
  i = 0;
  return M.jM(eff(i), _1);

  function _1() {
    var a;
    a = i++;
    if (a) return _2();else {
      return M.jM(eff2(i), _3);
    }
  }

  function _2() {
    return M.jM(eff1(i), _3);
  }

  function _3() {
    return eff(i);
  }
}