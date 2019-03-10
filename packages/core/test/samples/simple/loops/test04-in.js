function a() {
  var j;
  eff1();
  for (var i = eff2(); i < 10; i++) {
    eff3(i, j);
    eff4(j++);
  }
  eff7(i);
}
