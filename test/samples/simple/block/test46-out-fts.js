function a_1(a, i) {
  var b;
  b = i++;
  return M.jM(eff1(a, b), a_2, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.jM(eff3(a), a_3, i);
}

function a_3(i) {
  var a;
  a = i++;
  return M.jM(eff4(a), a_4, i);
}

function a_4(i) {
  var a;
  a = i++;
  return M.jM(eff5(a), a_5, i);
}

function a_5(i) {
  var a;
  a = i++;
  return M.jMB(eff6(a), a_6, i);
}

function a_6(a, i) {
  if (a) return a_7(i);else {
    return M.jMB(eff7(i), a_8, i);
  }
}

function a_7(i) {
  var a;
  a = i++;
  return M.jM(eff7(a), a_12, i);
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
  return M.jM(eff7(a), a_11, i);
}

function a_11(i) {
  var a;
  a = i++;
  return M.jM(eff8(a), a_12, i);
}

function a_12(i) {
  var a;
  a = i++;
  return M.jM(eff9(a), a_13, i);
}

function a_13(i) {
  var a;
  a = i++;
  return eff10(a);
}

function a() {
  var i, a;
  a = i = 0;
  return M.jMB(eff2(a), a_1, i);
}