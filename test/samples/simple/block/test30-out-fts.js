function b_1(j, i) {
  i++, j++;
  return eff2(i, j);
}

function a_1(i, j, b) {
  i++, j--;
  return M.jM2(b(i), a_2, i, j);
}

function a_2(i, j) {
  i--, j++;
  return eff4(i, j);
}

function a() {
  var i, j, b;

  b = function b(i) {
    return M.jM2(eff1(i, j), b_1, j, i);
  };

  i = 0;
  j = 0;
  return M.jM3(eff3(i, j), a_1, i, j, b);
}