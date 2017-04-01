// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  return M(eff(1)).mapply(a => {
    if (a) console.log(1);else console.log(2);
  });
}