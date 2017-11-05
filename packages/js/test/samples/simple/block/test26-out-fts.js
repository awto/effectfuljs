function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), a_1, a_5);
}

function a_1(a) {
  var i;
  i = a;
  return M.chain(eff2(i), a_2, a_5, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.chain(eff3(a), a_3, a_5);
}

function a_3(a) {
  var i;
  i = a;
  return M.chain(eff4(i), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}