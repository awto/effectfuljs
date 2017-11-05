function a() {
  var a = M.context(),
      b;
  b = a._i = 0;
  return M.chain(eff2(b), a_1, a_11);
}

function a_1(a, b) {
  var c;
  c = a._i++;
  return M.chain(eff1(b, c), a_2, a_11);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff3(b), a_3, a_11);
}

function a_3(a) {
  var b;
  b = a._i++;
  return M.chain(eff4(b), a_4, a_11);
}

function a_4(a) {
  var b;
  b = a._i++;
  return M.chain(eff5(b), a_5, a_11);
}

function a_5(a) {
  var b;
  b = a._i++;
  return M.chain(eff6(b), a_6, a_11);
}

function a_6(a, b) {
  var c;

  if (b) {
    c = a._i++;
    return M.chain(eff7(c), a_8, a_11);
  } else {
    return M.chain(eff7(a._i), a_7, a_11);
  }
}

function a_7(a, b) {
  var c;

  if (b) {
    a._i++;
    c = a._i++;
    return M.chain(eff8(c), a_8, a_11);
  } else {
    return M.pure(10);
  }
}

function a_8(a) {
  var b;
  b = a._i++;
  return M.chain(eff9(b), a_9, a_11);
}

function a_9(a) {
  var b;
  b = a._i++;
  return M.chain(eff10(b), a_10, a_11);
}

function a_10(a) {
  return M.pure(a._r);
}

function a_11(a, e) {
  return M.raise(e);
}