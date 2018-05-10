import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1, a_8);
}

function a_1(a) {
  return M.chain(eff("in body"), a_2, a_8);
}

function a_2(a, b) {
  if (b) {
    a._fc = a_5, a._fe = a_6;
    return M.jump(void 0, a_3);
  } else {
    a._fc = a_4, a._fe = a_6;
    return M.jump(void 0, a_3);
  }
}

function a_3(a) {
  var b, c;
  b = a._fc, c = a._fe, a._fc = null, a._fe = null;
  return M.chain(eff("in `finally`"), b, c);
}

function a_4(a) {
  return M.chain(eff("after `finally`"), a_5, a_6);
}

function a_5(a) {}

function a_6(a, e) {
  return M.raise(e);
}

function a_7(a) {
  return M.raise(a._err1);
}

function a_8(a, b) {
  a._fc = a_7, a._fe = a_6, a._err1 = b;
  return M.jump(void 0, a_3);
}