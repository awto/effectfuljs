import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_9);
}

function a_1(a) {
  return M.chainBH(init(), a_2, a_9);
}

function a_2(a, b) {
  a._i = b;
  return M.jumpH(a_3, a_9);
}

function a_3(a) {
  return M.chainBH(check(), a_4, a_9);
}

function a_4(a, b) {
  if (b === true) {
    return M.chainBH(initJ(), a_5, a_9);
  } else {
    return M.pure();
  }
}

function a_5(a, b) {
  a._j = b;
  return M.jumpRH(a_6, a_9);
}

function a_6(a) {
  return M.chainBH(checkJ(), a_7, a_9);
}

function a_7(a, b) {
  if (b === true) {
    if (a._i === a._j) {
      return M.chainBH(updJ(), a_6, a_9);
    } else {
      return M.jumpH(a_8, a_9);
    }
  } else {
    return M.jumpH(a_8, a_9);
  }
}

function a_8(a) {
  return M.chainBH(upd(), a_3, a_9);
}

function a_9(a, e) {
  return M.raise(e);
}