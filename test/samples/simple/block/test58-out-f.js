function a() {
  var i;
  i = 0;
  return M.j(eff0(), _1);

  function _1() {
    i += 2;
    return M.j(effM(), _2);
  }

  function _2() {
    return M.j(effN(), _3);
  }

  function _3() {
    var a;
    a = ++i;
    return M.jB(effI1(a), _4);
  }

  function _4(a) {
    return M.jB(eff2(a), _5);
  }

  function _5(a) {
    var b;
    b = i++;
    return M.jB(eff3(i), _6, a, b);
  }

  function _6(c, a, b) {
    return M.j(eff1(a, b, c), _7);
  }

  function _7() {
    return M.jB(effN(), _8);
  }

  function _8(a) {
    return M.jB(effI(a), _9);
  }

  function _9(a) {
    return M.j(effM(a), _10);
  }

  function _10() {
    return M.jB(effI(), _11);
  }

  function _11(a) {
    return M.jB(effJ(), _12, a);
  }

  function _12(b, a) {
    return M.j(eff4(a, b), _13);
  }

  function _13() {
    return M.j(eff5(), _14);
  }

  function _14() {
    return M.pure();
  }
}