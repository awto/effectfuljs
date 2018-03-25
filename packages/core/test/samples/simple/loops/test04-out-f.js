import * as M from "@effectful/core";

function a() {
  var j, i;
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return M.jump(void 0, _3);
  }

  function _3() {
    if (i < 10) {
      return M.chain(eff3(i, j), _4);
    } else {
      return M.chain(eff7(i), _6);
    }
  }

  function _4() {
    var a;
    a = j++;
    return M.chain(eff4(a), _5);
  }

  function _5() {
    i++;
    return M.jump(void 0, _3);
  }

  function _6() {}
}