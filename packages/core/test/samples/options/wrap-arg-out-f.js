import * as M from "@effectful/core";

function z2() {
  var _args = M.args(arguments);

  ;
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(aff(_args), _2);
  }

  function _2() {}
}