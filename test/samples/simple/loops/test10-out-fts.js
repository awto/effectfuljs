function a_1(i) {
  return a_2();
}

function a_2(i) {
  return M.jMB(check(), a_3, i);
}

function a_3(a, i) {
  if (a === true) {
    return M.jMB(initJ(), a_4, i);
  } else return M.pure();
}

function a_4(j, i) {
  return a_5(i, j);
}

function a_5(i, j) {
  return M.jMB(checkJ(), a_6, i, j);
}

function a_6(a, i, j) {
  if (a === true) {
    if (i === j) {
      return M.jRM(updJ(), a_5, i, j);
    } else return a_7(i);
  } else return a_7(i);
}

function a_7(i) {
  return M.jRM(upd(), a_2, i);
}

function a() {
  return M.jMB(init(), a_1);
}