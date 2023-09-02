import * as M from "@effectful/core";
function a1(a) {
  this.a = a;
}
function b() {
  return M.scope(_1);
  function _1() {
    var a;
    a = a1;
    return M.chain(a(), _2);
  }
  function _2() {}
}