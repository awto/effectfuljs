import * as M from "@effectful/core";

function scope() {
  return M.otherScope(_1);

  function _1() {
    return M.chain(eff_1(), _2);
  }

  function _2() {
    return M.chain(eff_2(), _3);
  }

  function _3() {}
}