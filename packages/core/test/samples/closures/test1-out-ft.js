import * as M from "@effectful/core";

function a() {
  var a = M.context();

  a._b = function _b() {
    var b = M.context();
    b._a = a;
    return M.scope(b_1);
  };

  return M.scope(a_1);
}

function b_1(b) {
  b._j = b._a._i;
  return M.chain(eff(2, b._j), b_2);
}

function b_2(b) {
  return M.chain(eff(3, b._a._i), b_3);
}

function b_3(b) {}

function a_1(a) {
  a._i = 0;
  a._k = 0;
  return M.chain(eff(1, a._i, a._k), a_2);
}

function a_2(a) {
  a._k++;
  return M.chain(eff(4, a._i, a._k), a_3);
}

function a_3(a) {
  return M.chain(eff(5, a._i, a._k), a_4);
}

function a_4(a) {}