import * as M from "@effectful/core";
function a() {
  var r;
  return M.chain(eff1(), _1);
  function _1() {
    if (a) {
      return 5;
    } else {
      return M.chain(eff6(), _2);
    }
  }
  function _2() {
    return r;
  }
}