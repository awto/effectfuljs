function a_1(a, i) {
  return M.jM1(eff1(a, i++), a_2, i);
}

function a_2(i) {
  return M.jM1(eff3(i++), a_3, i);
}

function a_3(i) {
  return M.jM1(eff4(i++), a_4, i);
}

function a_4(i) {
  return M.jM1(eff5(i++), a_5, i);
}

function a_5(i) {
  var a;
  const a = i++;
  return M.jMB1(eff6(a), a_6, i);
}

function a_6(a, i) {
  if (a) return a_7(i);else {
    return M.jMB1(eff7(i), a_8, i);
  }
}

function a_7(i) {
  return M.jM1(eff7(i++), a_12, i);
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
  var i;
  return M.jM1(eff7(i++), a_11, i);
}

function a_11(i) {
  return M.jM1(eff8(i++), a_12, i);
}

function a_12(i) {
  return M.jM1(eff9(i++), a_13, i);
}

function a_13(i) {
  return eff10(i++);
}

function a() {
  var i;
  const a = i = 0;
  return M.jMB1(eff2(a), a_1, i);
}