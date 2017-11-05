function a() {
  var k;
  k = 0;
  return M.chain(eff1(), a_1, a_8, k);
}

function a_1(k) {
  return M.chain(eff2(), a_2, a_8, k);
}

function a_2(a, k) {
  var i;
  i = a;
  return M.jump(a_3, a_8, k, i);
}

function a_3(k, i, j) {
  if (i < 10) {
    k++;
    return M.chain(eff3(i), a_4, a_8, k, i);
  } else {
    return M.chain(eff6(i, j, k), a_7, a_8);
  }
}

function a_4(a, k, i) {
  var j;
  j = a;
  return M.chain(eff4(i), a_5, a_8, k, i, j);
}

function a_5(a, k, i, j) {
  var l, b;
  l = a;
  l++;
  b = j++;
  return M.chain(eff5(b, k, l), a_6, a_8, k, i, j);
}

function a_6(k, i, j) {
  i++;
  return M.repeat(a_3, a_8, k, i, j);
}

function a_7() {
  return M.pure();
}

function a_8(e) {
  return M.raise(e);
}