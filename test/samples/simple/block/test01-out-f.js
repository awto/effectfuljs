function a() {
  var j;
  j = 0;
  return M.jM(eff(j), _1);

  function _1() {
    var a;
    a = j++;
    return M.jM(eff(a), _2);
  }

  function _2() {
    return M.jM(eff2(j), _3);
  }

  function _3() {
    var a;
    a = j++;
    return eff3(a);
  }
}