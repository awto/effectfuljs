function a() {
  var i, j;
  var a;
  i = 0;
  j = 0;
  a = i++;
  return M.jMB1(eff4(i, j), _1, a);

  function _1(b, a) {
    var c;
    c = j++;
    return M.jMB1(eff3(b, c), _2, a);
  }

  function _2(b, a) {
    return M.jMB2(eff5(i), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jMB(eff2(a, b, c), _4);
  }

  function _4(a) {
    var b;
    b = i++;
    return M.jMB(eff1(a, b), _5);
  }

  function _5(a) {
    return eff0(a, i);
  }
}