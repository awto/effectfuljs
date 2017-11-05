// *- without EOB exits
function b() {
  switch(eff(1)) {
  case 1:
    if (effB(1))
      break
  case 2:
    if (effB(2)) {
      break
    }
    effB(3)
    break
  default:
    eff(4)
  }
}
