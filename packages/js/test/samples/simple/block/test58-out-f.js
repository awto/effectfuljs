function a() {
  var i, a, b, c;
  i = 0;
  return M.chain(eff0(), _1, _15);

  function _1() {
    i += 2;
    return M.chain(effM(), _2, _15);
  }

  function _2() {
    return M.chain(effN(), _3, _15);
  }

  function _3() {
    var a;
    a = ++i;
    return M.chain(effI1(a), _4, _15);
  }

  function _4(a) {
    return M.chain(eff2(a), _5, _15);
  }

  function _5(c) {
    a = c;
    b = i++;
    return M.chain(eff3(i), _6, _15);
  }

  function _6(c) {
    return M.chain(eff1(a, b, c), _7, _15);
  }

  function _7() {
    return M.chain(effN(), _8, _15);
  }

  function _8(a) {
    return M.chain(effI(a), _9, _15);
  }

  function _9(a) {
    return M.chain(effM(a), _10, _15);
  }

  function _10() {
    return M.chain(effI(), _11, _15);
  }

  function _11(a) {
    c = a;
    return M.chain(effJ(), _12, _15);
  }

  function _12(a) {
    return M.chain(eff4(c, a), _13, _15);
  }

  function _13() {
    return M.chain(eff5(), _14, _15);
  }

  function _14() {
    return M.pure();
  }

  function _15(e) {
    return M.raise(e);
  }
}