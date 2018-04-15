import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var i, b;
  b = i++;
  return M.chain(eff1(b), a_2);
}

function a_2(a) {}