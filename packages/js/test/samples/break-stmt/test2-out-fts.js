// *- when it is the last statement
(function () {
  return M.chain(eff(2), f_1, f_3);
});

function f_1(a) {
  if (a) {
    return M.pure();
  } else {
    return M.chain(eff(3), f_2, f_3);
  }
}

function f_2() {
  return M.pure();
}

function f_3(e) {
  return M.raise(e);
}