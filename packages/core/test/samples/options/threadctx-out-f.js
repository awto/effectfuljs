import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.chain(eff1(), _1);

  function _1(a, b) {
    a._ = b;
    return M.chain(eff2(), _2);
  }

  function _2(a, b) {
    a._ + b;
  }
}