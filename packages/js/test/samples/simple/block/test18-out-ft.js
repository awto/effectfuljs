function a() {
  var a = M.context(),
      b;
  a._i = 0;
  b = a._i++;
  return M.chain(eff0(b), a_1, a_5);
}

function a_1(a) {
  return M.chain(eff1(a._i), a_2, a_5);
}

function a_2(a) {
  a._i += 1;
  return M.chain(eff2(2), a_3, a_5);
}

function a_3(a) {
  var b;
  b = a._i += 2;
  return M.chain(eff3(b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}