import * as M from '@effectful/generators';

function a() {
  return M.scope(a_1);
}

function a_1() {
  return M.yld(1, a_2);
}

function a_2() {
  return M.yld(2, a_3);
}

function a_3() {
  return M.pure();
}