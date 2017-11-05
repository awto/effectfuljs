function a() {
  return M.chain(eff1(), a_1, a_9);
}

function a_1() {
  return M.chain(eff2(), a_2, a_9);
}

function a_2(a) {
  var i;
  i = a;
  return M.jump(a_3, a_9, i);
}

function a_3(i) {
  return M.chain(eff(3), a_4, a_9, i);
}

function a_4(a, i) {
  if (i !== a) {
    return M.chain(eff5(i), a_5, a_9, i);
  } else {
    return M.chain(eff7(i), a_8, a_9);
  }
}

function a_5(i) {
  return M.chain(eff6(i), a_6, a_9, i);
}

function a_6(i) {
  return M.chain(eff4(i), a_7, a_9);
}

function a_7(a) {
  var i;
  i = a;
  return M.repeat(a_3, a_9, i);
}

function a_8() {
  return M.pure();
}

function a_9(e) {
  return M.raise(e);
}