import * as M from '@effectful/core';

function fSent() {
  var fSent = M.generator();
  return M.scope(fSent_1, fSent_6);
}

function fSent_1(fSent, a) {
  fSent._sent = a;
  return M.yldStar(M.yld(a), fSent_2, fSent_6);
}

function fSent_2(fSent, a) {
  fSent._s = a;
  return M.yldStar(M.yldStar([1, 2, 3, fSent._sent]), fSent_3, fSent_6);
}

function fSent_3(fSent) {
  console.log(fSent._s, fSent._sent);
  return M.yldStar(M.yld(), fSent_4, fSent_6);
}

function fSent_4(fSent, a) {
  console.log(a);
  return M.yldStar(M.yld(), fSent_5, fSent_6);
}

function fSent_5(fSent, a) {
  console.log(a);
  return M.pure();
}

function fSent_6(fSent, e) {
  return M.raise(e);
}