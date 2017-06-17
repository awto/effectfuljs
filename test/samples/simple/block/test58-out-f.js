function a() {
  var i;
  i = 0;
  return M.jM(eff0(), _1);

  function _1() {
    i += 2;
    return M.jM(effM(), _2);
  }

  function _2() {
    return M.jM(effN(), _3);
  }

  function _3() {
    var a;
    const a = ++i;
    return M.jMB(effI1(a), _4);
  }

  function _4(a) {
    return M.jMB(eff2(a), _5);
  }

  function _5(a) {
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