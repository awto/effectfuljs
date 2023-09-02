import * as M from "@effectful/core";
function a() {
  var r;
  return M.chain(eff("1"), _1);
  function _1(a) {
    console.log(a, 3);
    console.log("2");
    console.log("3");
    return M.chain(eff(2), _2);
  }
  function _2(a) {
    return a;
  }
}