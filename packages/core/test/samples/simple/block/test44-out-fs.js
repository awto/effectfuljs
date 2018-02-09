import * as M from '@effectful/core';

function a() {
  return M.chainBH(eff1(), _1, _4);

  function _1() {
    if (a) {
      return M.chainBH(eff5(5), _3, _4);
    } else {
      return M.chainBH(eff6(), _2, _4);
    }
  }

  function _2() {
    var r;
    return M.pure(r);
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}