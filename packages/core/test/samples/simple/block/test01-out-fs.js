import * as M from '@effectful/core';

function a() {
  var j;
  j = 0;
  return M.chain(eff(j), _1, j);

  function _1(j) {
    var a;
    a = j++;
    return M.chain(eff(a), _2, j);
  }

  function _2(j) {
    return M.chain(eff2(j), _3, j);
  }

  function _3(j) {
    var a;
    a = j++;
    return M.chain(eff3(a), _4);
  }

  function _4() {}
}