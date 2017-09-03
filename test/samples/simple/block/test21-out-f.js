function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.j(eff0(a, b), _1);

  function _1() {
    return M.j(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.j(eff2(2, j), _3);
  }

  function _3() {
    var a;
    a = i += 2;
    return M.j(eff3(a, j), _4);
  }

  function _4() {
    return M.j(eff4(j), _5);
  }

  function _5() {
    return M.pure();
  }
}