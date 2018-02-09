(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_7);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0, ctx._len = ctx._ref.lenght;
  return M.jumpH(f_2, f_7);
}

function f_2(ctx) {
  if (ctx._i < ctx._len) {
    ctx._j = 0, ctx._len = ctx._ref.length;
    return M.jumpRH(f_3, f_7);
  } else {
    return M.chainBH(eff(3), f_6, f_7);
  }
}

function f_3(ctx) {
  if (ctx._j < ctx._len) {
    ctx._d = ctx._ref[ctx._j];
    return M.chainBH(eff(ctx._i), f_4, f_7);
  } else {
    return M.chainBH(eff(2), f_5, f_7);
  }
}

function f_4(ctx) {
  ctx._j++;
  return M.jumpRH(f_3, f_7);
}

function f_5(ctx) {
  ctx._i++;
  return M.jumpRH(f_2, f_7);
}

function f_6(ctx) {
  return M.pure();
}

function f_7(ctx, e) {
  return M.raise(e);
}