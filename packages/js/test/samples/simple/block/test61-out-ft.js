function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(eff1(a._i), a_1, a_5);
}

function a_1(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_2, a_5);
}

function a_2(a) {
  var b;

  if (a._i) {
    a._i++;
    return M.jump(a_3, a_5);
  } else {
    b = a._i++;
    return M.chain(eff3(b), a_3, a_5);
  }
}

function a_3(a) {
  var b;
  b = a._i++;
  return M.chain(eff4(b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}