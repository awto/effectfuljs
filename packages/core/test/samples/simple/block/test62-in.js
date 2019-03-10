function a(i) {
  var j,
    k = 0;
  eff(i);
  eff(i++, (j = 1));
  eff(j++, k++);
  eff(i);
  eff((j = 3));
  eff(j);
  eff(i);
}
