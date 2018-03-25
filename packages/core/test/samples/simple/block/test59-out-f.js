import * as M from "@effectful/core";

function a() {
  var i;
  i = 0;
  return M.chain(read1(), _1);

  function _1(a) {
    i = a;
    return M.chain(eff(i), _2);
  }

  function _2() {
    return M.chain(write(i), _3);
  }

  function _3() {}
}