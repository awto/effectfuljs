function a() {
  i = 0;
  return M.jM1(eff0(), _1, i);

  function _1(i) {
    i += 2;
    return M.jM1(effM(), _2, i);
  }

  function _2(i) {
    return M.jM1(effN(), _3, i);
  }

  function _3(i) {
    var a;
    const a = ++i;
    return M.jMB1(effI1(a), _4, i);
  }

  function _4(a, i) {
    return M.jMB1(eff2(a), _5, i);
  }

  function _5(a, i) {
    const b = i++;
    return M.jMB1(eff3(i), _6, a);
  }

  function _6(c, a) {
    var b;
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
    return M.jMB1(effJ(), _12, a);
  }

  function _12(b, a) {
    return M.jM(eff4(a, b), _13);
  }

  function _13() {
    return eff5();
  }
}