function a() {
  var a = M.context(),
      b,
      c;
  a._i = 0;
  a._j = 0;
  b = a._i++;
  c = a._j++;
  return M.chain(eff0(b, c), a_1, a_6);
}

function a_1(a) {
  return M.chain(eff1(a._i), a_2, a_6);
}

function a_2(a) {
  a._i += 1;
  return M.chain(eff2(2, a._j), a_3, a_6);
}

function a_3(a) {
  var b;
  b = a._i += 2;
  return M.chain(eff3(b, a._j), a_4, a_6);
}

function a_4(a) {
  return M.chain(eff4(a._j), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}