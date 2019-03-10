function a() {
  var i = 0,
    j = 0,
    k = 0;
  eff(i, j, k);
  for (;;) {
    eff1(i);
    for (;;) {
      k = 10;
      eff2();
      for (;;) {
        eff4(k, j);
      }
      for (;;) {
        (i = 20), (j = 30), (k = 40);
        eff5();
      }
    }
  }
}
