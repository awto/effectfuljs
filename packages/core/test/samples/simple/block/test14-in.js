function a() {
  var i = 0;
  eff(i);
  if (i++) {
    eff1(i);
  } else {
    eff2(i);
  }
  eff(i);
}
