import * as M from '@effectful/core';

// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_3);
}

function a_2(a, b) {
  if (b) {
    console.log(1);
  } else {
    console.log(2);
  }

  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}