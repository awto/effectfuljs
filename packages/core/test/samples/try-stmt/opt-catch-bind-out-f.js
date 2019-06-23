import * as M from "@effectful/core";

function a1(a, b) {
  return M.jump(void 0, _1, _4);

  function _1() {
    return M.chain(eff(a), _3);
  }

  function _2() {
    return M.chain(eff(b), _3);
  }

  function _3() {}

  function _4(a) {
    return M.jump(void 0, _2);
  }
}

function a2(a, b) {
  var r;
  return M.jump(void 0, _1, _4);

  function _1() {
    return M.chain(eff(a), _3);
  }

  function _2() {
    return b;
  }

  function _3() {
    return r;
  }

  function _4(a) {
    return M.jump(void 0, _2);
  }
}