import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_13);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jumpH(f_2, f_13);
}

function f_2(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff(ctx._i), f_3, f_13);
  } else {
    return M.jumpH(f_10, f_13);
  }
}

function f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpRH(f_4, f_13);
}

function f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chainBH(eff(d), f_5, f_13);
  } else {
    return M.jumpH(f_7, f_13);
  }
}

function f_5(ctx, a) {
  if (a) {
    return M.jumpH(f_7, f_13);
  } else {
    return M.chainBH(eff(2), f_6, f_13);
  }
}

function f_6(ctx, a) {
  if (a) {
    return M.jumpH(f_10, f_13);
  } else {
    ctx._j++;
    return M.jumpRH(f_4, f_13);
  }
}

function f_7(ctx) {
  return M.chainBH(eff(3), f_8, f_13);
}

function f_8(ctx) {
  return M.chainBH(eff(4), f_9, f_13);
}

function f_9(ctx) {
  ctx._i++;
  return M.jumpRH(f_2, f_13);
}

function f_10(ctx) {
  return M.chainBH(eff(5), f_11, f_13);
}

function f_11(ctx) {
  return M.chainBH(eff(6), f_12, f_13);
}

function f_12(ctx) {
  return M.pure();
}

function f_13(ctx, e) {
  return M.raise(e);
}