import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._i = 0;
  a._j = 0;
  a._ = a._i++;
  return M.chain(eff4(a._i, a._j), a_2);
}

function a_2(a, b) {
  var c;
  c = a._j++;
  a._j = null;
  return M.chain(eff3(b, c), a_3);
}

function a_3(a, b) {
  a._1 = b;
  return M.chain(eff5(a._i), a_4);
}

function a_4(a, b) {
  var c, d;
  c = a._, d = a._1, a._ = null, a._1 = null;
  return M.chain(eff2(c, d, b), a_5);
}

function a_5(a, b) {
  var c;
  c = a._i++;
  return M.chain(eff1(b, c), a_6);
}

function a_6(a, b) {
  var c;
  c = a._i, a._i = null;
  return M.chain(eff0(b, c), a_7);
}

function a_7(a) {}