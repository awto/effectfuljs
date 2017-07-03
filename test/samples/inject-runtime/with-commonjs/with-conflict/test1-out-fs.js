import * as _M from '@effectful/generators';

function M() {
  return _M.scope(_1);

  function _1() {
    return _M.yldM(1, _2);
  }

  function _2() {
    return _M.yldM(2, _M.pure);
  }
}