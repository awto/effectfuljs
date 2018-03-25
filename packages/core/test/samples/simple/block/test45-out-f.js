import * as M from "@effectful/core";

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff5(a), _1);

  function _1() {
    var a;

    if (ee) {
      a = i++;
      return M.chain(eff7(a), _2);
    } else {
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    return M.chain(eff8(i), _3);
  }

  function _3() {}
}