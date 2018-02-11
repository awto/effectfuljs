import * as M from '@effectful/core';

function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), _1, _3);

  function _1() {
    var a;
    a = i++;
    return M.chain(eff2(a), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}