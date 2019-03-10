function a() {
  var k = 0;
  eff1();
  for (var i = eff2(); i < 10; i++) {
    k++;
    var j = eff3(i),
      l = eff4(i);
    l++;
    eff5(j++, k, l);
  }
  eff6(i, j, k);
}
