(function () {
  var ctx = M.context();
  return M.scope(f_1, f_5);
});

function f_1(ctx) {
  return M.chain(eff(1), f_2, f_5);
}

function f_2(ctx) {
  return M.chain(eff(3), f_3, f_5);
}

function f_3(ctx) {
  return M.chain(eff(4), f_4, f_5);
}

function f_4(ctx) {
  return M.pure();
}

function f_5(ctx, e) {
  return M.raise(e);
}