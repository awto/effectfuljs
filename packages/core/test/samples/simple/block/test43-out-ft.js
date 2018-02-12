import * as M from '@effectful/core';

function a() {
  var _a = M.context();

  return M.scope(a_1);
}

function a_1(_a) {
  return M.chain(eff1(), a_2);
}

function a_2(_a) {
  if (a) {
    return 5;
  } else {
    return M.chain(eff6(), a_3);
  }
}

function a_3(_a) {
  return _a._r;
}