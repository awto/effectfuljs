function a_1(a) {
  if (a) {
    console.log(1);
  } else {
    console.log(2);
  }

  return M.pure();
}

// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  return M.jMB(eff(1), a_1);
}