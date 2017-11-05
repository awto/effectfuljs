function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff0(a), a_1, a_5, i);
}

function a_1(i) {
  return M.chain(eff1(i), a_2, a_5, i);
}

function a_2(i) {
  i += 1;
  return M.chain(eff2(2), a_3, a_5, i);
}

function a_3(i) {
  var a;
  a = i += 2;
  return M.chain(eff3(a), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}