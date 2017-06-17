function a() {
  i = 0;
  j = 0;
  const a = i++;
  return M.jMB2(eff4(i, j), _1, i, j);

  function _1(a, i, j) {
    var b;
    const b = j++;
    return M.jMB1(eff3(a, b), _2, i);
  }

  function _2(b, i) {
    return M.jMB2(eff5(i), _3, i, b);
  }

  function _3(c, i, b) {
    var a;
    return M.jMB1(eff2(a, b, c), _4, i);
  }

  function _4(a, i) {
    var b;
    const b = i++;
    return M.jMB1(eff1(a, b), _5, i);
  }

  function _5(a, i) {
    return eff0(a, i);
  }
}