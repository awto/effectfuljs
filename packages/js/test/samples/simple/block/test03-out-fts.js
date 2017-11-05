function a() {
  return M.chain(eff0(), a_1, a_4);
}

function a_1() {
  var i;
  i = 0;
  i++;
  return M.chain(eff1(i), a_2, a_4, i);
}

function a_2(i) {
  if (t) {
    return M.chain(eff2(i), a_3, a_4);
  } else {
    return M.chain(eff3(i), a_3, a_4);
  }
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}