function a() {
  var a = M.context(),
      c;

  function b(i) {
    var b = M.context(),
        a;
    b._i = i;
    a = b._j;
    return M.chain(eff1(b._i, a), b_1, b_3);
  }

  a._i = 0;
  a._j = 0;
  c = a._j;
  return M.chain(eff3(a._i, c), a_1, a_4);
}

function b_1(b) {
  var a;
  b._i++, b._j++;
  a = b._j;
  return M.chain(eff2(b._i, a), b_2, b_3);
}

function b_2(b) {
  return M.pure();
}

function b_3(b, e) {
  return M.raise(e);
}

function a_1(a) {
  a._i++, a._j--;
  return M.chain(a._b(a._i), a_2, a_4);
}

function a_2(a) {
  var b;
  a._i--, a._j++;
  b = a._j;
  return M.chain(eff4(a._i, b), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}