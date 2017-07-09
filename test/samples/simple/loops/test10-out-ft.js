function a_1(a, a_v, _a_v) {
  a_v.i = a;
  return a_2(a_v, _a_v);
}

function a_2(a_v, _a_v) {
  return M.jMB2(check(), a_3, a_v, _a_v);
}

function a_3(a, a_v, _a_v) {
  if (a === true) {
    return M.jMB2(initJ(), a_4, a_v, _a_v);
  } else return M.pure();
}

function a_4(a, a_v, _a_v) {
  _a_v.j = a;
  return a_5(a_v, _a_v);
}

function a_5(a_v, _a_v) {
  return M.jMB2(checkJ(), a_6, a_v, _a_v);
}

function a_6(a, a_v, _a_v) {
  if (a === true) {
    if (a_v.i === _a_v.j) {
      return M.jRM2(updJ(), a_5, a_v, _a_v);
    } else return a_7(a_v, _a_v);
  } else return a_7(a_v, _a_v);
}

function a_7(a_v, _a_v) {
  return M.jRM2(upd(), a_2, a_v, _a_v);
}

function a() {
  return M.jMB2(init(), a_1, a_v, _a_v);
}