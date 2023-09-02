import * as M from "@effectful/core";
function a() {
  var r;
  return M.chain(eff1(), _1);
  function _1() {
    if (a) {
      return M.chain(eff5(5), _2);
    } else {
      return M.chain(eff6(), _3);
    }
  }
  function _2(a) {
    return a;
  }
  function _3() {
    return r;
  }
}