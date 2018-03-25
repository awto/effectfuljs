import * as M from "@effectful/core";

function a() {
  var i;
  i = 0;
  return M.chain(eff(1), _1);

  function _1() {}
}