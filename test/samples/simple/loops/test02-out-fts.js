function a_1() {
  return M.jMB(eff2(), a_2);
}

function a_2(i) {
  return M.jMB(eff3(), a_3, i);
}

function a_3(j, i) {
  return a_4(i, j);
}

function a_4(i, j) {
  if (i < 10 && j > -10) return a_5(i, j);else {
    return eff5(i, j);
  }
}

function a_5(i, j) {
  return M.jMB(eff3(i), a_6, i, j);
}

function a_6(k, i, j) {
  var a;
  a = k++;
  return M.jM(eff4(a), a_7, i, j);
}

function a_7(i, j) {
  i++, j--;
  return M.jR(a_4, i, j);
}

// *- should inject forPar
function a() {
  return M.jM(eff1(), a_1);
}