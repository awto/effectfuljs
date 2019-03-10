function a() {
  eff0();
  var i = 0;
  i++;
  eff1(i);
  i++;
  if (t) {
    eff2(i);
    i++;
    eff4(i);
  } else {
    i++;
  }
  eff5(i);
}
