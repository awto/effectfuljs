import * as M from "@effectful/core";

function a() {
  var i;
  i = 0;
  return M.chain(eff2(2), _1);

  function _1(a) {
    return M.chain(eff1(a), _2);
  }

  function _2() {}
}