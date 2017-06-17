function a() {
  lab: switch(eff(1)) {
    case 1:
    effB(1)
    break
    case 2:
    effB(2)
    break lab
    default:
    effB(3)
  }
}
