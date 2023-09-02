import * as M from "@effectful/core";
function a() {
  var i, a, b, c;
  i = 0;
  return M.chain(eff0(), _1);
  function _1() {
    i += 2;
    return M.chain(effM(), _2);
  }
  function _2() {
    return M.chain(effN(), _3);
  }
  function _3() {
    var a;
    a = ++i;
    return M.chain(effI1(a), _4);
  }
  function _4(a) {
    return M.chain(eff2(a), _5);
  }
  function _5(c) {
    a = c;
    b = i++;
    return M.chain(eff3(i), _6);
  }
  function _6(c) {
    return M.chain(eff1(a, b, c), _7);
  }
  function _7() {
    return M.chain(effN(), _8);
  }
  function _8(a) {
    return M.chain(effI(a), _9);
  }
  function _9(a) {
    return M.chain(effM(a), _10);
  }
  function _10() {
    return M.chain(effI(), _11);
  }
  function _11(a) {
    c = a;
    return M.chain(effJ(), _12);
  }
  function _12(a) {
    return M.chain(eff4(c, a), _13);
  }
  function _13() {
    return M.chain(eff5(), _14);
  }
  function _14() {}
}