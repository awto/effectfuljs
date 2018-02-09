import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chainBH(eff(), _1, _4, i);

  function _1(i) {
    var a;
    i += 1;

    switch (i += 2) {
      case 1:
        a = i += 3;
        return M.chainBH(effB(a), _2, _4, i);

      case 2:
        return M.chainBH(effB(i), _2, _4, i);

      case 3:
        {
          console.log('hi', i);
        }

      default:
        return M.jumpH(_2, _4, i);
    }
  }

  function _2(i) {
    return M.chainBH(eff(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}