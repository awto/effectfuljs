function a_1(a_v) {
  var a;
  a = a_v.i++;
  return M.jM(eff1(a), a_2, a_v);
}

function a_2(a_v) {
  var a;
  a = a_v.i++;
  return eff2(a);
}

function a_3(a_v) {
  var a;
  a = a_v.i++;
  return eff2(a);
}

function a() {
  var a_v = {
    i: undefined
  },
      a;
  if (ee) return a_1(a_v);else {
    a = a_v.i++;
    return M.jM(eff1(a), a_3, a_v);
  }
}