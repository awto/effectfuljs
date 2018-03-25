import * as M from "@effectful/core";

// *- when it is the last statement
(function () {
  var e;

  function _1(ex) {
    e = ex;
    return M.chain(eff(3), _2);
  }

  function _2() {}

  function _3(a) {
    return M.jump(void 0, _1, a);
  }
});