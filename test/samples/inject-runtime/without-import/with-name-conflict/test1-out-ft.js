import * as _M from '@effectful/generators';

function a_1() {
  return _M.yldM(1, a_2);
}

function a_2() {
  return _M.yldM(2, _M.pure);
}

var M = 10;

function a() {
  return _M.scope(a_1);
}