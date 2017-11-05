function a() {
  var i;
  i = 0;
  return M.chain(eff(i), a_1, a_4, i);
}

function a_1(i) {
  if (i++) {
    return M.chain(eff1(i), a_2, a_4, i);
  } else {
    return M.chain(eff2(i), a_2, a_4, i);
  }
}

function a_2(i) {
  return M.chain(eff(i), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}