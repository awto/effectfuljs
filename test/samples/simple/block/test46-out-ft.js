function a_1(a, a_v) {
  var b;
  b = a_v.i++;
  return M.jM(eff1(a, b), a_2, a_v);
}

function a_2(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff3(a), a_3, a_v);
}

function a_3(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff4(a), a_4, a_v);
}

function a_4(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff5(a), a_5, a_v);
}

function a_5(a_v) {
  var a;
  a = a_v.i++;
  return M.jMB(eff6(a), a_6, a_v);
}

function a_6(a, a_v) {
  if (a) return a_7(a_v);else {
    return M.jMB(eff7(a_v.i), a_8, a_v);
  }
}

function a_7(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff7(a), a_12, a_v);
}

function a_8(a, a_v) {
  if (a) return a_9(a_v);else {
    return M.pure(10);
  }
}

function a_9(a_v) {
  a_v.i++;
  return a_11(a_v);
}

function a_10(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff7(a), a_11, a_v);
}

function a_11(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff8(a), a_12, a_v);
}

function a_12(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff9(a), a_13, a_v);
}

function a_13(a_v) {
  var a;
  a = a_v.i++;
  return eff10(a);
}

function a() {
  var a_v = {
    i: undefined
  },
      a;
  a = a_v.i = 0;
  return M.jMB(eff2(a), a_1, a_v);
}