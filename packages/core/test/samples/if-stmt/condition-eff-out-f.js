import * as M from '@effectful/core';

// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  return M.chainBH(eff(1), _1, _2);

  function _1(a) {
    if (a) {
      console.log(1);
    } else {
      console.log(2);
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}