import * as M from "@effectful/core";

(function () {
  return M.chain(eff(2), _1);

  function _1() {
    return M.chain(eff(4), _2);
  }

  function _2() {}
});