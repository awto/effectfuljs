function a() {
  var i, a;
  a = i++;
  return M.jB(eff1(a), _1);

  function _1(a) {
    i = a;
    return M.j(eff2(i), _2);
  }

  function _2() {
    var a;
    a = i++;
    return M.jB(eff3(a), _3);
  }

  function _3(a) {
    i = a;
    return M.j(eff4(i), _4);
  }

  function _4() {
    return M.pure();
  }
}