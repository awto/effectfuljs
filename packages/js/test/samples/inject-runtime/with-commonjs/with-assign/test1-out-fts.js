var Z;
Z = require('@effectful/generators');

var _a = Z.generatorFunction(a);

function a() {
  return Z.scope(a_1, a_5, a_4);
}

function a_1() {
  return Z.yld(1, a_2, a_5, a_4);
}

function a_2() {
  return Z.yld(2, a_3, a_5, a_4);
}

function a_3() {
  return Z.pure();
}

function a_4(r) {
  return Z.pure(r);
}

function a_5(e) {
  return Z.raise(e);
}