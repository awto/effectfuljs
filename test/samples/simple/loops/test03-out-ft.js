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
    i: undefined,
    j: undefined,
    l: undefined
  };
  if (_a_v.i < 10) return a_4(a_v, _a_v);else {
    return eff6(_a_v.i, _a_v.j, a_v.k);
  }
}

function a_4(a_v, _a_v) {
  a_v.k++;
  return M.jMB2(eff3(_a_v.i), a_5, a_v, _a_v);
}

function a_5(a, a_v, _a_v) {
  _a_v.j = a;
  return M.jMB2(eff4(_a_v.i), a_6, a_v, _a_v);
}

function a_6(a, a_v, _a_v) {
  _a_v.l = a;
  _a_v.l++;
  return M.jM2(eff5(_a_v.j++, a_v.k, _a_v.l), a_7, a_v, _a_v);
}

function a_7(a_v, _a_v) {
  _a_v.i++;
  return M.jNR(a_3, a_v);
}

function a() {
  var a_v;
  a_v = {
    k: undefined
  };
  a_v.k = 0;
  return M.jM2(eff1(), a_1, a_v, _a_v);
}