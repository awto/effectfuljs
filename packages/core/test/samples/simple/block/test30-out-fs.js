import * as M from '@effectful/core';

function a() {
  var i,
      j,
      b = function b(i) {
    var a;
    a = j;
    return M.chain(eff1(i, a), _1, i);

    function _1(i) {
      var a;
      i++, j++;
      a = j;
      return M.chain(eff2(i, a), _2);
    }

    function _2() {}
  },
      a;

  i = 0;
  j = 0;
  a = j;
  return M.chain(eff3(i, a), _1, i);

  function _1(i) {
    i++, j--;
    return M.chain(b(i), _2, i);
  }

  function _2(i) {
    var a;
    i--, j++;
    a = j;
    return M.chain(eff4(i, a), _3);
  }

  function _3() {}
}