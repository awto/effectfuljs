import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1, f_8);
});

function f_1(ctx) {
  return M.chain(eff(2), f_2, f_8);
}

function f_2(ctx) {
  return M.chain(eff(3), f_3, f_8);
}

function f_3(ctx, a) {
  if (a) {
    return M.jump(void 0, f_6);
  } else {
    throw new Error("error");
  }
}

function f_4(ctx) {
  ctx._e = ctx._ex;
  return M.chain(eff(5), f_5);
}

function f_5(ctx) {
  return M.chain(eff(6), f_6);
}

function f_6(ctx) {
  return M.chain(eff(7), f_7);
}

function f_7(ctx) {}

function f_8(ctx, a) {
  ctx._ex = a;
  return M.jump(void 0, f_4);
}