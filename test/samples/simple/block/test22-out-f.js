function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.j(eff0(i, j), _1);

  function _1() {
    var a, b;
    a = i++;
    b = j++;
    return M.j(eff1(a, b), _2);
  }

  function _2() {
    return M.j(eff2(i), _3);
  }

  function _3() {
    i += 1;
    return M.j(eff3(2, j), _4);
  }

  function _4() {
    var a;
    a = i += 2;
    return M.j(eff4(a, j), _5);
  }

  function _5() {
    return M.j(eff5(j), _6);
  }

  function _6() {
    return M.pure();
  }
}