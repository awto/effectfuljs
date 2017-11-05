function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(eff0(), a_1, a_15);
}

function a_1(a) {
  a._i += 2;
  return M.chain(effM(), a_2, a_15);
}

function a_2(a) {
  return M.chain(effN(), a_3, a_15);
}

function a_3(a) {
  var b;
  b = ++a._i;
  return M.chain(effI1(b), a_4, a_15);
}

function a_4(a, b) {
  return M.chain(eff2(b), a_5, a_15);
}

function a_5(a, b) {
  a._ = b;
  a._1 = a._i++;
  return M.chain(eff3(a._i), a_6, a_15);
}

function a_6(a, b) {
  return M.chain(eff1(a._, a._1, b), a_7, a_15);
}

function a_7(a) {
  return M.chain(effN(), a_8, a_15);
}

function a_8(a, b) {
  return M.chain(effI(b), a_9, a_15);
}

function a_9(a, b) {
  return M.chain(effM(b), a_10, a_15);
}

function a_10(a) {
  return M.chain(effI(), a_11, a_15);
}

function a_11(a, b) {
  a._2 = b;
  return M.chain(effJ(), a_12, a_15);
}

function a_12(a, b) {
  return M.chain(eff4(a._2, b), a_13, a_15);
}

function a_13(a) {
  return M.chain(eff5(), a_14, a_15);
}

function a_14(a) {
  return M.pure();
}

function a_15(a, e) {
  return M.raise(e);
}