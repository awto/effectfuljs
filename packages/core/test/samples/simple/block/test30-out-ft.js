import * as M from "@effectful/core";

function a() {
  var a = M.context();

  a._b = function _b(i) {
    var b = M.context();
    b._a = a;
    b._i = i;
    return M.scope(b_1);
  };

  return M.scope(a_1);
}

function b_1(b) {
  var a;
  a = b._a._j;
  return M.chain(eff1(b._i, a), b_2);
}

function b_2(b) {
  var a, c;
  b._i++, b._a._j++;
  a = b._a._j;
  c = b._i, b._i = null;
  return M.chain(eff2(c, a), b_3);
}

function b_3(b) {}

function a_1(a) {
  var b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chain(eff3(a._i, b), a_2);
}

function a_2(a) {
  var b;
  a._i++, a._j--;
  b = a._b, a._b = null;
  return M.chain(b(a._i), a_3);
}

function a_3(a) {
  var b, c;
  a._i--, a._j++;
  b = a._j;
  c = a._i, a._i = null;
  return M.chain(eff4(c, b), a_4);
}

function a_4(a) {}