import * as M from '@effectful/generators';

function a() {
  return M.scope(_1);

  function _1() {
    return M.yldM(1, _2);
  }

  function _2() {
    return M.yldM(2, M.pure);
  }
}