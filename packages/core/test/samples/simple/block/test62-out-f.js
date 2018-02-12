import * as M from '@effectful/core';

function a(i) {
  var j, k;
  k = 0;
  return M.chain(eff(i), _1);

  function _1() {
    var a, b;
    a = i++;
    b = j = 1;
    return M.chain(eff(a, b), _2);
  }

  function _2() {
    var a, b;
    a = j++;
    b = k++;
    return M.chain(eff(a, b), _3);
  }

  function _3() {
    return M.chain(eff(i), _4);
  }

  function _4() {
    var a;
    a = j = 3;
    return M.chain(eff(a), _5);
  }

  function _5() {
    return M.chain(eff(j), _6);
  }

  function _6() {
    return M.chain(eff(i), _7);
  }

  function _7() {}
}