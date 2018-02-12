import * as M from '@effectful/core';

function e() {
  var e = M.context();
  return M.scope(e_1);
}

function e_1(e) {
  return M.chain(eff(1), e_2);
}

function e_2(e, a) {
  e._ = a;
  return M.chain(eff(2), e_3);
}

function e_3(e, a) {
  console.log(e._ + a);
}