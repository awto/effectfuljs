import * as M from "@effectful/core";

function e() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2() {}
}