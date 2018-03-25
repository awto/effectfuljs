import * as M from "@effectful/core";

function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), _1, i);

  function _1(i) {
    var a;
    a = i++;
    return M.chain(eff2(a), _2);
  }

  function _2() {}
}