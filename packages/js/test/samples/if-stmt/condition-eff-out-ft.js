// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_2);
}

function a_1(a, b) {
  if (b) {
    console.log(1);
  } else {
    console.log(2);
  }

  return M.pure();
}

function a_2(a, e) {
  return M.raise(e);
}