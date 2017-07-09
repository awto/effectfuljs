function a_1(a_v, _a_v) {
  return M.jMB2(eff2(), a_2, a_v, _a_v);
}

function a_2(a, a_v, _a_v) {
  _a_v.i = a;
  return a_3(a_v);
}

function a_3(a_v) {
  var _a_v;

  _a_v = {
    i: undefined
  };
  if (_a_v.i < 10) return a_4(a_v, _a_v);else {
    return eff7(_a_v.i);
  }
}

function a_4(a_v, _a_v) {
  return M.jM2(eff3(_a_v.i, a_v.j), a_5, a_v, _a_v);
}

function a_5(a_v, _a_v) {
  return M.jM2(eff4(a_v.j++), a_6, a_v, _a_v);
}

function a_6(a_v, _a_v) {
  _a_v.i++;
  return M.jR1(a_3, a_v);
}

function a() {
  var a_v;
  a_v = {
    j: undefined
  };
  return M.jM2(eff1(), a_1, a_v, _a_v);
}