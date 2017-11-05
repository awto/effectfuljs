function e() {
  var e = M.context();
  return M.chain(eff1(), e_1, e_3);
}

function e_1(e) {
  return M.chain(eff2(), e_2, e_3);
}

function e_2(e) {
  return M.pure();
}

function e_3(e, _e) {
  return M.raise(_e);
}