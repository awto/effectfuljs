function a_1(_a_v) {
  return M.jMB1(eff2(), a_2, _a_v);
}

function a_2(a, _a_v) {
  _a_v.i = a;
  return M.jMB1(eff3(), a_3, _a_v);
}

function a_3(a, _a_v) {
  _a_v.j = a;
  return a_4();
}

function a_4() {
  var _a_v;

  _a_v = {
    i: undefined,
    j: undefined,
    k: undefined
  };
  if (_a_v.i < 10 && _a_v.j > -10) return a_5(_a_v);else {
    return eff5(_a_v.i, _a_v.j);
  }
}

function a_5(_a_v) {
  return M.jMB1(eff3(_a_v.i), a_6, _a_v);
}

function a_6(a, _a_v) {
  _a_v.k = a;
  return M.jM1(eff4(_a_v.k++), a_7, _a_v);
}

function a_7(_a_v) {
  _a_v.i++, _a_v.j--;
  return M.jR(a_4);
}

// *- should inject forPar
function a() {
  var a_v;
  a_v = {
    k: undefined
  };
  return M.jM1(eff1(), a_1, _a_v);
}