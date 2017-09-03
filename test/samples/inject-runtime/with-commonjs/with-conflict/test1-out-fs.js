import * as _M from '@effectful/generators';

function M() {
  return _M.scope(_1);

  function _1() {
    return _M.yld(1, _2);
  }

  function _2() {
    return _M.yld(2, _3);
  }

  function _3() {
    return _M.pure();
  }
}