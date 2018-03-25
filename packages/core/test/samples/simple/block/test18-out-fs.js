import * as M from "@effectful/core";

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff0(a), _1, i);

  function _1(i) {
    return M.chain(eff1(i), _2, i);
  }

  function _2(i) {
    i += 1;
    return M.chain(eff2(2), _3, i);
  }

  function _3(i) {
    var a;
    a = i += 2;
    return M.chain(eff3(a), _4);
  }

  function _4() {}
}