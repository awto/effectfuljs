import * as M from "@effectful/core";
var $module = M.module("*", module),
  meta$a2 = M.meta($module, null),
  meta$c = M.meta($module, meta$a2),
  meta$b = M.meta($module, meta$c);
var _a2 = M.wrap(a2, meta$a2);
function a2() {
  var a2 = M.context(_a2);
  a2._c = function _c() {
    var b = M.wrap(function _b(j) {
        var b = M.context(_b);
        b._j = j;
        b._a2 = _a2;
        b._c = c;
        return M.scope(b_1);
      }, meta$b),
      c = {},
      _a2 = a2;
    c._m = 0;
    _a2._i++;
  };
  return M.scope(a2_1);
}
function b_1(b) {
  var k;
  k = b._j + b._a2._i;
  b._a2._i += b._c._m;
  b._j = null;
  return M.chain(eff_1(), b_2);
}
function b_2(b, a) {
  return a;
}
function a2_1(a2) {
  a2._i = 0;
  return M.chain(eff_2(), a2_2);
}
function a2_2(a2, a) {
  return a;
}