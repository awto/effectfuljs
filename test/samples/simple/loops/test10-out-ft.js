function a() {
  var a_v = {
    i: undefined,
    j: undefined
  };
  return M.jB(init(), a_1, a_v);
}

function a_1(a, a_v) {
  a_v.i = a;
  return a_2(a_v);
}

function a_2(a_v) {
  return M.jB(check(), a_3, a_v);
}

function a_3(a, a_v) {
  if (a === true) {
    return M.jB(initJ(), a_4, a_v);
  } else {
    return M.pure();
  }
}

function a_4(a, a_v) {
  a_v.j = a;
  return a_5(a_v);
}

function a_5(a_v) {
  return M.jB(checkJ(), a_6, a_v);
}

function a_6(a, a_v) {
  if (a === true) {
    if (a_v.i === a_v.j) {
      return M.jR(updJ(), a_5, a_v);
    } else return a_7(a_v);
  } else return a_7(a_v);
}

function a_7(a_v) {
  return M.jR(upd(), a_2, a_v);
}