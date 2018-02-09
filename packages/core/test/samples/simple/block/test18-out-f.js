import * as M from '@effectful/core';

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chainBH(eff0(a), _1, _5);

  function _1() {
    return M.chainBH(eff1(i), _2, _5);
  }

  function _2() {
    i += 1;
    return M.chainBH(eff2(2), _3, _5);
  }

  function _3() {
    var a;
    a = i += 2;
    return M.chainBH(eff3(a), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}