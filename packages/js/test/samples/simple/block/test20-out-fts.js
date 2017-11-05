function a() {
  var i;
  i = 0;
  return M.chain(eff0(i), a_1, a_5, i);
}

function a_1(i) {
  i++;
  return M.chain(eff1(i), a_2, a_5, i);
}

function a_2(i) {
  return M.chain(eff1(i), a_3, a_5, i);
}

function a_3(i) {
  i++;
  return M.chain(eff1(i), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}