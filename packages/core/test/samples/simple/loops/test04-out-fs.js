import * as M from "@effectful/core";

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2(a) {
    var i;
    i = a;
    return M.jump(void 0, _3, i);
  }

  function _3(i) {
    var j;

    if (i < 10) {
      return M.chain(eff3(i, j), _4, j, i);
    } else {
      return M.chain(eff7(i), _6);
    }
  }

  function _4(j, i) {
    var a;
    a = j++;
    return M.chain(eff4(a), _5, i);
  }

  function _5(i) {
    i++;
    return M.jump(void 0, _3, i);
  }

  function _6() {}
}