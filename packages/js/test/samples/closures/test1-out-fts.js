function a() {
  var k,
      a = M.context();

  function b() {
    var b = M.context();
    b._j = b._i;
    return M.chain(eff(2, b._j), b_1, b_3);
  }

  a._i = 0;
  k = 0;
  return M.chain(eff(1, a._i, k), a_1, a_4, k);
}

function b_1(b) {
  return M.chain(eff(3, b._i), b_2, b_3);
}

function b_2(b) {
  return M.pure();
}

function b_3(b, e) {
  return M.raise(e);
}

function a_1(a, k) {
  k++;
  return M.chain(eff(4, a._i, k), a_2, a_4, k);
}

function a_2(a, k) {
  return M.chain(eff(5, a._i, k), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}