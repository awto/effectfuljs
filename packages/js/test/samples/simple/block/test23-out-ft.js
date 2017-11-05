function a() {
  var a = M.context();
  a._i = 0;
  a._j = 0;
  a._ = a._i++;
  return M.chain(eff4(a._i, a._j), a_1, a_7);
}

function a_1(a, b) {
  var c;
  c = a._j++;
  return M.chain(eff3(b, c), a_2, a_7);
}

function a_2(a, b) {
  a._1 = b;
  return M.chain(eff5(a._i), a_3, a_7);
}

function a_3(a, b) {
  return M.chain(eff2(a._, a._1, b), a_4, a_7);
}

function a_4(a, b) {
  var c;
  c = a._i++;
  return M.chain(eff1(b, c), a_5, a_7);
}

function a_5(a, b) {
  return M.chain(eff0(b, a._i), a_6, a_7);
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}