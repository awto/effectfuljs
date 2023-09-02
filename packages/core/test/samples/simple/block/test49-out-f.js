import * as M from "@effectful/core";
function a() {
  return M.chain(eff(1), _1);
  function _1() {}
}