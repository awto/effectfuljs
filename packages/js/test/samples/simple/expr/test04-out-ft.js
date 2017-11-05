function e() {
  var e = M.context();
  return M.chain(eff(1), e_1, e_3);
}

function e_1(e, a) {
  e._ = a;
  return M.chain(eff(2), e_2, e_3);
}

function e_2(e, a) {
  console.log(e._ + a);
  return M.pure();
}

function e_3(e, _e) {
  return M.raise(_e);
}