import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff('1'), a_2);
}

function a_2(a, b) {
  console.log(b, 3);
  console.log('2');
  console.log('3');
  return eff(2);
}