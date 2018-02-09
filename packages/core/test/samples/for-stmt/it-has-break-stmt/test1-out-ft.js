(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_7);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpH(f_2, f_7);
}

function f_2(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chainBH(eff(ctx._i), f_3, f_7);
  } else {
    return M.jumpH(f_4, f_7);
  }
}

function f_3(ctx, a) {
  if (a) {
    return M.jumpH(f_4, f_7);
  } else {
    ctx._j++;
    return M.jumpRH(f_2, f_7);
  }
}

function f_4(ctx) {
  return M.chainBH(eff(2), f_5, f_7);
}

function f_5(ctx) {
  return M.chainBH(eff(3), f_6, f_7);
}

function f_6(ctx) {
  return M.pure();
}

function f_7(ctx, e) {
  return M.raise(e);
}