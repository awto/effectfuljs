// *- should inject forPar
function a() {
  eff1();
  var k;
  for(var i = eff2(), j = eff3(); i < 10 && j > -10; i++,j--) {
    var k = eff3(i);
    eff4(k++);
  }
  eff5(i,j)
}
