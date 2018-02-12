import * as M from '@effectful/core';

// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  return M.chain(eff(1), _1);

  function _1(a) {
    if (a) {
      console.log(1);
    } else {
      console.log(2);
    }
  }
}