import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_4);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpH(f_2, f_4);
}

function f_2(ctx) {
  if (ctx._j < ctx._len) {
    ctx._i = ctx._ref[ctx._j];
    return M.chainBH(eff(ctx._i), f_3, f_4);
  } else {
    return M.pure();
  }
}

function f_3(ctx) {
  ctx._j++;
  return M.jumpRH(f_2, f_4);
}

function f_4(ctx, e) {
  return M.raise(e);
}