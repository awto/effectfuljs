import * as M from '@effectful/core';

function a() {
  var a = M.context();

  a._b = function _b(i) {
    var b = M.context();
    b._a = a;
    b._i = i;
    return M.scope(b_1, b_4);
  };

  return M.scope(a_1, a_5);
}

function b_1(b) {
  var a;
  a = b._a._j;
  return M.chain(eff1(b._i, a), b_2, b_4);
}

function b_2(b) {
  var a;
  b._i++, b._a._j++;
  a = b._a._j;
  return M.chain(eff2(b._i, a), b_3, b_4);
}

function b_3(b) {
  return M.pure();
}

function b_4(b, e) {
  return M.raise(e);
}

function a_1(a) {
  var b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chain(eff3(a._i, b), a_2, a_5);
}

function a_2(a) {
  a._i++, a._j--;
  return M.chain(a._b(a._i), a_3, a_5);
}

function a_3(a) {
  var b;
  a._i--, a._j++;
  b = a._j;
  return M.chain(eff4(a._i, b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}