(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_6);
});

function f_1(ctx) {
  return M.chainBH(eff(2), f_3, f_5);
}

function f_2(ctx) {
  ctx._e = ctx._ex;
  return M.chainBH(eff(3), f_3, f_5);
}

function f_3(ctx) {
  return M.chainBH(eff(4), f_4, f_5);
}

function f_4(ctx) {
  return M.pure();
}

function f_5(ctx, e) {
  return M.raise(e);
}

function f_6(ctx, a) {
  ctx._ex = a;
  return M.jumpH(f_2, f_5);
}