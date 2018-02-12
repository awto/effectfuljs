import * as M from '@effectful/core';

// *- should inject forPar
function a() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2(a) {
    var i;
    i = a;
    return M.chain(eff3(), _3, i);
  }

  function _3(a, i) {
    var j;
    j = a;
    return M.jump(void 0, _4, i, j);
  }

  function _4(i, j) {
    if (i < 10 && j > -10) {
      return M.chain(eff3(i), _5, i, j);
    } else {
      return M.chain(eff5(i, j), _7);
    }
  }

  function _5(a, i, j) {
    var k, b;
    k = a;
    b = k++;
    return M.chain(eff4(b), _6, i, j);
  }

  function _6(i, j) {
    i++, j--;
    return M.jump(void 0, _4, i, j);
  }

  function _7() {}
}