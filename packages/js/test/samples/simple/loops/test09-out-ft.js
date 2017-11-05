function _a() {
  var a1 = M.context();
  return M.chain(init(), a_1, a_5);
}

function a_1(a1, a) {
  a1._i = a;
  return M.jump(a_2, a_5);
}

function a_2(a1) {
  return M.chain(check(), a_3, a_5);
}

function a_3(a1, a) {
  if (a === true) {
    if (_a) {
      return M.chain(eff(1), a_4, a_5);
    } else {
      return M.jump(a_4, a_5);
    }
  } else {
    return M.pure();
  }
}

function a_4(a1) {
  return M.repeat(upd(), a_2, a_5);
}

function a_5(a1, e) {
  return M.raise(e);
}