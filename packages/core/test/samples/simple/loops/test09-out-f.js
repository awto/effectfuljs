import * as M from "@effectful/core";
function a() {
  var i;
  return M.chain(init(), _1);
  function _1(a) {
    i = a;
    return M.jump(void 0, _2);
  }
  function _2() {
    return M.chain(check(), _3);
  }
  function _3(b) {
    if (b === true) {
      if (a) {
        return M.chain(eff(1), _4);
      } else {
        return M.jump(void 0, _4);
      }
    }
  }
  function _4() {
    return M.chain(upd(), _2);
  }
}