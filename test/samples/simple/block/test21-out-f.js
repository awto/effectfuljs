function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.jM(eff0(a, b), _1);

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.jM(eff2(2, j), _3);
  }

  function _3() {
    var a;
    a = i += 2;
    return M.jM(eff3(a, j), _4);
  }

  function _4() {
    return eff4(j);
  }
}