import * as _M from '@effectful/generators';

function M_1() {
  return _M.yldM(1, M_2);
}

function M_2() {
  return _M.yldM(2, _M.pure);
}

function M() {
  return _M.scope(M_1);
}