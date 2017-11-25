function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  var b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chainBH(eff1(a._i, b), a_2, a_6);
}

function b_1(_b) {
  var a;
  _b._z = 0;
  a = _b._a._j;
  return M.chainBH(eff2(_b._i, a, _b._k, _b._z), b_2, b_5);
}

function b_2(_b) {
  var a;
  _b._i++, _b._a._j++, _b._k++, _b._z++;
  a = _b._a._j;
  return M.chainBH(eff3(_b._i, a, _b._k, _b._z), b_3, b_5);
}

function b_3(_b) {
  var a;
  a = _b._a._j;
  return M.chainBH(eff4(_b._i, a, _b._k, _b._z), b_4, b_5);
}

function b_4(_b) {
  return M.pure();
}

function b_5(_b, e) {
  return M.raise(e);
}

function a_2(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chainBH(function b(i, k) {
    var _b = M.context();

    _b._a = a;
    _b._i = i;
    _b._k = k;
    return M.scopeH(b_1, b_5);
  }(a._i, b), a_3, a_6);
}

function a_3(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chainBH(eff5(a._i, b), a_4, a_6);
}

function a_4(a) {
  var b;
  b = a._j;
  return M.chainBH(eff6(a._i, b), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}