function a() {
  var i, j;
  i = 0;
  j = 0;
  const a = i++;
  return M.jMB(eff4(i, j), _1);

  function _1(a) {
    var b;
    const b = j++;
    return M.jMB(eff3(a, b), _2);
  }

  function _2(b) {
    return M.jMB1(eff5(i), _3, b);
  }

  function _3(c, b) {
    var a;
    return M.jMB(eff2(a, b, c), _4);
  }

  function _4(a) {
    var b;
    const b = i++;
    return M.jMB(eff1(a, b), _5);
  }

  function _5(a) {
    return eff0(a, i);
  }
}