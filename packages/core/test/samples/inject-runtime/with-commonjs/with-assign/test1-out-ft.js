var Z;
Z = require('@effectful/generators');

function a() {
  var a = Z.generator();
  return Z.scope(a_1);
}

function a_1(a) {
  return Z.yld(1, a_2);
}

function a_2(a) {
  return Z.yld(2, a_3);
}

function a_3(a) {
  return Z.pure();
}