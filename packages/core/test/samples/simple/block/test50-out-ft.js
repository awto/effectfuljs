import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(test(1), a_2);
}

function a_2(a, b) {
  if (b) {
    return M.chain(eff(3), a_3);
  } else {
    return M.chain(eff(5), a_3);
  }
}

function a_3(a) {}