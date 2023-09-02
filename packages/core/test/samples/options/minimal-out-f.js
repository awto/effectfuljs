import * as M from "@effectful/core";
function a() {
  eff(1);
  eff(2);
  return eff(3);
}
function b() {
  var r;
  eff(1);
  return M.chain(eff(2), _1);
  function _1() {
    eff(3);
    return M.chain(eff(4), _2);
  }
  function _2() {
    return 5;
  }
}