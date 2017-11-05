function a() {
  var a = M.context();
  return M.chain(init(), a_1, a_6);
}

function a_1(a, b) {
  a._i = b;
  return M.jump(a_2, a_6);
}

function a_2(a) {
  return M.chain(check(), a_3, a_6);
}

function a_3(a, b) {
  if (b === true) {
    return M.chain(b1(), a_4, a_6);
  } else {
    return M.pure();
  }
}

function a_4(a) {
  if (v) {
    return M.chain(e(), a_5, a_6);
  } else {
    return M.jump(a_5, a_6);
  }
}

function a_5(a) {
  return M.repeat(upd(), a_2, a_6);
}

function a_6(a, e) {
  return M.raise(e);
}