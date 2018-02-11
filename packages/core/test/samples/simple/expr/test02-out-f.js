import * as _M from '@effectful/core';

function M() {
  return _M.chain(eff(2), _1, _2);

  function _1() {
    return _M.pure();
  }

  function _2(e) {
    return _M.raise(e);
  }
}