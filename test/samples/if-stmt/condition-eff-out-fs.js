// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  return M.jB(eff(1), _);

  function _(a) {
    if (a) {
      console.log(1);
    } else {
      console.log(2);
    }

    return M.pure();
  }
}