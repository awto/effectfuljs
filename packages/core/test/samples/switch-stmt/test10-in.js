function a() {
  var i = 0;
  eff();
  i += 1;
  switch ((i += 2)) {
    case 1:
      effB((i += 3));
      break;
    case 2:
      effB(i);
      break;
    case 3:
      console.log("hi", i);
  }
  eff(i);
}
