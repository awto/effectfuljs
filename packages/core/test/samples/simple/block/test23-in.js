function a() {
  var i = 0,
    j = 0;
  eff0(eff1(eff2(i++, eff3(eff4(i, j), j++), eff5(i)), i++), i);
}
