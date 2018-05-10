import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(read1(), a_2);
}

function a_2(a, b) {
  a._i = b;
  return M.chain(eff(a._i), a_3);
}

function a_3(a) {
  var b;
  b = a._i, a._i = null;
  return M.chain(write(b), a_4);
}

function a_4(a) {}