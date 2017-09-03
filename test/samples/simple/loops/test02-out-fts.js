// *- should inject forPar
function a() {
  var a_v = {
    k: undefined
  };
  return M.j(eff1(), a_1);
}

function a_1() {
  return M.jB(eff2(), a_2);
}

function a_2(i) {
  return M.jB(eff3(), a_3, i);
}

function a_3(j, i) {
  return a_4(i, j);
}

function a_4(i, j) {
  if (i < 10 && j > -10) return a_5(i, j);else {
    return M.j(eff5(i, j), a_8);
  }
}

function a_5(i, j) {
  return M.jB(eff3(i), a_6, i, j);
}

function a_6(k, i, j) {
  var a;
  a = k++;
  return M.j(eff4(a), a_7, i, j);
}

function a_7(i, j) {
  i++, j--;
  return M.jR(a_4, i, j);
}

function a_8() {
  return M.pure();
}