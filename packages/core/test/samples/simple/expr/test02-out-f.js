import * as _M from "@effectful/core";

function M() {
  return _M.chain(eff(2), _1);

  function _1() {}
}