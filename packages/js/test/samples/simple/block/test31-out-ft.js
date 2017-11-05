function a() {
  var a = M.context(),
      b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chain(eff1(a._i, b), a_1, a_5);
}

function b_1(_b) {
  var a;
  _b._i++, _b._j++, _b._k++, _b._z++;
  a = _b._j;
  return M.chain(eff3(_b._i, a, _b._k, _b._z), b_2, b_4);
}

function b_2(_b) {
  var a;
  a = _b._j;
  return M.chain(eff4(_b._i, a, _b._k, _b._z), b_3, b_4);
}

function b_3(_b) {
  return M.pure();
}

function b_4(_b, e) {
  return M.raise(e);
}

function a_1(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chain(function b(i, k) {
    var _b = M.context(),
        a;

    _b._i = i;
    _b._k = k;
    _b._z = 0;
    a = _b._j;
    return M.chain(eff2(_b._i, a, _b._k, _b._z), b_1, b_4);
  }(a._i, b), a_2, a_5);
}

function a_2(a) {
  var b;
  a._i++, a._j++;
  b = a._j;
  return M.chain(eff5(a._i, b), a_3, a_5);
}

function a_3(a) {
  var b;
  b = a._j;
  return M.chain(eff6(a._i, b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}