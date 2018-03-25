import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(1), a_2);
}

function a_2(a, b) {
  switch (b) {
    case 1:
      return M.chain(effB(1), a_3);

    case 2:
      return M.jump(void 0, a_3);

    default:
      return M.chain(effB(3), a_4);
  }
}

function a_3(a) {
  return M.chain(effB(2), a_4);
}

function a_4(a) {}