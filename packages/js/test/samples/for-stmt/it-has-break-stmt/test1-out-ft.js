(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_1, f_6);
});

function f_1(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chain(eff(ctx._i), f_2, f_6);
  } else {
    return M.jump(f_3, f_6);
  }
}

function f_2(ctx, a) {
  if (a) {
    return M.jump(f_3, f_6);
  } else {
    ctx._j++;
    return M.repeat(f_1, f_6);
  }
}

function f_3(ctx) {
  return M.chain(eff(2), f_4, f_6);
}

function f_4(ctx) {
  return M.chain(eff(3), f_5, f_6);
}

function f_5(ctx) {
  return M.pure();
}

function f_6(ctx, e) {
  return M.raise(e);
}