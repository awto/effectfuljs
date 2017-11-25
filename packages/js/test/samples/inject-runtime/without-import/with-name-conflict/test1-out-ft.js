import * as _M from '@effectful/generators';
var M = 10;

function a() {
  var a = _M.generator();

  return _M.scopeH(a_1, a_4);
}

function a_1(a) {
  return _M.yldBH(1, a_2, a_4);
}

function a_2(a) {
  return _M.yldBH(2, a_3, a_4);
}

function a_3(a) {
  return _M.pure();
}

function a_4(a, e) {
  return _M.raise(e);
}