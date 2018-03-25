import * as M from "@effectful/core";

// *- when it is the last statement
(function () {
  return M.chain(eff(2), _1);

  function _1(a) {
    if (a) {} else {
      return M.chain(eff(3), _2);
    }
  }

  function _2() {}
});