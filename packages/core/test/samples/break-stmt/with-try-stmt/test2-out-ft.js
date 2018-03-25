import * as M from "@effectful/core";

// *- when it is the last statement
(function () {
  var ctx = M.context();
  return M.scope(f_2);
});

function f_1(ctx) {
  ctx._e = ctx._ex;
  return M.chain(eff(3), f_2);
}

function f_2(ctx) {}

function f_3(ctx, a) {
  ctx._ex = a;
  return M.jump(void 0, f_1);
}