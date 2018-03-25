import * as M from "@effectful/core";

function a() {
  var i;
  i = 0;

  if (t) {
    return M.chain(eff1(i), _1);
  } else {
    i++;
    return M.jump(void 0, _1);
  }

  function _1() {
    return M.chain(eff2(i), _2);
  }

  function _2() {
    return M.chain(eff3(i), _3);
  }

  function _3() {}
}