import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var b;
  b = a._i++;
  a._i = null;
  return M.chain(eff1(b), a_2);
}

function a_2(a, b) {
  a._i = b;
  return M.chain(eff2(a._i), a_3);
}

function a_3(a) {
  var b;
  b = a._i++;
  a._i = null;
  return M.chain(eff3(b), a_4);
}

function a_4(a, b) {
  var c;
  a._i = b;
  c = a._i, a._i = null;
  return M.chain(eff4(c), a_5);
}

function a_5(a) {}