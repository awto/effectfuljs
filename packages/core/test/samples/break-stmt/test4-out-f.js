import * as M from "@effectful/core";

(function () {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {
    return M.chain(eff(4), _3);
  }

  function _3() {}
});