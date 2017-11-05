function a() {
  var i,
      a = M.context(),
      b;
  i = 0;
  a._j = 0;
  b = a._j;
  return M.chain(eff1(i, b), a_1, a_5, i);
}

function b_1(_b, i, k, z) {
  var a;
  i++, _b._j++, k++, z++;
  a = _b._j;
  return M.chain(eff3(i, a, k, z), b_2, b_4, i, k, z);
}

function b_2(_b, i, k, z) {
  var a;
  a = _b._j;
  return M.chain(eff4(i, a, k, z), b_3, b_4);
}

function b_3(_b) {
  return M.pure();
}

function b_4(_b, e) {
  return M.raise(e);
}

function a_1(a, i) {
  var b;
  i++, a._j++;
  b = a._j;
  return M.chain(function b(i, k) {
    var z,
        _b = M.context(),
        a;

    z = 0;
    a = _b._j;
    return M.chain(eff2(i, a, k, z), b_1, b_4, i, k, z);
  }(i, b), a_2, a_5, i);
}

function a_2(a, i) {
  var b;
  i++, a._j++;
  b = a._j;
  return M.chain(eff5(i, b), a_3, a_5, i);
}

function a_3(a, i) {
  var b;
  b = a._j;
  return M.chain(eff6(i, b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}