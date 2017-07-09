function a() {
  var i, j, a;
  i = 0;
  j = 0;
  a = i++;
  return M.jMB3(eff4(i, j), _1, i, j, a);

  function _1(b, i, j, a) {
    var c;
    c = j++;
    return M.jMB2(eff3(b, c), _2, i, a);
  }

  function _2(b, i, a) {
    return M.jMB3(eff5(i), _3, i, a, b);
  }

  function _3(c, i, a, b) {
    return M.jMB1(eff2(a, b, c), _4, i);
  }

  function _4(a, i) {
    var b;
    b = i++;
    return M.jMB1(eff1(a, b), _5, i);
  }

  function _5(a, i) {
    return eff0(a, i);
  }
}