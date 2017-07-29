function a_1(i) {
  var a;
  a = i++;
  return M.jM(eff1(a), a_2, i);
}

function a_2(i) {
  var a;
  a = i++;
  return eff2(a);
}

function a_3(i) {
  var a;
  a = i++;
  return eff2(a);
}

function a() {
  var i, a;
  if (ee) return a_1(i);else {
    a = i++;
    return M.jM(eff1(a), a_3, i);
  }
}