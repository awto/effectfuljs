function a() {
  var a = M.context();

  a._b = function b(i) {
    var _b = M.context();

    _b._a = a;
    _b._i = i;
    return M.scopeH(b_1, b_4);
  };

  return M.scopeH(a_1, a_5);
}

function b_1(_b) {
  var a;
  a = _b._a._j;
  return M.chainBH(eff1(_b._i, a), b_2, b_4);
}

function b_2(_b) {
  var a;
  _b._i++, _b._a._j++;
  a = _b._a._j;
  return M.chainBH(eff2(_b._i, a), b_3, b_4);
}

function b_3(_b) {
  return M.pure();
}

function b_4(_b, e) {
  return M.raise(e);
}

function a_1(a) {
  var b;
  a._i = 0;
  a._j = 0;
  b = a._j;
  return M.chainBH(eff3(a._i, b), a_2, a_5);
}

function a_2(a) {
  a._i++, a._j--;
  return M.chainBH(a._b(a._i), a_3, a_5);
}

function a_3(a) {
  var b;
  a._i--, a._j++;
  b = a._j;
  return M.chainBH(eff4(a._i, b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}