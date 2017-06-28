function a_1(a, i, j) {
  var b;
  const b = j++;
  return M.jMB1(eff3(a, b), a_2, i);
}

function a_2(b, i) {
  return M.jMB2(eff5(i), a_3, i, b);
}

function a_3(c, i, b) {
  var a;
  return M.jMB1(eff2(a, b, c), a_4, i);
}

function a_4(a, i) {
  var b;
  const b = i++;
  return M.jMB1(eff1(a, b), a_5, i);
}

function a_5(a, i) {
  return eff0(a, i);
}

function a() {
  var i, j;
  i = 0;
  j = 0;
  const a = i++;
  return M.jMB2(eff4(i, j), a_1, i, j);
}