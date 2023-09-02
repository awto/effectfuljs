import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  return M.chain(eff1(), a_2);
}
function a_2(a) {
  if (a1) {
    return M.chain(eff2(), a_3);
  } else {
    return M.jump(void 0, a_3);
  }
}
function a_3(a) {
  return M.chain(eff3(), a_4);
}
function a_4(a) {
  if (a2) {
    return M.chain(eff4(), a_5);
  } else {
    return M.jump(void 0, a_5);
  }
}
function a_5(a) {
  return M.chain(eff5(), a_6);
}
function a_6(a) {
  if (a3) {
    return M.chain(eff6(), a_7);
  } else {
    return M.jump(void 0, a_7);
  }
}
function a_7(a) {
  return M.chain(eff7(), a_8);
}
function a_8(a) {
  if (a4) {
    return M.chain(eff8(), a_9);
  }
}
function a_9(a) {}