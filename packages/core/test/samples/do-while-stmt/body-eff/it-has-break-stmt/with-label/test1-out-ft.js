import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

function f_1(ctx) {
  return M.chain(eff(0), f_2);
}

function f_2(ctx) {
  return M.chain(eff(1), f_3);
}

function f_3(ctx) {
  return M.chain(eff(2), f_4);
}

function f_4(ctx) {
  return M.chain(eff(3), f_5);
}

function f_5(ctx, a) {
  if (a) {
    return M.chain(eff(4), f_10);
  } else {
    return M.chain(eff(3), f_6);
  }
}

function f_6(ctx, a) {
  if (a) {
    return M.chain(eff(4), f_3);
  } else {
    return M.chain(eff(5), f_7);
  }
}

function f_7(ctx, a) {
  if (a) {
    return M.chain(eff(6), f_2);
  } else {
    return M.chain(eff(7), f_8);
  }
}

function f_8(ctx, a) {
  if (a) {
    return M.chain(eff(8), f_12);
  } else {
    return M.chain(eff(9), f_9);
  }
}

function f_9(ctx, a) {
  if (!a) {
    return M.jump(void 0, f_10);
  } else {
    return M.jump(void 0, f_3);
  }
}

function f_10(ctx) {
  return M.chain(eff(10), f_11);
}

function f_11(ctx) {
  if (!true) {
    return M.jump(void 0, f_12);
  } else {
    return M.jump(void 0, f_2);
  }
}

function f_12(ctx) {
  return M.chain(eff(11), f_13);
}

function f_13(ctx) {}