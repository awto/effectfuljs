import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff0(), _1, _15, i);

  function _1(i) {
    i += 2;
    return M.chain(effM(), _2, _15, i);
  }

  function _2(i) {
    return M.chain(effN(), _3, _15, i);
  }

  function _3(i) {
    var a;
    a = ++i;
    return M.chain(effI1(a), _4, _15, i);
  }

  function _4(a, i) {
    return M.chain(eff2(a), _5, _15, i);
  }

  function _5(a, i) {
    var b;
    b = i++;
    return M.chain(eff3(i), _6, _15, a, b);
  }

  function _6(c, a, b) {
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
    return M.chain(effJ(), _12, _15, a);
  }

  function _12(b, a) {
    return M.chain(eff4(a, b), _13, _15);
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