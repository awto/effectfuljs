var _M = require('@effectful/generators');

var M = 10;

function a() {
  return _M.scope(a_1);
}

function a_1() {
  return _M.yld(1, a_2);
}

function a_2() {
  return _M.yld(2, a_3);
}

function a_3() {
  return _M.pure();
}