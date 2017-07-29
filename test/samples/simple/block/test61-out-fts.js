function a_1(i) {
  var a;
  a = i++;
  return M.jM(eff2(a), a_2, i);
}

function a_2(i) {
  var a;
  if (i) return a_3(i);else {
    a = i++;
    return M.jM(eff3(a), a_4, i);
  }
}

function a_3(i) {
  i++;
  return a_4(i);
}

function a_4(i) {
  var a;
  a = i++;
  return eff4(a);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff1(i), a_1, i);
}