// *- with mixed effect/pure branches
function a() {
  switch (eff()) {
    case check(1):
      effB(1);
    case check(2):
      console.log(2);
    case check(3):
      effB(2);
      break;
    case check(4):
      console.log(5);
      break;
    case 5:
      console.log(6);
    case 6:
      console.log(7);
      break;
    case check(8):
      effB(3);
      break;
  }
}
