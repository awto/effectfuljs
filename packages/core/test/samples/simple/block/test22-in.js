function a() {
  var i = 0,
    j = 0;
  eff0(i, j);
  eff1(i++, j++);
  eff2(i);
  i += 1;
  eff3(2, j);
  eff4((i += 2), j);
  eff5(j);
}
