function a() {
  return M.chain(eff0(), a_1, a_7);
}

function a_1() {
  var i;
  i = 0;
  i++;
  return M.chain(eff1(i), a_2, a_7, i);
}

function a_2(i) {
  if (t) {
    return M.chain(eff2(i), a_3, a_7, i);
  } else {
    t;
    return M.jump(a_4, a_7, i);
  }
}

function a_3(i) {
  i++;
  return M.chain(eff4(i), a_4, a_7, i);
}

function a_4(i) {
  return M.chain(eff5(i), a_5, a_7, i);
}

function a_5(i) {
  i++;
  return M.chain(eff6(i), a_6, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}