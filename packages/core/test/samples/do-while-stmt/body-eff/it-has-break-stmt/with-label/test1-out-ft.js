import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

function f_1(ctx) {
  return M.chain(eff(0), f_2);
}

function f_2(ctx) {
  ctx._ = true;
  return M.jump(void 0, f_3);
}

function f_3(ctx) {
  if (ctx._) {
    ctx._ = null;
    return M.chain(eff(1), f_4);
  } else {
    ctx._ = null;
    return M.jump(void 0, f_15);
  }
}

function f_4(ctx) {
  ctx._1 = true;
  return M.jump(void 0, f_5);
}

function f_5(ctx) {
  if (ctx._1) {
    ctx._1 = null;
    return M.chain(eff(2), f_6);
  } else {
    ctx._1 = null;
    return M.jump(void 0, f_13);
  }
}

function f_6(ctx) {
  return M.chain(eff(3), f_7);
}

function f_7(ctx, a) {
  if (a) {
    return M.chain(eff(4), f_13);
  } else {
    return M.chain(eff(3), f_8);
  }
}

function f_8(ctx, a) {
  if (a) {
    return M.chain(eff(4), f_11);
  } else {
    return M.chain(eff(5), f_9);
  }
}

function f_9(ctx, a) {
  if (a) {
    return M.chain(eff(6), f_14);
  } else {
    return M.chain(eff(7), f_10);
  }
}

function f_10(ctx, a) {
  if (a) {
    return M.chain(eff(8), f_15);
  } else {
    return M.jump(void 0, f_11);
  }
}

function f_11(ctx) {
  return M.chain(eff(9), f_12);
}

function f_12(ctx, a) {
  ctx._1 = a;
  return M.jump(void 0, f_5);
}

function f_13(ctx) {
  return M.chain(eff(10), f_14);
}

function f_14(ctx) {
  ctx._ = true;
  return M.jump(void 0, f_3);
}

function f_15(ctx) {
  return M.chain(eff(11), f_16);
}

function f_16(ctx) {}