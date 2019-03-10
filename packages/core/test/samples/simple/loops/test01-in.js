// *- should inject forPar
function a() {
  eff1();
  for (var i = eff2(); i < 10; i++) {
    var j = eff3(i);
    eff4(j++);
  }
  console.log(eff7(i));
}
