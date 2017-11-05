function a() {
  var i;
  i = 0;
  return M.chain(eff0(), a_1, a_15, i);
}

function a_1(i) {
  i += 2;
  return M.chain(effM(), a_2, a_15, i);
}

function a_2(i) {
  return M.chain(effN(), a_3, a_15, i);
}

function a_3(i) {
  var a;
  a = ++i;
  return M.chain(effI1(a), a_4, a_15, i);
}

function a_4(a, i) {
  return M.chain(eff2(a), a_5, a_15, i);
}

function a_5(a, i) {
  var b;
  b = i++;
  return M.chain(eff3(i), a_6, a_15, a, b);
}

function a_6(c, a, b) {
  return M.chain(eff1(a, b, c), a_7, a_15);
}

function a_7() {
  return M.chain(effN(), a_8, a_15);
}

function a_8(a) {
  return M.chain(effI(a), a_9, a_15);
}

function a_9(a) {
  return M.chain(effM(a), a_10, a_15);
}

function a_10() {
  return M.chain(effI(), a_11, a_15);
}

function a_11(a) {
  return M.chain(effJ(), a_12, a_15, a);
}

function a_12(b, a) {
  return M.chain(eff4(a, b), a_13, a_15);
}

function a_13() {
  return M.chain(eff5(), a_14, a_15);
}

function a_14() {
  return M.pure();
}

function a_15(e) {
  return M.raise(e);
}