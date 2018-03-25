import * as Z from "@effectful/generators";

var _a = Z.generatorFunction(a);

function a() {
  return Z.scope(_1);

  function _1() {
    return Z.yld(1, _2);
  }

  function _2() {
    return Z.yld(2, _3);
  }

  function _3() {
    return Z.pure();
  }
}