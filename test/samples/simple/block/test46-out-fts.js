function a() {
  var i, a;
  a = i = 0;
  return M.jB(eff2(a), a_1, i);
}

function a_1(a, i) {
  var b;
  b = i++;
  return M.j(eff1(a, b), a_2, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.j(eff3(a), a_3, i);
}

function a_3(i) {
  var a;
  a = i++;
  return M.j(eff4(a), a_4, i);
}

function a_4(i) {
  var a;
  a = i++;
  return M.j(eff5(a), a_5, i);
}

function a_5(i) {
  var a;
  a = i++;
  return M.jB(eff6(a), a_6, i);
}

function a_6(a, i) {
  if (a) return a_7(i);else {
    return M.jB(eff7(i), a_8, i);
  }
}

function a_7(i) {
  var a;
  a = i++;
  return M.j(eff7(a), a_12, i);
}

function a_8(a, i) {
  if (a) return a_9(i);else {
    return M.pure(10);
  }
}

function a_9(i) {
  i++;
  return a_11(i);
}

function a_10() {
  var i, a;
  a = i++;
  return M.j(eff7(a), a_11, i);
}

function a_11(i) {
  var a;
  a = i++;
  return M.j(eff8(a), a_12, i);
}

function a_12(i) {
  var a;
  a = i++;
  return M.j(eff9(a), a_13, i);
}

function a_13(i) {
  var a;
  a = i++;
  return M.j(eff10(a), a_14);
}

function a_14() {
  return M.pure();
}