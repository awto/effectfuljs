import * as M from '@effectful/generators';

function a_1() {
  return M.yldM(1, a_2);
}

function a_2() {
  return M.yldM(2, M.pure);
}

function a() {
  return M.scope(a_1);
}