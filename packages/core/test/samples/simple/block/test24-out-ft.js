import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var b;
  b = a._i++;
  return M.chain(eff1(b), a_2);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_3);
}

function a_3(a) {}