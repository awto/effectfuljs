function a() {
  var a = M.context();
  return M.scope(a_1, a_6);
}

function a_1(a) {
  a._j = 0;
  return M.chain(eff(a._j), a_2, a_6);
}

function a_2(a) {
  var b;
  b = a._j++;
  return M.chain(eff(b), a_3, a_6);
}

function a_3(a) {
  return M.chain(eff2(a._j), a_4, a_6);
}

function a_4(a) {
  var b;
  b = a._j++;
  return M.chain(eff3(b), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}