import * as M from '@effectful/core';

function a() {
  var _this = this;

  return M.chain(eff(1), _1, _this);

  function _1(_this) {
    return M.chain(_this.eff(2), _2, _this);
  }

  function _2(_this) {
    return M.chain(eff3(_this), _3);
  }

  function _3() {}
}