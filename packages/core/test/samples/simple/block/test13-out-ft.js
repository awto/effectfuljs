import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._i = 0;

  if (t) {
    return M.chain(eff1(a._i), a_2);
  } else {
    a._i++;
    return M.jump(void 0, a_2);
  }
}

function a_2(a) {
  return M.chain(eff2(a._i), a_3);
}

function a_3(a) {
  return M.chain(eff3(a._i), a_4);
}

function a_4(a) {}