function a() {
  var a = M.context();
  return M.chain(init(), a_1, a_8);
}

function a_1(a, b) {
  a._i = b;
  return M.jump(a_2, a_8);
}

function a_2(a) {
  return M.chain(check(), a_3, a_8);
}

function a_3(a, b) {
  if (b === true) {
    return M.chain(initJ(), a_4, a_8);
  } else {
    return M.pure();
  }
}

function a_4(a, b) {
  a._j = b;
  return M.jump(a_5, a_8);
}

function a_5(a) {
  return M.chain(checkJ(), a_6, a_8);
}

function a_6(a, b) {
  if (b === true) {
    if (a._i === a._j) {
      return M.repeat(updJ(), a_5, a_8);
    } else {
      return M.jump(a_7, a_8);
    }
  } else {
    return M.jump(a_7, a_8);
  }
}

function a_7(a) {
  return M.repeat(upd(), a_2, a_8);
}

function a_8(a, e) {
  return M.raise(e);
}