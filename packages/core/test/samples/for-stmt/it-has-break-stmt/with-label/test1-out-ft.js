import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(void 0, f_2);
}

function f_2(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), f_3);
  } else {
    ctx._i = null;
    return M.jump(void 0, f_10);
  }
}

function f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, f_4);
}

function f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_5);
  } else {
    ctx._j = null, ctx._len = null;
    return M.jump(void 0, f_7);
  }
}

function f_5(ctx, a) {
  if (a) {
    return M.jump(void 0, f_7);
  } else {
    return M.chain(eff(2), f_6);
  }
}

function f_6(ctx, a) {
  if (a) {
    ctx._j = null;
    return M.jump(void 0, f_10);
  } else {
    ctx._j++;
    return M.jump(void 0, f_4);
  }
}

function f_7(ctx) {
  return M.chain(eff(3), f_8);
}

function f_8(ctx) {
  return M.chain(eff(4), f_9);
}

function f_9(ctx) {
  ctx._i++;
  return M.jump(void 0, f_2);
}

function f_10(ctx) {
  return M.chain(eff(5), f_11);
}

function f_11(ctx) {
  return M.chain(eff(6), f_12);
}

function f_12(ctx) {}