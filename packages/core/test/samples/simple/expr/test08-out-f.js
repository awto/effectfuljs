import * as M from "@effectful/core";

function a() {
  var a;
  return M.chain(eff(1), _1);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2);
  }

  function _2(b) {
    console.log(a, b, 2);
  }
}