function a() {
  var i, a;
  a = i = 0;
  return M.chain(eff2(a), a_1, a_11, i);
}

function a_1(a, i) {
  var b;
  b = i++;
  return M.chain(eff1(a, b), a_2, a_11, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.chain(eff3(a), a_3, a_11, i);
}

function a_3(i) {
  var a;
  a = i++;
  return M.chain(eff4(a), a_4, a_11, i);
}

function a_4(i) {
  var a;
  a = i++;
  return M.chain(eff5(a), a_5, a_11, i);
}

function a_5(i) {
  var a;
  a = i++;
  return M.chain(eff6(a), a_6, a_11, i);
}

function a_6(a, i) {
  var b;

  if (a) {
    b = i++;
    return M.chain(eff7(b), a_8, a_11, i);
  } else {
    return M.chain(eff7(i), a_7, a_11, i);
  }
}

function a_7(a, i) {
  var b;

  if (a) {
    i++;
    b = i++;
    return M.chain(eff8(b), a_8, a_11, i);
  } else {
    return M.pure(10);
  }
}

function a_8(i) {
  var a;
  a = i++;
  return M.chain(eff9(a), a_9, a_11, i);
}

function a_9(i) {
  var a;
  a = i++;
  return M.chain(eff10(a), a_10, a_11);
}

function a_10() {
  var r;
  return M.pure(r);
}

function a_11(e) {
  return M.raise(e);
}