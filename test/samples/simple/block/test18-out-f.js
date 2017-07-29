function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.jM(eff0(a), _1);

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.jM(eff2(2), _3);
  }

  function _3() {
    var a;
    a = i += 2;
    return eff3(a);
  }
}