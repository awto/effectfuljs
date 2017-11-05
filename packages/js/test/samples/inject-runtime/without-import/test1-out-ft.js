import * as M from '@effectful/generators';

var _a = M.generatorFunction(a);

function a() {
  var a = M.generator(_a);
  return M.scope(a_1, a_5, a_4);
}

function a_1(a) {
  return M.yld(1, a_2, a_5, a_4);
}

function a_2(a) {
  return M.yld(2, a_3, a_5, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, r) {
  return M.pure(r);
}

function a_5(a, e) {
  return M.raise(e);
}