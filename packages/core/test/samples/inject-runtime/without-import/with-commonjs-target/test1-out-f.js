var M = require("@effectful/generators");
var _a = M.generatorFunction(a);
function a() {
  return M.scope(_1);
  function _1() {
    return M.yld(1, _2);
  }
  function _2() {
    return M.yld(2, _3);
  }
  function _3() {
    return M.pure();
  }
}