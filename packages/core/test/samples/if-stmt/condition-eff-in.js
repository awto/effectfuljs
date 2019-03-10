// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
  if (eff(1)) console.log(1);
  else console.log(2);
}
