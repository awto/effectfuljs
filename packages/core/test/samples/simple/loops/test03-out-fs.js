import * as M from '@effectful/core';

function a() {
  var k;
  k = 0;
  return M.chain(eff1(), _1, k);

  function _1(k) {
    return M.chain(eff2(), _2, k);
  }

  function _2(a, k) {
    var i;
    i = a;
    return M.jump(void 0, _3, k, i);
  }

  function _3(k, i, j) {
    if (i < 10) {
      k++;
      return M.chain(eff3(i), _4, k, i);
    } else {
      return M.chain(eff6(i, j, k), _7);
    }
  }

  function _4(a, k, i) {
    var j;
    j = a;
    return M.chain(eff4(i), _5, k, i, j);
  }

  function _5(a, k, i, j) {
    var l, b;
    l = a;
    l++;
    b = j++;
    return M.chain(eff5(b, k, l), _6, k, i, j);
  }

  function _6(k, i, j) {
    i++;
    return M.jump(void 0, _3, k, i, j);
  }

  function _7() {}
}