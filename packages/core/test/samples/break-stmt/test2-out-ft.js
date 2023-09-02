import * as M from "@effectful/core";
// *- when it is the last statement
(function () {
  var ctx = M.context();
  return M.scope(f_1);
});
function f_1(ctx) {
  return M.chain(eff(2), f_2);
}
function f_2(ctx, a) {
  if (a) {} else {
    return M.chain(eff(3), f_3);
  }
}
function f_3(ctx) {}