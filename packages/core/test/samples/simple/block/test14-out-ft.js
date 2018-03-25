import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._i = 0;
  return M.chain(eff(a._i), a_2);
}

function a_2(a) {
  if (a._i++) {
    return M.chain(eff1(a._i), a_3);
  } else {
    return M.chain(eff2(a._i), a_3);
  }
}

function a_3(a) {
  return M.chain(eff(a._i), a_4);
}

function a_4(a) {}