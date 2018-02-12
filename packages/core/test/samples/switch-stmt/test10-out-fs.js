import * as M from '@effectful/core';

function a() {
  var i;
  i = 0;
  return M.chain(eff(), _1, i);

  function _1(i) {
    var a;
    i += 1;

    switch (i += 2) {
      case 1:
        a = i += 3;
        return M.chain(effB(a), _2, i);

      case 2:
        return M.chain(effB(i), _2, i);

      case 3:
        {
          console.log('hi', i);
        }

      default:
        return M.jump(void 0, _2, i);
    }
  }

  function _2(i) {
    return M.chain(eff(i), _3);
  }

  function _3() {}
}