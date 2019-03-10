function a() {
  var i = 0,
    j = 0;
  eff0(i++, j++);
  eff1(i);
  i += 1;
  eff2(2, j);
  eff3((i += 2), j);
  eff4(j);
}
