import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scope(f_1, f_4);
});

function f_1(ctx) {
  return M.chain(eff(2), f_2, f_4);
}

function f_2(ctx) {
  return M.chain(eff(4), f_3, f_4);
}

function f_3(ctx) {
  return M.pure();
}

function f_4(ctx, e) {
  return M.raise(e);
}