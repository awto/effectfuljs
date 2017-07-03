function a_1() {
  return M.yldM(1, a_2);
}

function a_2() {
  return M.yldM(2, M.pure);
}

var M = require('@effectful/generators');

function a() {
  return M.scope(a_1);
}