import * as M from "@effectful/core";

function a() {
  var i;
  i = 0;
  i++;
  return M.chain(eff1(i), _1);

  function _1() {
    return M.chain(eff(i), _2);
  }

  function _2() {
    {
      i++;
    }
    return M.chain(eff2(i), _3);
  }

  function _3() {}
}