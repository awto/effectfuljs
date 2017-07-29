function a_1(i) {
  i += 2;
  return M.jM(effM(), a_2, i);
}

function a_2(i) {
  return M.jM(effN(), a_3, i);
}

function a_3(i) {
  var a;
  a = ++i;
  return M.jMB(effI1(a), a_4, i);
}

function a_4(a, i) {
  return M.jMB(eff2(a), a_5, i);
}

function a_5(a, i) {
  var b;
  b = i++;
  return M.jMB(eff3(i), a_6, a, b);
}

function a_6(c, a, b) {
  return M.jM(eff1(a, b, c), a_7);
}

function a_7() {
  return M.jMB(effN(), a_8);
}

function a_8(a) {
  return M.jMB(effI(a), a_9);
}

function a_9(a) {
  return M.jM(effM(a), a_10);
}

function a_10() {
  return M.jMB(effI(), a_11);
}

function a_11(a) {
  return M.jMB(effJ(), a_12, a);
}

function a_12(b, a) {
  return M.jM(eff4(a, b), a_13);
}

function a_13() {
  return eff5();
}

function a() {
  var i;
  i = 0;
  return M.jM(eff0(), a_1, i);
}