function a() {
  var i, j, a;
  i = 0;
  j = 0;
  a = i++;
  return M.jB(eff4(i, j), _1, a);

  function _1(b, a) {
    var c;
    c = j++;
    return M.jB(eff3(b, c), _2, a);
  }

  function _2(b, a) {
    return M.jB(eff5(i), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jB(eff2(a, b, c), _4);
  }

  function _4(a) {
    var b;
    b = i++;
    return M.jB(eff1(a, b), _5);
  }

  function _5(a) {
    return M.j(eff0(a, i), _6);
  }

  function _6() {
    return M.pure();
  }
}