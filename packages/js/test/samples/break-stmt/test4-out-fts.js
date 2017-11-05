(function () {
  return M.chain(eff(1), f_1, f_4);
});

function f_1() {
  return M.chain(eff(3), f_2, f_4);
}

function f_2() {
  return M.chain(eff(4), f_3, f_4);
}

function f_3() {
  return M.pure();
}

function f_4(e) {
  return M.raise(e);
}