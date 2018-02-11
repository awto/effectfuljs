import * as M from '@effectful/core';

// *- with state
function a() {
  var i;
  i = 0;
  return M.chain(eff(), _1, _5, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.chain(eff(a), _2, _5, i);
  }

  function _2(a, i) {
    var b, c;

    switch (a) {
      case 1:
        b = i += 3;
        return M.chain(effB(b), _3, _5, i);

      case 2:
        c = i += 5;
        return M.chain(effB(c), _3, _5, i);

      case 3:
        {
          console.log('hi', i);
        }

      default:
        return M.jump(void 0, _3, _5, i);
    }
  }

  function _3(i) {
    return M.chain(eff(i), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}