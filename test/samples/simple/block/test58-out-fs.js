function a() {
  var i;
  i = 0;
  return M.jM(eff0(), _1, i);

  function _1(i) {
    i += 2;
    return M.jM(effM(), _2, i);
  }

  function _2(i) {
    return M.jM(effN(), _3, i);
  }

  function _3(i) {
    var a;
    a = ++i;
    return M.jMB(effI1(a), _4, i);
  }

  function _4(a, i) {
    return M.jMB(eff2(a), _5, i);
  }

  function _5(a, i) {
    var b;
    b = i++;
    return M.jMB(eff3(i), _6, a, b);
  }

  function _6(c, a, b) {
    return M.jM(eff1(a, b, c), _7);
  }

  function _7() {
    return M.jMB(effN(), _8);
  }

  function _8(a) {
    return M.jMB(effI(a), _9);
  }

  function _9(a) {
    return M.jM(effM(a), _10);
  }

  function _10() {
    return M.jMB(effI(), _11);
  }

  function _11(a) {
    return M.jMB(effJ(), _12, a);
  }

  function _12(b, a) {
    return M.jM(eff4(a, b), _13);
  }

  function _13() {
    return eff5();
  }
}