function a_1() {
  return M.jMB(eff2(), a_2);
}

function a_2(i) {
  return a_3();
}

function a_3(i) {
  if (i < 10) return a_4(i);else {
    return M.jMB(eff7(i), a_7);
  }
}

function a_4(i) {
  return M.jMB(eff3(i), a_5, i);
}

function a_5(j, i) {
  var a;
  a = j++;
  return M.jM(eff4(a), a_6, i);
}

function a_6(i) {
  i++;
  return M.jR(a_3, i);
}

function a_7(a) {
  console.log(a);
  return M.pure();
}

// *- should inject forPar
function a() {
  return M.jM(eff1(), a_1);
}