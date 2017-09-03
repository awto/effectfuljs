function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.j(eff0(a), _1);

  function _1() {
    return M.j(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.j(eff2(2), _3);
  }

  function _3() {
    var a;
    a = i += 2;
    return M.j(eff3(a), _4);
  }

  function _4() {
    return M.pure();
  }
}