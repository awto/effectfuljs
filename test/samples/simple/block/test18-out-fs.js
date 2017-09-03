function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.j(eff0(a), _1, i);

  function _1(i) {
    return M.j(eff1(i), _2, i);
  }

  function _2(i) {
    i += 1;
    return M.j(eff2(2), _3, i);
  }

  function _3(i) {
    var a;
    a = i += 2;
    return M.j(eff3(a), _4);
  }

  function _4() {
    return M.pure();
  }
}