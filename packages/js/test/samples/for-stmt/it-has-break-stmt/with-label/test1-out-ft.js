(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(f_1, f_12);
});

function f_1(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), f_2, f_12);
  } else {
    return M.jump(f_9, f_12);
  }
}

function f_2(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_3, f_12);
}

function f_3(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_4, f_12);
  } else {
    return M.jump(f_6, f_12);
  }
}

function f_4(ctx, a) {
  if (a) {
    return M.jump(f_6, f_12);
  } else {
    return M.chain(eff(2), f_5, f_12);
  }
}

function f_5(ctx, a) {
  if (a) {
    return M.jump(f_9, f_12);
  } else {
    ctx._j++;
    return M.repeat(f_3, f_12);
  }
}

function f_6(ctx) {
  return M.chain(eff(3), f_7, f_12);
}

function f_7(ctx) {
  return M.chain(eff(4), f_8, f_12);
}

function f_8(ctx) {
  ctx._i++;
  return M.repeat(f_1, f_12);
}

function f_9(ctx) {
  return M.chain(eff(5), f_10, f_12);
}

function f_10(ctx) {
  return M.chain(eff(6), f_11, f_12);
}

function f_11(ctx) {
  return M.pure();
}

function f_12(ctx, e) {
  return M.raise(e);
}