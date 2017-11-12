import * as Z from '@effectful/generators';

var _a = Z.generatorFunction(a);

function a() {
  var a = Z.generator(_a);
  return Z.scope(a_1, a_4);
}

function a_1(a) {
  return Z.yld(1, a_2, a_4);
}

function a_2(a) {
  return Z.yld(2, a_3, a_4);
}

function a_3(a) {
  return Z.pure();
}

function a_4(a, e) {
  return Z.raise(e);
}