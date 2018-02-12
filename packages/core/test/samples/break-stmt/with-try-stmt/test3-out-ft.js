import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scope(f_1, f_5);
});

function f_1(ctx) {
  return M.chain(eff(2), f_3);
}

function f_2(ctx) {
  ctx._e = ctx._ex;
  return M.chain(eff(3), f_3);
}

function f_3(ctx) {
  return M.chain(eff(4), f_4);
}

function f_4(ctx) {}

function f_5(ctx, a) {
  ctx._ex = a;
  return M.jump(void 0, f_2);
}