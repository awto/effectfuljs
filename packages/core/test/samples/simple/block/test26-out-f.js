import * as M from "@effectful/core";

function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), _1);

  function _1(a) {
    i = a;
    return M.chain(eff2(i), _2);
  }

  function _2() {
    var a;
    a = i++;
    return M.chain(eff3(a), _3);
  }

  function _3(a) {
    i = a;
    return M.chain(eff4(i), _4);
  }

  function _4() {}
}