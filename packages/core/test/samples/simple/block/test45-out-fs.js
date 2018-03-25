import * as M from "@effectful/core";

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff5(a), _1, i);

  function _1(i) {
    var a;

    if (ee) {
      a = i++;
      return M.chain(eff7(a), _2, i);
    } else {
      return M.jump(void 0, _2, i);
    }
  }

  function _2(i) {
    return M.chain(eff8(i), _3);
  }

  function _3() {}
}