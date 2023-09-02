import * as M from "@effectful/core";
function a() {
  return M.chain(eff(3), _1);
  function _1(b) {
    var a;
    a = console.log(2 + b);
    1 + a + 4;
  }
}