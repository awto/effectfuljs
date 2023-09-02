import * as M from "@effectful/core";
function a() {
  var r;
  return M.chain(eff(1), _1);
  function _1(a) {
    if (a) {
      return M.chain(eff(2), _2);
    } else {
      return M.chain(eff(3), _3);
    }
  }
  function _2(a) {
    return a;
  }
  function _3(a) {
    return a;
  }
}