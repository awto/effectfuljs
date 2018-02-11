import * as M from '@effectful/core';

// *- when it is the last statement
(function () {
  var ctx = M.context();
  return M.scope(f_2, f_3);
});

function f_1(ctx) {
  ctx._e = ctx._ex;
  return M.chain(eff(3), f_2, f_3);
}

function f_2(ctx) {
  return M.pure();
}

function f_3(ctx, e) {
  return M.raise(e);
}

function f_4(ctx, a) {
  ctx._ex = a;
  return M.jump(void 0, f_1, f_3);
}