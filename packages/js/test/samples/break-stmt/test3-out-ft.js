(function () {
  var ctx = M.context();
  return M.chain(eff(2), f_1, f_3);
});

function f_1(ctx) {
  return M.chain(eff(4), f_2, f_3);
}

function f_2(ctx) {
  return M.pure();
}

function f_3(ctx, e) {
  return M.raise(e);
}