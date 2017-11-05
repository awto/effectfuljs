function a() {
  var i,
      a = M.context(),
      c;

  function b(i) {
    var a;
    a = j;
    return M.chain(eff1(i, a), b_1, b_3, i);
  }

  i = 0;
  a._j = 0;
  c = a._j;
  return M.chain(eff3(i, c), a_1, a_4, i);
}

function b_1(i) {
  var a;
  i++, j++;
  a = j;
  return M.chain(eff2(i, a), b_2, b_3);
}

function b_2() {
  return M.pure();
}

function b_3(e) {
  return M.raise(e);
}

function a_1(a, i) {
  i++, a._j--;
  return M.chain(a._b(i), a_2, a_4, i);
}

function a_2(a, i) {
  var b;
  i--, a._j++;
  b = a._j;
  return M.chain(eff4(i, b), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}