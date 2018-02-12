import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

function f_1(ctx) {
  return M.chain(eff(2), f_2);
}

function f_2(ctx) {
  return M.chain(eff(4), f_3);
}

function f_3(ctx) {}