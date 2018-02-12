import * as M from '@effectful/core';

function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.chain(eff(i, j, k), _1, i, j);

  function _1(i, j) {
    return M.chain(eff1(i), _2, j);
  }

  function _2(j) {
    var k;
    k = 10;
    return M.chain(eff2(), _3, j, k);
  }

  function _3(j, k) {
    return M.chain(eff4(k, j), _3, j, k);
  }
}