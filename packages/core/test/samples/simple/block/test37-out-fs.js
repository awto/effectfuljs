import * as M from '@effectful/core';

function a() {
  if (true) {
    1 + 1;
  }

  return M.chain(M.pure(), _1, _2);

  function _1(r) {
    return M.pure(r);
  }

  function _2(e) {
    return M.raise(e);
  }
}