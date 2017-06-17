function a() {
  var i;
  i = 0;
  if (t) return _1();else {
    i++;
    return _2();
  }

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    return M.jM(eff2(i), _3);
  }

  function _3() {
    return eff3(i);
  }
}