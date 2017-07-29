function a_1(a, a_v, _a_v) {
  a_v.i = a;
  return a_2(a_v, _a_v);
}

function a_2(a_v, _a_v) {
  var _a_v = {
    j: undefined
  };
  return M.jMB(check(), a_3, a_v, _a_v);
}

function a_3(a, a_v, _a_v) {
  if (a === true) {
    return M.jMB(initJ(), a_4, a_v, _a_v);
  } else return M.pure();
}

function a_4(a, a_v, _a_v) {
  _a_v.j = a;
  return a_5(a_v, _a_v);
}

function a_5(a_v, _a_v) {
  return M.jMB(checkJ(), a_6, a_v, _a_v);
}

function a_6(a, a_v, _a_v) {
  if (a === true) {
    if (a_v.i === _a_v.j) {
      return M.jRM(updJ(), a_5, a_v, _a_v);
    } else return a_7(a_v, _a_v);
  } else return a_7(a_v, _a_v);
}

function a_7(a_v, _a_v) {
  return M.jRM(upd(), a_2, a_v, _a_v);
}

function a() {
  var a_v = {
    i: undefined
  };
  return M.jMB(init(), a_1, a_v, _a_v);
}