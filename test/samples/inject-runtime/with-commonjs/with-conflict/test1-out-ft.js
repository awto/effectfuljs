import * as _M from '@effectful/generators';

function M() {
  return _M.scope(M_1);
}

function M_1() {
  return _M.yld(1, M_2);
}

function M_2() {
  return _M.yld(2, M_3);
}

function M_3() {
  return _M.pure();
}