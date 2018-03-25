import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(1), a_2);
}

function a_2(a) {
  return M.chain(eff(2), a_3);
}

function a_3(a, c) {
  if (c) {
    return M.chain(eff3(), a_4);
  } else {
    b;
  }
}

function a_4(a) {
  return M.chain(eff4(), a_5);
}

function a_5(a) {}