(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._i = 0, ctx._len = ctx._ref.lenght;
  return M.jump(f_1, f_6);
});

function f_1(ctx) {
  if (ctx._i < ctx._len) {
    ctx._j = 0, ctx._len = ctx._ref.length;
    return M.jump(f_2, f_6);
  } else {
    return M.chain(eff(3), f_5, f_6);
  }
}

function f_2(ctx) {
  if (ctx._j < ctx._len) {
    ctx._d = ctx._ref[ctx._j];
    return M.chain(eff(ctx._i), f_3, f_6);
  } else {
    return M.chain(eff(2), f_4, f_6);
  }
}

function f_3(ctx) {
  ctx._j++;
  return M.repeat(f_2, f_6);
}

function f_4(ctx) {
  ctx._i++;
  return M.repeat(f_1, f_6);
}

function f_5(ctx) {
  return M.pure();
}

function f_6(ctx, e) {
  return M.raise(e);
}