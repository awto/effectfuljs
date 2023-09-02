import * as _M from "@effectful/generators";
var M = 10;
function a() {
  var a = _M.generator();
  return _M.scope(a_1);
}
function a_1(a) {
  return _M.yld(1, a_2);
}
function a_2(a) {
  return _M.yld(2, a_3);
}
function a_3(a) {
  return _M.pure();
}