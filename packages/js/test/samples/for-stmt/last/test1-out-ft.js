(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_1, f_3);
});

function f_1(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chain(eff(ctx._i), f_2, f_3);
  } else {
    return M.pure();
  }
}

function f_2(ctx, a) {
  if (a) {
    return M.pure();
  } else {
    ctx._j++;
    return M.repeat(f_1, f_3);
  }
}

function f_3(ctx, e) {
  return M.raise(e);
}