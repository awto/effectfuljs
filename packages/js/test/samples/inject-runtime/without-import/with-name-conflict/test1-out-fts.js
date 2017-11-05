import * as _M from '@effectful/generators';

var _a = _M.generatorFunction(a);

var M = 10;

function a() {
  return _M.scope(a_1, a_5, a_4);
}

function a_1() {
  return _M.yld(1, a_2, a_5, a_4);
}

function a_2() {
  return _M.yld(2, a_3, a_5, a_4);
}

function a_3() {
  return _M.pure();
}

function a_4(r) {
  return _M.pure(r);
}

function a_5(e) {
  return _M.raise(e);
}