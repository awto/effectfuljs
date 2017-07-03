function a_1() {
  return Z.yldM(1, a_2);
}

function a_2() {
  return Z.yldM(2, Z.pure);
}

var Z = require('@effectful/generators');

function a() {
  return Z.scope(a_1);
}