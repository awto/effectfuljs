import * as M from "@effectful/core";

function a() {
  return M.chain(eff(1), _1);

  function _1(a) {
    return M.chain(eff(2), _2, a);
  }

  function _2(b, a) {
    return M.chain(eff(3), _3, a, b);
  }

  function _3(c, a, b) {
    return M.chain(b(c), _4, a);
  }

  function _4(b, a) {
    return M.chain(a(b), _5);
  }

  function _5() {}
}