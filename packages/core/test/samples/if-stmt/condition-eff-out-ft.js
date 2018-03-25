import * as M from "@effectful/core";

// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(1), a_2);
}

function a_2(a, b) {
  if (b) {
    console.log(1);
  } else {
    console.log(2);
  }
}