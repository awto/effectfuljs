import * as M from '@effectful/core';

function a() {
  var _this = this;

  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(_this.eff(2), _2);
  }

  function _2() {
    return M.chain(eff3(_this), _3);
  }

  function _3() {}
}