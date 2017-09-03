function a() {
  var j;
  j = 0;
  return M.j(eff(j), _1);

  function _1() {
    var a;
    a = j++;
    return M.j(eff(a), _2);
  }

  function _2() {
    return M.j(eff2(j), _3);
  }

  function _3() {
    var a;
    a = j++;
    return M.j(eff3(a), _4);
  }

  function _4() {
    return M.pure();
  }
}