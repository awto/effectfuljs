import * as M from "@effectful/core";
function z2() {
  var z2 = M.context();
  z2.__args = M.args(arguments);
  ;
  return M.scope(z2_1);
}
function z2_1(z2) {
  return M.chain(eff(1), z2_2);
}
function z2_2(z2) {
  var a;
  a = z2.__args, z2.__args = null;
  return M.chain(aff(a), z2_3);
}
function z2_3(z2) {}