// *- with state
function a() {
  var i = 0;
  eff();
  switch (eff((i += 1))) {
    case 1:
      effB((i += 3));
      break;
    case 2:
      effB((i += 5));
      break;
    case 3:
      console.log("hi", i);
  }
  eff(i);
}
