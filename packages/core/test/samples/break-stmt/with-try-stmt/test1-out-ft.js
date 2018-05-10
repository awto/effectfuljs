import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1, f_7);
});

function f_1(ctx) {
  return M.chain(eff(1), f_2, f_7);
}

function f_2(ctx, a) {
  if (a) {
    return M.chain(eff("before break"), f_5);
  } else {
    return M.chain(eff(2), f_4);
  }
}

function f_3(ctx) {
  var e;
  e = ctx._ex;
  ctx._ex = null;
  return M.chain(eff(3), f_4);
}

function f_4(ctx) {
  return M.chain(eff(4), f_5);
}

function f_5(ctx) {
  return M.chain(eff(5), f_6);
}

function f_6(ctx) {}

function f_7(ctx, a) {
  ctx._ex = a;
  return M.jump(void 0, f_3);
}