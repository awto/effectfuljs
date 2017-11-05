function a() {
  var i = 0
  {
    i++;
    eff1(i);
  }
  eff(i);
  {
    i++;
  }
  {
    eff2(i);
  }
}
