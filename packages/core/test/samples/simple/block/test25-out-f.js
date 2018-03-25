import * as M from "@effectful/core";

function a() {
  var i, a, b;

  if (ee) {
    a = i++;
    return M.chain(eff1(a), _1);
  } else {
    b = i++;
    return M.chain(eff1(b), _2);
  }

  function _1() {
    var a;
    a = i++;
    return M.chain(eff2(a), _3);
  }

  function _2() {
    var a;
    a = i++;
    return M.chain(eff2(a), _3);
  }

  function _3() {}
}