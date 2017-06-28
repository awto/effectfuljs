function b_1(i) {
  return eff(3, i);
}

function a_1(i, k) {
  k++;
  return M.jM2(eff(4, i, k), a_2, i, k);
}

function a_2(i, k) {
  return eff(5, i, k);
}

function a() {
  var i, k, b;

  b = function b() {
    var j;
    j = i;
    return M.jM1(eff(2, j), b_1, i);
  };

  i = 0;
  k = 0;
  return M.jM2(eff(1, i, k), a_1, i, k);
}