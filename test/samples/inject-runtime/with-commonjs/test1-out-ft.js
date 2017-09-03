var Z = require('@effectful/generators');

function a() {
  return Z.scope(a_1);
}

function a_1() {
  return Z.yld(1, a_2);
}

function a_2() {
  return Z.yld(2, a_3);
}

function a_3() {
  return Z.pure();
}