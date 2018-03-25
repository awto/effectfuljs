import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chain(eff1(a._i, b), a_2);
}

function b_1(_b) {
  var a;
  _b._z = 0;
  a = _b._a._j;
  return M.chain(eff2(_b._i, a, _b._k, _b._z), b_2);
}

function b_2(_b) {
  var a;
  _b._i++, _b._a._j++, _b._k++, _b._z++;
  a = _b._a._j;
  return M.chain(eff3(_b._i, a, _b._k, _b._z), b_3);
}

function b_3(_b) {
  var a;
  a = _b._a._j;
  return M.chain(eff4(_b._i, a, _b._k, _b._z), b_4);
}

function b_4(_b) {}

function a_2(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chain(function b(i, k) {
    var _b = M.context();

    _b._a = a;
    _b._i = i;
    _b._k = k;
    return M.scope(b_1);
  }(a._i, b), a_3);
}

function a_3(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chain(eff5(a._i, b), a_4);
}

function a_4(a) {
  var b;
  b = a._j;
  return M.chain(eff6(a._i, b), a_5);
}

function a_5(a) {}