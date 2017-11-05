function fSent() {
  var fSent = M.generator();
  return M.scope(fSent_1, fSent_6);
}

function fSent_1(fSent, p) {
  fSent._sent = p;
  return M.yldStar(M.yld(p), fSent_2, fSent_6);
}

function fSent_2(fSent, a) {
  fSent._s = a;
  return M.yldStar(M.yldStar([1, 2, 3, fSent._sent]), fSent_3, fSent_6);
}

function fSent_3(fSent) {
  console.log(fSent._s, fSent._sent);
  return M.yldStar(M.yld(void 0), fSent_4, fSent_6);
}

function fSent_4(fSent, a) {
  console.log(a);
  return M.yldStar(M.yld(void 0), fSent_5, fSent_6);
}

function fSent_5(fSent, a) {
  console.log(a);
  return M.pure();
}

function fSent_6(fSent, e) {
  return M.raise(e);
}