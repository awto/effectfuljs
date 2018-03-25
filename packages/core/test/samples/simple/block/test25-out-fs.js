import * as M from "@effectful/core";

function a() {
  var i, a, b;

  if (ee) {
    a = i++;
    return M.chain(eff1(a), _1, i);
  } else {
    b = i++;
    return M.chain(eff1(b), _2, i);
  }

  function _1(i) {
    var a;
    a = i++;
    return M.chain(eff2(a), _3);
  }

  function _2(i) {
    var a;
    a = i++;
    return M.chain(eff2(a), _3);
  }

  function _3() {}
}