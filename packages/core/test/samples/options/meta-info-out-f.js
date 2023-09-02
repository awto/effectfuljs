import * as M from "@effectful/core";
var $module = M.module("*", module),
  meta$a2 = M.meta($module, null),
  meta$c = M.meta($module, meta$a2),
  meta$b = M.meta($module, meta$c);
var _a2 = M.wrap(a2, meta$a2);
function a2() {
  var i,
    c = function c() {
      var m,
        b = M.wrap(function b(j) {
          var k, r;
          k = j + i;
          i += m;
          return M.chain(eff_1(), _1);
          function _1(a) {
            return a;
          }
        }, meta$b);
      m = 0;
      i++;
    },
    r;
  i = 0;
  return M.chain(eff_2(), _1);
  function _1(a) {
    return a;
  }
}