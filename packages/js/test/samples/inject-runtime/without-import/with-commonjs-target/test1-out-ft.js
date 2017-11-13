var M = require('@effectful/generators');

function a() {
  var a = M.generator();
  return M.scope(a_1, a_4);
}

function a_1(a) {
  return M.yld(1, a_2, a_4);
}

function a_2(a) {
  return M.yld(2, a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}