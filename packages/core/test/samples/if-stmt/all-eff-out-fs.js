import * as M from "@effectful/core";

function a() {
  return M.chain(eff(1), _1);

  function _1(a) {
    if (a) {
      return eff(2);
    } else {
      return eff(3);
    }
  }
}