function a() {
  eff0();
  var i = 0;
  i++;
  eff1(i);
  if (t) {
    eff2(i);
  } else {
    eff3(i);
  }
}
