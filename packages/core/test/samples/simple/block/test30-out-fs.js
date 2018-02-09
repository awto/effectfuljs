import * as M from '@effectful/core';

function a() {
  var i,
      j,
      b = function b(i) {
    var a;
    a = j;
    return M.chainBH(eff1(i, a), _1, _3, i);

    function _1(i) {
      var a;
      i++, j++;
      a = j;
      return M.chainBH(eff2(i, a), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  },
      a;

  i = 0;
  j = 0;
  a = j;
  return M.chainBH(eff3(i, a), _1, _4, i);

  function _1(i) {
    i++, j--;
    return M.chainBH(b(i), _2, _4, i);
  }

  function _2(i) {
    var a;
    i--, j++;
    a = j;
    return M.chainBH(eff4(i, a), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}